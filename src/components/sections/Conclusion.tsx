import React from 'react';
import { BrainCircuit, ArrowRight } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';

export const Conclusion: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white relative">
      {/* Wave shape at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto -mt-1">
          <path 
            fill="#fff" 
            fillOpacity="1" 
            d="M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,138.7C672,149,768,139,864,122.7C960,107,1056,85,1152,90.7C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title="Bringing It All Together" 
          subtitle="The power and elegance of conformal mapping"
          icon={<BrainCircuit className="text-blue-600" size={28} />}
        />
        
        <div className="mt-12 max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Conformal Mapping lets us simplify impossible shapes, analyze flow, and solve real-world 
            engineering problems — all by transforming space. By preserving angles between curves,
            these transformations maintain the essential characteristics of fluid flow while making
            the mathematics more approachable.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Key Takeaways:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={18} />
                <span>Conformal mappings preserve angles while transforming shapes</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={18} />
                <span>Different mapping functions serve different engineering purposes</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={18} />
                <span>The technique simplifies complex problems by transforming domains</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={18} />
                <span>Applications span aerodynamics, fluid flow, heat transfer, and more</span>
              </li>
            </ul>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            This site gives you the visual intuition behind the concept. No stress, just flow!
            Continue exploring the interactive applets and apply these concepts to your coursework
            and future engineering challenges.
          </p>

          <div className="mt-8 flex justify-center">
            <a 
              href="#introduction" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Revisit Introduction
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};