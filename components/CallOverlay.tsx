import React, { useEffect, useState } from 'react';
import { Phone, Video, X, Mic, MicOff, VideoOff, Volume2, Monitor } from 'lucide-react';
import { useMood } from './MoodProvider';

interface CallOverlayProps {
  type: 'voice' | 'video';
  partner: string;
  onEnd: () => void;
}

const CallOverlay: React.FC<CallOverlayProps> = ({ type, partner, onEnd }) => {
  const { themeStyles } = useMood();
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(type === 'voice');

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-between p-12">
      {type === 'video' && !isVideoOff && (
        <div className="absolute inset-0 bg-gray-900 overflow-hidden">
            <img src={`https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1000&auto=format&fit=crop`} alt="Video Background" className="w-full h-full object-cover opacity-50 blur-sm" />
            <div className="absolute bottom-8 right-8 w-48 h-64 bg-black/50 border border-white/20 rounded-2xl overflow-hidden backdrop-blur-md">
                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">Camera Feed</div>
            </div>
        </div>
      )}

      <div className="z-10 text-center space-y-4">
        <div className="w-32 h-32 rounded-full bg-white/5 border-2 border-gold/50 mx-auto flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <img src={`https://ui-avatars.com/api/?name=${partner}&background=0a0a0a&color=d4af37&size=256`} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">{partner}</h2>
        <p className="text-gold font-mono tracking-widest uppercase text-xs">{type} call in progress</p>
        <p className="text-white/40 text-lg font-light">{formatTime(seconds)}</p>
      </div>

      <div className="z-10 flex items-center gap-6 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-[3rem] shadow-2xl">
        <button onClick={() => setIsMuted(!isMuted)} className={`p-5 rounded-full transition-all ${isMuted ? 'bg-red-500 text-white' : 'hover:bg-white/10'}`}>
          {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
        </button>
        {type === 'video' && (
           <button onClick={() => setIsVideoOff(!isVideoOff)} className={`p-5 rounded-full transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'hover:bg-white/10'}`}>
             {isVideoOff ? <VideoOff size={28} /> : <Video size={28} />}
           </button>
        )}
        <button className="p-5 rounded-full hover:bg-white/10 text-white transition-all">
          <Volume2 size={28} />
        </button>
        <div className="w-px h-10 bg-white/10" />
        <button onClick={onEnd} className="p-6 bg-red-600 hover:bg-red-500 rounded-full text-white shadow-lg shadow-red-500/30 transform active:scale-90 transition-all">
          <X size={32} strokeWidth={3} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-gold/30">
        End-to-End Encrypted via NJADI Bridge
      </div>
    </div>
  );
};

export default CallOverlay;

