import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SimpleConformalDemoProps {
  mapFunction: string;
}

interface Point {
  x: number;
  y: number;
}

const SimpleConformalDemo: React.FC<SimpleConformalDemoProps> = ({ mapFunction }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
      .domain([-2, 2])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([-2, 2])
      .range([innerHeight, 0]);

    g.append("line")
      .attr("x1", 0)
      .attr("y1", yScale(0))
      .attr("x2", innerWidth)
      .attr("y2", yScale(0))
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1);

    g.append("line")
      .attr("x1", xScale(0))
      .attr("y1", 0)
      .attr("x2", xScale(0))
      .attr("y2", innerHeight)
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1);

    const gridSize = 0.4;
    const gridPoints: Point[][] = [];

    for (let x = -2; x <= 2; x += gridSize) {
      const row: Point[] = [];
      for (let y = -2; y <= 2; y += gridSize) {
        row.push({ x, y });
      }
      gridPoints.push(row);
    }

    function applyMapping(p: { x: number, y: number }): { x: number, y: number } | null {
      const z = { re: p.x, im: p.y };
      let w;

      switch (mapFunction) {
        case 'square': {
          w = {
            re: z.re * z.re - z.im * z.im,
            im: 2 * z.re * z.im
          };
          break;
        }
        case 'reciprocal': {
          if (z.re === 0 && z.im === 0) return null;
          const denominator = z.re * z.re + z.im * z.im;
          w = {
            re: z.re / denominator,
            im: -z.im / denominator
          };
          break;
        }
        case 'exponential': {
          const expReal = Math.exp(z.re);
          w = {
            re: expReal * Math.cos(z.im),
            im: expReal * Math.sin(z.im)
          };
          break;
        }
        case 'joukowski': {
          if (z.re === 0 && z.im === 0) return null;
          const denom = z.re * z.re + z.im * z.im;
          w = {
            re: z.re + z.re / denom,
            im: z.im - z.im / denom
          };
          break;
        }
        default: {
          w = { re: z.re, im: z.im };
        }
      }

      const magnitude = Math.sqrt(w.re * w.re + w.im * w.im);
      if (magnitude > 5) {
        w.re = w.re * 5 / magnitude;
        w.im = w.im * 5 / magnitude;
      }

      return { x: w.re, y: w.im };
    }

    const lineGenerator = d3.line<Point>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveBasis);

    gridPoints.forEach(row => {
      const mappedPoints: Point[] = [];
      row.forEach(point => {
        const mappedPoint = applyMapping(point);
        if (mappedPoint) {
          mappedPoints.push(mappedPoint);
        }
      });

      if (mappedPoints.length > 1) {
        g.append("path")
          .datum(mappedPoints)
          .attr("d", lineGenerator)
          .attr("fill", "none")
          .attr("stroke", "#3B82F6")
          .attr("stroke-width", 1)
          .attr("opacity", 0.7);
      }
    });

    for (let j = 0; j < gridPoints[0].length; j++) {
      const column: Point[] = [];
      for (let i = 0; i < gridPoints.length; i++) {
        column.push(gridPoints[i][j]);
      }

      const mappedPoints: Point[] = [];
      column.forEach(point => {
        const mappedPoint = applyMapping(point);
        if (mappedPoint) {
          mappedPoints.push(mappedPoint);
        }
      });

      if (mappedPoints.length > 1) {
        g.append("path")
          .datum(mappedPoints)
          .attr("d", lineGenerator)
          .attr("fill", "none")
          .attr("stroke", "#0DB0F0")
          .attr("stroke-width", 1)
          .attr("opacity", 0.7);
      }
    }

    g.append("text")
      .attr("x", innerWidth)
      .attr("y", yScale(0) + 15)
      .attr("text-anchor", "end")
      .attr("fill", "#666")
      .text("Re(z)");

    g.append("text")
      .attr("x", xScale(0) - 10)
      .attr("y", 0)
      .attr("text-anchor", "end")
      .attr("fill", "#666")
      .text("Im(z)");

  }, [mapFunction]);

  return (
    <div className="flex justify-center">
      <svg ref={svgRef} width="300" height="300"></svg>
    </div>
  );
};

export default SimpleConformalDemo;
