import React from 'react';
import ResetSvg from '../../assets/reset.svg';

interface ResetIconProps {
  className?: string;
}

export const ResetIcon: React.FC<ResetIconProps> = ({ className = '' }) => {
  return (
    <div className={`w-6 h-6 ${className}`}>
      <img src={ResetSvg} alt="Reset Icon" className="w-full h-full" />
    </div>
  );
};
