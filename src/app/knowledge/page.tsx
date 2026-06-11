"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, BookOpen, Quote, Scroll } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useSacredSound } from "@/lib/sacred-audio";
import { motion, AnimatePresence } from "framer-motion";

interface ConceptSection {
  subtitle: string;
  subtitleSanskrit?: string;
  content: string;
  items?: { title: string; desc: string }[];
}

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
  image: string; // Double exposure image path
  cursiveSubhead: string;
  deepDive: {
    title: string;
    sections: ConceptSection[];
  };
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
    cursiveSubhead: "The Cosmic Order & Righteousness",
    image: "/images/knowledge/dharma.png",
    pillars: [
      { title: "Satya (Truth)", desc: "Commitment to truthfulness in thought, speech, and action." },
      { title: "Daya (Compassion)", desc: "Empathy towards all living beings, recognizing the divine spark." },
      { title: "Dana (Charity)", desc: "Generosity and sharing of resources to uplift others." },
      { title: "Shaucha (Purity)", desc: "Cleanliness of body, mind, intellect, and spiritual intent." }
    ],
    accentColor: "#FFD700",
    deepDive: {
      title: "शास्त्रीय विवेचन एवं आचरण (Scriptural Treatise & Conduct)",
      sections: [
        {
          subtitle: "Vedic Classifications of Dharma",
          subtitleSanskrit: "धर्म-वर्गीकरण",
          content: "Dharma is not static; it is multidimensional and scales from the universal to the deeply personal, adapting to cosmic cycles and individual capacities.",
          items: [
            { title: "Sanatana Dharma (सनातन धर्म)", desc: "The eternal, universal laws (truth, non-violence, purity, compassion) that apply to all living souls across time." },
            { title: "Svadharma (स्वधर्म)", desc: "Personal duty unique to an individual's innate nature (Guna) and life circumstances." },
            { title: "Varnashrama Dharma (वर्णाश्रम धर्म)", desc: "Duties aligned with one's psychological temperament (Varna) and stage of life (Ashrama: Student, Householder, Hermit, Renunciate)." },
            { title: "Yuga Dharma (युग धर्म)", desc: "The spiritual practices recommended and most effective for the current cosmic era (e.g., Nama-Sankirtana in Kali Yuga)." },
            { title: "Apad-dharma (आपद्धर्म)", desc: "Exceptional conduct permitted during emergencies or extreme life-threatening distress." }
          ]
        },
        {
          subtitle: "Pursuing and Protecting Dharma",
          subtitleSanskrit: "धर्मो रक्षति रक्षितः",
          content: "The Upanishads and Epics proclaim 'धर्मो रक्षति रक्षितः' (Dharma protects those who protect it). To protect Dharma, we must live it. It is not defended by arguments, but preserved through practice in daily life.",
          items: [
            { title: "Satyam Vada (सत्यभाषण)", desc: "Speaking the truth with kindness. Sages say: speak truth, speak what is pleasing, but do not speak truth harshly." },
            { title: "Mitahara (मिताहार)", desc: "Pure, moderate, and plant-based nutrition that keeps the physical body and subtle mind clean and calm." },
            { title: "Ishvara Pranidhana (ईश्वर-प्रणिधान)", desc: "Regular prayer, self-study (Svadhyaya), and daily remembrance of the divine spark in all beings." },
            { title: "Seva (निःस्वार्थ सेवा)", desc: "Offering selfless service to uplift society, care for the needy, and protect nature." }
          ]
        }
      ]
    }
  },
  karma: {
    titleSanskrit: "कर्म",
    titleEnglish: "Karma",
    shloka: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
    transliteration: "karmaṇyevādhikāraste mā phaleṣu kadācena |\nmā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||",
    translationHindi: "तुम्हारा अधिकार केवल कर्म करने पर है, उसके फलों पर कभी नहीं। तुम कर्मों के फल की वासना वाले मत बनो और तुम्हारी अकर्मण्यता में भी आसक्ति न हो।",
    translationEnglish: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Let not the fruits of action be your motive, nor let your attachment be to inaction.",
    summary: "Karma is the law of cause and effect. Every action generates a force of energy that returns to us in like kind. It emphasizes personal accountability, indicating that our choices shape our destiny.",
    cursiveSubhead: "The Law of Actions & Consequence",
    image: "/images/knowledge/artha.png",
    pillars: [
      { title: "Sanchita Karma", desc: "The accumulated store of past actions waiting to bear fruit." },
      { title: "Prarabdha Karma", desc: "The portion of past karma currently being experienced in present life." },
      { title: "Agami Karma", desc: "The actions being performed now that will bear fruit in the future." },
      { title: "Nishkama Karma", desc: "Selfless action performed without attachment to personal reward." }
    ],
    accentColor: "#F97316",
    deepDive: {
      title: "कर्म सिद्धान्त एवं वेदोक्त रहस्य (The Law of Action & Vedic Wisdom)",
      sections: [
        {
          subtitle: "Vedic Classifications of Actions",
          subtitleSanskrit: "कर्म के वेदोक्त भेद",
          content: "The Vedas classify all human actions based on their nature, intent, and impact on the individual's spiritual consciousness.",
          items: [
            { title: "Nitya Karma (नित्य कर्म)", desc: "Daily obligatory duties (e.g., cleanliness, morning prayers, meditation) that purify the mind without creating ego." },
            { title: "Naimittika Karma (नैमित्तिक कर्म)", desc: "Duties performed on specific occasions (e.g., festivals, life transitions, ancestral rites) to align with cosmic forces." },
            { title: "Kamya Karma (काम्य कर्म)", desc: "Optional desire-driven actions performed with the goal of gaining specific fruits, material success, or heavenly births." },
            { title: "Nishiddha Karma (निषिद्ध कर्म)", desc: "Prohibited actions that degrade human consciousness and harm other living entities." }
          ]
        },
        {
          subtitle: "The Time Horizon of Karma",
          subtitleSanskrit: "त्रिविध कर्माणि",
          content: "Every action leaves a subtle impression (Samskara) in the causal body, which matures over lifetimes according to three cosmic phases.",
          items: [
            { title: "Sanchita Karma (सञ्चित)", desc: "The total accumulated storehouse of all thoughts and actions from past lifetimes, waiting to ripen." },
            { title: "Prarabdha Karma (प्रारब्ध)", desc: "The allocated portion of past actions currently playing out as destiny, determining birth, life span, and basic tendencies." },
            { title: "Kriyamana/Agami Karma (क्रियमाण)", desc: "The fresh actions being performed in this moment, utilizing our free will to shape future destiny." }
          ]
        },
        {
          subtitle: "Nishkama Karma in Daily Life",
          subtitleSanskrit: "फल-आसक्ति त्याग",
          content: "In Bhagavad Gita, Krishna teaches Nishkama Karma: performing actions as an offering without attachment to outcomes. Real-life analogy: A gardener nurtures, waters, and weeds the soil. They cannot command the rain, the sun, or the timing of the fruit. By focusing entirely on the quality of their effort and accepting the harvest gracefully, they remain peaceful and free from stress.",
          items: [
            { title: "Duty as Worship", desc: "Treating your profession or daily task as an offering to the Divine (Karma Yoga)." },
            { title: "Acceptance (Prasada Buddhi)", desc: "Accepting whatever result comes with a peaceful mind, viewing it as a divine gift." }
          ]
        }
      ]
    }
  },
  moksha: {
    titleSanskrit: "मोक्ष",
    titleEnglish: "Moksha",
    shloka: "तद्विष्णोः परमं पदं सदा पश्यन्ति सूरयः ।",
    transliteration: "tadviṣṇoḥ paramaṁ padaṁ sadā paśyanti sūrayaḥ |",
    translationHindi: "बुद्धिमान् ज्ञानी पुरुष सदा परमात्मा के उस परम पद (मोक्ष) को देखते हैं जो आकाश के समान व्यापक है।",
    translationEnglish: "The wise seers always behold that supreme abode of the divine (Vishnu) in eternal liberation, which is all-pervading like space.",
    summary: "Moksha is liberation from the endless cycle of birth, death, and rebirth (Samsara). It is the realization of the absolute identity of the individual soul (Atman) with the Supreme Reality (Brahman).",
    cursiveSubhead: "The Ultimate Spiritual Liberation",
    image: "/images/knowledge/moksha.png",
    pillars: [
      { title: "Viveka (Discrimination)", desc: "Distinguishing between the eternal reality and the transient world." },
      { title: "Vairagya (Dispassion)", desc: "Detachment from sensory pleasures and temporary worldly rewards." },
      { title: "Mumukshutva (Yearning)", desc: "An intense desire for spiritual liberation and self-realization." },
      { title: "Sadhana (Practice)", desc: "Persistent spiritual effort through meditation, devotion, or wisdom." }
    ],
    accentColor: "#E9D5FF",
    deepDive: {
      title: "मोक्ष प्राप्ति के मार्ग एवं सोपान (Paths & Stages of Spiritual Liberation)",
      sections: [
        {
          subtitle: "The Four Margas to Liberation",
          subtitleSanskrit: "मोक्ष के चार मार्ग",
          content: "The sages prescribed four distinct paths of yoga to suit different temperaments, all converging on the single goal of ultimate liberation.",
          items: [
            { title: "Jnana Marga (ज्ञान मार्ग)", desc: "The path of intellectual inquiry and contemplation. Meditating on the self (Atman) vs. the non-self, discarding temporary identities." },
            { title: "Bhakti Marga (भक्ति मार्ग)", desc: "The path of emotional surrender. Channeling all human feelings into absolute love, prayer, and devotion to the Divine." },
            { title: "Karma Marga (कर्म मार्ग)", desc: "The path of action. Purifying the heart by performing all duties selflessly as a service to God and humanity." },
            { title: "Raja Marga (राज मार्ग)", desc: "The path of meditation. Scientific restraint of the mind through breath regulation (Pranayama) and deep concentration." }
          ]
        },
        {
          subtitle: "The Four Stages of Liberation",
          subtitleSanskrit: "सायुज्यादि चतुष्टय",
          content: "Traditional philosophy describes four experiences of liberation that a seeker can attain as they align closer with the Supreme Reality.",
          items: [
            { title: "Salokya (सालोक्य)", desc: "Attaining the state of dwelling in the same spiritual realm or state of consciousness as the Divine." },
            { title: "Sameepya (सामीप्य)", desc: "Living in constant, intimate proximity and divine presence of the Supreme." },
            { title: "Saroopya (सारूप्य)", desc: "Acquiring the divine form, spiritual qualities, and attributes of the Lord." },
            { title: "Sayujya (सायुज्य)", desc: "The absolute merging and complete union of the individual soul (Jivatman) with the Supreme (Brahman)." }
          ]
        },
        {
          subtitle: "The River and the Ocean",
          subtitleSanskrit: "नदी-सागर न्याय",
          content: "To understand Moksha in real life, consider a river. It flows through valleys, turns around obstacles, and rushes forward. Yet, its journey only ends when it meets the vast ocean. Once it merges, it loses its temporary name and individual boundaries, becoming the limitless ocean itself. Moksha is the dissolution of the temporary ego into infinite, supreme bliss."
        }
      ]
    }
  },
  yoga: {
    titleSanskrit: "योग",
    titleEnglish: "Yoga",
    shloka: "योगश्चित्तवृत्तिनिरोधः ॥",
    transliteration: "yogaścittavṛttinirodhaḥ ||",
    translationHindi: "चित्त की वृत्तियों (विचारों के उतार-चढ़ाव) को रोकना ही योग है।",
    translationEnglish: "Yoga is the intentional restraint of the modifications of the mind-stuff.",
    summary: "Yoga is the union of the individual consciousness with the universal consciousness. It comprises systematic paths of mental control, physical discipline, and devotion designed to achieve spiritual liberation.",
    cursiveSubhead: "The Divine Union of Consciousness",
    image: "/images/knowledge/kama.png",
    pillars: [
      { title: "Jnana Yoga", desc: "The path of wisdom, self-inquiry, and intellectual realization." },
      { title: "Bhakti Yoga", desc: "The path of absolute love, devotion, and surrender to the Divine." },
      { title: "Karma Yoga", desc: "The path of selfless action, duty, and service to humanity." },
      { title: "Raja Yoga", desc: "The path of meditation, breath control, and eight-fold mental discipline." }
    ],
    accentColor: "#3B82F6",
    deepDive: {
      title: "योग शास्त्र एवं अष्टाङ्ग योग (Yogic Science & The Eightfold Path)",
      sections: [
        {
          subtitle: "The Eight Limbs of Classical Yoga",
          subtitleSanskrit: "अष्टाङ्ग योग सोपान",
          content: "Sage Patanjali laid out a systematic eight-step path to quiet the mind's fluctuations and achieve self-realization.",
          items: [
            { title: "Yama & Niyama (यम-नियम)", desc: "Moral restraints (Non-violence, Truth, Non-stealing, Purity, Contentment) and spiritual practices (Self-discipline, Scriptural Study, Devotion)." },
            { title: "Asana & Pranayama (आसन-प्राणायाम)", desc: "Steady, comfortable physical postures and breath regulation to stabilize prana and calm the nervous system." },
            { title: "Pratyahara & Dharana (प्रत्याहार-धारणा)", desc: "Withdrawal of the senses from external objects, followed by single-pointed concentration." },
            { title: "Dhyana & Samadhi (ध्यान-समाधि)", desc: "Unbroken meditation flow, culminating in absolute absorption and unity with universal consciousness." }
          ]
        },
        {
          subtitle: "Major Asanas and Daily Life Benefits",
          subtitleSanskrit: "आसन-विज्ञान एवं लाभ",
          content: "Asanas are designed to prepare the physical body for sitting in quiet contemplation while restoring health, flexibility, and vital balance.",
          items: [
            { title: "Padmasana (पद्मासन - Lotus Pose)", desc: "Stabilizes body posture, aligns the spine, grounds the mind, and channels energy upward for deep meditation." },
            { title: "Surya Namaskar (सूर्यनमस्कार - Sun Salutation)", desc: "A sequence of 12 postures that energizes the body, improves circulation, and balances vital energy channels (Nadis)." },
            { title: "Bhujangasana (भुजङ्गासन - Cobra Pose)", desc: "Strengthens the spine, opens the chest, and relieves respiratory tension and fatigue." },
            { title: "Tadasana (ताड़ासन - Mountain Pose)", desc: "Improves balance, posture, skeletal alignment, and promotes mental grounding and focus." },
            { title: "Savasana (शवासन - Corpse Pose)", desc: "Induces complete neuromuscular relaxation, integrates benefits of practice, and teaches conscious surrender." }
          ]
        },
        {
          subtitle: "Yoga Beyond the Mat",
          subtitleSanskrit: "योगः कर्मसु कौशलम्",
          content: "Yoga is not just physical flexibility. Bhagavad Gita defines it as 'योगः कर्मसु कौशलम्' (Yoga is skill in action). It means bringing calm, focused awareness to every act in daily life—responding to challenges with clarity instead of reacting in anger or anxiety."
        }
      ]
    }
  }
};

