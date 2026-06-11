"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DiyaFlame from "../ui/DiyaFlame";
import GoldParticleField from "../effects/GoldParticleField";
import RelatedContentDiscovery from "../layout/RelatedContentDiscovery";

// Define structured content for all 12 Jyotirlingas to guarantee maximum detail
interface JyotirlingaMeta {
  manifestationLore: string;
  droneViewDesc: string;
  aartiTimings: { time: string; ritual: string }[];
  darshanGuide: string[];
  travelOptions: {
    air: string;
    rail: string;
    road: string;
  };
  stotramVerse: string;
  stotramTrans: string;
  relatedStories: { title: string; summary: string }[];
}

const JYOTIRLINGAS_META: Record<string, JyotirlingaMeta> = {
  somnath: {
    manifestationLore: "Soma (the Moon God) was cursed by Daksha Prajapati to lose his luster. Soma performed intense penance here to worship Shiva, who appeared as a pillar of light and released him from the curse, placing the crescent moon on his head. The temple represents the eternal cycle of renewal.",
    droneViewDesc: "Overlooking the Arabian Sea, the temple stands majestically on the shoreline where waves crash against its black stone fortress walls, reflecting the golden light of the spires at dusk.",
    aartiTimings: [
      { time: "07:00 AM", ritual: "Pratah Aarti" },
      { time: "12:00 PM", ritual: "Madhyanha Aarti" },
      { time: "07:00 PM", ritual: "Sayang Aarti" }
    ],
    darshanGuide: [
      "Queue wait times average 30-60 minutes. Best time is early morning.",
      "Mobile phones and bags are strictly prohibited inside the temple premises (secure lockers are available).",
      "Do not miss the evening Light and Sound show 'Jay Somnath' at 8:00 PM."
    ],
    travelOptions: {
      air: "Nearest airport is Rajkot (200 km) or Diu (85 km).",
      rail: "Nearest railhead is Veraval Junction (5 km), well-connected to Ahmedabad.",
      road: "State transport buses connect Veraval to Ahmedabad, Dwarka, and Rajkot."
    },
    stotramVerse: "सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम्।\nउज्जयिन्यां महाकालमोङ्कारममलेश्वरम्॥",
    stotramTrans: "Saurashtre Somanatham cha Srisaile Mallikarjunam | Ujjayinyam Mahakalam Omkaram Amalesvaram ||",
    relatedStories: [
      { title: "The Cure of Chandra's Waning Curse", summary: "How Lord Shiva saved the Moon God from fading away by blessing him to wax and wane in cycles." }
    ]
  },
  mallikarjuna: {
    manifestationLore: "When Shiva and Parvati went to placate their elder son Kartikeya, who had retired to the Krauncha mountain in anger, Shiva manifested here as Mallikarjuna (Mallika meaning Parvati and Arjuna meaning Shiva) on the bank of River Krishna.",
    droneViewDesc: "Set atop the flat-topped Srisailam mountain in the Nallamala hills, surrounded by thick forests and the Krishna river gorge.",
    aartiTimings: [
      { time: "05:30 AM", ritual: "Suprabhata Seva" },
      { time: "11:30 AM", ritual: "Maha Abhishekam" },
      { time: "06:30 PM", ritual: "Pradosha Pooja" }
    ],
    darshanGuide: [
      "Devotees are allowed to touch the main Lingam during general Sparsha Darshan.",
      "Dress code: Traditional dhotis/saris are mandatory for inner sanctum entry.",
      "Combine your visit with Mallikarjuna's Sakshi Ganapati temple."
    ],
    travelOptions: {
      air: "Nearest airport is Rajiv Gandhi International Airport in Hyderabad (200 km).",
      rail: "Nearest railway station is Markapur Road (85 km).",
      road: "Regular buses ply from Hyderabad, Vijayawada, and Guntur."
    },
    stotramVerse: "श्रीशैले मल्लिकार्जुनम्...",
    stotramTrans: "...Srisaile Mallikarjunam...",
    relatedStories: [
      { title: "The Cosmic Anger of Skanda", summary: "How Kartikeya's departure to Srisailam led to his parents creating this dual power center." }
    ]
  },
  mahakaleshwar: {
    manifestationLore: "A demon named Dushana harassed the pious residents of Avantika (Ujjain). In response, Lord Shiva emerged from the earth as Mahakala (the Lord of Time and Death) and ripped the demon apart, agreeing to stay here as a south-facing protector of the city.",
    droneViewDesc: "Located in the heart of Ujjain, the three-tiered temple structure sits near the sacred Shipra River, reflecting historic Maratha and Chalukyan masonry.",
    aartiTimings: [
      { time: "04:00 AM", ritual: "Bhasma Aarti (Sacred Ash Ritual)" },
      { time: "11:00 AM", ritual: "Dhadodak Aarti" },
      { time: "07:00 PM", ritual: "Sandhya Aarti" }
    ],
    darshanGuide: [
      "Bhasma Aarti registration must be done online at least one month in advance.",
      "Traditional dress (dhoti for men, saree for women) is mandatory to enter the inner sanctum.",
      "Swayambhu Lingam is south-facing, a unique source of high tantric energy."
    ],
    travelOptions: {
      air: "Nearest airport is Devi Ahilyabai Holkar Airport in Indore (55 km).",
      rail: "Ujjain Junction (UJN) is directly connected to all major Indian cities.",
      road: "Excellent 4-lane highways connect Ujjain with Indore, Bhopal, and Dewas."
    },
    stotramVerse: "उज्जयिन्यां महाकालम्...",
    stotramTrans: "...Ujjayinyam Mahakalam...",
    relatedStories: [
      { title: "The Slaying of Demon Dushana", summary: "How Shiva manifested from the ground to save his devotees from the tyrannical demon." }
    ]
  },
  omkareshwar: {
    manifestationLore: "The Vindhya Mountain deity performed severe penances to please Lord Shiva. Pleased, Shiva appeared and split his light into two parts: Omkareshwar (on the island) and Amareshwar (on the southern bank of Narmada), forming the cosmic Om syllable shape.",
    droneViewDesc: "The temple sits on Mandhata island in the Narmada river, shaped naturally like the sacred Sanskrit syllable ॐ.",
    aartiTimings: [
      { time: "05:00 AM", ritual: "Mangala Aarti" },
      { time: "12:20 PM", ritual: "Madhyanha Bhog" },
      { time: "08:30 PM", ritual: "Shayan Aarti" }
    ],
    darshanGuide: [
      "Requires a boat ride across the Narmada River or walking across the suspension bridge (Jhula Pul).",
      "Do the 7 km parikrama around the Om-shaped island if health permits.",
      "Visiting the Mamleshwar temple on the opposite bank is considered essential."
    ],
    travelOptions: {
      air: "Nearest airport is Indore Airport (77 km).",
      rail: "Nearest major junction is Khandwa (70 km) or Indore.",
      road: "Buses connect Omkareshwar with Indore, Ujjain, and Khandwa daily."
    },
    stotramVerse: "ओङ्कारममलेश्वरम्...",
    stotramTrans: "...Omkaram Amalesvaram...",
    relatedStories: [
      { title: "Vindhya Range's Humility", summary: "How Vindhyachal mountain overcame pride by praying to Shiva, who split his form to grace the river." }
    ]
  },
  kedarnath: {
    manifestationLore: "Following the Kurukshetra war, the Pandavas sought Shiva to absolute clear the sins of fratricide. Shiva disguised himself as a bull. When Bhima recognized him, the bull dove into the ground, leaving its hump here, which is worshipped as the holy Lingam.",
    droneViewDesc: "Surrounded by towering snow-capped peaks of the Garhwal Himalayas at an altitude of 3,583 meters, standing strong against the elements.",
    aartiTimings: [
      { time: "06:00 AM", ritual: "Pratah Pooja" },
      { time: "02:00 PM", ritual: "Madhyanha Pooja" },
      { time: "06:30 PM", ritual: "Shringar Aarti" }
    ],
    darshanGuide: [
      "Open only from late April (Akshaya Tritiya) to November (Kartik Purnima). Closed in winters.",
      "Requires a 16 km trek from Gaurikund, or helicopter booking in advance.",
      "Carry warm thermals and register for Chardham Yatra before heading."
    ],
    travelOptions: {
      air: "Nearest airport is Jolly Grant Airport in Dehradun (240 km).",
      rail: "Nearest railway station is Rishikesh or Yog Nagari Rishikesh (215 km).",
      road: "Buses go up to Sonprayag. Local sharing taxies ferry to Gaurikund (trek base)."
    },
    stotramVerse: "परल्यां वैद्यनाथं च डाकिन्यां भीमशङ्करम्।\nसेतुबन्धे तु रामेशं नागेशं दारुकावने॥",
    stotramTrans: "Paralyam Vaidyanatham cha Dakinyam Bhimasankaram | Setubandhe tu Ramesam Nagesam Darukavane ||",
    relatedStories: [
      { title: "The Hump of the Divine Bull", summary: "How the Pandavas chased Lord Shiva in the Himalayas, establishing the Pancakedar shrines." }
    ]
  },
  bhimashankar: {
    manifestationLore: "Shiva defeated a demon named Bhima (son of Kumbhakarna) here. The heat generated during the intense battle is said to have evaporated the waters, and Shiva created the Bhima River from his sweat, staying behind to protect the forest.",
    droneViewDesc: "Nestled in the dense green forests of the Sahyadri mountains near Pune, a wildlife sanctuary rich in biodiversity and misty valleys.",
    aartiTimings: [
      { time: "04:30 AM", ritual: "Kakad Aarti" },
      { time: "12:00 PM", ritual: "Maha Abhishekam" },
      { time: "07:30 PM", ritual: "Sanjh Aarti" }
    ],
    darshanGuide: [
      "The temple is set inside a reserve forest. Watch out for the Giant Malabar Squirrel (Shekru).",
      "Avoid traveling during heavy monsoon landslides unless routes are cleared.",
      "Visit the Gupta Bhimashankar (the origin stream of the river) in the valley."
    ],
    travelOptions: {
      air: "Pune International Airport (PNQ) is the nearest (110 km).",
      rail: "Nearest railway station is Pune Junction (110 km).",
      road: "Regular Maharashtra state buses (MSRTC) leave from Pune Shivaji Nagar station."
    },
    stotramVerse: "डाकिन्यां भीमशङ्करम्...",
    stotramTrans: "...Dakinyam Bhimasankaram...",
    relatedStories: [
      { title: "The Destruction of Tripura Demon's Offspring", summary: "How Shiva saved the rishis of Sahyadri from the tyrannical demon Bhima." }
    ]
  },
  "kashi-vishwanath": {
    manifestationLore: "Shiva chose Varanasi as his permanent home, declaring it the city of light (Kashi) that stands on his trident. During the creation of the cosmos, Shiva broke open the universe with his infinite pillar of light here, making it the center of liberation.",
    droneViewDesc: "Located on the ghats of the Ganges River, the newly developed Vishwanath Corridor connects the golden-domed spires directly to the holy water steps.",
    aartiTimings: [
      { time: "03:00 AM", ritual: "Mangala Aarti" },
      { time: "11:30 AM", ritual: "Bhog Aarti" },
      { time: "06:30 PM", ritual: "Sapta Rishi Aarti" }
    ],
    darshanGuide: [
      "High security zone. Aadhaar/Passport identification might be requested for fast-track entries.",
      "Book 'Sapta Rishi Aarti' online. Seven priests perform complex chants around the lingam.",
      "Do the holy dip in Ganga at Dashashwamedh Ghat before entry."
    ],
    travelOptions: {
      air: "Lal Bahadur Shastri Airport in Babatpur, Varanasi (25 km).",
      rail: "Varanasi Junction (BSB) or Pandit Deen Dayal Upadhyaya Junction (MGS) (8 km).",
      road: "National highways connect Varanasi to Lucknow, Patna, Allahabad, and Delhi."
    },
    stotramVerse: "वारणास्यां च विश्वेशं त्र्यम्बकं गौतमीतटे।\nहिमालये तु केदारं घुश्मेशं च शिवालये॥",
    stotramTrans: "Varanasyam cha Visvesam Tryambakam Gautami tate | Himalaye tu Kedaram Ghusmesam cha Sivalaye ||",
    relatedStories: [
      { title: "The Trident of Kashi", summary: "The cosmic geography of Varanasi, standing tall above the material earth on Shiva's own weapon." }
    ]
  },
  trimbakeshwar: {
    manifestationLore: "Sage Gautama was falsely accused of killing a cow. He performed severe penances to bring the holy Ganga (as Godavari River) down to earth to purify his hermitage. Shiva appeared, released Godavari, and stayed as a three-headed Lingam representing Brahma, Vishnu, and Shiva.",
    droneViewDesc: "Located near the Brahmagiri mountain, the black basalt stone structure features elaborate carvings and a surrounding pool.",
    aartiTimings: [
      { time: "05:00 AM", ritual: "Kakad Aarti" },
      { time: "01:00 PM", ritual: "Madhyanha Pooja" },
      { time: "07:00 PM", ritual: "Sarpam Seva" }
    ],
    darshanGuide: [
      "The Lingam is a cavity containing three miniature heads representing the Trinity.",
      "Due to water erosion, the heads are naturally shrinking; a golden crown is placed during special hours.",
      "Strict dress code for inner sanctum touch."
    ],
    travelOptions: {
      air: "Nearest domestic airport is Nashik (30 km), international is Mumbai (180 km).",
      rail: "Nashik Road railway station (38 km) is well-connected.",
      road: "Frequent local buses connect Nashik CBS to Trimbak every 15 minutes."
    },
    stotramVerse: "त्र्यम्बकं गौतमीतटे...",
    stotramTrans: "...Tryambakam Gautami tate...",
    relatedStories: [
      { title: "The Descent of River Godavari", summary: "How Sage Gautama brought the southern Ganga down, leading to the creation of the Trimbak shrine." }
    ]
  },
  vaidyanath: {
    manifestationLore: "The demon king Ravana performed penance to carry Shiva to Lanka. Shiva gave him a Lingam on the condition that if placed on the ground, it would remain fixed. Varuna and Ganesha tricked Ravana into placing it down at Deoghar. Ravana tried to pull it up but failed, damaging it, and Shiva remained there as the divine physician.",
    droneViewDesc: "A temple complex comprising 22 shrines with red and white pyramidal spires connected by red threads, located in Jharkhand.",
    aartiTimings: [
      { time: "04:00 AM", ritual: "Sarkari Pooja" },
      { time: "12:00 PM", ritual: "Bhog Pooja" },
      { time: "07:30 PM", ritual: "Shringar Aarti" }
    ],
    darshanGuide: [
      "During Shravan month (July-August), millions of saffron-clad pilgrims carry gangawater on foot from Sultanganj (108 km).",
      "Red threads tie the main Shiva temple to the Parvati temple, representing divine union.",
      "Devotees touch the Lingam to seek healing from ailments."
    ],
    travelOptions: {
      air: "Deoghar Airport (DGH) has direct domestic flights.",
      rail: "Jasidih Junction (JSME) on the Howrah-Delhi mainline (8 km).",
      road: "Buses connect Deoghar with Patna, Ranchi, and Kolkata."
    },
    stotramVerse: "परल्यां वैद्यनाथं च...",
    stotramTrans: "...Paralyam Vaidyanatham cha...",
    relatedStories: [
      { title: "Ravana's Trick at Deoghar", summary: "How Ganesha as a cowherd boy outwitted the demon king to keep Shiva's power fixed in Bharat." }
    ]
  },
  nageshwar: {
    manifestationLore: "A merchant devotee named Supriya was imprisoned by the demon Daruka. Supriya started chanting Shiva mantras in prison. When the demon attacked Supriya, Shiva appeared as Nageshwar (the Lord of Serpents) from a self-manifested opening, destroying the demon and securing the region.",
    droneViewDesc: "Located near the coast of Dwarka, featuring a massive, eye-catching 82-foot statue of Lord Shiva sitting in meditation above the garden.",
    aartiTimings: [
      { time: "06:00 AM", ritual: "Mangala Aarti" },
      { time: "12:30 PM", ritual: "Shringar Pooja" },
      { time: "07:00 PM", ritual: "Sandhya Aarti" }
    ],
    darshanGuide: [
      "No bags or metallic objects inside. Locker system is available at the entrance.",
      "Devotees can pay for Abhisheka directly at the temple desk.",
      "Combine this with a trip to Bet Dwarka and the Dwarkadhish temple."
    ],
    travelOptions: {
      air: "Nearest domestic airport is Jamnagar (135 km) or Porbandar (110 km).",
      rail: "Dwarka railway station (17 km) is connected to Ahmedabad and Rajkot.",
      road: "National highways link Dwarka to Jamnagar, Rajkot, and Somnath."
    },
    stotramVerse: "...नागेशं दारुकावने॥",
    stotramTrans: "...Nagesam Darukavane ||",
    relatedStories: [
      { title: "The Deliverance of Supriya", summary: "How Lord Shiva broke open the subterranean prison of demon Daruka to protect a humble merchant." }
    ]
  },
  rameshwaram: {
    manifestationLore: "Before crossing over to Lanka, Lord Rama wanted to worship Shiva. Sita built a Lingam out of sand (Ramalingam). When Hanuman was late bringing a stone Lingam from Kailash, Rama worshipped the sand Lingam first. Shiva appeared and declared this spot as Rameshwaram (the Lord of Rama).",
    droneViewDesc: "Located on Rameswaram Island in Tamil Nadu, the massive temple features the longest carved stone corridors in the world.",
    aartiTimings: [
      { time: "05:00 AM", ritual: "Spadika Linga Darshan" },
      { time: "12:00 PM", ritual: "Uchikala Pooja" },
      { time: "08:30 PM", ritual: "Palliyarai Seva" }
    ],
    darshanGuide: [
      "Pilgrims must bathe in the '22 Holy Wells' (Theerthams) inside the temple before main darshan.",
      "The Spadika (Crystal) Linga darshan at 5:00 AM is highly auspicious.",
      "Visit Agni Theertham (sea shore) before entering the wells."
    ],
    travelOptions: {
      air: "Nearest airport is Madurai (170 km).",
      rail: "Rameswaram station is connected via the historical Pamban Rail Bridge.",
      road: "Regular state buses ply from Madurai, Trichy, and Chennai."
    },
    stotramVerse: "सेतुबन्धे तु रामेशं...",
    stotramTrans: "...Setubandhe tu Ramesam...",
    relatedStories: [
      { title: "The Creation of the Sand Lingam", summary: "How Sita built a sacred lingam from seashore sand, establishing Shiva's presence as Rama's ultimate deity." }
    ]
  },
  grishneshwar: {
    manifestationLore: "A devout woman named Ghushma worshipped Shiva by dissolving 101 clay lingams in a lake daily. Her jealous sister killed Ghushma's son and threw him in the lake. Unmoved by grief, Ghushma continued her worship. Pleased, Shiva resurrected her son and manifested permanently here as Grishneshwar.",
    droneViewDesc: "Located close to the world-famous Ellora Caves in Maharashtra, the red basalt stone temple features fine carvings of dashavatars and deities.",
    aartiTimings: [
      { time: "05:30 AM", ritual: "Mangala Aarti" },
      { time: "01:00 PM", ritual: "Madhyanha Pooja" },
      { time: "07:30 PM", ritual: "Shringar Aarti" }
    ],
    darshanGuide: [
      "Men must remove their shirts/tops to enter the inner sanctum.",
      "Devotees can touch the Swayambhu Lingam directly without restrictions.",
      "Combine the tour with Ellora Cave 16 (Kailasa Temple)."
    ],
    travelOptions: {
      air: "Nearest airport is Aurangabad (Chhatrapati Sambhajinagar) (35 km).",
      rail: "Aurangabad railway station (35 km) is well connected.",
      road: "Local tourist buses and taxies run frequently from Aurangabad to Ellora/Grishneshwar."
    },
    stotramVerse: "हिमालये तु केदारं घुश्मेशं च शिवालये॥",
    stotramTrans: "...Himalaye tu Kedaram Ghusmesam cha Sivalaye ||",
    relatedStories: [
      { title: "The Devotion of Ghushma", summary: "How a mother's absolute devotion overcame the murder of her son, prompting Shiva to manifest as the Lord of Compassion." }
    ]
  }
};

