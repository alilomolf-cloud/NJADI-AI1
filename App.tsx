import React, { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Sidebar from './components/Sidebar';
import GeminiFAB from './components/GeminiFAB';
import ChatHub from './components/ChatHub';
import CallOverlay from './components/CallOverlay';
import { MoodProvider, useMood } from './components/MoodProvider';
import { Mood, Language, CallState } from './types';
import { ExternalLink, Key, Search, Plus, Smartphone, Settings as SettingsIcon, ShieldCheck } from 'lucide-react';
import Watermark from './components/Watermark';

const Dashboard = () => {
    const { themeStyles, language, setMood } = useMood();
    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
            <header className="flex justify-between items-end">
                <div className="space-y-1">
                    <h2 className="text-4xl font-extrabold tracking-tight" style={{ color: themeStyles.accent }}>
                        {language === Language.EN ? 'The Sovereign Hub' : 'المركز السيادي'}
                    </h2>
                    <p className="text-gray-500 font-medium">S24 Ultra Virtualized Ecosystem • 4 Containers Online</p>
                </div>
                <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
                    {[Mood.DEFAULT, Mood.COMEDY, Mood.BUSINESS].map((m) => (
                      <button 
                          key={m}
                          onClick={() => setMood(m)}
                          className="px-4 py-2 rounded-xl hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white"
                      >
                          {m}
                      </button>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'FB ALPHA', status: 'Secured', user: 'Primary Account', platform: 'facebook' },
                    { title: 'INSTA ELITE', status: 'Isolated', user: 'Business Manager', platform: 'instagram' },
                    { title: 'FB SHADOW', status: 'Ghost Mode', user: 'Ad Monitoring', platform: 'facebook' }
                ].map((acc, i) => (
                    <div key={i} className="relative bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:border-gold/50 transition-all cursor-pointer group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <ShieldCheck className="text-green-500/40" size={20} />
                        </div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                                <Smartphone size={32} className="text-gray-400 group-hover:text-gold" />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-green-500 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">LIVE</span>
                                <span className="text-[8px] text-gray-600 mt-2 font-mono">ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-black group-hover:text-gold transition-colors">{acc.title}</h3>
                        <p className="text-sm text-gray-500 font-medium">{acc.user}</p>
                        
                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(0,127,255,0.5)]" />
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Spoof Active</span>
                            </div>
                            <ExternalLink size={18} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                ))}
                <div className="border-2 border-dashed border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center group-hover:border-gold transition-colors">
                        <Plus size={32} className="text-gray-600 group-hover:text-gold" />
                    </div>
                    <span className="text-sm font-black text-gray-500 mt-4 uppercase tracking-[0.2em]">Deploy Instance</span>
                </div>
            </div>

            <section className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[3rem] p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="relative z-10 flex flex-col md:flex-row gap-10">
                    <div className="flex-1 space-y-6">
                        <h3 className="text-2xl font-black mb-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                                <Search className="text-blue-500" size={24} />
                            </div>
                            The Sovereign OS Engine
                        </h3>
                        <div className="space-y-4">
                            <p className="text-lg text-gray-300 leading-relaxed font-light italic">
                                "Alpha, your isolated Facebook environments are now running S24 Ultra hardware signatures. Anti-ban shields are at 100%. Recent activity in FB Instance 02 suggests a trend shift in your niche."
                            </p>
                            <div className="flex gap-4">
                                <button className="px-6 py-3 bg-white/5 rounded-2xl text-xs font-bold border border-white/10 hover:border-gold/50 transition-all">View Analytics</button>
                                <button className="px-6 py-3 bg-gold text-black rounded-2xl text-xs font-bold hover:scale-105 transition-all">Generate Strategy</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-80">
                        <Watermark imageUrl="https://images.unsplash.com/photo-1614850523296-e8c1d07ed6a4?q=80&w=800&auto=format&fit=crop" />
                    </div>
                </div>
            </section>
        </div>
    );
};

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
    const [apiKey, setApiKey] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        let interval: any;
        if (isListening) {
            interval = setInterval(async () => {
                try {
                    // Try to read clipboard
                    const text = await navigator.clipboard.readText();
                    if (text && text.trim().startsWith('AIza')) {
                        setApiKey(text.trim());
                        setIsListening(false);
                        // Auto-complete if key found
                        setTimeout(onComplete, 1000);
                    }
                } catch (e) {
                    // Fail silently, maybe permission not granted yet
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isListening, onComplete]);

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-['Montserrat']">
            <div className="max-w-md w-full bg-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] text-center space-y-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
                
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-gold/30 to-gold/5 flex items-center justify-center mx-auto mb-6 border border-gold/20 shadow-2xl shadow-gold/10">
                    <Key className="text-gold" size={40} />
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white tracking-tight">Access Sovereign Intelligence</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">NJADI AI requires a Gemini API Key to initialize the Wolf's intuition and adaptive UI engine.</p>
                </div>
                
                <div className="space-y-4">
                    <a 
                        href="https://aistudio.google.com/app/apikey" 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={() => setIsListening(true)}
                        className="group block w-full py-5 bg-gold text-black font-black rounded-2xl hover:bg-yellow-400 transition-all active:scale-95 shadow-xl shadow-gold/20 relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            OPEN API STUDIO
                            <ExternalLink size={18} />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </a>
                    
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <ShieldCheck size={18} className="text-gray-600 group-focus-within:text-gold transition-colors" />
                        </div>
                        <input 
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Paste AIza... core key here"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-12 text-center focus:outline-none focus:border-gold/50 text-white font-mono text-sm placeholder:text-gray-700 transition-all"
                        />
                    </div>

                    <button 
                        onClick={onComplete}
                        disabled={!apiKey}
                        className={`w-full py-5 font-black rounded-2xl transition-all uppercase tracking-[0.2em] shadow-2xl ${apiKey ? 'bg-blue-600 text-white shadow-blue-600/20' : 'bg-white/5 text-gray-700 cursor-not-allowed'}`}
                    >
                        Synchronize Core
                    </button>
                </div>
                
                <div className="pt-4 flex items-center justify-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-gold animate-pulse' : 'bg-white/10'}`} />
                    <span className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">
                        {isListening ? "Monitoring Clipboard Memory" : "Clipboard Observer Idle"}
                    </span>
                </div>
            </div>
        </div>
    );
}

const MainApp = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [call, setCall] = useState<CallState | null>(null);

    // Initial Splash Timer fallback if video fails
    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleCall = (type: 'voice' | 'video', partner: string) => {
        setCall({ isActive: true, type, partnerName: partner, duration: 0 });
    };

    if (showSplash) return <Splash onComplete={() => setShowSplash(false)} />;
    if (!isOnboarded) return <Onboarding onComplete={() => setIsOnboarded(true)} />;

    return (
        <div className="flex h-screen overflow-hidden bg-black font-['Montserrat']">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    {activeTab === 'dashboard' && <Dashboard />}
                    {activeTab === 'chat' && <ChatHub onCall={handleCall} />}
                    {activeTab !== 'dashboard' && activeTab !== 'chat' && (
                        <div className="flex items-center justify-center h-full text-gray-600 uppercase tracking-widest font-black text-xs">
                            Module {activeTab} coming soon...
                        </div>
                    )}
                </div>
            </main>
            <GeminiFAB />
            
            {call?.isActive && (
                <CallOverlay 
                    type={call.type} 
                    partner={call.partnerName} 
                    onEnd={() => setCall(null)} 
                />
            )}
        </div>
    );
};

const App: React.FC = () => {
  return (
    <MoodProvider>
        <MainApp />
    </MoodProvider>
  );
};

export default App;

