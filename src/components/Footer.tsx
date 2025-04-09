import { InstagramIcon, TwitterIcon, FacebookIcon, GlobeIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-amber-400">Art of Maku</h2>
            <p className="text-gray-400 mt-2">
              Bringing imagination to life through vibrant illustrations and digital creations
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex space-x-4 mt-6 md:mt-0">
              <a href="https://www.instagram.com/makugwapu/?hl=en"
              target='_blank'
               className="bg-zinc-800 p-2 rounded-full text-gray-400 hover:text-amber-400 hover:bg-zinc-700 transition-all duration-300">
                <InstagramIcon size={20} />
              </a>
              <a href="https://x.com/makugwapu"  target='_blank' className="bg-zinc-800 p-2 rounded-full text-gray-400 hover:text-amber-400 hover:bg-zinc-700 transition-all duration-300">
                <TwitterIcon size={20} />
              </a>
              <a href="https://www.facebook.com/makugwapu"
              target='_blank' className="bg-zinc-800 p-2 rounded-full text-gray-400 hover:text-amber-400 hover:bg-zinc-700 transition-all duration-300">
                <FacebookIcon size={20} />
              </a>
              <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fexpress.adobe.com%2Fpage%2FYwC1ppVlIz2Gl%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR7w5RZsMfPqYZARH0gXrbyZl2wwUW3g3GP2_ODQWCsfJ0u1r_Bcm5XNycmFZA_aem_OVOqQ5PdHM7I1KmbUGhbCg&h=AT3-5mN8VHj8ZeuGXT_hX96N_FPOVI_P5xOCuZO-XB2qVN7Lq2hpyClHpzS8HnqT4mLGw50PPQO6e3RgVyhs6b7zxZuuDfdzMYt-3C52gS7Uly5bbp7iq2U8H-NFLgQo3BieAA" target='_blank' className="bg-zinc-800 p-2 rounded-full text-gray-400 hover:text-amber-400 hover:bg-zinc-700 transition-all duration-300">
                <GlobeIcon size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Art of Maku. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <p className="hover:text-amber-400 transition-colors duration-300">Privacy Policy</p>
            <p className="hover:text-amber-400 transition-colors duration-300">Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;