import { Link } from 'react-router-dom';
import { PaletteIcon, BrushIcon, AwardIcon } from 'lucide-react';
const AboutPage = () => {
  return <div className="w-full bg-zinc-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            About Maku
          </h1>
          <div className="bg-zinc-800 rounded-xl overflow-hidden mb-12">
            <img
              src="/artofmaku.jpg"
              alt="Maku's Artwork"
              className="w-full h-96 object-cover object-[50%_20%]"
            />
            <div className="p-8">
              <p className="text-zinc-300 text-lg mb-6">
                Hello, my name is Gerard Villanueva Quizon, professionally known as Art of Maku. A Filipino content creator, character designer & concept artist based in the Philippines. I am known for my drawings of various characters that are conceptualized by fantasy, glamorous, stylish & dynamic poses. I am very influenced by the minimalist art styles and decorations.
              </p>
              <p className="text-zinc-300 text-lg mb-6">
                With all the passion and creative style drawings i carried from my childhood up to now, it became my key to open doors of opportunity through the use of social media. Public art posting online paved my way to find the right audience that I am looking for all this time.
              </p>
              <p className="text-zinc-300 text-lg">
                Although beginnings are the challenge, always look from a far. And when getting far becomes difficult, look back at the beginning and think about why you started.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Artistic Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="bg-amber-400/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <PaletteIcon className="text-amber-400" size={24} />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                Vibrant Colors
              </h3>
              <p className="text-zinc-400">
                Maku's work is known for its rich, vibrant color palettes that
                bring scenes to life.
              </p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="bg-amber-400/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BrushIcon className="text-amber-400" size={24} />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                Digital Techniques
              </h3>
              <p className="text-zinc-400">
                Combining traditional art principles with modern digital tools
                to create unique textures.
              </p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="bg-amber-400/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <AwardIcon className="text-amber-400" size={24} />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                Storytelling
              </h3>
              <p className="text-zinc-400">
                Each artwork is created with narrative elements that invite
                viewers to imagine stories.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Link to="/contact" onClick={()=> window.scrollTo({ top: 0, behavior: 'smooth'})} className="inline-block bg-amber-400 hover:bg-amber-500 text-zinc-900 font-medium py-3 px-6 rounded-md transition-colors duration-300">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>;
};

export default AboutPage;