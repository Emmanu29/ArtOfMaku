import React, { useState, useEffect, useCallback } from 'react';
import { Artwork } from '../utils/data';

interface ArtworkModalProps {
  artworks: Artwork[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artworks,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const currentArtwork = artworks[currentIndex];

  // Preload the next and previous images for smoother transitions
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % artworks.length;
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    
    // Create image objects to preload
    const preloadNext = new Image();
    const preloadPrev = new Image();
    
    preloadNext.src = artworks[nextIndex].imageUrl;
    preloadPrev.src = artworks[prevIndex].imageUrl;
    
    // Reset loading state when current index changes
    setIsLoading(true);
    
    // Clean up function
    return () => {
      preloadNext.onload = null;
      preloadPrev.onload = null;
    };
  }, [artworks, currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'Escape':
          handleClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Smooth closing animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  // Navigate with touch swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Swipe threshold - only register swipes of sufficient distance
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left - go to next
        onNext();
      } else {
        // Swipe right - go to previous
        onPrev();
      }
    }
    
    setTouchStart(null);
  };
  
  if (!currentArtwork) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Modal Navigation - Previous */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-zinc-800/70 hover:bg-zinc-800 text-amber-400 rounded-full p-3 transition-colors z-50"
        aria-label="Previous Artwork"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Modal Navigation - Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-zinc-800/70 hover:bg-zinc-800 text-amber-400 rounded-full p-3 transition-colors z-50"
        aria-label="Next Artwork"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Modal Content */}
      <div
        className={`bg-zinc-800 border border-zinc-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto transform transition-transform duration-300 ${
          isClosing ? 'scale-95' : 'scale-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Image loading skeleton */}
          {isLoading && (
            <div className="absolute inset-0 bg-zinc-700 animate-pulse"></div>
          )}
          
          <img
            src={currentArtwork.imageUrl}
            alt={currentArtwork.title}
            className={`w-full h-auto object-contain max-h-[70vh] rounded-t-lg transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
          />
          
          {/* Close button */}
          <button
            className="absolute top-4 right-4 bg-zinc-800/70 hover:bg-zinc-800 text-amber-400 rounded-full p-2 transition-colors"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Current position indicator */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {artworks.length}
          </div>
        </div>
        
        {/* Artwork details */}
        <div className="p-6 text-gray-200">
          <h2 className="text-2xl font-bold text-amber-400 mb-2">{currentArtwork.title}</h2>
          <p className="text-gray-400 mb-4">{currentArtwork.category}</p>
          <p className="text-gray-300">{currentArtwork.description}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ArtworkModal);