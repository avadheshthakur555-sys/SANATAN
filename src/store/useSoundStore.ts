import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SoundState {
  isMuted: boolean;
  toggleMuted: () => void;
  setMuted: (muted: boolean) => void;
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      isMuted: false,
      toggleMuted: () => set((state) => ({ isMuted: !state.isMuted })),
      setMuted: (muted) => set({ isMuted: muted }),
    }),
    {
      name: 'sanatan-sound-storage', // unique localStorage key
    }
  )
);
