import React from 'react';
import { Plane, Pipette as PipetteSample, Zap, Flame, HeartPulse, ExternalLink } from 'lucide-react';

interface ApplicationCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: string;
  link: string;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  title,
  description,
  imageUrl,
  icon,
  link
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'plane':
        return <Plane size={20} />;
      case 'pipe':
        return <PipetteSample size={20} />;
      case 'zap':
        return <Zap size={20} />;
      case 'flame':
        return <Flame size={20} />;
      case 'heart-pulse':
        return <HeartPulse size={20} />;
      default:
        return <ExternalLink size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <span className="text-blue-600">
              {getIcon()}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
        </div>
        
        <p className="text-gray-700 mb-4">{description}</p>
        
        <a 
          href={link} 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <span className="font-medium">Learn more</span>
          <ExternalLink size={16} className="ml-1" />
        </a>
      </div>
    </div>
  );
};