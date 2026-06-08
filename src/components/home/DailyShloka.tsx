"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Share2, Copy, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { useSacredSound } from "@/lib/sacred-audio";

interface Shloka {
  id: string;
  source: string;
  verse: string;
  transliteration: string;
  translationHi: string;
  translationEn: string;
}

const PRELOADED_SHLOKAS: Shloka[] = [
  {
    id: "BG-02-47",
    source: "भगवद्गीता २.४७ (Bhagavad Gita 2.47)",
    verse: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi",
    translationHi: "कर्म करने में ही तुम्हारा अधिकार है, उसके फलों में कभी नहीं। तुम कर्मों के फल का हेतु मत बनो और तुम्हारी अकर्मण्यता में आसक्ति न हो।",
    translationEn: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inactive duty.",
  },
  {
    id: "BG-04-07",
    source: "भगवद्गीता ४.७ (Bhagavad Gita 4.7)",
    verse: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham",
    translationHi: "हे भारत (अर्जुन)! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं अपने साकार रूप को प्रकट करता हूँ।",
    translationEn: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Bharata, at that time I manifest Myself.",
  },
  {
    id: "ISHA-01",
    source: "ईशोपनिषद् १ (Isha Upanishad 1)",
    verse: "ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम्॥",
    transliteration: "īśā vāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat |\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasyasvid dhanam",
    translationHi: "ब्रह्मांड में जो कुछ भी गतिशील या स्थिर है, वह सब ईश्वर द्वारा व्याप्त है। अतः त्याग भाव से उपभोग करो, किसी के धन की लालसा मत करो।",
    translationEn: "Everything animate or inanimate that is within the universe is controlled and owned by the Lord. One should therefore accept only those things necessary for oneself, and not covet other's wealth.",
  }
];

const DailyShloka = memo(() => {
  const [shloka, setShloka] = useState<Shloka | null>(null);
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { playOm, playSuccess } = useSacredSound();

  useEffect(() => {
    // Select daily shloka deterministically using day of the month
    const day = new Date().getDate();
    const index = day % PRELOADED_SHLOKAS.length;
    setShloka(PRELOADED_SHLOKAS[index]);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    if (!shloka) return;
    const textToCopy = `${shloka.verse}\n\n${shloka.transliteration}\n\nHI: ${shloka.translationHi}\n\nEN: ${shloka.translationEn}\n\nSource: ${shloka.source}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      playSuccess();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Could not copy shloka", e);
    }
  };

  const handleListen = () => {
    if (!shloka) return;
    
    // 1. Play the Om chant drone first
    playOm();

    // 2. TTS for Sanskrit/English text after a small delay
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(shloka.translationEn);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }, 1500);
    }
  };

  const handleShare = () => {
    if (!shloka) return;
    playSuccess();
    if (navigator.share) {
      navigator.share({
        title: "Daily Shloka",
        text: `${shloka.verse}\n- ${shloka.source}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback
      alert("Sharing link copied!");
    }
  };

  if (!shloka) return null;

  return (
    <section 
      ref={sectionRef}
      className={`py-phi-3xl bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)] border-t border-[var(--border-gold)] transition-all duration-618 ease-divine select-none ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="max-w-4xl mx-auto px-phi-lg flex flex-col items-center text-center">
        
        {/* Decorative Top Line */}
        <div className="flex items-center gap-phi-md w-full mb-phi-xl">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[var(--accent-gold)] opacity-40" />
          <span className="text-phi-lg text-[var(--accent-gold)]">📿</span>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[var(--accent-gold)] opacity-40" />
        </div>

        {/* Title Label */}
        <span className="font-heading text-phi-sm md:text-phi-base uppercase tracking-wider text-[var(--accent-saffron)] font-bold mb-phi-lg">
          आज का श्लोक &mdash; Verse of the Day
        </span>

        {/* Content Container (fades in with delay) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.618, delay: 0.382 }}
          className="w-full max-w-3xl mx-auto space-y-phi-lg text-center"
        >
          {/* Sanskrit Shloka */}
          <p className="font-sanskrit text-phi-lg md:text-phi-xl text-[var(--text-sanskrit)] dark:text-[var(--accent-gold)] leading-relaxed ag-sanskrit whitespace-pre-line px-phi-lg font-bold w-full">
            {shloka.verse}
          </p>

          {/* IAST Transliteration */}
          <p className="font-body text-phi-sm md:text-phi-base text-[var(--text-secondary)] italic leading-relaxed whitespace-pre-line px-phi-lg w-full">
            {shloka.transliteration}
          </p>

          {/* Horizontal divider */}
          <div className="w-[108px] h-[1px] bg-[var(--border-gold)] mx-auto my-phi-sm" />

          {/* Hindi Translation */}
          <p className="font-body text-phi-base text-[var(--text-primary)] leading-relaxed max-w-2xl px-phi-md mx-auto w-full">
            <span className="font-bold text-[var(--accent-saffron)] mr-[4px]">हिन्दी:</span>
            {shloka.translationHi}
          </p>

          {/* English Translation */}
          <p className="font-body text-phi-sm md:text-phi-base text-[var(--text-secondary)] leading-relaxed max-w-2xl px-phi-md mx-auto w-full">
            <span className="font-bold text-[var(--accent-gold)] mr-[4px]">English:</span>
            {shloka.translationEn}
          </p>

          {/* Source Reference */}
          <span className="font-heading text-phi-sm md:text-phi-base font-bold text-[var(--accent-gold)] mt-phi-sm block mx-auto">
            {shloka.source}
          </span>
        </motion.div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-center gap-phi-md mt-phi-2xl z-10 w-full">
          <Button 
            variant="gold" 
            size="sm" 
            onClick={handleListen}
            className="flex items-center gap-phi-xs font-semibold"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen Chant</span>
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleShare}
            className="flex items-center gap-phi-xs text-[var(--text-secondary)] border border-[var(--border-gold)] hover:bg-[rgba(212,160,23,0.06)]"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy}
            className="flex items-center gap-phi-xs text-[var(--text-secondary)] border border-[var(--border-gold)] hover:bg-[rgba(212,160,23,0.06)] min-w-[90px]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>

        {/* Decorative Bottom Line */}
        <div className="flex items-center gap-phi-md w-full mt-phi-xl">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[var(--accent-gold)] opacity-40" />
          <span className="text-phi-lg text-[var(--accent-gold)]">📿</span>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[var(--accent-gold)] opacity-40" />
        </div>

      </div>
    </section>
  );
});

DailyShloka.displayName = "DailyShloka";
export default DailyShloka;
