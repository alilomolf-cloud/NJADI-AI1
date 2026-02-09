
import React, { useState } from 'react';
import { useMood } from './MoodProvider';
import { Phone, Video, MoreVertical, Image as ImageIcon, Paperclip, Send, Trash2, Edit2, CheckCheck } from 'lucide-react';
import { VoiceRecorder } from './VoiceRecorder';
import { Message } from '../types';

interface ChatHubProps {
  onCall: (type: 'voice' | 'video', partner: string) => void;
}

const ChatHub: React.FC<ChatHubProps> = ({ onCall }) => {
  const { themeStyles, language } = useMood();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', accountId: 'fb1', sender: 'Jane Doe', content: 'Did you see the latest report?', timestamp: Date.now() - 100000, type: 'text', status: 'read' },
    { id: '2', accountId: 'fb1', sender: 'Alpha (You)', content: 'I am checking it now.', timestamp: Date.now() - 50000, type: 'text', status: 'delivered' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      accountId: 'fb1',
      sender: 'Alpha (You)',
      content: inputText,
      timestamp: Date.now(),
      type: 'text',
      status: 'sent'
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-[#080808]">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-yellow-600 p-[2px]">
            <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Jane+Doe&background=transparent&color=d4af37" alt="Contact" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">Jane Doe</h3>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online • FB Instance 01</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onCall('voice', 'Jane Doe')} className="p-3 hover:bg-white/5 rounded-xl transition-colors text-white/60 hover:text-gold">
            <Phone size={20} />
          </button>
          <button onClick={() => onCall('video', 'Jane Doe')} className="p-3 hover:bg-white/5 rounded-xl transition-colors text-white/60 hover:text-gold">
            <Video size={20} />
          </button>
          <button className="p-3 hover:bg-white/5 rounded-xl transition-colors text-white/60">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender.includes('You') ? 'items-end' : 'items-start'} group`}>
            <div className={`max-w-[80%] p-4 rounded-3xl relative ${msg.sender.includes('You') ? 'bg-gold text-black' : 'bg-white/5 text-white'}`}>
              <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
              
              {msg.sender.includes('You') && (
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button onClick={() => deleteMessage(msg.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">
                    <Trash2 size={14} />
                  </button>
                  <button className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20">
                    <Edit2 size={14} />
                  </button>
                </div>
              )}

              <div className={`mt-2 flex items-center gap-2 text-[9px] uppercase font-bold tracking-tighter ${msg.sender.includes('You') ? 'text-black/40' : 'text-white/20'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.sender.includes('You') && <CheckCheck size={12} className={msg.status === 'read' ? 'text-blue-700' : 'text-black/40'} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/5 space-y-4">
        <VoiceRecorder onSend={(blob) => console.log('Vocal recorded', blob)} />
        
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center bg-white/5 rounded-3xl px-6 py-2 border border-white/10">
            <button className="p-2 text-gray-500 hover:text-gold transition-colors"><ImageIcon size={20} /></button>
            <button className="p-2 text-gray-500 hover:text-gold transition-colors mr-2"><Paperclip size={20} /></button>
            <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={language === 'en' ? "Write a message..." : "اكتب رسالة..."} 
              className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2"
            />
          </div>
          <button 
            onClick={handleSend}
            className="w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-gold/20"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHub;
