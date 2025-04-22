import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Play, Maximize, Minimize, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';

export const InteractiveApplet: React.FC = () => {
  const [selectedMapping, setSelectedMapping] = useState<string>("identity");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1);
  const canvasZRef = useRef<HTMLCanvasElement>(null);
  const canvasWRef = useRef<HTMLCanvasElement>(null);
  const appletContainerRef = useRef<HTMLDivElement>(null);

  // Handle the transformation visualization
  useEffect(() => {
    const canvasZ = canvasZRef.current;
    const canvasW = canvasWRef.current;
    if (!canvasZ || !canvasW) return;

    const ctxZ = canvasZ.getContext('2d');
    const ctxW = canvasW.getContext('2d');
    if (!ctxZ || !ctxW) return;

    // Set canvas dimensions
    const setCanvasSizes = () => {
      const width = canvasZ.offsetWidth;
      const height = canvasZ.offsetHeight;
      canvasZ.width = width;
      canvasZ.height = height;
      canvasW.width = width;
      canvasW.height = height;
    };

    setCanvasSizes();
    window.addEventListener('resize', setCanvasSizes);

    // Coordinate system settings
    const baseScale = Math.min(canvasZ.width, canvasZ.height) / 5;
    const scaledValue = baseScale * scale;
    const centerX = canvasZ.width / 2;
    const centerY = canvasZ.height / 2;

    // Drawing utilities
    const drawGrid = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Draw background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      
      // Vertical grid lines
      for (let x = -10; x <= 10; x++) {
        ctx.beginPath();
        ctx.moveTo(centerX + x * scaledValue, 0);
        ctx.lineTo(centerX + x * scaledValue, ctx.canvas.height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let y = -10; y <= 10; y++) {
        ctx.beginPath();
        ctx.moveTo(0, centerY + y * scaledValue);
        ctx.lineTo(ctx.canvas.width, centerY + y * scaledValue);
        ctx.stroke();
      }
      
      // Draw axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      
      // x-axis
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(ctx.canvas.width, centerY);
      ctx.stroke();
      
      // y-axis
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, ctx.canvas.height);
      ctx.stroke();
      
      // Mark origin
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const applyMapping = (z: {x: number, y: number}): {x: number, y: number} => {
      // Create complex number
      const complex = {
        re: z.x,
        im: z.y
      };
      
      // Apply selected mapping
      switch (selectedMapping) {
        case "identity":
          return { x: complex.re, y: complex.im };
        
        case "square":
          // w = z^2
          return { 
            x: complex.re * complex.re - complex.im * complex.im, 
            y: 2 * complex.re * complex.im 
          };
        
        case "inversion":
          // w = 1/z
          const denom = complex.re * complex.re + complex.im * complex.im;
          return { 
            x: complex.re / denom, 
            y: -complex.im / denom 
          };
        
        case "log":
          // w = log(z) = log|z| + i*arg(z)
          const r = Math.sqrt(complex.re * complex.re + complex.im * complex.im);
          const theta = Math.atan2(complex.im, complex.re);
          return { 
            x: Math.log(r), 
            y: theta 
          };
        
        case "exp":
          // w = e^z = e^(x+iy) = e^x * (cos(y) + i*sin(y))
          const expX = Math.exp(complex.re);
          return { 
            x: expX * Math.cos(complex.im), 
            y: expX * Math.sin(complex.im) 
          };
        
        case "sin":
          // w = sin(z) = sin(x)*cosh(y) + i*cos(x)*sinh(y)
          return { 
            x: Math.sin(complex.re) * Math.cosh(complex.im), 
            y: Math.cos(complex.re) * Math.sinh(complex.im) 
          };
        
        default:
          return { x: complex.re, y: complex.im };
      }
    };

    // Draw circles and lines on z-plane
    const drawShapesZ = (ctx: CanvasRenderingContext2D) => {
      // Draw circles
      for (let r = 0.5; r <= 2; r += 0.5) {
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.8 - r * 0.2})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r * scaledValue, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Draw radial lines
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
        ctx.strokeStyle = `rgba(14, 165, 233, ${0.7})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * 2.5 * scaledValue,
          centerY + Math.sin(angle) * 2.5 * scaledValue
        );
        ctx.stroke();
      }
    };

    // Draw transformed shapes on w-plane
    const drawShapesW = (ctx: CanvasRenderingContext2D) => {
      // Draw transformed circles
      for (let r = 0.5; r <= 2; r += 0.5) {
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.8 - r * 0.2})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Sample points along the circle and map them
        const points = 100;
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const z = {
            x: r * Math.cos(angle),
            y: r * Math.sin(angle)
          };
          
          const w = applyMapping(z);
          
          // Map to canvas coordinates
          const canvasX = centerX + w.x * scaledValue;
          const canvasY = centerY + w.y * scaledValue;
          
          if (i === 0) {
            ctx.moveTo(canvasX, canvasY);
          } else {
            ctx.lineTo(canvasX, canvasY);
          }
        }
        
        ctx.stroke();
      }
      
      // Draw transformed radial lines
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
        ctx.strokeStyle = `rgba(14, 165, 233, ${0.7})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        // Sample points along the line and map them
        const points = 50;
        for (let i = 0; i <= points; i++) {
          const r = (i / points) * 2.5;
          const z = {
            x: r * Math.cos(angle),
            y: r * Math.sin(angle)
          };
          
          const w = applyMapping(z);
          
          // Map to canvas coordinates
          const canvasX = centerX + w.x * scaledValue;
          const canvasY = centerY + w.y * scaledValue;
          
          if (i === 0) {
            ctx.moveTo(canvasX, canvasY);
          } else {
            ctx.lineTo(canvasX, canvasY);
          }
        }
        
        ctx.stroke();
      }
    };

    // Animation variables
    let animationId: number;
    let time = 0;

    // Main animation loop
    const animate = () => {
      // Update time
      time += 0.01;
      
      // Draw z-plane
      drawGrid(ctxZ);
      drawShapesZ(ctxZ);
      
      // Draw w-plane
      drawGrid(ctxW);
      drawShapesW(ctxW);
      
      if (isRunning) {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSizes);
      cancelAnimationFrame(animationId);
    };
  }, [selectedMapping, isRunning, scale]);

  const toggleFullscreen = () => {
    const container = appletContainerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setScale(prev => {
      if (direction === 'in' && prev < 3) return prev + 0.2;
      if (direction === 'out' && prev > 0.4) return prev - 0.2;
      return prev;
    });
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <section id="applet" className="py-16 md:py-24 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Interactive Mapping Applet" 
          subtitle="Explore conformal mappings in real-time"
          icon={<Cpu className="text-blue-600" size={28} />}
        />
        
        <div 
          ref={appletContainerRef}
          className={`mt-12 bg-white rounded-xl shadow-lg overflow-hidden ${
            isFullscreen ? 'fixed inset-0 z-50' : ''
          }`}
        >
          <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Conformal Mapping Visualizer</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleZoom('in')} 
                className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn size={20} />
              </button>
              <button 
                onClick={() => handleZoom('out')} 
                className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut size={20} />
              </button>
              <button 
                onClick={() => setIsRunning(!isRunning)} 
                className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                aria-label={isRunning ? "Pause animation" : "Play animation"}
              >
                <Play size={20} className={isRunning ? "text-blue-300" : "text-white"} />
              </button>
              <button 
                onClick={toggleFullscreen} 
                className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
              <button 
                onClick={() => setIsRunning(true)} 
                className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                aria-label="Reset animation"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <label htmlFor="mapping-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select mapping function:
              </label>
              <select
                id="mapping-select"
                value={selectedMapping}
                onChange={(e) => setSelectedMapping(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="identity">w = z (Identity)</option>
                <option value="square">w = z² (Square)</option>
                <option value="inversion">w = 1/z (Inversion)</option>
                <option value="log">w = log(z) (Logarithm)</option>
                <option value="exp">w = e^z (Exponential)</option>
                <option value="sin">w = sin(z) (Sine)</option>
              </select>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/2 bg-gray-50 p-4 rounded-lg">
                <div className="text-center mb-2">
                  <h4 className="font-medium text-gray-700">z-plane (Original)</h4>
                </div>
                <div className="relative aspect-[4/3] w-full">
                  <canvas 
                    ref={canvasZRef} 
                    className="absolute inset-0 w-full h-full" 
                  />
                </div>
              </div>
              
              <div className="md:w-1/2 bg-gray-50 p-4 rounded-lg">
                <div className="text-center mb-2">
                  <h4 className="font-medium text-gray-700">w-plane (Mapped)</h4>
                </div>
                <div className="relative aspect-[4/3] w-full">
                  <canvas 
                    ref={canvasWRef} 
                    className="absolute inset-0 w-full h-full" 
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Understanding Flow Transformations:</h4>
              <p className="text-gray-700">
                Watch how fluid flow patterns transform under different mappings. The grid lines represent streamlines 
                and equipotential lines in a fluid flow. Notice how angles between these lines are preserved during 
                transformation - a crucial property that makes conformal mapping so valuable in fluid dynamics.
              </p>
            </div>
          </div>
        </div>

        {/* Joukowski Airfoil Applet */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-800 text-white p-4">
            <h3 className="text-xl font-semibold">Joukowski Airfoil Transform</h3>
          </div>
          
          <div className="p-4">
            <div className="aspect-[16/9] w-full">
              <iframe
                src="https://complex-analysis.com/applets/p5js/joukowsky/index.html"
                className="w-full h-full border-0 rounded-lg"
                title="Joukowski Airfoil Transform"
              />
            </div>
            
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">The Magic of Airfoil Design:</h4>
              <p className="text-gray-700">
                The Joukowski transformation is a cornerstone of aerodynamics, converting simple circles into airfoil shapes. 
                This transformation preserves the mathematical properties that govern fluid flow, allowing engineers to:
              </p>
              <ul className="mt-2 space-y-2 text-gray-700">
                <li>• Calculate lift and drag forces on aircraft wings</li>
                <li>• Design efficient airfoil shapes for different flight conditions</li>
                <li>• Analyze flow separation and pressure distribution</li>
                <li>• Optimize wing designs for specific performance requirements</li>
              </ul>
              <p className="mt-3 text-gray-700">
                Try adjusting the circle's position and parameters to see how different airfoil shapes emerge. Notice how 
                the flow patterns around the circle transform into realistic flow patterns around the airfoil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};