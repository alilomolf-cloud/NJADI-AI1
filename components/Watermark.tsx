
import React from 'react';

interface WatermarkProps {
  imageUrl: string;
}

const Watermark: React.FC<WatermarkProps> = ({ imageUrl }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
      <img src={imageUrl} alt="AI Content" className="w-full h-auto block" />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none" />
      
      {/* Subtle Luxury Watermark */}
      <div className="absolute bottom-4 right-4 flex flex-col items-end opacity-60 pointer-events-none select-none">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#d4af37] drop-shadow-md">
          NJADI AI™
        </span>
        <div className="w-12 h-[1px] bg-[#d4af37]" />
      </div>

      <div className="absolute top-4 left-4">
        <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold text-[#007fff] uppercase tracking-tighter">
          Fingerprint Secured
        </div>
      </div>
    </div>
  );
};

export default Watermark;
