import React from 'react';

const SocialIcons: React.FC = () => {
  return (
    <div className="flex space-x-6">
      {/* LinkedIn */}
      <a
        href="http://www.linkedin.com/company/prometrika-llc"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 hover:scale-110 group"
        aria-label="LinkedIn"
      >
        <img 
          src="/linkedin-in.svg" 
         alt="Follow us on LinkedIn" 
          className="w-7 h-7 object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
          style={{
            filter: 'brightness(0) invert(1)'
          }}
        />
      </a>

      {/* X (Twitter) */}
      <a
        href="https://twitter.com/PrometrikaCRO"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 hover:scale-110 group"
        aria-label="X (Twitter)"
      >
        <img 
          src="/x-twitter.svg" 
         alt="Follow us on X (Twitter)" 
          className="w-7 h-7 object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
          style={{
            filter: 'brightness(0) invert(1)'
          }}
        />
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/prometrikallc"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 hover:scale-110 group"
        aria-label="Facebook"
      >
        <img 
          src="/facebook-f.svg" 
         alt="Follow us on Facebook" 
          className="w-7 h-7 object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
          style={{
            filter: 'brightness(0) invert(1)'
          }}
        />
      </a>
    </div>
  );
};

export default SocialIcons;