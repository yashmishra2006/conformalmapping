import React, { useState, useEffect } from 'react';
import { Droplet, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <Droplet className="text-blue-600" size={28} />
          <div>
            <h1 className="text-xl font-bold text-blue-800">Conformal Mapping</h1>
            <p className="text-xs text-blue-600">Fluid Flow Visualization</p>
          </div>
        </a>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-blue-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Student info - desktop */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <p className="text-sm text-center text-blue-800 font-medium">
            Samriddhi<br />
            <span className="text-xs text-blue-600">B.Tech Chemical Technology, USCT</span>
          </p>
        </div>

        {/* Desktop navigation */}
        <ul className="hidden md:flex space-x-8">
          <li><a href="#introduction" className="text-blue-800 hover:text-blue-600 transition">Introduction</a></li>
          <li><a href="#mappings" className="text-blue-800 hover:text-blue-600 transition">Mappings</a></li>
          <li><a href="#applet" className="text-blue-800 hover:text-blue-600 transition">Interactive</a></li>
          <li><a href="#applications" className="text-blue-800 hover:text-blue-600 transition">Applications</a></li>
        </ul>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <p className="text-sm text-center text-blue-800 font-medium py-2 border-b border-blue-100">
              Samriddhi<br />
              <span className="text-xs text-blue-600">B.Tech Chemical Technology, USCT</span>
            </p>
            <ul className="space-y-3 py-3">
              <li><a href="#introduction" className="block text-blue-800 hover:text-blue-600 transition py-1" onClick={() => setIsOpen(false)}>Introduction</a></li>
              <li><a href="#mappings" className="block text-blue-800 hover:text-blue-600 transition py-1" onClick={() => setIsOpen(false)}>Mappings</a></li>
              <li><a href="#applet" className="block text-blue-800 hover:text-blue-600 transition py-1" onClick={() => setIsOpen(false)}>Interactive</a></li>
              <li><a href="#applications" className="block text-blue-800 hover:text-blue-600 transition py-1" onClick={() => setIsOpen(false)}>Applications</a></li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};