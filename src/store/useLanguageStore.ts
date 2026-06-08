import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'EN' | 'HI' | 'SA';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'EN',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'sanatan-language-storage', // unique name for localStorage key
    }
  )
);
