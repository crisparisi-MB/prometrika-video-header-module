import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  url: string;
}

const NewsTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "July 2025 Newsletter [Volume 15]",
      url: "https://www.prometrika.com/about/news-highlights/july-2025-newsletter-volume-15/"
    },
    {
      id: 2,
      title: "White Paper: A Small CRO's Approach to Global Clinical Trial Execution",
      url: "https://www.prometrika.com/about/news-highlights/white-paper-a-small-cros-approach-to-global-clinical-trial-execution/"
    },
    {
      id: 3,
      title: "Prometrika Proudly Sponsors MassBio's 2025 Rare Disease Day Forum",
      url: "https://www.prometrika.com/about/news-highlights/prometrika-proudly-sponsors-massbios-2025-rare-disease-day-forum/"
    },
    {
      id: 4,
      title: "December 2024 Newsletter [Volume 14]",
      url: "https://www.prometrika.com/about/news-highlights/december-2024-newsletter-volume-14/"
    },
    {
      id: 5,
      title: "PROMETRIKA Partners With Medidata on Use of RTSM in Complex Trials",
      url: "https://www.prometrika.com/about/news-highlights/prometrika-partners-with-medidata-on-use-of-rtsm-in-complex-trials/"
    }
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setIsVisible(false);
      
      // After fade out completes, change text and fade in
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1
        );
        setTimeout(() => {
          setIsVisible(true);
        }, 100); // Small delay before fade in
      }, 1500); // Wait for fade out to complete
    }, 5000);

    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <div 
      className="rounded-full flex items-center justify-between px-6 text-right shadow-lg transition-all duration-300"
      style={{
        width: '925px',
        height: '40px',
        backgroundColor: '#F4B827',
        paddingLeft: '24px',
        paddingRight: '6px'
      }}
    >
      <div className="flex items-center">
        <span 
          className="uppercase tracking-wider"
          style={{
            fontFamily: 'Futura, "Futura PT", "Century Gothic", "Trebuchet MS", Arial, sans-serif',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#312F48'
          }}
        >
          NEWS HIGHLIGHTS
        </span>
      </div>
      
      <div className="flex-1 flex items-center justify-end overflow-hidden ml-6">
        <div className={`transition-all duration-[1500ms] ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } flex-1 mr-4`}>
          <a
            href={newsItems[currentIndex].url} 
            className="block text-left"
            style={{
              color: '#312F48',
              fontSize: '14px',
              fontFamily: '"Roboto Slab", serif',
              fontWeight: '400'
            }}
          >
            {newsItems[currentIndex].title}
          </a>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <div className="flex items-center space-x-3 flex-shrink-0">
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-65 transition-opacity duration-200"
          style={{ backgroundColor: '#312F48' }}
          aria-label="Previous news item"
        >
          <ChevronLeft 
            size={16} 
            color="#F4B827" 
            strokeWidth={2.5}
          />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-65 transition-opacity duration-200"
          style={{ backgroundColor: '#312F48' }}
          aria-label="Next news item"
        >
          <ChevronRight 
            size={16} 
            color="#F4B827" 
            strokeWidth={2.5}
          />
        </button>
      </div>
    </div>
  );
};

export default NewsTicker;