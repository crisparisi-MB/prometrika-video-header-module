import React from 'react';

const Logo: React.FC = () => {
  return (
    <a 
      href="/" 
      className="block w-84 md:w-96 lg:w-110 h-20 md:h-24 lg:h-28 transition-transform duration-300 hover:scale-105"
      aria-label="Go to homepage"
    >
      <img
        src="/logo.svg"
        alt="Company Logo"
        className="w-full h-full object-contain"
      />
    </a>
  );
};

export default Logo;