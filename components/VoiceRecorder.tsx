
import React, { useState, useRef } from 'react';
import { Mic, Square, Trash2, Send } from 'lucide-react';
import { useMood } from './MoodProvider';

interface VoiceRecorderProps {
  onSend: (blob: Blob) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onSend }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerInterval = useRef<number | null>(null);
  const chunks = useRef<Blob[]>([]);
  const { themeStyles } = useMood();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/ogg; codecs=opus' });
        chunks.current = [];
        onSend(blob);
      };
      
      mediaRecorder.current.start();
      setIsRecording(true);
      setDuration(0);
      timerInterval.current = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
    if (timerInterval.current) clearInterval(timerInterval.current);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10 w-full">
      {isRecording ? (
        <>
          <div className="flex-1 flex items-center gap-3 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm font-mono">{formatTime(duration)}</span>
            <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${(duration % 60) * 1.6}%` }} />
            </div>
          </div>
          <button onClick={stopRecording} className="p-2 bg-white/10 rounded-full hover:bg-red-500/20 text-red-500">
            <Square size={20} />
          </button>
        </>
      ) : (
        <>
          <button 
            onMouseDown={startRecording} 
            onTouchStart={startRecording}
            className="p-3 bg-white/10 rounded-full hover:bg-gold/20 text-gold transition-all"
            title="Hold to record"
          >
            <Mic size={24} />
          </button>
          <div className="flex-1 text-gray-500 text-sm italic">Press and hold to send vocal...</div>
        </>
      )}
    </div>
  );
};
