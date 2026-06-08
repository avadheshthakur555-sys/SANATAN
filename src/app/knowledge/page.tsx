"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, Activity, Key, Flame } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useSacredSound } from "@/lib/sacred-audio";

interface ConceptData {
  titleSanskrit: string;
  titleEnglish: string;
  shloka: string;
  transliteration: string;
  translationHindi: string;
  translationEnglish: string;
  summary: string;
  pillars: { title: string; desc: string }[];
  accentColor: string;
}

const CONCEPTS: Record<string, ConceptData> = {
  dharma: {
    titleSanskrit: "धर्म",
    titleEnglish: "Dharma",
    shloka: "यतोऽभ्युदयनिःश्रेयससिद्धिः स धर्मः ॥",
    transliteration: "yato'bhyudayaniḥśreyasasiddhiḥ sa dharmaḥ ||",
    translationHindi: "जिससे लौकिक उन्नति (अभ्युदय) और पारलौकिक कल्याण (निःश्रेयस) की सिद्धि होती है, वही धर्म है।",
    translationEnglish: "That from which results the achievement of both material prosperity (Abhyudaya) and ultimate spiritual liberation (Nihshreyasa), is Dharma.",
    summary: "Dharma is the cosmic order, righteousness, moral duty, and the essential nature of existence. It is not mere ritual or belief, but the fundamental law that sustains life and holds the universe together.",
    pillars: [
      { title: "Satya (Truth)", desc: "Commitment to truthfulness in thought, speech, and action." },
      { title: "Daya (Compassion)", desc: "Empathy towards all living beings, recognizing the divine spark in everyone." },
      { title: "Dana (Charity)", desc: "Generosity and sharing of resources to uplift the underprivileged." },
      { title: "Shaucha (Purity)", desc: "Cleanliness of body, mind, intellect, and spiritual intent." }
    ],
    accentColor: "#FFD700"
  },
  karma: {
    titleSanskrit: "कर्म",
    titleEnglish: "Karma",
    shloka: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
    transliteration: "karmaṇyevādhikāraste mā phaleṣu kadācana |\nmā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||",
    translationHindi: "तुम्हारा अधिकार केवल कर्म करने पर है, उसके फलों पर कभी नहीं। तुम कर्मों के फल की वासना वाले मत बनो और तुम्हारी अकर्मण्यता में भी आसक्ति न हो।",
    translationEnglish: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Let not the fruits of action be your motive, nor let your attachment be to inaction.",
    summary: "Karma is the law of cause and effect. Every action generates a force of energy that returns to us in like kind. It emphasizes personal accountability, indicating that our choices shape our destiny.",
    pillars: [
      { title: "Sanchita Karma", desc: "The accumulated store of past actions waiting to bear fruit." },
      { title: "Prarabdha Karma", desc: "The portion of past karma currently being experienced in the present life." },
      { title: "Agami Karma", desc: "The actions being performed now that will bear fruit in the future." },
      { title: "Nishkama Karma", desc: "Selfless action performed without attachment to personal reward." }
    ],
    accentColor: "#F97316"
  },
  moksha: {
    titleSanskrit: "मोक्ष",
    titleEnglish: "Moksha",
    shloka: "तद्विष्णोः परमं पदं सदा पश्यन्ति सूरयः ।",
    transliteration: "tadviṣṇoḥ paramaṁ padaṁ sadā paśyanti sūrayaḥ |",
    translationHindi: "बुद्धिमान् ज्ञानी पुरुष सदा परमात्मा के उस परम पद (मोक्ष) को देखते हैं जो आकाश के समान व्यापक है।",
    translationEnglish: "The wise seers always behold that supreme abode of the divine (Vishnu) in eternal liberation, which is all-pervading like space.",
    summary: "Moksha is liberation from the endless cycle of birth, death, and rebirth (Samsara). It is the realization of the absolute identity of the individual soul (Atman) with the Supreme Reality (Brahman).",
    pillars: [
      { title: "Viveka (Discrimination)", desc: "Distinguishing between the eternal reality and the transient world." },
      { title: "Vairagya (Dispassion)", desc: "Detachment from sensory pleasures and temporary worldly rewards." },
      { title: "Mumukshutva (Yearning)", desc: "An intense desire for spiritual liberation and self-realization." },
      { title: "Sadhana (Practice)", desc: "Persistent spiritual effort through meditation, devotion, or wisdom." }
    ],
    accentColor: "#E9D5FF"
  },
  yoga: {
    titleSanskrit: "योग",
    titleEnglish: "Yoga",
    shloka: "योगश्चित्तवृत्तिनिरोधः ॥",
    transliteration: "yogaścittavṛttinirodhaḥ ||",
    translationHindi: "चित्त की वृत्तियों (विचारों के उतार-चढ़ाव) को रोकना ही योग है।",
    translationEnglish: "Yoga is the intentional restraint of the modifications of the mind-stuff.",
    summary: "Yoga is the union of the individual consciousness with the universal consciousness. It comprises systematic paths of mental control, physical discipline, and devotion designed to achieve spiritual liberation.",
    pillars: [
      { title: "Jnana Yoga", desc: "The path of wisdom, self-inquiry, and intellectual realization." },
      { title: "Bhakti Yoga", desc: "The path of absolute love, devotion, and surrender to the Divine." },
      { title: "Karma Yoga", desc: "The path of selfless action, duty, and service to humanity." },
      { title: "Raja Yoga", desc: "The path of meditation, breath control, and eight-fold mental discipline (Ashtanga)." }
    ],
    accentColor: "#3B82F6"
  }
};

function KnowledgePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams ? searchParams.get("tab") : null;
  
  const [activeTab, setActiveTab] = useState<"dharma" | "karma" | "moksha" | "yoga">("dharma");
  const { playClick, playSuccess } = useSacredSound();

  useEffect(() => {
    requestAnimationFrame(() => {
      if (tabParam && (tabParam === "dharma" || tabParam === "karma" || tabParam === "moksha" || tabParam === "yoga")) {
        setActiveTab(tabParam);
      }
    });
  }, [tabParam]);

  const handleTabChange = (tab: "dharma" | "karma" | "moksha" | "yoga") => {
    playClick();
    setActiveTab(tab);
    router.replace(`/knowledge?tab=${tab}`);
  };

  const activeData = CONCEPTS[activeTab];

  const tabList = [
    { id: "dharma", label: "Dharma", icon: <Sparkles className="w-4 h-4" /> },
    { id: "karma", label: "Karma", icon: <Activity className="w-4 h-4" /> },
    { id: "moksha", label: "Moksha", icon: <Key className="w-4 h-4" /> },
    { id: "yoga", label: "Yoga", icon: <Flame className="w-4 h-4" /> }
  ] as const;

  return (
    <div className="flex flex-col min-h-screen bg-[#050508] text-[#F5F0E8] select-text">
      
      <Breadcrumb items={[{ label: "Knowledge" }]} />
      
      {/* Hero Header */}
      <section className="w-full pt-4 pb-8 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] bg-clip-text text-transparent leading-normal tracking-wide">
          चतुर्विध पुरुषार्थ
        </h1>
        <h2 className="text-lg md:text-xl text-[#9CA3AF] mt-2 font-serif">
          The Pillars of Vedic Life and Philosophy
        </h2>
        <p className="text-xs md:text-sm text-[#9CA3AF] mt-4 leading-relaxed max-w-2xl mx-auto">
          Delve into the core systems of cosmic order, moral duties, action, meditation, and ultimate liberation that form the basis of Sanatan Dharma.
        </p>
      </section>

      {/* Tab Switcher */}
      <div className="flex justify-center border-b border-[#B8860B15] pb-1 max-w-md mx-auto w-full px-4 mb-10">
        {tabList.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-grow flex items-center justify-center gap-1.5 py-3 text-xs md:text-sm font-semibold uppercase tracking-wider transition-all border-b-2 cursor-pointer outline-none
                ${isActive
                  ? "border-[#FFD700] text-[#FFD700] font-bold"
                  : "border-transparent text-[#9CA3AF] hover:text-white"
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Philosophy Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 w-full pb-20">
        <div 
          className="bg-[#0F0F14] border border-[#B8860B20] rounded-2xl p-6 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-500"
          style={{ borderLeft: `4px solid ${activeData.accentColor}` }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8860B03] rounded-full blur-3xl pointer-events-none" />

          {/* Sanskrit Header Title */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1 mb-8">
            <span className="font-sanskrit text-4xl md:text-5xl text-[#FFD700] font-bold tracking-wide drop-shadow-md">
              {activeData.titleSanskrit}
            </span>
            <h3 className="text-2xl md:text-3xl text-white font-serif font-bold uppercase tracking-wider">
              {activeData.titleEnglish}
            </h3>
          </div>

          {/* Sanskrit Shloka Block */}
          <div className="bg-black/40 border border-[#B8860B25] rounded-xl p-5 md:p-8 flex flex-col items-center text-center gap-4 mb-8">
            <span className="text-[10px] text-[#B8860B] uppercase font-mono tracking-widest">Sanskrit Shloka</span>
            <p className="font-sanskrit text-[#FFD700] text-xl md:text-2xl leading-loose whitespace-pre-line drop-shadow-md">
              {activeData.shloka}
            </p>
            <p className="text-[#9CA3AF] text-xs md:text-sm leading-relaxed italic border-t border-[#B8860B15] pt-4 w-full">
              {activeData.transliteration}
            </p>
          </div>

          {/* Translations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 select-text">
            <div className="bg-black/20 border border-[#B8860B10] rounded-xl p-5">
              <h4 className="text-[#B8860B] text-xs font-mono uppercase tracking-wider mb-2">हिंदी अनुवाद</h4>
              <p className="text-sm text-[#F5F0E8] leading-relaxed">
                {activeData.translationHindi}
              </p>
            </div>
            <div className="bg-black/20 border border-[#B8860B10] rounded-xl p-5">
              <h4 className="text-[#B8860B] text-xs font-mono uppercase tracking-wider mb-2">English Translation</h4>
              <p className="text-sm text-[#F5F0E8] leading-relaxed">
                {activeData.translationEnglish}
              </p>
            </div>
          </div>

          {/* Conceptual Summary */}
          <div className="border-t border-[#B8860B15] pt-6 mb-8">
            <h4 className="text-white text-base font-serif font-bold mb-3">Philosophical Concept</h4>
            <p className="text-[#9CA3AF] text-sm md:text-base leading-relaxed">
              {activeData.summary}
            </p>
          </div>

          {/* Columns/Pillars/Divisions */}
          <div>
            <h4 className="text-white text-base font-serif font-bold mb-4">Core Pillars & Classifications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeData.pillars.map((pillar, idx) => (
                <div key={idx} className="bg-black/40 border border-[#B8860B15] hover:border-[#FFD70040] rounded-xl p-4 transition-all duration-300">
                  <span className="text-[#FFD700] text-sm font-semibold block">{pillar.title}</span>
                  <p className="text-[#9CA3AF] text-xs leading-relaxed mt-1">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function KnowledgePage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-[#050508] text-[#F5F0E8] items-center justify-center">
        <span className="text-[#FFD700] font-sanskrit text-2xl animate-pulse">ॐ</span>
      </div>
    }>
      <KnowledgePageContent />
    </Suspense>
  );
}
