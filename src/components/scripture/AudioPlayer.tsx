"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { useSacredSound } from "@/lib/sacred-audio";

export interface AudioPlayerProps {
  audioUrl: string;
  verseText?: string;
}

const AudioPlayer = memo<AudioPlayerProps>(({ verseText }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const { playClick, playOm } = useSacredSound();
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handlePlayPause = () => {
    playClick();
    if (isPlaying) {
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playOm();
      
      if (typeof window !== "undefined" && "speechSynthesis" in window && verseText) {
        // Strip out Sanskrit symbols and numbers for cleaner TTS
        const cleanText = verseText.replace(/[०-९।॥\d\.]/g, "");
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.lang = "hi-IN";
          utterance.rate = playbackRate * 0.7;
          utterance.pitch = 0.95;
          utterance.onend = () => {
            setIsPlaying(false);
          };
          synthRef.current = utterance;
          window.speechSynthesis.speak(utterance);
        }, 1200);
      } else {
        setTimeout(() => setIsPlaying(false), 3000);
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    playClick();
    setPlaybackRate(speed);
    if (isPlaying && typeof window !== "undefined" && synthRef.current) {
      window.speechSynthesis.cancel();
      const cleanText = verseText?.replace(/[०-९।॥\d\.]/g, "") || "";
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "hi-IN";
      utterance.rate = speed * 0.7;
      utterance.pitch = 0.95;
      utterance.onend = () => {
        setIsPlaying(false);
      };
      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-phi-md bg-[var(--bg-secondary)] border border-[var(--border-gold)]/40 px-phi-md py-phi-xs rounded-full select-none">
      {/* Play/Pause */}
      <button
        onClick={handlePlayPause}
        className="w-[28px] h-[28px] rounded-full bg-[var(--accent-saffron)] hover:bg-orange-600 text-white flex items-center justify-center cursor-pointer outline-none transition-all duration-382 active:scale-95 shadow-divine-sm"
        aria-label={isPlaying ? "Pause Recitation" : "Play Recitation"}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current pl-[1px]" />}
      </button>

      {/* Title */}
      <div className="flex items-center gap-phi-xs text-[var(--accent-gold)] text-phi-xs font-semibold">
        <Volume2 className="w-3.5 h-3.5" />
        <span>Chant Player</span>
      </div>

      {/* Speed Controls */}
      <div className="flex items-center gap-[4px]">
        {[0.5, 1.0, 1.5].map((speed) => {
          const isActive = playbackRate === speed;
          return (
            <button
              key={speed}
              onClick={() => handleSpeedChange(speed)}
              className={`px-phi-xs py-[2px] rounded-phi-sm text-[10px] font-bold font-mono transition-all duration-382 outline-none cursor-pointer border ${
                isActive
                  ? "bg-[var(--accent-gold)]/20 border-[var(--accent-gold)] text-[var(--accent-gold)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {speed}x
            </button>
          );
        })}
      </div>
    </div>
  );
});

AudioPlayer.displayName = "AudioPlayer";
export default AudioPlayer;
