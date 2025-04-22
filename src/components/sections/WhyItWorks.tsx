import React from 'react';
import { Lightbulb, CheckCircle, BarChart3, Ruler, FlaskRound as Flask } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';

export const WhyItWorks: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="The Mathematics Behind Conformal Mapping" 
          subtitle="Understanding the core principles of fluid flow transformation"
          icon={<Lightbulb className="text-blue-600" size={28} />}
        />
        
        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Fundamental Properties</h3>
              
              <div className="space-y-6">
                <div className="bg-white/80 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Cauchy-Riemann Equations</h4>
                  <p className="text-gray-700">
                    For a complex function f(z) = u(x,y) + iv(x,y) to be conformal, it must satisfy:
                  </p>
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg font-mono text-sm">
                    ∂u/∂x = ∂v/∂y<br/>
                    ∂u/∂y = -∂v/∂x
                  </div>
                  <p className="mt-2 text-gray-600">
                    These equations ensure angle preservation during transformation.
                  </p>
                </div>

                <div className="bg-white/80 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Complex Potential</h4>
                  <p className="text-gray-700">
                    In fluid dynamics, we use the complex potential:
                  </p>
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg font-mono text-sm">
                    F(z) = φ(x,y) + iψ(x,y)
                  </div>
                  <p className="mt-2 text-gray-600">
                    Where φ is velocity potential and ψ is stream function.
                  </p>
                </div>

                <div className="bg-white/80 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Conservation Laws</h4>
                  <p className="text-gray-700">
                    Conformal mapping preserves:
                  </p>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li>• Mass conservation (continuity equation)</li>
                    <li>• Momentum conservation (Euler equations)</li>
                    <li>• Energy conservation (Bernoulli's principle)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Applications in Fluid Flow</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-800 mb-2">Flow Around Objects</h4>
                  <p className="text-gray-700">
                    Conformal mapping transforms complex geometries into simpler ones where flow equations 
                    can be solved analytically. The solution can then be mapped back to the original domain.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-800 mb-2">Boundary Layer Theory</h4>
                  <p className="text-gray-700">
                    Used in analyzing flow separation and boundary layer behavior near solid surfaces. 
                    The transformation preserves the essential characteristics of the boundary layer.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-800 mb-2">Vortex Dynamics</h4>
                  <p className="text-gray-700">
                    Helps in studying vortex formation, shedding, and interaction. The conformal 
                    invariance of circulation makes this particularly useful.
                  </p>
                </div>

                <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Key Mathematical Properties</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Local angles between curves are preserved</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Infinitesimal shapes remain similar after mapping</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Harmonic functions remain harmonic after transformation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Preserves solutions to Laplace's equation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};