
import React, { useEffect, useState } from 'react';
import { SPLASH_VIDEO_MOCK, COLORS } from '../constants';

interface SplashProps {
  onComplete: () => void;
}

const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Fade out time
    }, 5000); // 5 seconds splash
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[999] bg-[#0a0a0a] flex flex-col items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative w-full h-full">
        {/* Simulating the video background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10" />
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          muted 
          playsInline
          onEnded={onComplete}
        >
          <source src={SPLASH_VIDEO_MOCK} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <img 
             src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=200&auto=format&fit=crop" 
             alt="Wolf Logo" 
             className="w-48 h-48 rounded-full border-4 border-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.4)] animate-pulse mb-8"
          />
          <h1 className="text-5xl font-extrabold tracking-widest text-[#d4af37]" style={{ fontFamily: 'Montserrat' }}>
            NJADI <span className="text-[#007fff]">AI™</span>
          </h1>
          <p className="mt-4 text-silver/60 tracking-[0.3em] uppercase text-sm">Elite Social Sandbox</p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
