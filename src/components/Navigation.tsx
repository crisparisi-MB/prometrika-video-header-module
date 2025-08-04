import React, { useState } from 'react';
import { 
  Search, 
  Fingerprint, 
  Dna, 
  Heart, 
  Brain, 
  Briefcase, 
  Smartphone
} from 'lucide-react';

interface NavItem {
  id: string;
  title: string;
  href: string;
  icon?: React.ReactNode;
}

const Navigation: React.FC = () => {

  const navigationItems: NavItem[] = [
    {
      id: '1000',
      title: 'Search',
      href: '#',
      icon: <Search size={16} />
    },
    {
      id: '1395',
      title: 'About',
      href: '/about/',
      icon: <Fingerprint size={16} />
    },
    {
      id: '8862',
      title: 'Services',
      href: '/services/',
      icon: <img src="/dna-helix.svg" alt="Services" className="w-10 h-10" />
    },
    {
      id: '8874',
      title: 'Experience',
      href: '/experience/',
      icon: <img src="/dice-icon.svg" alt="Experience" className="w-10 h-10" />
    },
    {
      id: '9706',
      title: 'Giving Back',
      href: '/giving-back/',
      icon: <img src="/giving-back.svg" alt="Giving Back" className="w-10 h-10" />
    },
    {
      id: '11053',
      title: 'Thought Leadership',
      href: '/thought-leadership/',
      icon: <img src="/thought-leadership.svg" alt="Thought Leadership" className="w-10 h-10" />
    },
    {
      id: '8887',
      title: 'Careers',
      href: '/careers/',
      icon: <img src="/careers.svg" alt="Careers" className="w-10 h-10" />
    },
    {
      id: '1404',
      title: 'Contact',
      href: '/contact/',
      icon: <img src="/contact.svg" alt="Contact" className="w-10 h-10" />
    }
  ];

  return (
    <div className="relative">
      {/* Main Navigation */}
      <nav 
        className="fixed left-0 top-0 h-screen z-20 flex flex-col"
        style={{
          width: '140px',
          backgroundColor: '#746DA5'
        }}
      >
        <ul className="flex flex-col h-full">
          {navigationItems.map((item) => (
            <li key={item.id} className="hover:bg-[#2F2D41] transition-colors duration-200 flex-1">
              <a
                href={item.href}
                className="flex flex-col items-center justify-center px-2 text-white h-full text-center cursor-pointer w-full py-0"
                style={{
                  fontFamily: 'Futura, "Futura PT", "Century Gothic", "Trebuchet MS", Arial, sans-serif',
                  fontWeight: '500',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}
              >
                {item.icon && (
                  <div className="mb-1 flex-shrink-0">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 40 })}
                  </div>
                )}
                <span className="leading-tight">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;