import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Artwork } from '../utils/data';

interface FeaturedSliderProps {
  artworks: Artwork[];
  maxItems?: number;
}

const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ artworks, maxItems = 6 }) => {
  // Use all artworks if they're fewer than maxItems or slice to maxItems
  const displayArtworks = useMemo(() => 
    artworks.length > maxItems ? artworks.slice(0, maxItems) : artworks,
    [artworks, maxItems]
  );

  // Prevent processing if no artworks
  if (displayArtworks.length === 0) {
    return <div className="text-center p-6">No artworks available</div>;
  }

  // Determine items per slide based on window width with a default for SSR
  const getItemsPerSlide = useCallback(() => {
    if (typeof window === 'undefined') return 3; // Default for SSR
    return window.innerWidth < 640 ? 1 : 3;
  }, []);
  
  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Prepare slides with clones for infinite scrolling
  const { originalSlideCount, extendedSlides } = useMemo(() => {
    // Ensure we have at least one artwork to prevent division by zero
    if (displayArtworks.length === 0) {
      return { originalSlideCount: 0, extendedSlides: [] };
    }

    const slideCount = Math.ceil(displayArtworks.length / itemsPerSlide);
    
    // Create slides with proper grouping
    const createSlide = (startIdx: number) => {
      const slide = [];
      for (let i = 0; i < itemsPerSlide; i++) {
        const index = (startIdx + i) % displayArtworks.length;
        slide.push(displayArtworks[index]);
      }
      return slide;
    };

    const originalSlides = Array.from({ length: slideCount }).map((_, i) => 
      createSlide(i * itemsPerSlide)
    );
    
    // Add clone slides for infinite effect: last slide at beginning, first slide at end
    const extendedSlides = [
      createSlide(((slideCount - 1) * itemsPerSlide) % displayArtworks.length),
      ...originalSlides,
      createSlide(0)
    ];
    
    return { originalSlideCount: slideCount, extendedSlides };
  }, [displayArtworks, itemsPerSlide]);

  // State for current index into extendedSlides (start at 1 to show first real slide)
  const [currentIndex, setCurrentIndex] = useState(1);
  // Control transition animation
  const [disableTransition, setDisableTransition] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTransitioning = useRef(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerSlide = getItemsPerSlide();
      if (newItemsPerSlide !== itemsPerSlide) {
        setItemsPerSlide(newItemsPerSlide);
        // Reset to first slide when layout changes
        setCurrentIndex(1);
      }
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getItemsPerSlide, itemsPerSlide]);

  // Navigation functions
  const goToNext = useCallback(() => {
    if (isTransitioning.current) return;
    
    isTransitioning.current = true;
    setDisableTransition(false);
    setCurrentIndex(prev => prev + 1);
  }, []);

  const goToPrev = useCallback(() => {
    if (isTransitioning.current) return;
    
    isTransitioning.current = true;
    setDisableTransition(false);
    setCurrentIndex(prev => prev - 1);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    intervalRef.current = setInterval(goToNext, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goToNext]);

  // Pause auto-play on mouse enter
  const handleMouseEnter = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);
  
  // Resume auto-play on mouse leave
  const handleMouseLeave = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goToNext, 3000);
  }, [goToNext]);

  // Handle snap-back for infinite carousel effect
  const handleTransitionEnd = useCallback(() => {
    isTransitioning.current = false;
    
    // If we've reached the clone after the last real slide
    if (currentIndex >= originalSlideCount + 1) {
      setDisableTransition(true);
      setCurrentIndex(1);
    }
    
    // If we've reached the clone before the first real slide
    else if (currentIndex <= 0) {
      setDisableTransition(true);
      setCurrentIndex(originalSlideCount);
    }
  }, [currentIndex, originalSlideCount]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedArtwork) {
        // Modal navigation
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            const prevIdx = (displayArtworks.findIndex(a => a === selectedArtwork) - 1 + displayArtworks.length) % displayArtworks.length;
            setSelectedArtwork(displayArtworks[prevIdx]);
            break;
          case 'ArrowRight':
            e.preventDefault();
            const nextIdx = (displayArtworks.findIndex(a => a === selectedArtwork) + 1) % displayArtworks.length;
            setSelectedArtwork(displayArtworks[nextIdx]);
            break;
          case 'Escape':
            setSelectedArtwork(null);
            break;
        }
      } else {
        // Slider navigation
        if (e.key === 'ArrowLeft') goToPrev();
        if (e.key === 'ArrowRight') goToNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayArtworks, goToNext, goToPrev, selectedArtwork]);

  return (
    <div
      className="relative h-[700px] mx-auto py-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slider Container */}
      <div className="relative h-[700px] overflow-hidden rounded-lg">
        <div
          ref={sliderRef}
          onTransitionEnd={handleTransitionEnd}
          className={`flex ${disableTransition ? '' : 'transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)]'}`}
          style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
        >
          {extendedSlides.map((slide, idx) => (
            <div
              key={`slide-${idx}`}
              className="flex w-full shrink-0 gap-8 px-4"
              style={{ flex: '0 0 100%' }}
            >
              {slide.map((artwork, i) => (
                <div
                  key={`artwork-${artwork.id || i}`}
                  className="group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transform transition duration-700 ease-in-out hover:scale-105 w-full bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 hover:border-amber-400/20"
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <div className="relative h-[600px] overflow-hidden">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      loading={idx === 1 ? "eager" : "lazy"}
                      className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-end p-6 backdrop-blur-sm group-hover:backdrop-blur-none">
                      <h3 className="text-white text-2xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {artwork.title}
                      </h3>
                      <p className="text-amber-400 text-sm font-medium uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {artwork.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrev}
          className="absolute left-8 top-[300px] transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900 text-yellow-500 rounded-full p-3 transition-colors z-30"
          aria-label="Previous Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-8 top-[300px] transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900 text-yellow-500 rounded-full p-3 transition-colors z-30"
          aria-label="Next Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Modal for zoomed view */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 p-4 animate-fadeIn"
          onClick={() => setSelectedArtwork(null)}
        >
          {/* Modal Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const idx = displayArtworks.findIndex((a) => a === selectedArtwork);
              const prevIdx = (idx - 1 + displayArtworks.length) % displayArtworks.length;
              setSelectedArtwork(displayArtworks[prevIdx]);
            }}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900 text-yellow-500 rounded-full p-3 transition-colors z-60"
            aria-label="Previous Artwork"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Modal Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const idx = displayArtworks.findIndex((a) => a === selectedArtwork);
              const nextIdx = (idx + 1) % displayArtworks.length;
              setSelectedArtwork(displayArtworks[nextIdx]);
            }}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900 text-yellow-500 rounded-full p-3 transition-colors z-60"
            aria-label="Next Artwork"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className="bg-gray-800 border-2 border-yellow-500 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={selectedArtwork.imageUrl} alt={selectedArtwork.title} className="w-full h-auto rounded-t-lg" />
              <button
                className="absolute top-4 right-4 bg-gray-900/70 hover:bg-gray-900 text-yellow-500 rounded-full p-2 transition-colors"
                onClick={() => setSelectedArtwork(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 text-gray-200">
              <h2 className="text-2xl font-bold text-yellow-500 mb-2">{selectedArtwork.title}</h2>
              <p className="text-gray-400 mb-4">{selectedArtwork.category}</p>
              <p className="text-gray-300">{selectedArtwork.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedSlider;