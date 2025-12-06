import React, { useEffect, useState } from 'react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-6 bg-dark-bg/90 backdrop-blur-md' : 'py-10 bg-transparent'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="group hover-trigger">
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Abstract R/K logo mark inspired by the image */}
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-contain group-hover:opacity-80 transition-opacity duration-300"
            />
          </div>
        </a>

        {/* Desktop Nav - Minimal */}
        <div className="hidden md:flex items-center gap-16">
          <a
            href="#projects"
            className="text-xs font-medium uppercase tracking-[0.15em] text-gray-300 hover:text-white transition-colors hover-trigger relative group"
          >
            Projects
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-neon transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#contact"
            className="text-xs font-medium uppercase tracking-[0.15em] text-gray-300 hover:text-white transition-colors hover-trigger relative group"
          >
            Contact
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-neon transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden space-y-1.5 cursor-pointer hover-trigger group">
          <div className="w-8 h-[1px] bg-white group-hover:bg-neon transition-colors"></div>
          <div className="w-5 h-[1px] bg-white ml-auto group-hover:bg-neon transition-colors"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;