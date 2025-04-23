import React, { useRef, useEffect, useState } from 'react';
import { ComplexNumber, ComplexFunction } from './utils/complexfunctions';

interface ComplexCanvasProps {
  width: number;
  height: number;
  scale: number;
  transform: ComplexFunction;
  title: string;
  showGrid?: boolean;
}

interface ViewState {
  offsetX: number;
  offsetY: number;
  zoom: number;
}

const ComplexCanvas: React.FC<ComplexCanvasProps> = ({
  width,
  height,
  scale: initialScale,
  transform,
  title,
  showGrid = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [view, setView] = useState<ViewState>({
    offsetX: width / 2,
    offsetY: height / 2,
    zoom: 1
  });

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setLastPosition(getCanvasCoordinates(e));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const currentPos = getCanvasCoordinates(e);
    const deltaX = currentPos.x - lastPosition.x;
    const deltaY = currentPos.y - lastPosition.y;

    setView(prev => ({
      ...prev,
      offsetX: prev.offsetX + deltaX,
      offsetY: prev.offsetY + deltaY
    }));

    setLastPosition(currentPos);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.1, Math.min(5, view.zoom * zoomFactor));

    // Adjust offset to zoom towards mouse position
    const scale = initialScale * view.zoom;
    const newScale = initialScale * newZoom;
    
    setView(prev => ({
      zoom: newZoom,
      offsetX: mouseX - (mouseX - prev.offsetX) * (newScale / scale),
      offsetY: mouseY - (mouseY - prev.offsetY) * (newScale / scale)
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Add wheel event listener with passive: false
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [view.zoom]);

  // Draw grid lines
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const gridSize = initialScale * view.zoom;
    const offsetX = view.offsetX % gridSize;
    const offsetY = view.offsetY % gridSize;

    ctx.strokeStyle = 'rgba(200, 215, 230, 0.5)';
    ctx.lineWidth = 1;

    // Draw vertical grid lines
    for (let x = offsetX; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = offsetY; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = 'rgba(100, 150, 200, 0.8)';
    ctx.lineWidth = 2;
    
    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, view.offsetY);
    ctx.lineTo(width, view.offsetY);
    ctx.stroke();
    
    // y-axis
    ctx.beginPath();
    ctx.moveTo(view.offsetX, 0);
    ctx.lineTo(view.offsetX, height);
    ctx.stroke();
  };

  // Convert canvas coordinates to complex number
  const canvasToComplex = (x: number, y: number): ComplexNumber => {
    const scale = initialScale * view.zoom;
    return {
      re: (x - view.offsetX) / scale,
      im: -(y - view.offsetY) / scale
    };
  };

  // Convert complex number to canvas coordinates
  const complexToCanvas = (z: ComplexNumber): { x: number, y: number } => {
    const scale = initialScale * view.zoom;
    return {
      x: z.re * scale + view.offsetX,
      y: -z.im * scale + view.offsetY
    };
  };

  // Draw transformed grid
  const drawTransformedGrid = (ctx: CanvasRenderingContext2D) => {
    const gridSize = 0.5;
    const numPoints = Math.ceil(5 / view.zoom);
    
    ctx.lineWidth = 1.5;
    
    // Draw vertical lines
    for (let i = -numPoints; i <= numPoints; i++) {
      ctx.strokeStyle = i === 0 ? 'rgba(255, 100, 100, 0.8)' : 'rgba(100, 100, 255, 0.5)';
      ctx.beginPath();
      
      for (let j = -numPoints; j <= numPoints; j += 0.1) {
        const z = { re: i * gridSize, im: j * gridSize };
        const w = transform(z);
        const point = complexToCanvas(w);
        
        if (j === -numPoints) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }
      
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let j = -numPoints; j <= numPoints; j++) {
      ctx.strokeStyle = j === 0 ? 'rgba(255, 100, 100, 0.8)' : 'rgba(100, 100, 255, 0.5)';
      ctx.beginPath();
      
      for (let i = -numPoints; i <= numPoints; i += 0.1) {
        const z = { re: i * gridSize, im: j * gridSize };
        const w = transform(z);
        const point = complexToCanvas(w);
        
        if (i === -numPoints) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }
      
      ctx.stroke();
    }
  };

  // Draw unit circle and its transformation
  const drawUnitCircle = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = 'rgba(150, 200, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const center = complexToCanvas({ re: 0, im: 0 });
    const radius = initialScale * view.zoom;
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw transformed unit circle
    ctx.strokeStyle = 'rgba(255, 150, 100, 0.8)';
    ctx.beginPath();
    
    const numPoints = 100;
    for (let i = 0; i <= numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const z = { re: Math.cos(angle), im: Math.sin(angle) };
      const w = transform(z);
      const point = complexToCanvas(w);
      
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
    
    ctx.stroke();
  };

  // Add title and labels
  const drawLabels = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#1e3a8a';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 20);
    
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';
    
    // Draw scale indicators
    const scale = initialScale * view.zoom;
    ctx.fillText(`Scale: ${(1/view.zoom).toFixed(2)}x`, width - 60, height - 10);
    
    // Draw coordinates at mouse position
    const mousePos = canvasToComplex(lastPosition.x, lastPosition.y);
    ctx.fillText(
      `(${mousePos.re.toFixed(2)}, ${mousePos.im.toFixed(2)})`,
      60,
      height - 10
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx);
    }

    // Draw transformed grid
    drawTransformedGrid(ctx);

    // Draw unit circle and its transformation
    drawUnitCircle(ctx);

    // Add labels
    drawLabels(ctx);

  }, [width, height, transform, title, showGrid, view, lastPosition]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="bg-white rounded-lg shadow-sm cursor-move touch-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};

export default ComplexCanvas;