import React, { memo } from "react";
import Link from "next/link";

const Footer = memo(() => {
  return (
    <footer className="relative bg-black text-white/70 border-t border-[var(--border-gold)] pt-16 pb-12 overflow-hidden select-none z-10">
      {/* Om Symbol Watermark */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-bold text-white/2 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        🕉️
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 4-column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Logo & Subtitle */}
          <div className="flex flex-col gap-4">
            <Link 
              href="/"
              className="flex flex-col gap-1 hover:opacity-90 transition-opacity duration-382 no-underline"
            >
              <span className="font-serif text-3xl font-extrabold text-[var(--accent-saffron)] tracking-widest leading-none">
                सनातन
              </span>
              <span className="text-[10px] tracking-widest text-[var(--accent-gold)] font-bold font-sans uppercase">
                THE ETERNAL PATH
              </span>
            </Link>
            <p className="text-xs md:text-sm leading-relaxed text-white/60">
              Preserving and presenting the timeless wisdom of Sanatan Dharma. 
              Built in harmony with φ (Golden Ratio) and ॐ (Cosmic Frequency) principles.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">Explore</h4>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0 text-white/70 text-sm">
              {[
                { label: "Scriptures", href: "/library" },
                { label: "Temples & Atlas", href: "/temples" },
                { label: "Deities", href: "/deities" },
                { label: "Yugas Timeline", href: "/history" }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="hover:text-[var(--accent-gold)] transition-colors duration-382 no-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Directories & Rituals */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">Portals</h4>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0 text-white/70 text-sm">
              {[
                { label: "Rituals & Vidhi", href: "/rituals" },
                { label: "Sages & Rishis", href: "/sages" },
                { label: "Downloads Center", href: "/downloads" },
                { label: "Deities Directory", href: "/deities" }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="hover:text-[var(--accent-gold)] transition-colors duration-382 no-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">Contact & Legal</h4>
            <div className="flex flex-col gap-2 text-xs md:text-sm text-white/70">
              <span>📧 contact@sanatanencyclopaedia.org</span>
              <span>🕊️ Twitter/X: @SanatanEncyclopaedia</span>
            </div>
            <div className="flex gap-4 text-xs mt-2 text-white/50">
              <Link href="/library" className="hover:underline text-white/60">Privacy Policy</Link>
              <span>&bull;</span>
              <Link href="/library" className="hover:underline text-white/60">Terms of Service</Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Sanatan Encyclopaedia. All Rights Reserved.</p>
          <p className="flex items-center gap-1 select-none text-white/60">
            Built with <span className="text-[var(--accent-saffron)]">🕉️</span> for <span className="font-bold text-[var(--accent-gold)]">Dharma</span>
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
