import React from 'react';
import BackSpaceSvg from '../../assets/backSpace.svg';

interface BackSpaceIconProps {
  className?: string;
}

export const BackSpaceIcon: React.FC<BackSpaceIconProps> = ({ className = '' }) => {
  return (
    <div className={`w-6 h-6 ${className}`}>
      <img src={BackSpaceSvg} alt="BackSpace Icon" className="w-full h-full" />
    </div>
  );
};
