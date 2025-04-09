import GalleryGrid from '../components/GalleryGrid';
import { artworks } from '../utils/data';
import { useState, useEffect } from 'react';



const GalleryPage = () => {

  const [showScroll, setShowScroll] = useState(false);
  
  useEffect(() => {
      const handleScroll = () => {
        setShowScroll(window.pageYOffset > 300);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
   const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <div className="w-full bg-zinc-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Art Gallery</h1>
          <p className="text-gray-400">
            Explore the complete collection of Maku's artwork, showcasing
            vibrant illustrations and digital creations.
          </p>
        </div>
        <GalleryGrid artworks={artworks} />

        {/* Back to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-amber-400 hover:bg-amber-500 text-zinc-900 p-3 rounded-full shadow-lg transition-colors duration-300"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
      </div>
    </div>;
};
export default GalleryPage;