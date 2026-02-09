
import React, { useState } from 'react';
import { Sparkles, X, Wand2, Languages } from 'lucide-react';
import { useMood } from './MoodProvider';

const GeminiFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { themeStyles } = useMood();

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button className="flex items-center gap-2 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl hover:bg-white/5 transition-all text-sm font-bold group">
            <Languages size={18} className="text-[#007fff]" />
            <span>Translate Interface</span>
          </button>
          <button className="flex items-center gap-2 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl hover:bg-white/5 transition-all text-sm font-bold group">
            <Wand2 size={18} className="text-[#d4af37]" />
            <span>Smart Reply</span>
          </button>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 border-2 border-white/20 overflow-hidden relative"
        style={{ 
            background: `linear-gradient(135deg, ${themeStyles.accent}, ${themeStyles.secondary})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20 animate-pulse" />
        {isOpen ? <X className="text-white z-10" /> : <Sparkles className="text-white z-10" />}
      </button>
    </div>
  );
};

export default GeminiFAB;
