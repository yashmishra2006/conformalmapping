import React from 'react';
import { Gauge, ExternalLink } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ApplicationCard } from '../ui/ApplicationCard';

export const Applications: React.FC = () => {
  const applications = [
    {
      title: "Airfoil Design",
      description: "Transform circles into wings using Joukowski Transform. Essential for aerodynamics and lift generation.",
      imageUrl: "https://images.pexels.com/photos/16619979/pexels-photo-16619979/free-photo-of-airfoil-on-an-airplane-wing.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      icon: "plane",
      link: "#"
    },
    {
      title: "Pipe Flow",
      description: "Flatten bends and corners for simpler velocity profiles in complex piping systems.",
      imageUrl: "https://images.pexels.com/photos/2902095/pexels-photo-2902095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      icon: "pipe",
      link: "#"
    },
    {
      title: "Electrostatics",
      description: "Visualize electric fields using Möbius maps to predict behavior around charged objects.",
      imageUrl: "https://images.pexels.com/photos/3835381/pexels-photo-3835381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      icon: "zap",
      link: "#"
    },
    {
      title: "Heat Mapping",
      description: "Use exponential/log maps in temperature flows and thermal analysis of materials.",
      imageUrl: "https://images.pexels.com/photos/14018748/pexels-photo-14018748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      icon: "flame",
      link: "#"
    },
    {
      title: "Biomedical",
      description: "Shape-matching in blood flow simulations through vessels and heart chambers.",
      imageUrl: "https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      icon: "heart-pulse",
      link: "#"
    }
  ];

  return (
    <section id="applications" className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Real-World Applications" 
          subtitle="Where conformal mapping solves practical problems"
          icon={<Gauge className="text-blue-600" size={28} />}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {applications.map((app, index) => (
            <ApplicationCard
              key={index}
              title={app.title}
              description={app.description}
              imageUrl={app.imageUrl}
              icon={app.icon}
              link={app.link}
            />
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <a 
            href="https://www.geogebra.org/m/nUFzJrkE" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Explore More Interactive Applets</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};