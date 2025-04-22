import React, { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  icon?: ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {icon && (
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            {icon}
          </div>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">{title}</h2>
      <p className="text-lg text-blue-600">{subtitle}</p>
      <div className="mt-4 flex justify-center">
        <div className="w-24 h-1 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};