// App.tsx
import React, { useState } from 'react';
import FunctionCanvas from './FunctionCanvas';
import { Select } from './Select';

const transforms = {
  identity: (z: { x: number; y: number }) => z,
  square: (z: { x: number; y: number }) => ({
    x: z.x * z.x - z.y * z.y,
    y: 2 * z.x * z.y,
  }),
  inverse: (z: { x: number; y: number }) => {
    const mag2 = z.x * z.x + z.y * z.y;
    return { x: z.x / mag2, y: -z.y / mag2 };
  },
  exp: (z: { x: number; y: number }) => {
    const e = Math.exp(z.x);
    return { x: e * Math.cos(z.y), y: e * Math.sin(z.y) };
  },
  log: (z: { x: number; y: number }) => {
    const r = Math.sqrt(z.x * z.x + z.y * z.y);
    const theta = Math.atan2(z.y, z.x);
    return { x: Math.log(r), y: theta };
  },
};

const App = () => {
  const [selected, setSelected] = useState<keyof typeof transforms>('identity');

  const drawOriginal = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const drawMapped = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 400, 400);
    const mapFn = transforms[selected];
    const r = 50;
    for (let angle = 0; angle < 2 * Math.PI; angle += 0.05) {
      const z = { x: r * Math.cos(angle), y: r * Math.sin(angle) };
      const w = mapFn(z);
      ctx.fillRect(200 + w.x * 10, 200 + w.y * 10, 2, 2);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Interactive Mapping Viewer</h1>
      <div className="flex justify-center">
        <Select selected={selected} onChange={setSelected} options={Object.keys(transforms)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FunctionCanvas draw={drawOriginal} label="Original Plane" />
        <FunctionCanvas draw={drawMapped} label={`Mapped Plane (${selected})`} />
      </div>
    </div>
  );
};

export default App;
