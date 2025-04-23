import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';

export const Introduction: React.FC = () => {
  return (
    <section id="introduction" className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="What is Conformal Mapping?" 
          subtitle="A friendly introduction for beginners"
          icon={<Compass className="text-blue-600" size={28} />}
        />
        
        <div className="flex flex-col md:flex-row items-center gap-8 mt-12">
          <div className="md:w-1/2">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              A conformal mapping is like a magic lens that reshapes space while keeping angles the same.
              It helps engineers transform hard shapes into simpler ones, where solving flow equations becomes easier.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">In fluid flow, it's a cheat code — lets us:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ArrowRight className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>Flatten airfoil curves</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>Untangle pipe corners</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>Analyze flow near obstacles</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={18} />
                  <span>Study electrostatics, heat, and more</span>
                </li>
              </ul>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              The key aspects of conformal mapping you should focus on are: preserving angles, 
              solving flows, and simplifying geometry. These properties make it a powerful 
              tool in fluid mechanics and other fields.
            </p>
          </div>
          
          <div className="md:w-1/2 mt-8 md:mt-0">
  <div className="relative bg-gradient-to-br from-blue-100 to-cyan-50 p-4 rounded-xl shadow-lg overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 opacity-40 rounded-full -mr-10 -mt-10"></div>
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-200 opacity-30 rounded-full -ml-16 -mb-16"></div>

    <div className="relative z-10">
      <div className="w-full aspect-video rounded-lg shadow-md overflow-hidden mb-4 border border-blue-300">
        <iframe
          src="https://complex-analysis.com/applets/p5js/flowfield/index.html"
          title="Flow Field Animation"
          className="w-full h-full"
          sandbox="allow-scripts"
          loading="lazy"
        />
      </div>
                
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">Conformal Mapping's Key Property</h4>
                  <p className="text-gray-700">
                    When we map from one plane to another, angles between curves are preserved.
                    This means flow patterns maintain their essential characteristics, making it
                    easier to solve complex problems by transforming them into simpler ones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};