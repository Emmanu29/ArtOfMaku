import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
const HeroSection = () => {
  return <section className="relative h-[70vh] min-h-[850px] overflow-hidden">
      <div className="absolute inset-0 bg-center bg-no-repeat sm:[background-size:90%_100%] 
    md:[background-size:95%_100%] 
    lg:[background-size:100%_100%]" style={{
      backgroundImage: `url('./Maya.jpg')`
    }}>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative h-full flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">
          Art of <span className="text-amber-400">Maku</span>
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mb-8">
          Exploring vibrant worlds and characters through digital artistry
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/gallery" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}   className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium py-3 px-6 rounded-md transition-colors duration-300 flex items-center">
            View Gallery <ChevronRightIcon size={18} className="ml-1" />
          </Link>
          <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium py-3 px-6 rounded-md transition-colors duration-300">
            About Maku
          </Link>
        </div>
      </div>
    </section>;
};
export default HeroSection;