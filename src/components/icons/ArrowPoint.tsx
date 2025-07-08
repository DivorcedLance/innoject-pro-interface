import React from 'react';
import ArrowPointSvg from '../../assets/arrowPoint.svg';

interface ArrowPointIconProps {
  className?: string;
}

export const ArrowPointIcon: React.FC<ArrowPointIconProps> = ({ className = '' }) => {
  return (
    <div className={`w-6 h-6 ${className}`}>
      <img src={ArrowPointSvg} alt="ArrowPoint Icon" className="w-full h-full" />
    </div>
  );
};
