import React from 'react';

const Logo: React.FC = () => {
  return (
    <a 
      href="/" 
      className="block w-20 sm:w-24 md:w-32 lg:w-72 xl:w-80 h-12 sm:h-16 md:h-20 lg:h-44 xl:h-48 transition-transform duration-300 hover:scale-105"
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
