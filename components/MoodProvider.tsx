import React, { createContext, useContext, useState, useEffect } from 'react';
import { Mood, Language } from '../types';
import { COLORS } from '../constants';

interface MoodContextType {
  mood: Mood;
  setMood: (mood: Mood) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  themeStyles: {
    bg: string;
    accent: string;
    text: string;
    secondary: string;
  };
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mood, setMood] = useState<Mood>(Mood.DEFAULT);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [themeStyles, setThemeStyles] = useState({
    bg: COLORS.midnight,
    accent: COLORS.gold,
    text: '#ffffff',
    secondary: COLORS.azure
  });

  useEffect(() => {
    switch (mood) {
      case Mood.COMEDY:
        setThemeStyles({
          bg: COLORS.midnight,
          accent: COLORS.tangerine,
          text: '#ffffff',
          secondary: COLORS.gold
        });
        break;
      case Mood.BUSINESS:
        setThemeStyles({
          bg: COLORS.midnight,
          accent: COLORS.sapphire,
          text: '#ffffff',
          secondary: COLORS.silver
        });
        break;
      default:
        setThemeStyles({
          bg: COLORS.midnight,
          accent: COLORS.gold,
          text: '#ffffff',
          secondary: COLORS.azure
        });
    }
  }, [mood]);

  return (
    <MoodContext.Provider value={{ mood, setMood, language, setLanguage, themeStyles }}>
      <div className={language === Language.AR ? 'rtl' : ''} style={{ color: themeStyles.text }}>
        {children}
      </div>
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) throw new Error("useMood must be used within a MoodProvider");
  return context;
};

