import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CylinderFlowDemoProps {
  flowSpeed: number;
  circulation: number;
}

interface Point {
  x: number;
  y: number;
}

const CylinderFlowDemo: React.FC<CylinderFlowDemoProps> = ({ flowSpeed, circulation }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Scale functions
    const xScale = d3.scaleLinear()
      .domain([-4, 4])
      .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
      .domain([-3, 3])
      .range([innerHeight, 0]);
    
    // Draw cylinder
    const cylinderRadius = 1;
    g.append("circle")
      .attr("cx", xScale(0))
      .attr("cy", yScale(0))
      .attr("r", xScale(cylinderRadius) - xScale(0))
      .attr("fill", "#f0f0f0")
      .attr("stroke", "#999");
    
    // Calculate streamlines
    function calculateVelocity(x: number, y: number): [number, number] {
      // Avoid division by zero and points inside the cylinder
      const r2 = x*x + y*y;
      if (r2 < cylinderRadius * cylinderRadius) {
        return [0, 0];
      }
      
      // Calculate velocity components for flow past a cylinder
      // with circulation (superposition of uniform flow, doublet, and vortex)
      const U = flowSpeed;
      const a2 = cylinderRadius * cylinderRadius;
      const Gamma = circulation;
      
      // Uniform flow + doublet contribution
      let u = U * (1 - a2 * (x*x - y*y) / (r2*r2));
      let v = -U * (2 * a2 * x * y) / (r2*r2);
      
      // Add vortex contribution
      u -= Gamma * y / (2 * Math.PI * r2);
      v += Gamma * x / (2 * Math.PI * r2);
      
      // Scale velocity for visualization
      const magnitudeScale = 0.5;
      return [u * magnitudeScale, v * magnitudeScale];
    }
    
    // Generate streamlines using d3.line
    function generateStreamline(startX: number, startY: number, direction: 1 | -1): Point[] {
      const points: Point[] = [{ x: startX, y: startY }];
      let x = startX;
      let y = startY;
      
      const stepSize = 0.05;
      const maxSteps = 200;
      
      for (let i = 0; i < maxSteps; i++) {
        const [u, v] = calculateVelocity(x, y);
        
        // Break if velocity is too small or we're outside the domain
        if (Math.abs(u) < 1e-6 && Math.abs(v) < 1e-6) break;
        if (x < -4 || x > 4 || y < -3 || y > 3) break;
        
        // Update position based on velocity field
        x += direction * stepSize * u / Math.sqrt(u*u + v*v);
        y += direction * stepSize * v / Math.sqrt(u*u + v*v);
        
        // Break if too close to cylinder
        if (x*x + y*y < cylinderRadius * cylinderRadius * 1.01) break;
        
        points.push({ x, y });
      }
      
      return points;
    }
    
    // Generate streamlines from different starting points
    const lineGenerator = d3.line<Point>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveBasis);
    
    // Starting points for streamlines
    const startingPoints: [number, number][] = [];
    
    // Horizontal starting points
    for (let y = -2.5; y <= 2.5; y += 0.5) {
      startingPoints.push([-3.8, y]);
    }
    
    // Generate and draw streamlines
    startingPoints.forEach(([startX, startY]) => {
      // Forward direction
      const forwardPoints = generateStreamline(startX, startY, 1);
      
      // Skip if no valid streamline
      if (forwardPoints.length <= 1) return;
      
      g.append("path")
        .datum(forwardPoints)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "#3B82F6")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0.7);
      
      // Add arrowhead to indicate flow direction
      const midIndex = Math.floor(forwardPoints.length / 2);
      if (midIndex > 0 && midIndex < forwardPoints.length - 1) {
        const p = forwardPoints[midIndex];
        const nextP = forwardPoints[midIndex + 1];
        
        const angle = Math.atan2(yScale(nextP.y) - yScale(p.y), xScale(nextP.x) - xScale(p.x));
        
        g.append("circle")
          .attr("cx", xScale(p.x))
          .attr("cy", yScale(p.y))
          .attr("r", 2)
          .attr("fill", "#3B82F6");
      }
    });
    
    // Draw stagnation points
    if (Math.abs(circulation) < 0.1) {
      // For no circulation, stagnation points are at (1,0) and (-1,0)
      g.append("circle")
        .attr("cx", xScale(cylinderRadius))
        .attr("cy", yScale(0))
        .attr("r", 3)
        .attr("fill", "red");
      
      g.append("circle")
        .attr("cx", xScale(-cylinderRadius))
        .attr("cy", yScale(0))
        .attr("r", 3)
        .attr("fill", "red");
    } else {
      // Approximate stagnation points for non-zero circulation
      const theta = Math.asin(circulation / (4 * Math.PI * flowSpeed * cylinderRadius));
      if (!isNaN(theta)) {
        // Front stagnation point
        g.append("circle")
          .attr("cx", xScale(cylinderRadius * Math.cos(theta)))
          .attr("cy", yScale(cylinderRadius * Math.sin(theta)))
          .attr("r", 3)
          .attr("fill", "red");
        
        // Back stagnation point
        g.append("circle")
          .attr("cx", xScale(-cylinderRadius * Math.cos(theta)))
          .attr("cy", yScale(-cylinderRadius * Math.sin(theta)))
          .attr("r", 3)
          .attr("fill", "red");
      }
    }
    
    // Add labels
    g.append("text")
      .attr("x", xScale(0))
      .attr("y", yScale(-2.5))
      .attr("text-anchor", "middle")
      .attr("fill", "#666")
      .text("Flow Direction →");
    
    if (circulation !== 0) {
      g.append("text")
        .attr("x", xScale(0))
        .attr("y", yScale(2.5))
        .attr("text-anchor", "middle")
        .attr("fill", "#666")
        .text(`Lift Force ${circulation > 0 ? "↑" : "↓"}`);
    }
  }, [flowSpeed, circulation]);
  
  return (
    <div className="flex justify-center">
      <svg ref={svgRef} width="400" height="300"></svg>
    </div>
  );
};

export default CylinderFlowDemo;