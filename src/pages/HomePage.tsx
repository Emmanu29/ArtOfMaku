import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeaturedSlider from '../components/FeaturedSlider'; // Import our new component
import { artworks } from '../utils/data';
import { ArrowRightIcon } from 'lucide-react';
import SEO from '../components/SEO';
import { throttle } from 'lodash';



const HomePage = () => {
  // Use all artworks instead of just a slice
   const featuredArtworks = artworks.slice(0, 12);
  // const featuredArtworks = artworks; // Use all artworks
  
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setShowScroll(window.pageYOffset > 300);
    }, 200);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel(); // Clean up the throttled function
    };
  }, []);

  const scrollToTop = () => {
    // Use smooth scrolling behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
  <>
        <SEO 
        title="Art of Maku | Digital Art Portfolio by Gerard Villanueva Quizon"
        description="Explore vibrant worlds and characters through digital artistry by Maku. Professional Filipino content creator, character designer & concept artist specializing in fantasy and stylish character designs."
        image="https://art-of-maku.vercel.app/artofmaku.jpg"
        canonicalUrl="https://art-of-maku.vercel.app"
      />

    <div className="w-full">
      <HeroSection />
      
      <motion.section
        className="py-16 px-4 bg-gradient-to-br from-zinc-900 to-zinc-800"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-extrabold text-white tracking-wide">
                Featured Works
              </h2>
              <p className="text-gray-300 mt-2 max-w-lg">
                Explore some of Maku&apos;s finest creations that redefine digital art with vibrant colors and imaginative designs.
              </p>
            </div>
            <Link
              to="/gallery"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
              className="mt-4 md:mt-0 flex items-center text-lg py-3 px-6 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full text-white font-semibold transition-all duration-300 ease-in-out transform hover:bg-amber-400 hover:scale-105 hover:shadow-lg"
            >
              View all works <ArrowRightIcon size={20} className="ml-1" />
            </Link>
          </div>

          <FeaturedSlider artworks={featuredArtworks} maxItems={12} />
        </div>
      </motion.section>

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
  </>
);
}

export default HomePage;