import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface MappingCardProps {
  title: string;
  formula: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  hasApplet?: boolean;
  isActive: boolean;
  onClick: () => void;
}

export const MappingCard: React.FC<MappingCardProps> = ({
  title,
  formula,
  description,
  icon,
  color,
  hasApplet = false,
  isActive,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform ${
        isActive ? 'scale-105 ring-2 ring-blue-400' : 'hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-full">
        {/* Front of card */}
        <div 
          className={`h-full transition-all duration-500 ${
            isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className={`${color} text-white p-5`}>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{title}</h3>
              <div className="p-2 bg-white/20 rounded-full">
                {icon}
              </div>
            </div>
            <div className="mt-3 bg-white/10 p-3 rounded-md inline-block">
              <code className="text-lg">{formula}</code>
            </div>
          </div>
          
          <div className="p-5">
            <p className="text-gray-700">{description}</p>
            
            {hasApplet && (
              <div className="mt-4 flex items-center text-blue-600">
                <span className="text-sm font-medium">View Interactive Applet</span>
                <ExternalLink size={16} className="ml-1" />
              </div>
            )}
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-white flex flex-col justify-center items-center p-6 transition-all duration-500 ${
            isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <h3 className="text-xl font-semibold text-blue-800 mb-3">{title}</h3>
          
          <div className="mb-4">
            <code className="text-2xl text-blue-600">{formula}</code>
          </div>
          
          <p className="text-center text-gray-700 mb-4">{description}</p>
          
          <div className="bg-blue-100 p-4 rounded-lg w-full">
            <h4 className="font-medium text-blue-800 mb-2">Key Properties:</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Preserves angles at intersection points</li>
              <li>• Maps circles and lines to other circles or lines</li>
              <li>• Maintains flow characteristics</li>
            </ul>
          </div>
          
          {hasApplet && (
            <a 
              href="#applet" 
              className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <span className="font-medium">Try in the interactive applet</span>
              <ExternalLink size={16} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};