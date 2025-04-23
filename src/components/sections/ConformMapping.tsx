import React, { useState } from 'react';
import { Play, ZoomIn, ZoomOut } from 'lucide-react';
import ComplexCanvas from './ComplexCanvas';
import { functions } from './utils/complexfunctions';

export const ConformMapping: React.FC = () => {
  const [selectedFunction, setSelectedFunction] = useState<string>('identity');
  const [zPlaneScale, setZPlaneScale] = useState<number>(30);
  const [wPlaneScale, setWPlaneScale] = useState<number>(30);

  const canvasWidth = 300;
  const canvasHeight = 300;

  const handleFunctionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFunction(e.target.value);
  };

  const handleZPlaneZoomIn = () => {
    setZPlaneScale(prev => Math.min(90, prev * 1.2));
  };

  const handleZPlaneZoomOut = () => {
    setZPlaneScale(prev => Math.max(15, prev / 1.2));
  };

  const handleWPlaneZoomIn = () => {
    setWPlaneScale(prev => Math.min(90, prev * 1.2));
  };

  const handleWPlaneZoomOut = () => {
    setWPlaneScale(prev => Math.max(15, prev / 1.2));
  };

  const functionLabels: Record<string, string> = {
    identity: 'f(z) = z',
    square: 'f(z) = z²',
    inverse: 'f(z) = 1/z',
    logarithm: 'f(z) = log z',
    exponential: 'f(z) = e^z',
    sine: 'f(z) = sin z',
    cosine: 'f(z) = cos z',
    joukowski: 'f(z) = z + 1/z'
  };

  const functionDescriptions: Record<string, string> = {
    identity: 'The identity mapping preserves everything as is. It maps each point to itself.',
    square: 'The square mapping doubles angles and squares magnitudes, expanding some regions while compressing others.',
    inverse: 'The inverse function turns circles into circles, but inverts them with respect to the unit circle.',
    logarithm: 'Logarithmic mapping converts multiplication to addition, turning circles into vertical lines.',
    exponential: 'The exponential map converts straight lines to spirals and causes periodic behavior.',
    sine: 'The sine function has periodicity along the real axis and exponential behavior along the imaginary axis.',
    cosine: 'The cosine function is similar to sine, but with a phase shift of π/2.',
    joukowski: 'The Joukowski transform maps circles to airfoil shapes, crucial in aerodynamics and fluid flow analysis.'
  };

  return (
    <section id="interactive-applet" className="py-10 px-6 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-start mb-6">
          <Play className="w-6 h-6 text-sky-500 mt-1 mr-3 flex-shrink-0" />
          <h2 className="text-2xl font-bold text-gray-800">Interactive Mapping Applet</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Complex Function Visualizer</h3>
          <p className="text-gray-700 mb-6">
            Explore how different complex functions transform the z-plane into the w-plane. 
            The grid lines show how regions are mapped, while the red circle demonstrates the transformation of the unit circle.
          </p>

          <div className="mb-6">
            <label htmlFor="function-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Function:
            </label>
            <select
              id="function-select"
              value={selectedFunction}
              onChange={handleFunctionChange}
              className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            >
              {Object.keys(functionLabels).map((key) => (
                <option key={key} value={key}>
                  {functionLabels[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 bg-sky-50 rounded-lg border border-sky-100 mb-6">
            <h4 className="font-medium text-sky-800 mb-2">Function Description:</h4>
            <p className="text-sky-700">{functionDescriptions[selectedFunction]}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
            <div>
              <h4 className="text-center text-gray-700 font-medium mb-3">Original z-plane</h4>
              <div className="relative">
                <ComplexCanvas
                  width={canvasWidth}
                  height={canvasHeight}
                  scale={zPlaneScale}
                  transform={functions.identity}
                  title="z-plane"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={handleZPlaneZoomIn}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={handleZPlaneZoomOut}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-center text-gray-700 font-medium mb-3">Transformed w-plane</h4>
              <div className="relative">
                <ComplexCanvas
                  width={canvasWidth}
                  height={canvasHeight}
                  scale={wPlaneScale}
                  transform={functions[selectedFunction as keyof typeof functions]}
                  title={`w = ${functionLabels[selectedFunction]}`}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={handleWPlaneZoomIn}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={handleWPlaneZoomOut}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Joukowski Airfoil Transform</h3>
          <div className="aspect-video w-full">
            <iframe
              src="https://complex-analysis.com/applets/p5js/joukowsky/index.html"
              className="w-full h-full border-0 rounded-lg"
              title="Joukowski Transform Interactive Visualization"
            />
          </div>
          <p className="text-gray-700 mt-4">
            This interactive visualization demonstrates how the Joukowski transform maps circles to airfoil shapes, 
            a fundamental technique in aerodynamics and fluid dynamics.
          </p>
        </div>
      </div>
    </section>
  );
};
