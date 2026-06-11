// src/lib/sacred-audio.ts — Om Sound Engine (Zero Dependencies)

import { useSoundStore } from '@/store/useSoundStore';

const PHI = 1.618033988749895;
const OM_BASE_HZ = 136.1;

export type SacredTone = 'om' | 'click' | 'success' | 'navigate' | 'error';

const FREQUENCIES: Record<SacredTone, number> = {
  om:       OM_BASE_HZ,                    // 136.1 Hz
  click:    OM_BASE_HZ * PHI,              // 220.2 Hz
  success:  OM_BASE_HZ * PHI * PHI,        // 356.2 Hz
  navigate: OM_BASE_HZ * Math.sqrt(PHI),   // 173.1 Hz
  error:    OM_BASE_HZ / PHI,              //  84.1 Hz
};

const DURATIONS: Record<SacredTone, number> = {
  om:       6.18,
  click:    0.1618,
  success:  0.382,
  navigate: 0.236,
  error:    0.618,
};

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
}

export function playTone(tone: SacredTone, volume = 0.15): void {
  // Check global mute state
  if (useSoundStore.getState().isMuted) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended (common browser security policy)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = tone === 'om' ? 'sine' : 'triangle';
  osc.frequency.value = FREQUENCIES[tone];

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + DURATIONS[tone]
  );

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + DURATIONS[tone]);
}

export function playOmChant(): void {
  // Check global mute state
  if (useSoundStore.getState().isMuted) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const duration = 6.18;

  // Layer 1: Base Om drone
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'sine';
  osc1.frequency.value = OM_BASE_HZ;

  // Layer 2: Harmonic overtone (φ ratio)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.value = OM_BASE_HZ * PHI;

  // Layer 3: Sub-harmonic (grounding)  
  const osc3 = ctx.createOscillator();
  const gain3 = ctx.createGain();
  osc3.type = 'sine';
  osc3.frequency.value = OM_BASE_HZ / PHI;

  // Envelope: swell in → sustain → fade out (like real Om)
  [gain1, gain2, gain3].forEach((g, i) => {
    const vol = i === 0 ? 0.2 : 0.06;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(vol, ctx.currentTime + duration * 0.236);
    g.gain.setValueAtTime(vol, ctx.currentTime + duration * 0.618);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  });

  const layers: [OscillatorNode, GainNode][] = [
    [osc1, gain1],
    [osc2, gain2],
    [osc3, gain3],
  ];

  layers.forEach(([o, g]) => {
    o.connect(g);
    g.connect(ctx.destination);
    o.start(ctx.currentTime);
    o.stop(ctx.currentTime + duration);
  });
}

// React Hook
export function useSacredSound() {
  const { isMuted, toggleMuted } = useSoundStore();
  return {
    isMuted,
    toggleMuted,
    playOm: () => playOmChant(),
    playClick: () => playTone('click'),
    playSuccess: () => playTone('success'),
    playNavigate: () => playTone('navigate'),
    playError: () => playTone('error'),
  };
}
