"use client";

import React, { memo } from "react";

const OmLoader = memo(() => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--bg-primary)] z-50">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes om-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes om-breath {
            0%, 100% { 
              transform: scale(1); 
              filter: drop-shadow(0 0 10px rgba(212, 160, 23, 0.3)); 
            }
            50% { 
              transform: scale(1.618); 
              filter: drop-shadow(0 0 30px rgba(212, 160, 23, 0.8)); 
            }
          }
          .om-spinner {
            display: inline-block;
            font-size: 6.854rem;
            color: var(--accent-gold);
            animation: om-spin 2.6451s linear infinite; /* 360 deg / 136.1 deg/s = 2.6451s */
          }
          .om-breath-container {
            animation: om-breath 6.18s ease-in-out infinite;
          }
        `
      }} />
      <div className="om-breath-container flex items-center justify-center">
        <div className="om-spinner select-none">🕉️</div>
      </div>
      <p className="mt-phi-2xl font-heading text-phi-lg text-[var(--accent-gold)] tracking-wide animate-pulse">
        Loading Sacred Knowledge...
      </p>
    </div>
  );
});

OmLoader.displayName = "OmLoader";
export default OmLoader;
