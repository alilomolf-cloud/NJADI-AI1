import React from 'react';
import { useMood } from './MoodProvider';
import { LayoutDashboard, Users, MessageSquare, Settings, ShieldAlert, Zap } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { themeStyles, language } = useMood();
  
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, labelEn: 'Dashboard', labelAr: 'لوحة القيادة' },
    { id: 'accounts', icon: Users, labelEn: 'Accounts', labelAr: 'الحسابات' },
    { id: 'chat', icon: MessageSquare, labelEn: 'Chat Hub', labelAr: 'مركز الدردشة' },
    { id: 'sandbox', icon: ShieldAlert, labelEn: 'Sandbox', labelAr: 'صندوق الرمل' },
    { id: 'settings', icon: Settings, labelEn: 'Settings', labelAr: 'الإعدادات' },
  ];

  return (
    <div 
      className={`w-20 md:w-64 h-screen border-r border-white/10 flex flex-col transition-all duration-300`}
      style={{ backgroundColor: themeStyles.bg }}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center shadow-lg shadow-gold/20">
            <Zap className="text-black" size={20} />
        </div>
        <span className="hidden md:block text-xl font-bold tracking-tight" style={{ color: themeStyles.accent }}>NJADI AI</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-white/5 shadow-inner' 
                : 'hover:bg-white/5'
            }`}
          >
            <item.icon 
              size={22} 
              style={{ color: activeTab === item.id ? themeStyles.accent : 'gray' }}
              className="group-hover:scale-110 transition-transform"
            />
            <span className={`hidden md:block font-medium ${activeTab === item.id ? 'text-white' : 'text-gray-500'}`}>
              {language === 'en' ? item.labelEn : item.labelAr}
            </span>
            {activeTab === item.id && (
              <div 
                className="ml-auto w-1 h-6 rounded-full hidden md:block" 
                style={{ backgroundColor: themeStyles.accent }}
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-gradient-to-r from-white/5 to-transparent p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500" />
          <div className="hidden md:block overflow-hidden">
            <p className="text-xs font-bold truncate">Premium User</p>
            <p className="text-[10px] text-gray-500 truncate">S24 Ultra Native</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

