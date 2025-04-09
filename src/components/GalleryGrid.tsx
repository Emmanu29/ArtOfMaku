import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Artwork, categories } from '../utils/data';
import ArtworkCard from './ArtworkCard';
import ArtworkModal from './ArtworkModal';

interface GalleryGridProps {
  artworks: Artwork[];
  showFilters?: boolean;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ artworks, showFilters = true }) => {
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 12 });
  const [loadingMore, setLoadingMore] = useState(false);

  // Memoize filtered artworks to avoid unnecessary recalculations
  const filteredArtworks = useMemo(
    () => selectedCategory
      ? artworks.filter((artwork) => artwork.category === selectedCategory)
      : artworks,
    [selectedCategory, artworks]
  );

  // Get currently visible artworks based on our range
  const visibleArtworks = useMemo(
    () => filteredArtworks.slice(0, visibleRange.end),
    [filteredArtworks, visibleRange.end]
  );

  // Reset visible range when category changes
  useEffect(() => {
    setVisibleRange({ start: 0, end: 12 });
  }, [selectedCategory]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && visibleRange.end < filteredArtworks.length) {
          setLoadingMore(true);
          // Simulate network delay to prevent too rapid loading
          setTimeout(() => {
            setVisibleRange(prev => ({ start: prev.start, end: prev.end + 6 }));
            setLoadingMore(false);
          }, 300);
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById('load-more-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [filteredArtworks.length, loadingMore, visibleRange.end]);

  // Category selection handler
  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
    // Reset scroll position when changing category
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Modal navigation handlers
  const handleNext = useCallback(() => {
    if (selectedArtworkIndex !== null) {
      setSelectedArtworkIndex((prev) => 
        prev !== null ? (prev + 1) % filteredArtworks.length : 0
      );
    }
  }, [filteredArtworks.length, selectedArtworkIndex]);

  const handlePrev = useCallback(() => {
    if (selectedArtworkIndex !== null) {
      setSelectedArtworkIndex((prev) =>
        prev !== null
          ? (prev - 1 + filteredArtworks.length) % filteredArtworks.length
          : 0
      );
    }
  }, [filteredArtworks.length, selectedArtworkIndex]);

  // Click handler for artwork cards
  const handleArtworkClick = useCallback((index: number) => {
    setSelectedArtworkIndex(index);
  }, []);

  return (
    <div className="w-full bg-zinc-900">
      {showFilters && (
        <div className="sticky top-[70px] z-10 bg-zinc-900/95 backdrop-blur-sm py-4 px-4 flex flex-wrap gap-2 mb-8">
          <button
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === null
                ? 'bg-amber-500 text-gray-900'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => handleCategoryChange(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-amber-500 text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {visibleArtworks.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleArtworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                priority={index < 6} // Load first 6 images eagerly
                onClick={() => handleArtworkClick(index)}
              />
            ))}
          </div>
          
          {/* Loading indicator and sentinel for infinite scroll */}
          {visibleRange.end < filteredArtworks.length && (
            <div 
              id="load-more-sentinel" 
              className="w-full h-24 flex items-center justify-center mt-6"
            >
              {loadingMore ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce delay-200"></div>
                </div>
              ) : (
                <span className="text-zinc-600">Scroll for more</span>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
          <p className="text-lg">No artworks found in this category</p>
          <button 
            className="mt-4 px-4 py-2 bg-amber-500 text-zinc-900 rounded-md hover:bg-amber-600 transition-colors"
            onClick={() => handleCategoryChange(null)}
          >
            View all artworks
          </button>
        </div>
      )}

      {/* Render the Artwork Modal if an artwork is selected */}
      {selectedArtworkIndex !== null && (
        <ArtworkModal
          artworks={filteredArtworks}
          currentIndex={selectedArtworkIndex}
          onClose={() => setSelectedArtworkIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};

export default React.memo(GalleryGrid);