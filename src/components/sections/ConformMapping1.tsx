import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import SectionTitle from './SectionTitle';
import MathEquation from './MathEquation';
import SimpleConformalDemo from './visualizations/SimpleConformalDemo';

export const ConformMapping1: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const [mapFunction, setMapFunction] = useState<string>('square');

  return (
    <section id="conformal-mapping" className="section bg-gray-50 relative">
      <div className="container mx-auto">
        <SectionTitle 
          title="Conformal Mapping Techniques" 
          subtitle="Transforming complex domains into simpler ones while preserving angles"
        />
        
        <div 
          ref={ref}
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-lg mb-6">
            Conformal mapping is a mathematical technique that transforms one complex domain into another while 
            preserving local angles. This property makes it invaluable for solving fluid flow problems 
            around complicated geometries.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-primary-700">Common Conformal Maps</h3>
              <p className="mb-4">
                Several standard conformal mappings are frequently used in fluid dynamics:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Joukowski Transformation: <MathEquation equation="w = z + \frac{a^2}{z}" />
                  <p className="text-sm ml-6 text-gray-600">Maps a circle to an airfoil shape</p>
                </li>
                <li>
                  Schwarz-Christoffel Transformation:
                  <p className="text-sm ml-6 text-gray-600">Maps the upper half-plane to a polygon</p>
                </li>
                <li>
                  Möbius Transformation: <MathEquation equation="w = \frac{az + b}{cz + d}" />
                  <p className="text-sm ml-6 text-gray-600">Maps circles and lines to circles and lines</p>
                </li>
                <li>
                  Exponential Map: <MathEquation equation="w = e^z" />
                  <p className="text-sm ml-6 text-gray-600">Maps strips to wedges or annular regions</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-primary-700">Properties of Conformal Maps</h3>
              <p className="mb-4">
                Conformal mappings have several important properties that make them useful for fluid dynamics:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Angle preservation between intersecting curves</li>
                <li>Preservation of the Laplace equation</li>
                <li>Transformation of streamlines to streamlines</li>
                <li>Local similarity (infinitesimal shapes remain similar)</li>
                <li>Composition of conformal maps is conformal</li>
              </ul>
              <p className="mt-4">
                These properties allow us to transform complex flow problems to simpler domains, solve them, 
                and map the solutions back to the original domain.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">Interactive Visualization</h3>
            <p className="mb-4">
              Explore how conformal mappings transform a grid in the complex plane. Select different 
              mapping functions to see their effect:
            </p>
            
            <div className="mb-4 flex flex-wrap gap-2">
              <button 
                onClick={() => setMapFunction('square')}
                className={`px-3 py-1 rounded text-sm ${
                  mapFunction === 'square' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Square: <MathEquation equation="z^2" />
              </button>
              <button 
                onClick={() => setMapFunction('reciprocal')}
                className={`px-3 py-1 rounded text-sm ${
                  mapFunction === 'reciprocal' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Reciprocal: <MathEquation equation="1/z" />
              </button>
              <button 
                onClick={() => setMapFunction('exponential')}
                className={`px-3 py-1 rounded text-sm ${
                  mapFunction === 'exponential' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Exponential: <MathEquation equation="e^z" />
              </button>
              <button 
                onClick={() => setMapFunction('joukowski')}
                className={`px-3 py-1 rounded text-sm ${
                  mapFunction === 'joukowski' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Joukowski: <MathEquation equation="z + 1/z" />
              </button>
            </div>
            
            <SimpleConformalDemo mapFunction={mapFunction} />
            
            <p className="mt-4 text-sm text-gray-600">
              Notice how angles between grid lines are preserved at intersection points, but shapes and 
              distances are distorted. This angle-preserving property is what makes conformal mapping 
              so valuable for fluid dynamics.
            </p>
          </div>
          
          <p className="text-lg">
            By understanding conformal mapping techniques, engineers and physicists can transform complex 
            flow problems into simpler domains, apply known solutions, and then map the results back to 
            the original domain. This approach enables analytical solutions to problems that would otherwise 
            require extensive numerical simulation.
          </p>
        </div>
      </div>
      
      <div className="section-divider">
        <div className="wave-divider"></div>
      </div>
    </section>
  );
};
