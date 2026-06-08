import React, { memo } from "react";

export interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading = memo<SectionHeadingProps>(({ children, className = "" }) => {
  return (
    <div className={`flex items-center justify-center gap-phi-lg py-phi-xl select-none ${className}`}>
      <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[var(--accent-gold)] opacity-40" />
      <div className="flex items-center gap-phi-sm font-heading text-phi-2xl md:text-phi-3xl font-bold bg-gradient-to-r from-[var(--accent-saffron)] via-[var(--accent-gold)] to-[#FBBF24] bg-clip-text text-transparent">
        <span className="text-phi-xl drop-shadow-[0_0_8px_rgba(212,160,23,0.3)]">🕉️</span>
        <h2 className="px-phi-xs uppercase tracking-[0.0618em]">{children}</h2>
        <span className="text-phi-xl drop-shadow-[0_0_8px_rgba(212,160,23,0.3)]">🕉️</span>
      </div>
      <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[var(--accent-gold)] opacity-40" />
    </div>
  );
});

SectionHeading.displayName = "SectionHeading";
export default SectionHeading;