const CONCEPT_IDS = ["dharma", "karma", "moksha", "yoga"] as const;

function KnowledgePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams ? searchParams.get("tab") : null;
  
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { playClick, playOm } = useSacredSound();

  // Sync tabParam to active slide
  useEffect(() => {
    requestAnimationFrame(() => {
      if (tabParam && CONCEPT_IDS.includes(tabParam as typeof CONCEPT_IDS[number])) {
        const slideIndex = CONCEPT_IDS.indexOf(tabParam as typeof CONCEPT_IDS[number]);
        if (slideIndex !== -1) {
          setActiveSlide(slideIndex);
        }
      }
    });
  }, [tabParam]);

  const handleSlideChange = (index: number) => {
    playClick();
    setActiveSlide(index);
    router.replace(`/knowledge?tab=${CONCEPT_IDS[index]}`);
  };

  const nextSlide = () => {
    const nextIdx = (activeSlide + 1) % CONCEPT_IDS.length;
    handleSlideChange(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx = (activeSlide - 1 + CONCEPT_IDS.length) % CONCEPT_IDS.length;
    handleSlideChange(prevIdx);
  };

  const handleExploreClick = () => {
    playOm();
    setIsDetailOpen(true);
  };

  const activeId = CONCEPT_IDS[activeSlide];
  const activeData = CONCEPTS[activeId];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F0] text-[#2C221E] select-text relative">
      <Breadcrumb items={[{ label: "Knowledge" }]} />
      
      {/* Main Fullscreen Slider Content */}
      <div className="flex-grow flex items-center relative py-6 select-none">
        
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 z-20 p-3 rounded-full border border-[#2C221E]/15 hover:bg-[#2C221E]/5 transition-all cursor-pointer outline-none bg-white/20 backdrop-blur-sm shadow-sm"
        >
          <ChevronLeft className="w-6 h-6 text-[#2C221E]/75" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 z-20 p-3 rounded-full border border-[#2C221E]/15 hover:bg-[#2C221E]/5 transition-all cursor-pointer outline-none bg-white/20 backdrop-blur-sm shadow-sm"
        >
          <ChevronRight className="w-6 h-6 text-[#2C221E]/75" />
        </button>

        {/* Dynamic Concept Panel Grid */}
        <div className="max-w-6xl mx-auto w-full px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[calc(100vh-220px)]">
          
          {/* Left Side: Double Exposure Art Frame */}
          <div className="col-span-12 md:col-span-6 flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[420px] h-[340px] md:h-[500px] border border-[#B8860B]/25 outline outline-1 outline-offset-4 outline-[#B8860B]/15 rounded-lg overflow-hidden relative shadow-[0_15px_45px_rgba(44,34,30,0.15)] bg-[#F3ECE0]"
              >
                {/* Soft gradient mask mimicking the double-exposure style */}
                <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, #FAF7F0 100%) z-10 pointer-events-none mix-blend-multiply opacity-25" />
                
                <Image
                  src={activeData.image}
                  alt={activeData.titleEnglish}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-center filter brightness-[0.98] saturate-[1.05] transition-transform duration-1000"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Clean Typography Narrative */}
          <div className="col-span-12 md:col-span-6 flex flex-col justify-center items-start text-left pl-0 md:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-start w-full"
              >
                {/* Cursive Subhead / Sanskrit tag */}
                <div className="flex flex-col gap-0.5">
                  <span className="font-sanskrit text-lg font-bold text-[#8C2D19] leading-none text-sanskrit font-normal">
                    चतुर्विध पुरुषार्थ — {activeData.titleSanskrit}
                  </span>
                  <p className="font-cursive text-2xl text-[#b8860b] leading-none mt-1 select-none">
                    {activeData.cursiveSubhead}
                  </p>
                </div>

                {/* Main Heading */}
                <h1 className="font-serif text-5xl md:text-7xl font-black tracking-widest text-[#2C221E] uppercase leading-none mt-3 mb-4 select-all">
                  {activeData.titleEnglish}
                </h1>

                {/* Thin golden divider */}
                <div className="w-24 h-[1.5px] bg-[#B8860B]/40 mb-6" />

                {/* Summary */}
                <p className="font-serif text-sm md:text-base text-[#5c524e] leading-relaxed max-w-md mb-8 select-text">
                  {activeData.summary}
                </p>

                {/* Outlined Action Button */}
                <button
                  onClick={handleExploreClick}
                  className="px-6 py-2.5 border-2 border-[#2C221E] hover:bg-[#2C221E] hover:text-[#FAF7F0] rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer outline-none shadow-sm"
                >
                  Explore Concept
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Slide Pagination Indicators */}
      <div className="flex gap-4 justify-center py-4 select-none z-10">
        {CONCEPT_IDS.map((id, index) => {
          const isActive = activeSlide === index;
          return (
            <button
              key={id}
              onClick={() => handleSlideChange(index)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer outline-none ${
                isActive
                  ? "bg-[#2C221E] border-[#2C221E] text-[#FAF7F0] scale-105 shadow-sm"
                  : "bg-transparent border-[#2C221E]/15 text-[#2C221E]/60 hover:text-[#2C221E] hover:border-[#2C221E]/30"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {id}
            </button>
          );
        })}
      </div>

      {/* Slide-Up Detail Canvas Panel (AnimatePresence) */}
      <AnimatePresence>
        {isDetailOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md overflow-y-auto p-4"
          >
            {/* Backdrop click close */}
            <div className="absolute inset-0 cursor-default" onClick={() => setIsDetailOpen(false)} />

            {/* Content Body Canvas */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="bg-[#FAF7F0] border-2 border-[#B8860B]/40 outline outline-1 outline-offset-4 outline-[#B8860B]/20 max-w-4xl w-full p-6 md:p-10 overflow-hidden relative text-left z-10 max-h-[92vh] overflow-y-auto rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsDetailOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-[#2C221E]/70 hover:text-black transition-colors cursor-pointer border border-transparent hover:border-[#B8860B]/40"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col gap-6 mt-4">
                
                {/* Header */}
                <div className="border-b border-[#B8860B]/20 pb-5 mb-3 flex flex-col gap-1.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#8C2D19] font-mono">
                      {activeData.titleEnglish}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      Pillar {activeSlide + 1} of 4
                    </span>
                  </div>
                  
                  <div className="flex items-baseline gap-3 mt-1.5 flex-wrap">
                    <h2 className="font-serif text-3xl font-black text-[#2C221E] uppercase tracking-wide">
                      {activeData.titleEnglish}
                    </h2>
                    <h3 className="font-sanskrit text-xl text-[#8C2D19] text-sanskrit font-bold">
                      {activeData.titleSanskrit}
                    </h3>
                  </div>

                  <p className="font-cursive text-2xl text-[#b8860b] leading-none mt-1 select-none">
                    {activeData.cursiveSubhead}
                  </p>
                </div>

                {/* Sanskrit Shloka Block */}
                <div className="bg-[#F3ECE0] border border-[#B8860B]/25 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center gap-4 mb-2 shadow-inner">
                  <span className="text-[9px] text-[#b8860b] uppercase font-mono tracking-widest">Sanskrit Shloka</span>
                  <p className="font-sanskrit text-[#8C2D19] text-2xl md:text-3xl leading-loose whitespace-pre-line text-sanskrit font-bold drop-shadow-sm">
                    {activeData.shloka}
                  </p>
                  <p className="text-[#5c524e] text-xs md:text-sm leading-relaxed italic border-t border-[#B8860B]/15 pt-4 w-full font-serif">
                    {activeData.transliteration}
                  </p>
                </div>

                {/* Translation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2 text-left">
                  <div className="bg-[#F3ECE0]/50 border border-[#B8860B]/15 rounded-xl p-5 shadow-sm">
                    <h4 className="text-[#8C2D19] text-xs font-mono uppercase tracking-wider mb-2 font-bold">हिंदी अनुवाद</h4>
                    <p className="text-sm text-[#2C221E] leading-relaxed font-serif">
                      {activeData.translationHindi}
                    </p>
                  </div>
                  <div className="bg-[#F3ECE0]/50 border border-[#B8860B]/15 rounded-xl p-5 shadow-sm">
                    <h4 className="text-[#8C2D19] text-xs font-mono uppercase tracking-wider mb-2 font-bold">English Translation</h4>
                    <p className="text-sm text-[#2C221E] leading-relaxed font-serif">
                      {activeData.translationEnglish}
                    </p>
                  </div>
                </div>

                {/* Detailed Summary */}
                <div className="border-t border-[#B8860B]/15 pt-6 text-left">
                  <h4 className="text-[#2C221E] text-base font-serif font-bold mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#8C2D19]" />
                    Philosophical Concept Summary
                  </h4>
                  <p className="text-[#5c524e] text-sm md:text-base leading-relaxed font-serif">
                    {activeData.summary}
                  </p>
                </div>

                {/* Pillars / Divisions Grid */}
                <div className="border-t border-[#B8860B]/15 pt-6 text-left">
                  <h4 className="text-[#2C221E] text-base font-serif font-bold mb-4 flex items-center gap-1.5">
                    <Quote className="w-4 h-4 text-[#8C2D19]" />
                    Core Pillars &amp; Divisions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeData.pillars.map((pillar, i) => (
                      <div key={i} className="bg-[#F3ECE0]/40 border border-[#B8860B]/15 hover:border-[#8C2D19]/40 rounded-xl p-4 transition-all duration-300">
                        <span className="text-[#8C2D19] text-sm font-bold block font-serif">{pillar.title}</span>
                        <p className="text-[#5c524e] text-xs leading-relaxed mt-1 font-serif">
                          {pillar.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deep Dive & Practical Conduct */}
                {activeData.deepDive && (
                  <div className="border-t border-[#B8860B]/15 pt-6 text-left">
                    <h4 className="text-[#2C221E] text-base font-serif font-bold mb-5 flex items-center gap-1.5">
                      <Scroll className="w-4 h-4 text-[#8C2D19]" />
                      {activeData.deepDive.title}
                    </h4>
                    
                    <div className="flex flex-col gap-6">
                      {activeData.deepDive.sections.map((section, idx) => (
                        <div key={idx} className="bg-[#F3ECE0]/30 border border-[#B8860B]/15 rounded-2xl p-5 md:p-6 shadow-sm">
                          <div className="flex items-baseline gap-2 border-b border-[#B8860B]/15 pb-2 mb-3 flex-wrap">
                            <h5 className="font-serif text-sm md:text-base font-bold text-[#8C2D19]">
                              {section.subtitle}
                            </h5>
                            {section.subtitleSanskrit && (
                              <span className="font-sanskrit text-xs text-[#b8860b] font-bold ml-1.5 text-sanskrit font-normal">
                                ({section.subtitleSanskrit})
                              </span>
                            )}
                          </div>
                          
                          <p className="text-[#5c524e] text-xs md:text-sm leading-relaxed font-serif mb-4 whitespace-pre-line">
                            {section.content}
                          </p>

                          {section.items && section.items.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                              {section.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="bg-[#FAF7F0] border border-[#B8860B]/10 rounded-xl p-3.5 hover:shadow-sm transition-all duration-300">
                                  <span className="text-[#8C2D19] text-xs font-bold block font-serif">
                                    {item.title}
                                  </span>
                                  <p className="text-[#5c524e] text-[11px] leading-relaxed mt-1 font-serif">
                                    {item.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default function KnowledgePage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-[#FAF7F0] text-[#2C221E] items-center justify-center">
        <span className="text-[#8C2D19] font-sanskrit text-2xl animate-pulse">ॐ</span>
      </div>
    }>
      <KnowledgePageContent />
    </Suspense>
  );
}
