import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import Logo from './Logo';
import SocialIcons from './SocialIcons';
import NewsTicker from './NewsTicker';
import Navigation from './Navigation';

const VideoHeader: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
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
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
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

      {/* Header Content */}
      <div className="relative z-10 h-full flex flex-col ml-[140px]">
        {/* Top Bar */}
        <div className="flex justify-between items-start p-6 md:p-8 lg:p-12">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Logo />
          </div>

          {/* Social Icons */}
          <div className="flex-shrink-0 flex items-center h-20 md:h-24 lg:h-28 ml-auto">
            <SocialIcons />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center pr-6 md:pr-8 lg:pr-12 relative">
          {/* Cycling Text Container */}
          <div className="absolute right-6 md:right-8 lg:right-12 max-w-[900px]">
            <div className="relative">
              <div className={`transition-all duration-[1500ms] ease-in-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
              } ${isVisible ? 'transform translate-y-0' : 'transform translate-y-1'}`}>
                <div className="text-right">
                  <h1 
                    className="text-white text-6xl font-bold uppercase leading-tight px-4"
                    style={{ 
                      fontFamily: 'Futura, "Futura PT", "Century Gothic", "Trebuchet MS", Arial, sans-serif',
                      fontSize: '60px',
                      lineHeight: '75px'
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
        <div className="flex justify-between items-end p-6 md:p-8 lg:p-12">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="bg-transparent border-2 border-white hover:border-white transition-all duration-300 ease-in-out group rounded-full flex items-center justify-between px-6 opacity-30 hover:opacity-100"
            style={{
             width: '230px',
              height: '40px',
              fontFamily: 'Futura, "Futura PT", "Century Gothic", "Trebuchet MS", Arial, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              color: 'white',
              letterSpacing: '0.34em'
            }}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            <div className="flex-shrink-0 pr-2.5">
              {isPlaying ? (
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="flex space-x-0.5">
                    <div className="w-0.5 h-2 bg-black"></div>
                    <div className="w-0.5 h-2 bg-black"></div>
                  </div>
                </div>
              ) : (
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[3px] border-l-black border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent ml-0.5"></div>
                </div>
              )}
            </div>
            <span className="flex-1 text-right" style={{ color: 'inherit' }}>
              {isPlaying ? 'PAUSE VIDEO' : 'PLAY VIDEO'}
            </span>
          </button>

          {/* News Ticker */}
          <div className="flex-shrink-0 ml-auto">
            <NewsTicker />
          </div>
        </div>
      </div>

      {/* Vertical Navigation */}
      <Navigation />
    </div>
  );
};

export default VideoHeader;