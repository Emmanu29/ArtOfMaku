import React, { useState, useCallback } from 'react';
import { Artwork } from '../utils/data';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick?: () => void;
  priority?: boolean;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick, priority = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setIsLoading(false);
    setImageError(true);
  }, []);

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20 bg-zinc-800"
      onClick={onClick}
      role="button"
      aria-label={`View ${artwork.title}`}
    >
      <div className="relative aspect-square overflow-hidden">
        {/* Skeleton loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-zinc-700 animate-pulse"></div>
        )}

        {/* Fallback for image error */}
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-500">
            <span>Image unavailable</span>
          </div>
        ) : (
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            loading={priority ? "eager" : "lazy"}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
          <h3 className="text-white text-lg font-medium">{artwork.title}</h3>
          <p className="text-amber-400 text-sm">{artwork.category}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ArtworkCard);