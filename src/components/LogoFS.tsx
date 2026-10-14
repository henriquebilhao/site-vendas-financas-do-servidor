import React from 'react';
import logoImg from '../assets/images/logo.png';

interface LogoFSProps {
  className?: string;
  size?: number;
}

export const LogoFS: React.FC<LogoFSProps> = ({ className = '', size = 40 }) => {
  return (
    <img
      src={logoImg}
      alt="Finanças do Servidor"
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`object-cover rounded-lg shrink-0 select-none ${className}`}
      loading="eager"
    />
  );
};
