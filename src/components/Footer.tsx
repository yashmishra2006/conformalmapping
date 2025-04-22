import React from 'react';
import { Github, Linkedin, Twitter, Droplet } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Droplet className="text-blue-300" size={24} />
            <div>
              <h2 className="text-lg font-bold">Conformal Mapping</h2>
              <p className="text-xs text-blue-300">Fluid Flow Visualization</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm mb-1">
              Samriddhi
            </p>
            <p className="text-xs text-blue-300">
              B.Tech Chemical Technology, USCT
            </p>
          </div>
        </div>
        
        <div className="border-t border-blue-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-blue-300 mb-4 md:mb-0">
              © {new Date().getFullYear()} Chemical Engineering Education Resources
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};