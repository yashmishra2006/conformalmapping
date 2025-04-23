import React, { useState } from 'react';
import { Map, CornerUpRight, Square as ZSquare, Combine, Circle, ArrowBigRight, Infinity, RefreshCw } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { MappingCard } from '../ui/MappingCard';

export const MappingTypes: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const mappings = [
    {
      title: "Identity",
      formula: "w = z",
      description: "Nothing changes, used for comparison.",
      icon: <CornerUpRight />,
      color: "bg-blue-500"
    },
    {
      title: "Square Map",
      formula: "w = z²",
      description: "Doubles angles, squashes shapes — useful near sharp bends.",
      icon: <ZSquare />,
      color: "bg-cyan-500"
    },
    {
      title: "Inversion",
      formula: "w = 1/z",
      description: "Flips & stretches space — great for obstacles or sharp boundaries.",
      icon: <RefreshCw />,
      color: "bg-indigo-500"
    },
    {
      title: "Unwrapping Circles",
      formula: "w = log z",
      description: "Turns circles into lines — helpful in mapping cylindrical domains.",
      icon: <Circle />,
      color: "bg-teal-500"
    },
    {
      title: "Infinite Stretch",
      formula: "w = eᶻ",
      description: "Maps strips into spirals — used in temperature or field diffusion.",
      icon: <ArrowBigRight />,
      color: "bg-blue-600"
    },
    {
      title: "Möbius Transform",
      formula: "w = (az+b)/(cz+d)",
      description: "Most flexible — used in flow near boundaries, vortex sheets.",
      icon: <Infinity />,
      color: "bg-purple-500"
    },
    {
      title: "Joukowski Transform",
      formula: "w = z + a²/z",
      description: "Transforms circles into airfoil shapes!",
      icon: <Combine />,
      color: "bg-blue-700",
      hasApplet: true
    }
  ];

  return (
    <section id="mappings" className="py-16 md:py-24 bg-blue-50 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-70 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full opacity-50 -ml-40 -mb-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title="Types of Mappings You'll See" 
          subtitle="Common transformations used in fluid mechanics"
          icon={<Map className="text-blue-600" size={28} />}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {mappings.map((mapping, index) => (
            <MappingCard
              key={index}
              title={mapping.title}
              formula={mapping.formula}
              description={mapping.description}
              icon={mapping.icon}
              color={mapping.color}
              hasApplet={mapping.hasApplet}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index === activeIndex ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};