interface SacredPlace {
  id: string;
  name: string;
  nameSanskrit: string;
  slug: string;
  type: string;
  description: string;
  latitude: number;
  longitude: number;
  state: string;
  country: string;
  mainDeity: string;
  significance: string;
  images: string;
  historicalEra: string | null;
  architecture: string | null;
}

interface JyotirlingaTempleClientProps {
  place: SacredPlace;
}

export default function JyotirlingaTempleClient({ place }: JyotirlingaTempleClientProps) {
  const meta = JYOTIRLINGAS_META[place.slug] || JYOTIRLINGAS_META.somnath;
  const [startPoint, setStartPoint] = useState("");
  const [travelMode, setTravelMode] = useState<"air" | "rail" | "road">("air");
  const [routeItinerary, setRouteItinerary] = useState<string[]>([]);
  const [chantActive, setChantActive] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);

  // Web Audio synthesis refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);


  // Web Audio synthesises metallic copper chime
  const ringBell = () => {
    if (typeof window === "undefined") return;
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 800);

    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      const freqs = [330, 440, 550, 660, 880, 1100];
      const gains = [0.8, 1.0, 0.7, 0.5, 0.3, 0.1];
      const decays = [2.0, 1.8, 1.4, 1.0, 0.6, 0.3];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.3, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
      masterGain.connect(ctx.destination);

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(f, now);

        gainNode.gain.setValueAtTime(gains[idx], now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + decays[idx]);

        osc.connect(gainNode);
        gainNode.connect(masterGain);

        osc.start(now);
        osc.stop(now + decays[idx] + 0.1);
      });
    } catch {}
  };

  // Meditative Shiva mantra chanting synthesis
  const startChantSynth = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      const now = ctx.currentTime;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 1.0);
      gain.connect(ctx.destination);
      droneGainRef.current = gain;

      // Filter for warmth
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, now);
      filter.connect(gain);

      // Deep 110Hz (A2 note) drone simulating Shiva's dhuni sound
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(110, now);
      
      // Detuned second oscillator for chorus
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(110.4, now);

      osc.connect(filter);
      osc2.connect(filter);
      
      osc.start(now);
      osc2.start(now);
      
      oscRef.current = osc;
    } catch {}
  };

  const stopChantSynth = () => {
    const gain = droneGainRef.current;
    const ctx = audioCtxRef.current;
    if (ctx && gain) {
      const now = ctx.currentTime;
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.linearRampToValueAtTime(0, now + 0.5);
        setTimeout(() => {
          try {
            oscRef.current?.stop();
            ctx.close();
          } catch {}
        }, 600);
      } catch {}
    }
    audioCtxRef.current = null;
    droneGainRef.current = null;
    oscRef.current = null;
  };

  const toggleChant = () => {
    if (chantActive) {
      stopChantSynth();
      setChantActive(false);
    } else {
      startChantSynth();
      setChantActive(true);
    }
  };

  // Simulated route planner calculations
  const calculateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startPoint.trim()) return;

    const routes: string[] = [];

    if (travelMode === "air") {
      routes.push(`Book a flight from your origin (${startPoint}) to: ${meta.travelOptions.air.split("is ")[1]?.split(".")[0] || "nearest domestic airport"}.`);
      routes.push("Upon landing, hire a pre-paid airport taxi directly to the temple complex.");
      routes.push("Check into local Dharamshala / Hotel before entering the darshan queue.");
    } else if (travelMode === "rail") {
      routes.push(`Board a train heading towards: ${meta.travelOptions.rail.split("is ")[1]?.split(" (")[0] || "nearest railway junction"}.`);
      routes.push("From the station, take an auto-rickshaw or local state transport bus to the temple gates.");
      routes.push("Utilize cloakrooms near the temple structure to store bags and shoes.");
    } else {
      routes.push(`Initialize navigation along NH (National Highways) pointing towards state: ${place.state}.`);
      routes.push(meta.travelOptions.road);
      routes.push("Park at the designated municipal parking spaces (approx 1 km from the sanctum).");
    }

    setRouteItinerary(routes);
  };

  // Client side Print Document creation for PDF downloads
  const handleDownloadGuide = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${place.name} Pilgrimage Guide</title>
          <style>
            body { font-family: 'Georgia', serif; background-color: #fdfaf6; color: #2d1d0f; padding: 40px; line-height: 1.6; }
            h1 { text-align: center; color: #8a581e; border-bottom: 2px solid #8a581e; padding-bottom: 10px; font-size: 28px; }
            h2 { color: #8a581e; font-size: 20px; margin-top: 30px; border-bottom: 1px dashed #d4a017; padding-bottom: 5px; }
            .meta { font-size: 14px; color: #6b5035; margin-bottom: 20px; font-style: italic; }
            .coordinates { font-family: monospace; background: #eae2d5; padding: 5px 10px; border-radius: 4px; display: inline-block; }
            ul { padding-left: 20px; }
            li { margin-bottom: 10px; }
            .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #8c8275; border-top: 1px solid #eae2d5; padding-top: 20px; }
            @media print {
              body { padding: 20px; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>PILGRIMAGE GUIDE: ${place.name.toUpperCase()}</h1>
          <div style="text-align: center;">
            <span class="meta">${place.nameSanskrit} • ${place.state}, Bharat</span><br/>
            <span class="coordinates">LATITUDE: ${place.latitude}° N | LONGITUDE: ${place.longitude}° E</span>
          </div>
          
          <h2>Sacred Manifestation</h2>
          <p>${meta.manifestationLore}</p>
          
          <h2>Local Darshan Rules & Advice</h2>
          <ul>
            ${meta.darshanGuide.map(item => `<li>${item}</li>`).join("")}
          </ul>
          
          <h2>Aarti Timetable</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #eae2d5;">
                <th style="padding: 10px; border: 1px solid #d4a017; text-align: left;">Time</th>
                <th style="padding: 10px; border: 1px solid #d4a017; text-align: left;">Ritual Name</th>
              </tr>
            </thead>
            <tbody>
              ${meta.aartiTimings.map(t => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #eae2d5;">${t.time}</td>
                  <td style="padding: 10px; border: 1px solid #eae2d5;">${t.ritual}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          
          <h2>Travel & Logistics</h2>
          <p><strong>By Flight:</strong> ${meta.travelOptions.air}</p>
          <p><strong>By Train:</strong> ${meta.travelOptions.rail}</p>
          <p><strong>By Road:</strong> ${meta.travelOptions.road}</p>
          
          <div style="text-align: center; margin-top: 40px;">
            <button onclick="window.print()" style="padding: 10px 20px; background-color: #8a581e; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">
              Save / Print PDF Guide
            </button>
          </div>
          
          <div class="footer">
            Generated via Sanatan Katha Experience Platform. Om Namah Shivaya.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  useEffect(() => {
    return () => {
      stopChantSynth();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] select-text overflow-x-hidden relative">
      {/* Gold particle system */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <GoldParticleField />
      </div>

      {/* Background radial gradient representing spiritual aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,30,10,0.1)_0%,transparent_75%)] pointer-events-none z-0" />

      {/* 1. Cinematic Hero Section */}
      <section className="relative w-full h-[55vh] flex items-center justify-center border-b border-[var(--border-gold)]/30 overflow-hidden hero-cosmic select-none">
        
        {/* Sacred concentric circles relocated behind the title text */}

        {/* Floating Bell on Left */}
        <div className="absolute top-0 left-12 md:left-24 lg:left-48 flex flex-col items-center origin-top animate-bounce" style={{ animationDuration: "5.8s" }}>
          <div className="w-1 h-28 bg-[#D4A01750]"></div>
          <button 
            onClick={ringBell}
            className={`w-10 h-14 bg-[#D4A017] hover:bg-[#FFD700] rounded-b-full shadow-lg border-x-4 border-b-4 border-[#8B6508] cursor-pointer transition-transform relative outline-none flex items-center justify-center ${bellRinging ? "rotate-12 duration-100" : "duration-500"}`}
            title="Ring bell"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#8B6508] absolute bottom-[-3px]"></div>
          </button>
        </div>

        {/* Hero Title */}
        <div className="relative z-10 text-center flex flex-col items-center gap-4 px-4 max-w-3xl mt-12">
          <Link
            href="/jyotirlinga"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#D4A01730] text-[#9CA3AF] hover:text-[#FFD700] rounded-full hover:bg-[#D4A01710] transition-all no-underline font-semibold text-[10px] uppercase tracking-widest cursor-pointer mb-2"
          >
            ← Back to Jyotirlingas
          </Link>
          <div className="relative my-2 py-4 w-full flex items-center justify-center">
            {/* Sacred concentric circles in the background */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 z-0 pointer-events-none">
              <div className="concentric-circle concentric-circle-1" />
              <div className="concentric-circle concentric-circle-2" />
              <div className="concentric-circle concentric-circle-3" />
              <div className="concentric-circle concentric-circle-core flex items-center justify-center opacity-95">
                {/* Empty to avoid text overlap */}
              </div>
            </div>

            {/* The Sanskrit name on top */}
            <span className="relative z-10 font-sanskrit text-4xl md:text-5xl text-[#FFD700] font-bold tracking-wide drop-shadow-md">
              {place.nameSanskrit}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl text-[var(--text-primary)] font-serif font-bold uppercase tracking-wider mt-1">
            {place.name}
          </h1>
          <p className="text-xs md:text-sm text-[#D4A017] uppercase tracking-widest font-mono font-bold">
            {place.state} • Dwadash Jyotirlinga
          </p>
        </div>

        {/* Bottom fading mask */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none z-0"></div>
      </section>

      {/* 2. Interactive Altar: Diya & Chants */}
      <section className="max-w-6xl mx-auto px-4 w-full py-8 relative z-20">
        <div className="ag-glass-premium p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-[var(--border-gold)]/40">
          {/* Diya altar */}
          <div className="flex flex-col items-center justify-center bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-gold)]/20 min-w-[180px]">
            <DiyaFlame 
              intensity={chantActive ? "high" : "normal"} 
              onClick={ringBell}
            />
            <span className="text-[10px] text-[#9CA3AF] uppercase font-mono tracking-widest mt-2 block text-center">
              Jyotirlinga Diya
            </span>
          </div>

          {/* Controls description */}
          <div className="flex-grow flex flex-col gap-3 text-center md:text-left">
            <h3 className="text-xl font-serif text-[var(--text-primary)] font-bold">Altar Offering</h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-md leading-relaxed">
              Experience the energetic vibration of the sacred Jyotirlinga. Ignite prayers in the sanctuary, ring the copper bells, or toggle the Shiva Stotram chanting drone.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-1">
              <button 
                onClick={ringBell}
                className="px-4 py-2 bg-gradient-to-r from-[#D4A017] to-[#B8860B] hover:from-[#FFD700] hover:to-[#D4A017] text-[#030204] font-bold text-xs uppercase tracking-wider rounded-lg shadow cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                🔔 Sound Bell
              </button>
              <button 
                onClick={toggleChant}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-lg border transition-all cursor-pointer ${chantActive ? "bg-[#D4A017] border-[#FFD700] text-black shadow-[#D4A01740]" : "bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border-[var(--border-gold)]/40 text-[var(--accent-gold)]"}`}
              >
                🧘 {chantActive ? "Chant Active" : "Play Shiva Drone"}
              </button>
              <button 
                onClick={handleDownloadGuide}
                className="px-4 py-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border border-[var(--border-gold)]/40 text-[var(--accent-gold)] font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer transition-colors"
              >
                📥 Download Guide (PDF)
              </button>
            </div>
          </div>

          {/* Stotram quote */}
          <div className="border-l border-[#D4A01720] pl-0 md:pl-8 flex flex-col gap-2.5 w-full md:w-auto text-center md:text-left max-w-sm">
            <span className="text-[10px] text-[#9CA3AF] uppercase font-mono tracking-widest block font-bold">Stotram Snippet</span>
            <p className="text-xs text-[#FFD700] font-sanskrit leading-relaxed whitespace-pre-line italic">
              {meta.stotramVerse}
            </p>
            <p className="text-[10px] text-[#9CA3AF] italic">
              {meta.stotramTrans}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Drone View & Manifestation Lore */}
      <section className="max-w-6xl mx-auto px-4 w-full py-6 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 relative z-20">
        
        {/* Manifestation Lore */}
        <div className="ag-glass-premium p-6 md:p-8 flex flex-col gap-4">
          <h3 className="text-xs font-semibold text-[#D4A017] uppercase tracking-widest border-b border-[#D4A01715] pb-2">
            Sacred Manifestation • ज्योतिर्लिङ्ग प्रादुर्भाव कथा
          </h3>
          <p className="text-sm md:text-base text-[#9CA3AF] leading-relaxed select-text font-serif">
            {meta.manifestationLore}
          </p>
          
          <h3 className="text-xs font-semibold text-[#D4A017] uppercase tracking-widest border-b border-[#D4A01715] pb-2 mt-4">
            Spiritual Significance
          </h3>
          <p className="text-sm text-[#9CA3AF] leading-relaxed select-text">
            {place.significance}
          </p>
        </div>

        {/* Drone View Description Panel */}
        <div className="ag-glass-premium p-6 md:p-8 border border-[#D4A01730] flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-semibold text-[#D4A017] uppercase tracking-widest border-b border-[#D4A01715] pb-2 mb-4">
              Drone Sanctuary View • विहंगम दृश्य
            </h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed italic select-text">
              &ldquo;{meta.droneViewDesc}&rdquo;
            </p>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-gold)]/20 p-4 rounded-lg mt-4 flex flex-col gap-2">
            <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest block font-bold">Historical Era</span>
            <span className="text-[var(--text-primary)] text-sm font-semibold">{place.historicalEra || "Ancient Mythic Era"}</span>
            
            <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest block font-bold mt-2">Architectural Style</span>
            <span className="text-[var(--text-primary)] text-sm font-semibold">{place.architecture || "Nagara Stone Temple architecture"}</span>
          </div>
        </div>
      </section>

      {/* 4. Timing Schedule & Darshan Guides */}
      <section className="max-w-6xl mx-auto px-4 w-full py-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
        
        {/* Aarti Timetable */}
        <div className="ag-glass-premium p-6 md:p-8">
          <h3 className="text-xs font-semibold text-[#D4A017] uppercase tracking-widest border-b border-[#D4A01715] pb-2 mb-4">
            Aarti Timings • आरती समय
          </h3>
          <div className="flex flex-col gap-3">
            {meta.aartiTimings.map((aarti, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-[var(--border-gold)]/10 last:border-0">
                <span className="text-[var(--text-primary)] font-serif font-bold text-sm">{aarti.ritual}</span>
                <span className="text-[#FFD700] font-mono text-sm">{aarti.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Darshan Guides */}
        <div className="ag-glass-premium p-6 md:p-8">
          <h3 className="text-xs font-semibold text-[#D4A017] uppercase tracking-widest border-b border-[#D4A01715] pb-2 mb-4">
            Darshan Guide • दर्शन मार्गदर्शिका
          </h3>
          <ul className="list-disc pl-5 flex flex-col gap-3 text-xs md:text-sm text-[#9CA3AF] leading-relaxed">
            {meta.darshanGuide.map((guide, idx) => (
              <li key={idx}>{guide}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Route Planner & Travel Guide */}
      <section className="max-w-6xl mx-auto px-4 w-full py-8 relative z-20">
        <div className="ag-glass-premium p-6 md:p-8 border border-[#D4A01725]">
          <h3 className="text-xs font-semibold text-[#D4A017] uppercase tracking-widest border-b border-[#D4A01715] pb-2 mb-6">
            Pilgrimage Route Planner • यात्रा मार्ग योजना
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
            {/* Input Form */}
            <form onSubmit={calculateRoute} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest font-bold">Start Location</label>
                <input
                  type="text"
                  placeholder="e.g. New Delhi, Mumbai, Bengaluru"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                  className="bg-[var(--bg-secondary)] border border-[var(--border-gold)]/30 focus:border-[var(--accent-gold)] rounded-lg px-4 py-2.5 text-xs text-[var(--text-primary)] outline-none transition-colors"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest font-bold">Travel Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["air", "rail", "road"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setTravelMode(mode)}
                      className={`py-2 text-xs uppercase font-bold border rounded-lg transition-all cursor-pointer ${travelMode === mode ? "bg-[var(--border-gold)]/20 border-[var(--accent-gold)] text-[var(--accent-gold)]" : "bg-transparent border-[var(--border-gold)]/30 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#D4A017] to-[#B8860B] hover:from-[#FFD700] hover:to-[#D4A017] text-black font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-transform hover:-translate-y-0.5 cursor-pointer mt-2"
              >
                Plan My Pilgrimage Route →
              </button>
            </form>

            {/* Output Itinerary */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-gold)]/20 rounded-xl p-6 flex flex-col gap-4 justify-center">
              {routeItinerary.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="border-b border-[var(--border-gold)]/10 pb-2">
                    <span className="text-[10px] text-[var(--text-secondary)] uppercase font-mono tracking-widest block font-bold">Calculated Route</span>
                    <span className="text-[var(--text-primary)] text-xs font-bold">From {startPoint} via {travelMode.toUpperCase()}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {routeItinerary.map((step, idx) => (
                      <div key={idx} className="flex gap-3 text-xs leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-[var(--border-gold)]/20 border border-[var(--accent-gold)] text-[var(--accent-gold)] flex items-center justify-center font-bold font-mono text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-[var(--text-secondary)] pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 flex flex-col items-center justify-center gap-2">
                  <span className="text-2xl opacity-60">🗺️</span>
                  <h4 className="text-[var(--text-primary)] font-serif text-sm font-bold">No Itinerary Generated Yet</h4>
                  <p className="text-[10px] text-[var(--text-secondary)] max-w-xs leading-relaxed">
                    Provide a starting location and select a preferred transportation mode to calculate your route to {place.name}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Related Shiva stories */}
      <section className="max-w-6xl mx-auto px-4 w-full py-8 relative z-20">
        <h3 className="text-lg font-serif text-[#FFD700] uppercase tracking-widest mb-6 text-center">
          Related Shivlila Stories • शिव पुराण कथामृत
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meta.relatedStories.map((story, idx) => (
            <div key={idx} className="ag-glass-premium p-6 border border-[var(--border-gold)]/20 flex flex-col gap-2">
              <h4 className="text-[var(--text-primary)] font-serif text-lg font-bold">
                📖 {story.title}
              </h4>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                {story.summary}
              </p>
              <div className="mt-2 text-right">
                <Link 
                  href="/library/shiva-purana/chapter/1"
                  className="text-xs text-[#D4A017] hover:text-[#FFD700] font-semibold no-underline"
                >
                  Read Shiva Purana chapter →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Content Discovery section */}
      <RelatedContentDiscovery category="shiva" />

    </div>
  );
}
