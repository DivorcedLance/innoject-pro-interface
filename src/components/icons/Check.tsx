import React from 'react';
import CheckSvg from '../../assets/check.svg';

interface CheckIconProps {
  className?: string;
}

export const CheckIcon: React.FC<CheckIconProps> = ({ className = '' }) => {
  return (
    <div className={`w-6 h-6 ${className}`}>
      <img src={CheckSvg} alt="Check Icon" className="w-full h-full" />
    </div>
  );
};
