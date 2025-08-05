import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, X } from 'lucide-react';
import Logo from './Logo';
import SocialIcons from './SocialIcons';
import NewsTicker from './NewsTicker';

const VideoHeader: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const textSlides = [
    <>
      <span style={{ color: '#F4B827' }}>INNOVATIVE</span> CLINICAL DEVELOPMENT <span style={{ color: '#F4B827' }}>SOLUTIONS</span>
    </>,
    <>
      <span style={{ color: '#F4B827' }}>DRIVEN BY</span> OUR <span style={{ color: '#F4B827' }}>PASSION</span> FOR THE HUMAN ASPECT OF OUR WORK
    </>,
    <>
      <span style={{ color: '#F4B827' }}>COMPASSION</span> FOR THE PEOPLE WHOSE <span style={{ color: '#F4B827' }}>LIVES</span> HAVE BEEN <span style={{ color: '#F4B827' }}>IMPROVED</span><span style={{ color: '#F4B827' }}>.</span>
    </>
  ];

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Initial fade-in for first frame
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Small delay before initial fade-in

    const interval = setInterval(() => {
      // Start fade out
      setIsVisible(false);
      
      // After fade out completes, change text and fade in
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => 
          prevIndex === textSlides.length - 1 ? 0 : prevIndex + 1
        );
        // Wait for content change to settle, then fade in
        setTimeout(() => {
          setIsVisible(true);
        }, 100); // Slightly longer delay before fade in
      }, 1500); // Wait for complete fade out (full transition duration)
    }, 5000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [textSlides.length]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const errorCode = video.error?.code;
    const errorMessage = video.error?.message;
    
    if (errorCode) {
      setVideoError(`Video failed to load. Error code: ${errorCode}`);
      console.error('Video loading error:', { code: errorCode, message: errorMessage });
    } else {
      setVideoError('Video file not found or cannot be loaded');
      console.error('Video loading error: No error details available');
    }
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(null);
    console.log('Video loaded successfully');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    'About Us',
    'Services',
    'Clinical Trials',
    'Therapeutic Areas',
    'Careers',
    'News & Insights',
    'Contact',
    'Resources'
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-[2]"
        style={{
          background: 'linear-gradient(to right, rgba(140, 135, 192, 0.4) 0%, transparent 50%, rgba(140, 135, 192, 0.4) 100%)'
        }}
      ></div>

      {/* Video Loading/Error State */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading video...</p>
          </div>
        </div>
      )}

      {videoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-white text-center p-8 bg-black/50 rounded-lg backdrop-blur-sm">
            <p className="text-lg mb-2">Video Loading Error</p>
            <p className="text-sm text-red-300 mb-4">{videoError}</p>
            <p className="text-xs text-gray-300">
              Please check that your video file is in the public folder and named 'background-video.mp4'
            </p>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          ></div>
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col bg-white">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="w-32 h-16">
                <img
                  src="/logo.svg"
                  alt="Company Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X size={24} color="#312F48" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 px-6 py-8">
              <nav className="space-y-6">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-2xl font-medium text-gray-800 hover:text-yellow-500 transition-colors py-2"
                    style={{
                      fontFamily: 'Futura, "Futura PT", "Century Gothic", "Trebuchet MS", Arial, sans-serif'
                    }}
                    onClick={toggleMobileMenu}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Social Icons */}
            <div className="px-6 py-8 border-t border-gray-200">
              <p 
                className="text-sm font-medium text-gray-600 mb-4 uppercase tracking-wider"
                style={{
                  fontFamily: 'Futura, "Futura PT", "Century Gothic", "Trebuchet MS", Arial, sans-serif'
                }}
              >
                Follow Us
              </p>
              <div className="flex space-x-6">
                <a
                  href="http://www.linkedin.com/company/prometrika-llc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <img 
                    src="/linkedin-in.svg" 
                    alt="Follow us on LinkedIn" 
                    className="w-8 h-8 object-contain"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(20%) sepia(15%) saturate(1000%) hue-rotate(225deg) brightness(95%) contrast(95%)'
                    }}
                  />
                </a>
                <a
                  href="https://twitter.com/PrometrikaCRO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:scale-110"
                  aria-label="X (Twitter)"
                >
                  <img 
                    src="/x-twitter.svg" 
                    alt="Follow us on X (Twitter)" 
                    className="w-8 h-8 object-contain"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(20%) sepia(15%) saturate(1000%) hue-rotate(225deg) brightness(95%) contrast(95%)'
                    }}
                  />
                </a>
                <a
                  href="https://www.facebook.com/prometrikallc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <img 
                    src="/facebook-f.svg" 
                    alt="Follow us on Facebook" 
                    className="w-8 h-8 object-contain"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(20%) sepia(15%) saturate(1000%) hue-rotate(225deg) brightness(95%) contrast(95%)'
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Content */}
      <div className="relative z-10 h-full flex flex-col sm:ml-8 md:ml-16 lg:ml-[140px]">
        {/* Top Bar */}
        <div className="flex justify-between items-start p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Logo />
          </div>

          {/* Desktop Social Icons */}
          <div className="hidden lg:flex flex-shrink-0 items-center h-16 sm:h-20 md:h-24 lg:h-28 ml-auto">
            <SocialIcons />
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden flex-shrink-0 flex items-end h-16 sm:h-20 md:h-24 lg:h-28 ml-auto">
            <button
              onClick={toggleMobileMenu}
              className="flex flex-col items-center justify-center p-2 touch-manipulation w-10 h-10"
              aria-label="Open menu"
            >
              {/* Hamburger Lines */}
              <div className="mb-1 flex flex-col items-center">
                <div className="w-6 h-0.5 bg-white mb-1"></div>
                <div className="w-6 h-0.5 bg-white mb-1"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>
              {/* MENU Text */}
              <span 
                className="text-white text-[7px] font-medium uppercase tracking-[0.2em] w-6 text-center flex justify-center"
                style={{
                  fontFamily: 'Futura, "Futura PT", "Century Gothic", "Trebuchet MS", Arial, sans-serif'
                }}
              >
                MENU
              </span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center pr-4 sm:pr-6 md:pr-8 lg:pr-12 relative">
          {/* Cycling Text Container */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-full px-5 sm:left-auto sm:right-6 md:right-8 lg:right-12 sm:transform-none sm:translate-x-0 sm:inset-x-auto sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[900px] sm:px-0">
            <div className="relative">
              <div className={`transition-all duration-[1500ms] ease-in-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
              } ${isVisible ? 'transform translate-y-0' : 'transform translate-y-1'}`}>
                <div className="text-center sm:text-right">
                  <h1 
                    className="text-white text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase leading-tight sm:px-4"
                    style={{ 
                      fontFamily: 'Futura, "Futura PT", "Century Gothic", "Trebuchet MS", Arial, sans-serif',
                      lineHeight: '1.2'
                    }}
                  >
                    {typeof textSlides[currentTextIndex] === 'string' 
                      ? textSlides[currentTextIndex] 
                      : textSlides[currentTextIndex]
                    }
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 sm:gap-0 p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Play/Pause Button */}
          {/* Mobile Play/Pause Button - Circle only */}
          <button
            onClick={togglePlayPause}
            className="sm:hidden w-7 h-7 bg-transparent border-2 border-white hover:border-white transition-all duration-300 ease-in-out rounded-full flex items-center justify-center opacity-30 hover:opacity-100 touch-manipulation order-first"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <div className="flex space-x-1">
                <div className="w-0.5 h-2.5 bg-white"></div>
                <div className="w-0.5 h-2.5 bg-white"></div>
              </div>
            ) : (
              <div className="w-0 h-0 border-l-[4px] border-l-white border-t-[2.5px] border-t-transparent border-b-[2.5px] border-b-transparent ml-0.5"></div>
            )}
          </button>

          {/* Desktop Play/Pause Button - With text */}
          <button
            onClick={togglePlayPause}
            className="hidden sm:flex bg-transparent border-2 border-white hover:border-white transition-all duration-300 ease-in-out group rounded-full items-center justify-between px-3 sm:px-4 md:px-6 opacity-30 hover:opacity-100 touch-manipulation"
            style={{
              width: 'auto',
              minWidth: '160px',
              maxWidth: '230px',
              height: '44px',
              fontFamily: 'Futura, "Futura PT", "Century Gothic", "Trebuchet MS", Arial, sans-serif',
              fontSize: 'clamp(10px, 2.5vw, 14px)',
              fontWeight: '500',
              color: 'white',
              letterSpacing: 'clamp(0.1em, 0.5vw, 0.34em)'
            }}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            <div className="flex-shrink-0 pr-1 sm:pr-2 md:pr-2.5">
              {isPlaying ? (
                <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="flex space-x-0.5">
                    <div className="w-0.5 h-1.5 sm:h-2 bg-black"></div>
                    <div className="w-0.5 h-1.5 sm:h-2 bg-black"></div>
                  </div>
                </div>
              ) : (
                <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[2px] sm:border-l-[3px] border-l-black border-t-[1.5px] sm:border-t-[2px] border-t-transparent border-b-[1.5px] sm:border-b-[2px] border-b-transparent ml-0.5"></div>
                </div>
              )}
            </div>
            <span className="flex-1 text-right whitespace-nowrap overflow-hidden" style={{ color: 'inherit' }}>
              {isPlaying ? 'PAUSE VIDEO' : 'PLAY VIDEO'}
            </span>
          </button>

          {/* News Ticker */}
          <div className="flex-shrink-0 w-full sm:w-auto sm:ml-auto">
            <NewsTicker />
          </div>
        </div>
      </div>

    </div>
  );
};

export default VideoHeader;
