import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Gallery',
    path: '/gallery'
  }, {
    name: 'About',
    path: '/about'
  }, {
    name: 'Contact',
    path: '/contact'
  }, /*{
    name: 'Services',
    path: '/services'
  }*/];
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return <header className="bg-zinc-900 border-b border-zinc-800">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-amber-400">Art of Maku</h1>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`transition duration-300 hover:text-amber-400 ${isActive(link.path) ? 'text-amber-400' : 'text-white'}`}>
                {link.name}
              </Link>)}
          </div>
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </nav>
        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden mt-4 py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => <Link key={link.path} to={link.path} className={`block transition duration-300 hover:text-amber-400 ${isActive(link.path) ? 'text-amber-400' : 'text-white'}`} onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </Link>)}
            </div>
          </div>}
      </div>
    </header>;
};
export default Navbar;