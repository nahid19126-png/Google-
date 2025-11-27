import React from 'react';

interface LogoProps {
  size?: 'small' | 'large';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'large', className = '' }) => {
  const fontSize = size === 'large' ? 'text-6xl md:text-8xl' : 'text-2xl';
  const letterSpacing = size === 'large' ? '-tracking-widest' : '-tracking-wide';

  return (
    <div className={`font-bold select-none ${fontSize} ${letterSpacing} ${className} flex items-center justify-center`}>
      <span className="text-blue-500">G</span>
      <span className="text-red-500">e</span>
      <span className="text-yellow-500">m</span>
      <span className="text-blue-500">i</span>
      <span className="text-green-500">n</span>
      <span className="text-red-500">i</span>
    </div>
  );
};
