export interface IdentityProps {
  titles: string[];
  weapons: string[];
  symbols: string[];
  mount: string;
  consort: string;
  loka: string;
  sacredColors: string[];
  sacredNumbers: number[];
  sacredTrees: string[];
  sacredAnimals: string[];
}

export interface TimelineStage {
  stage: string;
  title: string;
  description: string;
  sanskritQuote?: string;
  quoteTranslation?: string;
  storyDetails: string;
}

export interface GalleryItem {
  title: string;
  type: string; // e.g. "Bronze Sculpture", "Wall Mural", "Cave Relief"
  origin: string; // e.g. "Chola Dynasty, 11th Century CE"
  description: string;
}

export interface GeographyItem {
  templeName: string;
  region: string;
  significance: string;
  coordinates: string;
  mapsLink: string;
  routeDescription: string;
}

export interface ScriptureRelation {
  category: "Vedas" | "Upanishads" | "Puranas" | "Ramayana" | "Mahabharata" | "Gita" | "Agamas" | "Tantras";
  title: string;
  quote: string;
  quoteTranslation: string;
  connection: string;
}

export interface FestivalItem {
  name: string;
  lunarDate: string;
  description: string;
  regionalVariations: string;
}

export interface RelationshipData {
  family: { name: string; relation: string; slug?: string }[];
  avatars: { name: string; description: string; slug?: string }[];
  gurus: { name: string; role: string }[];
}

export interface MantraBreakdown {
  word: string;
  meaning: string;
}

export interface EnhancedMantra {
  text: string;
  transliteration: string;
  translation: string;
  meaning: string;
  breakdown: MantraBreakdown[];
}

export interface EnhancedDeity {
  slug: string;
  nameEnglish: string;
  nameHindi: string;
  nameSanskrit: string;
  role: string;
  meaning: string;
  heroImage: string;
  bgGradient: string;
  accentColor: string;
  mantraAmbience: {
    frequency: number; // Hz (for synthesized drone)
    type: "sine" | "triangle" | "sawtooth";
  };
  identity: IdentityProps;
  timeline: TimelineStage[];
  gallery: GalleryItem[];
  geography: GeographyItem[];
  scriptures: ScriptureRelation[];
  festivals: FestivalItem[];
  relationships: RelationshipData;
  mantras: EnhancedMantra[];
  relatedDeitySlugs: string[];
}

export const ENHANCED_DEITIES_DATA: Record<string, EnhancedDeity> = {
  shiva: {
    slug: "shiva",
    nameEnglish: "Lord Shiva",
    nameHindi: "भगवान शिव",
    nameSanskrit: "शिव",
    role: "The Destroyer of Ego & Regenerator of the Cosmos in the Trimurti",
    meaning: "The Auspicious One, who is pure space-like consciousness",
    heroImage: "/images/deities/shiva.png",
    bgGradient: "radial-gradient(circle, rgba(13, 27, 42, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#6D28D9",
    mantraAmbience: { frequency: 136.1, type: "sawtooth" }, // Frequency of Cosmic Om
    identity: {
      titles: ["Mahadeva (Great God)", "Nataraja (Lord of Dance)", "Shankara (Beneficent)", "Neelakantha (Blue-throated)", "Pashupati (Lord of Beasts)"],
      weapons: ["Trishula (Trident)", "Pinaka Bow", "Parashu (Battle-Axe)"],
      symbols: ["Damru (Cosmic Drum)", "Crescent Moon", "Third Eye", "Rudraksha beads", "Sacred Ash (Vibhuti)"],
      mount: "Nandi (The Sacred Bull)",
      consort: "Goddess Parvati",
      loka: "Mount Kailash",
      sacredColors: ["White", "Ash Grey", "Silver Blue"],
      sacredNumbers: [3, 5, 108],
      sacredTrees: ["Bilva (Bael)", "Rudraksha Tree"],
      sacredAnimals: ["Snake (Vasuki)", "Bull (Nandi)"]
    },
    timeline: [
      {
        stage: "Cosmic Origin",
        title: "The Pillar of Infinite Light",
        description: "Shiva manifests as a column of infinite light (Jyotirlinga) before Brahma and Vishnu, showing that consciousness has no beginning or end.",
        sanskritQuote: "न पुण्यं न पापं न सौख्यं न दुःखं\nचिदानन्दरूपः शिवोऽहम् शिवोऽहम्॥",
        quoteTranslation: "I am not virtue, nor vice, nor pleasure, nor pain. I am pure consciousness, I am Shiva, I am Shiva.",
        storyDetails: "To settle an argument between Brahma and Vishnu about supremacy, Shiva manifested as a flaming pillar of infinite length. Neither could find its end, teaching humility and demonstrating the formless, infinite nature of reality."
      },
      {
        stage: "Kailash",
        title: "The Abode of Eternal Silence",
        description: "Shiva sits in deep meditation on the snow-covered peak of Mount Kailash, holding the world's axis in perfect balance.",
        sanskritQuote: "शान्तं पद्मस्थं सर्वकारणकारणं शिवम्॥",
        quoteTranslation: "Peaceful, seated on a lotus, the cause of all causes, who is Shiva.",
        storyDetails: "Kailash is not just a geographical mountain, but the crown chakra of the earth. Here, Shiva resides as the Adi Yogi, demonstrating that the highest path of life is inner silence and absolute absorption in the self."
      },
      {
        stage: "Marriage",
        title: "Union of Consciousness and Energy",
        description: "The intense penance of Parvati awakens Shiva from his deep trance, leading to their holy wedding at Triyuginarayan.",
        sanskritQuote: "वागर्थाविव सम्पृक्तौ वागर्थप्रतिपत्तये।\nजगतः पितरौ वन्दे पार्वतीपरमेश्वरौ॥",
        quoteTranslation: "I bow to the parents of the universe, Parvati and Shiva, who are united like words and their meanings.",
        storyDetails: "Parvati's devotion and severe austerities shook the mountains. Shiva tested her resolve by disguising himself, but her unshakeable determination convinced him. Their union symbolizes the merging of Purusha (awareness) and Prakriti (active force)."
      },
      {
        stage: "Neelakantha",
        title: "Drinking the Cosmic Poison",
        description: "During Samudra Manthan, a deadly poison threatens all life. Shiva drinks it, holding it in his throat which turns blue.",
        sanskritQuote: "विषं पीत्वा जगत् सर्वं रक्षितं येन शम्भुना॥",
        quoteTranslation: "By whom, Shambhu, the poison was drunk and the whole universe was saved.",
        storyDetails: "As the ocean of milk churned, the toxic Halahala poison threatened to dissolve creation. While other gods fled, Shiva calmly gathered the poison in his palm and drank it. Parvati held his throat to stop it from entering his body, earning him the name Neelakantha."
      },
      {
        stage: "Daksha Yajna",
        title: "The Sacrifice of Sati & Tandava",
        description: "Daksha insults Shiva, leading Sati to self-immolate. Shiva unleashes Virabhadra to destroy the sacrifice.",
        sanskritQuote: "जटाटवीगलज्जलप्रवाहपावितस्थले...",
        quoteTranslation: "With his neck consecrated by the flow of water trickling from his forest-like matted locks...",
        storyDetails: "Sati sacrificed herself in the sacrificial fire of her father Daksha because of his insults to her husband. Grief-stricken, Shiva tore a lock of hair and created Virabhadra, who destroyed the ritual and decapitated Daksha. Shiva later restored Daksha to life with a goat's head, teaching mercy."
      },
      {
        stage: "Tripurantaka",
        title: "Slayer of the Three Floating Cities",
        description: "Using the Earth as his chariot and Mount Meru as his bow, Shiva destroys the three flying demon fortresses with one arrow.",
        sanskritQuote: "त्रिपुरहन्तृ शरणं प्रपद्ये॥",
        quoteTranslation: "I seek refuge in the destroyer of Tripura.",
        storyDetails: "Three demon brothers obtained three flying castles that could only be destroyed when they aligned, which happened once in a thousand years. Shiva integrated all cosmic elements into a singular chariot, bow, and arrow, piercing the cities at the exact second of alignment, showing that absolute concentration destroys complex illusion."
      },
      {
        stage: "Mahakaal",
        title: "Master of Time and Dissolution",
        description: "Shiva resides in Ujjain as Mahakaleshwar, the deity who governs time, death, and the ultimate transformation of all forms.",
        sanskritQuote: "महाकाल नमस्तुभ्यं मृत्युं नश्यतु मे सदा॥",
        quoteTranslation: "Salutations to Mahakaal, may death be conquered for me forever.",
        storyDetails: "Mahakaal represents time that devours everything. By smeared ashes from cremation grounds, Shiva reminds us that all physical forms are temporary, and fear of death disappears when one realizes the immortal spirit inside."
      }
    ],
    gallery: [
      {
        title: "Chola Nataraja Bronze",
        type: "Bronze Sculpture",
        origin: "Chola Dynasty, Tamil Nadu, 10th Century CE",
        description: "A masterpiece depicting Shiva's cosmic dance of creation, preservation, and dissolution inside a circle of flames."
      },
      {
        title: "Sadashiva Cave Relief",
        type: "Cave Relief carving",
        origin: "Elephanta Caves, Maharashtra, 6th Century CE",
        description: "A monumental three-headed bust representing the three aspects of Shiva: Creator (Vamadeva), Preserver (Tatpurusha), and Destroyer (Aghora)."
      },
      {
        title: "Ellora Kailashnath Temple",
        type: "Monolithic Rock Temple",
        origin: "Rashtrakuta Dynasty, Maharashtra, 8th Century CE",
        description: "An entire temple complex carved out of a single volcanic basalt cliff, representing Mount Kailash on earth."
      }
    ],
    geography: [
      {
        templeName: "Kedarnath Temple",
        region: "Garhwal Himalayas, Uttarakhand",
        significance: "One of the Char Dham shrines and the highest of the 12 Jyotirlingas, where Shiva is worshipped in a hump-shaped rock form.",
        coordinates: "30.7352° N, 79.0669° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Kedarnath+Temple+Uttarakhand",
        routeDescription: "A high-altitude trek starting from Gaurikund, passing through pristine glacial valleys and holy rivers."
      },
      {
        templeName: "Kashi Vishwanath",
        region: "Varanasi, Uttar Pradesh",
        significance: "The spiritual heart of India, where Shiva stands as Vishveshvara (Ruler of the Universe) on the banks of Ganga.",
        coordinates: "25.3109° N, 83.0105° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Kashi+Vishwanath+Temple+Varanasi",
        routeDescription: "Located in the narrow, ancient alleys of Kashi, accessible from the newly constructed Vishwanath Corridor."
      }
    ],
    scriptures: [
      {
        category: "Puranas",
        title: "Shiva Purana",
        quote: "शिवः शिवप्रदः श्रीमान् शिवदः शिवभावनः॥",
        quoteTranslation: "Shiva is auspiciousness, the giver of auspiciousness, prosperous, and the generator of good thoughts.",
        connection: "Main theological source recounting his legends, wedding, battles, and instructions on meditation."
      },
      {
        category: "Upanishads",
        title: "Svetasvatara Upanishad",
        quote: "एको हि रुद्रो न द्वितीयाय तस्थुः॥",
        quoteTranslation: "Rudra is indeed one, they do not stand for a second.",
        connection: "Philosophical foundation establishing Shiva-Rudra as the supreme Brahman, the source and end of the cosmos."
      }
    ],
    festivals: [
      {
        name: "Maha Shivratri",
        lunarDate: "Phalguna, Krishna Chaturdashi",
        description: "The great night of Shiva, celebrating his cosmic dance of creation and his wedding with Parvati.",
        regionalVariations: "All-night vigils, chanting, fasting, and offering Bilva leaves to the Shiva Linga across India and Nepal."
      }
    ],
    relationships: {
      family: [
        { name: "Parvati", relation: "Consort", slug: "parvati" },
        { name: "Ganesha", relation: "Son", slug: "ganesha" },
        { name: "Kartikeya", relation: "Son", slug: "kartikeya" }
      ],
      avatars: [
        { name: "Lord Hanuman", description: "The 11th Rudra avatar embodying strength and devotion.", slug: "hanuman" },
        { name: "Adi Shankaracharya", description: "The 8th-century philosopher who revived Advaita Vedanta.", slug: "sages" }
      ],
      gurus: []
    },
    mantras: [
      {
        text: "ॐ नमः शिवाय",
        transliteration: "Om Namah Shivaya",
        translation: "I bow to the Auspicious One, the divine inner self.",
        meaning: "The five syllables (Na-Mah-Shi-Va-Ya) represent the five elements of nature and five functions of consciousness.",
        breakdown: [
          { word: "ॐ", meaning: "The primordial sound of the universe" },
          { word: "नमः", meaning: "I bow, surrender my ego" },
          { word: "शिवाय", meaning: "To the auspicious supreme consciousness" }
        ]
      }
    ],
    relatedDeitySlugs: ["parvati", "ganesha", "kartikeya"]
  },

  vishnu: {
    slug: "vishnu",
    nameEnglish: "Lord Vishnu",
    nameHindi: "भगवान विष्णु",
    nameSanskrit: "विष्णु",
    role: "The Preserver & Sustainer of the Cosmos and Dharma in the Trimurti",
    meaning: "The All-Pervading One, who enters and sustains all things",
    heroImage: "/images/deities/vishnu.png",
    bgGradient: "radial-gradient(circle, rgba(14, 30, 20, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#D4A017",
    mantraAmbience: { frequency: 147.85, type: "sine" },
    identity: {
      titles: ["Narayana (Refuge of souls)", "Hari (Remover of sins)", "Padmanabha (Lotus-navelled)", "Madhava (Lord of sweet fortune)", "Jagannatha (Lord of the universe)"],
      weapons: ["Sudarshana Chakra (Discus of light)", "Kaumodaki Gada (Mace)", "Sharnga Bow"],
      symbols: ["Panchajanya Shankha (Conch)", "Padma (Lotus)", "Kaustubha Gem", "Srivatsa mark on chest"],
      mount: "Garuda (The Celestial Eagle)",
      consort: "Goddess Lakshmi",
      loka: "Vaikuntha (The Ocean of Milk)",
      sacredColors: ["Yellow", "Royal Blue", "Golden Gold"],
      sacredNumbers: [10, 108, 1008],
      sacredTrees: ["Tulsi", "Peepal (Sacred Fig)", "Amala"],
      sacredAnimals: ["Eagle (Garuda)", "Serpent (Shesha)", "Fish (Matsya)"]
    },
    timeline: [
      {
        stage: "Cosmic Ocean",
        title: "Reclining on Sheshanaga",
        description: "Vishnu rests on the infinite coils of the serpent Shesha in the ocean of milk, projecting universes as he breathes.",
        sanskritQuote: "शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं\nविश्वधारं गगनसदृशं मेघवर्णं शुभाङ्गम्॥",
        quoteTranslation: "Of peaceful form, reclining on a serpent, lotus-navelled, Lord of gods, the support of the universe, sky-like, cloud-colored, of auspicious limbs.",
        storyDetails: "Before creation, Vishnu reclines in Yoga Nidra on Ananta Shesha (representing infinite time). From his navel grows a golden lotus, upon which Brahma manifests to begin projecting the physical universe."
      },
      {
        stage: "Matsya",
        title: "The Golden Fish of the Deluge",
        description: "Manifesting as a fish, Vishnu guides King Satyavrata's ship carrying scriptures and seeds of life during the cosmic flood.",
        sanskritQuote: "प्रलयपयोधिजले धृतवानसि वेदं...",
        quoteTranslation: "In the waters of the great deluge, you held the Vedas safe...",
        storyDetails: "To save the Vedas from being lost in the deluge of dissolution, Vishnu took the form of a horned fish. He instructed the king to tie his giant boat to his horn using the serpent Vasuki, towing them to safety."
      },
      {
        stage: "Kurma",
        title: "The Steady Mountain Support",
        description: "Vishnu takes the form of a giant tortoise, supporting Mount Mandara on his back during the Churning of the Ocean.",
        sanskritQuote: "क्षितिरतिविपुलतरे तिष्ठति तव पृष्ठे...",
        quoteTranslation: "The earth rests securely on your massive back...",
        storyDetails: "When the devas and asuras churned the milk ocean for the nectar of immortality, the mountain they used as a churning rod began to sink. Vishnu descended as Kurma, offering his shell as a pivot to stabilize the mountain."
      },
      {
        stage: "Narasimha",
        title: "The twilight Lion-Man",
        description: "To destroy the tyrant demon Hiranyakashipu, Vishnu bursts from a palace pillar as half-man, half-lion at twilight.",
        sanskritQuote: "तव करकमलवरे नखमद्भुतशृङ्गं\nदलितहिरण्यकशिपुतनुभृङ्गम्॥",
        quoteTranslation: "On your lotus-like hands rest wonderful sharp nails, which tore the wasp-like body of Hiranyakashipu.",
        storyDetails: "Hiranyakashipu had a boon: he couldn't be killed inside or outside, by day or night, by man or beast, on earth or sky, by any weapon. Vishnu emerged as Narasimha (neither man nor beast), at twilight (neither day nor night), on the threshold (neither inside nor out), killing him with nails (no weapon) on his lap (neither earth nor sky)."
      },
      {
        stage: "Vamana",
        title: "The Three Steps of the Dwarf",
        description: "Appearing as a young Brahmin dwarf, Vishnu humbles the ego of King Bali by measuring the three worlds in three steps.",
        sanskritQuote: "छलयसि विक्रमणे बलमद्भुतवामन...",
        quoteTranslation: "You deceived King Bali with your mighty strides, O wonderful Vamana...",
        storyDetails: "Vamana asked King Bali for three paces of land. When granted, he expanded to cosmic size (Trivikrama), placing his first foot on earth, second on heaven, and when there was no place left, Bali offered his own head for the third step, attaining liberation."
      },
      {
        stage: "Parashurama",
        title: "The Warrior Monk",
        description: "Armed with an axe, Parashurama cleanses the earth twenty-one times of corrupt and tyrannical kings.",
        sanskritQuote: "क्षत्रियरुधिरमये जगदपगतपापं...",
        quoteTranslation: "Washing the earth with the blood of corrupt rulers, freeing it from sin...",
        storyDetails: "When the ruling class abandoned dharma and began terrorizing citizens, Vishnu incarnated as Parashurama, an ascetic warrior who destroyed the tyrannical dynasties to restore moral law."
      },
      {
        stage: "Kalki",
        title: "The Prophesied Final Avatar",
        description: "Riding a white horse and wielding a blazing sword, Kalki will manifest at the end of Kali Yuga to inaugurate Satya Yuga.",
        sanskritQuote: "म्लेच्छनिवहनिधने कलयसि करवालं...",
        quoteTranslation: "To destroy the degenerate forces, you wield a sword like a comet...",
        storyDetails: "When darkness reaches its absolute peak, Kalki will emerge on a white horse, Devadatta, to dissolve corrupt structures and restore the cosmic order, resetting the time cycles back to the golden age."
      }
    ],
    gallery: [
      {
        title: "Anantasayan rock relief",
        type: "Rock Carving",
        origin: "Udayagiri Caves, Madhya Pradesh, 5th Century CE",
        description: "A colossal Gupta-era rock sculpture depicting Vishnu reclining on the coils of Shesha, surrounded by celestial sages."
      },
      {
        title: "Venkateswara Iconography",
        type: "Stone Murti",
        origin: "Tirumala Hills, Andhra Pradesh, 8th Century CE",
        description: "The highly ornamented self-manifested stone icon of Lord Venkateswara, standing in supreme silence to grant liberation."
      }
    ],
    geography: [
      {
        templeName: "Badrinath Temple",
        region: "Garhwal Himalayas, Uttarakhand",
        significance: "Worshipped as Badri Narayan, where Vishnu performed penance under a jujube (Badri) tree, shielded by Lakshmi as the tree.",
        coordinates: "30.7433° N, 79.4938° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Badrinath+Temple+Uttarakhand",
        routeDescription: "A mountainous highway winding along the Alaknanda River, leading to a colorful temple in a high Himalayan valley."
      }
    ],
    scriptures: [
      {
        category: "Puranas",
        title: "Vishnu Purana",
        quote: "यस्माद्विश्वमिदं जातं यस्मिंश्च प्रविलीयते॥",
        quoteTranslation: "From whom this universe is born, and in whom it is dissolved.",
        connection: "Main source detailing the cosmology, creation cycles, and stories of Vishnu's major incarnations."
      }
    ],
    festivals: [
      {
        name: "Vaikuntha Ekadashi",
        lunarDate: "Margashirsha, Shukla Ekadashi",
        description: "The day the gates of Vaikuntha (the inner sanctum of Vishnu) are opened to all devotees.",
        regionalVariations: "Special passages called 'Vaikuntha Dwar' are constructed in South Indian Vishnu temples, where devotees walk through to seek blessings."
      }
    ],
    relationships: {
      family: [
        { name: "Lakshmi", relation: "Consort", slug: "lakshmi" },
        { name: "Brahma", relation: "Son (from navel)", slug: "brahma" },
        { name: "Rama", relation: "Avatar", slug: "rama" },
        { name: "Krishna", relation: "Avatar", slug: "krishna" }
      ],
      avatars: [
        { name: "Matsya", description: "The Giant Horned Fish avatar." },
        { name: "Kurma", description: "The Supporting Tortoise avatar." },
        { name: "Varaha", description: "The Earth-saving Boar avatar." },
        { name: "Narasimha", description: "The Twilight Lion-Man avatar." },
        { name: "Vamana", description: "The Dwarf Brahmin avatar." },
        { name: "Parashurama", description: "The Axe-wielding warrior avatar." },
        { name: "Lord Rama", description: "The Ideal King avatar.", slug: "rama" },
        { name: "Lord Krishna", description: "The Lilas master avatar.", slug: "krishna" },
        { name: "Gautama Buddha", description: "The compassionate teacher avatar." },
        { name: "Kalki", description: "The prophesied final warrior avatar." }
      ],
      gurus: []
    },
    mantras: [
      {
        text: "ॐ नमो भगवते वासुदेवाय",
        transliteration: "Om Namo Bhagavate Vasudevaya",
        translation: "I bow to the Lord who dwells in all beings, the all-pervading divine presence.",
        meaning: "Known as the Mukti Mantra, a twelve-syllable key that unlocks the realization of spiritual freedom.",
        breakdown: [
          { word: "ॐ", meaning: "The ultimate cosmic vibration" },
          { word: "नमः", meaning: "Salutations, bowing down of ego" },
          { word: "भगवते", meaning: "To the divine source of all blessings" },
          { word: "वासुदेवाय", meaning: "To the son of Vasudeva, who lives in all hearts" }
        ]
      }
    ],
    relatedDeitySlugs: ["lakshmi", "rama", "krishna", "hanuman"]
  },

  brahma: {
    slug: "brahma",
    nameEnglish: "Lord Brahma",
    nameHindi: "भगवान ब्रह्मा",
    nameSanskrit: "ब्रह्मा",
    role: "The Creator of the Material Universe and Design in the Trimurti",
    meaning: "The vast intellect from which all physical forms expand",
    heroImage: "/images/deities/brahma.png",
    bgGradient: "radial-gradient(circle, rgba(30, 20, 10, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#F97316",
    mantraAmbience: { frequency: 156.79, type: "triangle" },
    identity: {
      titles: ["Prajapati (Lord of creation)", "Hiranyagarbha (Born of golden egg)", "Chaturmukha (Four-faced)", "Vedagarbha (Womb of Vedas)"],
      weapons: ["Brahmastra (Supreme cosmic weapon)"],
      symbols: ["Kamandalu (Water pot of life)", "Akshamala (Rosary of time)", "Pustaka (Manuscripts of Vedas)"],
      mount: "Hansa (The Sacred White Swan)",
      consort: "Goddess Saraswati",
      loka: "Satyaloka (Brahmaloka)",
      sacredColors: ["Red", "Amber Gold", "Lotus Pink"],
      sacredNumbers: [4, 7],
      sacredTrees: ["Plaksha (Sacred Banyan)", "Lotus flower"],
      sacredAnimals: ["Swan (Hansa)"]
    },
    timeline: [
      {
        stage: "Golden Lotus",
        title: "Birth at the Dawn of Kalpa",
        description: "Brahma manifests on a golden lotus arising from the navel of Vishnu at the beginning of the creation cycle.",
        sanskritQuote: "ॐ नाभिपद्ममयूखजाताय नमः॥",
        quoteTranslation: "Salutations to the one who was born from the rays of the navel-lotus.",
        storyDetails: "At the dawn of a new cosmic day, Vishnu projects a lotus from his navel. Brahma emerges inside it, surrounded by empty space, wondering who he is and what his purpose is until he hears the word 'Tapa' (austerity)."
      },
      {
        stage: "Four Faces",
        title: "Beholding the Cosmos",
        description: "Brahma develops four heads to look in all directions, capturing all dimensions of space and knowledge.",
        sanskritQuote: "चतुर्मुखाय विद्महे कमलासनाय धीमहि...",
        quoteTranslation: "Let us contemplate the four-faced one, let us meditate on the one seated on a lotus...",
        storyDetails: "To observe the beauty of Shatarupa (his own creation representing multi-forms) as she moved, Brahma grew heads looking in all four cardinal directions, symbolizing his all-seeing cosmic mind."
      },
      {
        stage: "Vedas Manifestation",
        title: "Chanting the Primordial Knowledge",
        description: "Brahma breathes out the four Vedas from his four mouths, establishing the laws that govern the physical universe.",
        sanskritQuote: "ब्रह्मा देवानां प्रथमः सम्बभूव...",
        quoteTranslation: "Brahma arose first among the gods, creator and protector of all...",
        storyDetails: "By meditating on the supreme consciousness, Brahma received the eternal vibrations of the cosmos and spoke them as the four Vedas: Rig, Yajur, Sama, and Atharva, creating the intellectual template for the universe."
      },
      {
        stage: "Designing Earth",
        title: "Architect of Natural Laws",
        description: "Brahma organizes matter, establishing gravity, elements, and geographical boundaries across planets.",
        sanskritQuote: "सृष्टिकर्त्रे नमस्तुभ्यं...",
        quoteTranslation: "Salutations to you, the designer of creation...",
        storyDetails: "Brahma acts as the divine engineer, combining basic elements (fire, water, air, earth, ether) to construct landscapes, oceans, orbits, and species, ensuring everything functions according to natural cosmic laws."
      },
      {
        stage: "Prajapatis",
        title: "Manifesting the Mind-born Sons",
        description: "Brahma creates the Prajapatis and sages from his mind to seed wisdom and populate the planetary systems.",
        sanskritQuote: "मनसा सृष्टाः पुत्राः...",
        quoteTranslation: "The sons created directly from his mind...",
        storyDetails: "To help populate the universe and guide civilizations, Brahma created ten mind-born sons (Manasaputras) including Sage Marichi, Atri, Angiras, and Narada, who carried his wisdom to all corners of space."
      },
      {
        stage: "Devotional Awakening",
        title: "Humbling of the Creator",
        description: "Brahma attempts to test Krishna's power, but is humbled by witnessing infinite universes inside the cowherd boy.",
        sanskritQuote: "नारायणस्त्वं न हि सर्वदेही...",
        quoteTranslation: "Are you not Narayana, the soul of all living beings...",
        storyDetails: "Brahma hid Krishna's friends and calves to test his divinity. Krishna instantly multiplied himself to replace them. Realizing his error, Brahma fell at Krishna's feet, seeing that his own creative powers were just a fraction of the infinite Supreme."
      }
    ],
    gallery: [
      {
        title: "Mirpur Khas Brahma",
        type: "Bronze casting",
        origin: "Sindh (Pakistan), 5th Century CE",
        description: "One of the oldest surviving bronze depictions of Brahma, representing him in simple ascetic attire."
      },
      {
        title: "Prambanan Brahma Relief",
        type: "Volcanic stone relief",
        origin: "Java, Indonesia, 9th Century CE",
        description: "A monumental carving showing the four-headed creator surrounded by celestial guardians in Southeast Asian style."
      }
    ],
    geography: [
      {
        templeName: "Jagatpita Brahma Temple",
        region: "Pushkar, Rajasthan",
        significance: "The most prominent temple dedicated to Brahma in the world, located near the sacred Pushkar Lake where he performed a great yajna.",
        coordinates: "26.4883° N, 74.5517° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Pushkar+Brahma+Temple+Rajasthan",
        routeDescription: "Located on the edge of the Thar Desert, surrounded by holy bathing ghats and sand dunes."
      }
    ],
    scriptures: [
      {
        category: "Puranas",
        title: "Brahma Purana",
        quote: "ब्रह्मा ससर्ज भूतानि स्थावराणि चराणि च॥",
        quoteTranslation: "Brahma created all living beings, both stationary (plants) and moving (animals).",
        connection: "Contains descriptions of creation, geography, and pilgrimages established by the creator."
      }
    ],
    festivals: [
      {
        name: "Kartik Purnima",
        lunarDate: "Kartika, Shukla Purnima",
        description: "A major festival celebrating Brahma's yajna at Pushkar.",
        regionalVariations: "Thousands of pilgrims take a holy dip in the Pushkar lake, accompanied by the famous desert camel fair."
      }
    ],
    relationships: {
      family: [
        { name: "Saraswati", relation: "Consort", slug: "saraswati" },
        { name: "Vishnu", relation: "Father (from navel)", slug: "vishnu" },
        { name: "Narada", relation: "Son (Mind-born)", slug: "sages" }
      ],
      avatars: [],
      gurus: []
    },
    mantras: [
      {
        text: "ॐ ब्रह्मणे नमः",
        transliteration: "Om Brahmane Namaha",
        translation: "I offer my salutations to Brahma, the supreme creator intellect.",
        meaning: "A mantra to invoke creativity, focus, and structural intelligence in study and work.",
        breakdown: [
          { word: "ॐ", meaning: "The seed sound of space" },
          { word: "ब्रह्मणे", meaning: "To the creator / expansions of intellect" },
          { word: "नमः", meaning: "Bowing down in reverence" }
        ]
      }
    ],
    relatedDeitySlugs: ["saraswati", "vishnu"]
  },

  saraswati: {
    slug: "saraswati",
    nameEnglish: "Devi Saraswati",
    nameHindi: "देवी सरस्वती",
    nameSanskrit: "सरस्वती",
    role: "Goddess of Knowledge, Wisdom, Music, and Creative Arts in the Tridevi",
    meaning: "The flowing stream of consciousness, sound, and speech",
    heroImage: "/images/deities/saraswati.png",
    bgGradient: "radial-gradient(circle, rgba(10, 25, 30, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#0D9488",
    mantraAmbience: { frequency: 220, type: "sine" }, // Warm frequency matching string instruments
    identity: {
      titles: ["Sharada (Giver of essence)", "Vagdevi (Goddess of speech)", "Bharati (Radiance of learning)", "Veena-Vadini (Player of the lute)"],
      weapons: ["None (Armed with wisdom)"],
      symbols: ["Veena (Lute of harmony)", "Manuscripts (Vedic texts)", "Sphatik Rosary (Crystal beads of focus)", "White Lotus"],
      mount: "Hansa (The Sacred Swan)",
      consort: "Lord Brahma",
      loka: "Satyaloka / Brahmaloka",
      sacredColors: ["Pure White", "Basanti Yellow", "Cream Ivory"],
      sacredNumbers: [5, 9],
      sacredTrees: ["Kadamba Tree", "White Lotus"],
      sacredAnimals: ["Swan (Hansa)", "Peacock (Mayura)"]
    },
    timeline: [
      {
        stage: "Sound Origin",
        title: "Awakening the silent cosmos",
        description: "Brahma creates the physical universe, but it remains silent and formless until Saraswati manifests to give it sound, language, and order.",
        sanskritQuote: "ॐ ऐं महासरस्वत्यै नमः॥",
        quoteTranslation: "Salutations to the Great Saraswati, who represents the seed sound of wisdom.",
        storyDetails: "When Brahma first projected the material universe, it was inert and quiet. He realized something was missing. By praying to supreme consciousness, Saraswati manifested. With her arrival, winds began to rustle, waters began to flow, and speech awoke."
      },
      {
        stage: "Primordial Om",
        title: "Tuning the Veena of Creation",
        description: "Saraswati strums the strings of her Veena, creating the cosmic vibration 'Om' and organizing sound into musical notes.",
        sanskritQuote: "या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना...",
        quoteTranslation: "Whose hand is adorned with the beautiful Veena, who is seated on a white lotus...",
        storyDetails: "Her Veena represents the human spine and nervous system. By strumming it, she created the primary scales (Svara) and sound frequencies, teaching that true knowledge is like a perfectly tuned musical instrument."
      },
      {
        stage: "River Flow",
        title: "Nourisher of Vedic Civilization",
        description: "Saraswati flows as a mighty river from the Himalayas, nourishing the early ashrams of rishis who composed the Vedas.",
        sanskritQuote: "प्रणो देवी सरस्वती वाजेभिर्वाजिनीवती...",
        quoteTranslation: "May the divine Saraswati, rich in food and strength, bless our intellect...",
        storyDetails: "In ancient times, Saraswati was a major physical river. On her banks, sages performed rituals and received the Vedas. Her flow symbolizes the transmission of knowledge from generation to generation."
      },
      {
        stage: "Discerning Swan",
        title: "Filtering Truth from Illusion",
        description: "Saraswati rides the Hansa (swan), a creature capable of separating milk from water, representing discrimination.",
        sanskritQuote: "हंसवाहिनि देवि नमस्तुभ्यं...",
        quoteTranslation: "O Goddess who rides the swan, I bow to you...",
        storyDetails: "The swan has a unique legendary ability to drink only milk when presented with a mixture of milk and water. This represents Viveka (discernment)—the core value of learning to choose eternal truth over material illusion."
      },
      {
        stage: "Vasant Panchami",
        title: "The Springtime Awakening",
        description: "Welcoming the spring season, Saraswati is worshipped to bless children with speech, art, and academic success.",
        sanskritQuote: "सरस्वति नमस्तुभ्यं वरदे कामरूपिणि...",
        quoteTranslation: "O Saraswati, salutations to you. Giver of blessings, who takes the form of desires...",
        storyDetails: "On this day, children are introduced to their first alphabets (Aksharabhyasam). People wear yellow, representing ripening mustard fields and the golden light of growing intellect."
      }
    ],
    gallery: [
      {
        title: "Kashmir Sharada Murti",
        type: "Stone Carving",
        origin: "Sharada Peeth, Kashmir, 8th Century CE",
        description: "A classic representation of Devi Sharada as the presiding goddess of learning in northern India."
      },
      {
        title: "Raja Ravi Varma Painting",
        type: "Oil Canvas painting",
        origin: "Travancore, Kerala, 19th Century CE",
        description: "A famous realistic depiction of Saraswati playing the Veena in a serene natural setting next to a peacock."
      }
    ],
    geography: [
      {
        templeName: "Gnana Saraswati Temple",
        region: "Basar, Telangana",
        significance: "One of the few historic temples dedicated to Saraswati, where children are brought to perform Akshara Abhyasam (writing ceremony).",
        coordinates: "18.9734° N, 77.9422° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Basar+Gnana+Saraswati+Temple+Telangana",
        routeDescription: "Located on the banks of the Godavari River, easily accessible by train or highway."
      }
    ],
    scriptures: [
      {
        category: "Vedas",
        title: "Rigveda (Saraswati Suktam)",
        quote: "महो अर्णः सरस्वती प्र चेतयति केतुना॥",
        quoteTranslation: "Saraswati, like a great ocean, awakens our intellect with her light.",
        connection: "Contains hymns calling upon Saraswati as the goddess of speech and the holy river of wisdom."
      }
    ],
    festivals: [
      {
        name: "Vasant Panchami",
        lunarDate: "Magha, Shukla Panchami",
        description: "The spring festival of Saraswati, marking the day she manifested to bring music and learning to earth.",
        regionalVariations: "Devotees wear yellow garments, offer yellow sweets, and place books/instruments at the feet of the goddess."
      }
    ],
    relationships: {
      family: [
        { name: "Brahma", relation: "Consort", slug: "brahma" }
      ],
      avatars: [],
      gurus: []
    },
    mantras: [
      {
        text: "ॐ ऐं सरस्वत्यै नमः",
        transliteration: "Om Aim Saraswatyai Namaha",
        translation: "I bow to the Goddess of wisdom and creative learning.",
        meaning: "The seed syllable 'Aim' is the sound of Saraswati, representing creative power, sound, and deep memory.",
        breakdown: [
          { word: "ॐ", meaning: "The ultimate cosmic frequency" },
          { word: "ऐं", meaning: "The seed sound (Bija) of Saraswati and intellect" },
          { word: "सरस्वत्यै", meaning: "To Goddess Saraswati" },
          { word: "नमः", meaning: "Bowing down" }
        ]
      }
    ],
    relatedDeitySlugs: ["brahma", "lakshmi", "parvati"]
  },

  lakshmi: {
    slug: "lakshmi",
    nameEnglish: "Devi Lakshmi",
    nameHindi: "देवी लक्ष्मी",
    nameSanskrit: "लक्ष्मी",
    role: "Goddess of Wealth, Fortune, Beauty, and Spiritual Abundance in the Tridevi",
    meaning: "The gold-radiant target/goal (Lakshya) of spiritual and material fullness",
    heroImage: "/images/deities/lakshmi.png",
    bgGradient: "radial-gradient(circle, rgba(32, 10, 15, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#BE185D",
    mantraAmbience: { frequency: 174, type: "sine" }, // Solfeggio frequency for healing and security
    identity: {
      titles: ["Shri (Sacred abundance)", "Padmavati (Lotus dweller)", "Mahalakshmi (Great Goddess)", "Gaja Lakshmi (Elephant-honored)", "Kamala (Lotus-like)"],
      weapons: ["None"],
      symbols: ["Lotus flowers", "Gold coins flowing from palm", "Kalasha (Sacred vessel)", "Four hands (representing Purusharthas)"],
      mount: "Uluka (The Sacred Owl) / Gaja (Royal Elephant)",
      consort: "Lord Vishnu",
      loka: "Vaikuntha",
      sacredColors: ["Golden Gold", "Crimson Red", "Lotus Pink"],
      sacredNumbers: [8, 16],
      sacredTrees: ["Lotus", "Bilva Tree", "Tulsi"],
      sacredAnimals: ["Elephant (Gaja)", "Owl (Uluka)", "Cow"]
    },
    timeline: [
      {
        stage: "Samudra Manthan",
        title: "Emerging from the Sea of Milk",
        description: "Lakshmi manifests from the depth of the churning cosmic ocean, holding a golden lotus, choosing Vishnu as her consort.",
        sanskritQuote: "ततश्चाविर्बभूव श्रीः श्रीमान् हरिपदस्थिता॥",
        quoteTranslation: "Then emerged the radiant Shri, taking her place at the feet of Lord Hari.",
        storyDetails: "During the churning of the milk ocean, Lakshmi arose in absolute beauty. All gods, demons, and celestial beings were captivated by her radiance. She looked at everyone but found none who was free of ego except Vishnu, placing her garland of choice on his neck."
      },
      {
        stage: "Divine Union",
        title: "Sustaining the Universe",
        description: "Lakshmi takes her seat next to Vishnu, representing the perfect alignment of resource management and preservation.",
        sanskritQuote: "हरिप्रियायै विद्महे काममालिन्यै धीमहि...",
        quoteTranslation: "Let us contemplate the beloved of Hari, let us meditate on the one crowned with desires...",
        storyDetails: "As Vishnu's consort, Lakshmi is the active power (Shakti) behind preservation. While Vishnu maintains order, Lakshmi provides the food, resources, health, and courage needed to sustain life, showing that wealth is meant to serve dharma."
      },
      {
        stage: "Ashta Lakshmi",
        title: "The Eight Dimensions of Wealth",
        description: "Lakshmi divides into eight forms to bless humanity with all aspects of material and spiritual abundance.",
        sanskritQuote: "अष्टलक्ष्मी नमस्तुभ्यं वरदे कामरूपिणि...",
        quoteTranslation: "Salutations to the eight Lakshmis, who grant blessings and fulfill desires...",
        storyDetails: "The eight forms are: Adi (primary source), Dhana (finances), Dhanya (food grains), Gaja (power/health), Santana (family), Veera (courage), Vijaya (victory), and Vidya (knowledge), showing that wealth is multidimensional."
      },
      {
        stage: "Earth Descents",
        title: "Accompanying the Avatars",
        description: "Whenever Vishnu descends to earth, Lakshmi accompanies him, taking form as Sita with Rama and Rukmini with Krishna.",
        sanskritQuote: "राघवत्वे भवत्सीता रुक्मिणी कृष्णजन्मनि...",
        quoteTranslation: "She became Sita during Rama's descent, and Rukmini during Krishna's birth...",
        storyDetails: "Her earth descents demonstrate that the divine feminine is inseparable from the divine masculine. As Sita, she represented earth-like endurance; as Rukmini, she represented devotion and royal grace."
      },
      {
        stage: "Kanakadhara Blessing",
        title: "The Golden Shower of Selflessness",
        description: "Moved by a poor woman's offering of a dry gooseberry, Lakshmi showers gold coins inside her humble hut in response to Adi Shankara's prayer.",
        sanskritQuote: "कनकधारा स्तोत्रं पठताम्...",
        quoteTranslation: "For those who recite the Kanakadhara hymn...",
        storyDetails: "A poor woman had nothing to offer the young monk Adi Shankara except a single dried amla fruit. Touched by her selflessness, Shankara sang the Kanakadhara Stotram to Lakshmi, who instantly showered the home with golden amla replicas, proving that intention outweighs value."
      }
    ],
    gallery: [
      {
        title: "Gajalakshmi Relief",
        type: "Cave Entrance carving",
        origin: "Udayagiri Caves, Madhya Pradesh, 5th Century CE",
        description: "An ancient relief depicting Lakshmi flanked by two elephants pouring water from pitchers over her."
      },
      {
        title: "Chola Sri Devi Bronze",
        type: "Bronze Statue",
        origin: "Thanjavur, Tamil Nadu, 11th Century CE",
        description: "A highly stylized bronze representing Lakshmi (Sri Devi) as the embodiment of grace, holding a lotus bud."
      }
    ],
    geography: [
      {
        templeName: "Sripuram Golden Temple",
        region: "Vellore, Tamil Nadu",
        significance: "A magnificent temple dedicated to Narayani, constructed with over 1.5 tons of pure gold leaf.",
        coordinates: "12.8712° N, 79.0883° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Sripuram+Golden+Temple+Vellore",
        routeDescription: "Located in a star-shaped path surrounded by lush green hills, accessible by road from Chennai."
      }
    ],
    scriptures: [
      {
        category: "Vedas",
        title: "Rigveda (Sri Suktam)",
        quote: "चन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥",
        quoteTranslation: "Invoke for me, O Agni, that Lakshmi who is moon-like and gold-radiant.",
        connection: "The oldest Vedic hymn dedicated to Lakshmi, describing her relationship with gold, cattle, and food."
      }
    ],
    festivals: [
      {
        name: "Diwali (Lakshmi Puja)",
        lunarDate: "Kartika, Amavasya",
        description: "The night of lamps, welcoming Lakshmi into homes to bring prosperity and peace.",
        regionalVariations: "Cleaned homes are illuminated with clay diyas, and merchants open new account books after worshipping Lakshmi."
      }
    ],
    relationships: {
      family: [
        { name: "Vishnu", relation: "Consort", slug: "vishnu" }
      ],
      avatars: [
        { name: "Sita", description: "Consort of Lord Rama.", slug: "rama" },
        { name: "Rukmini", description: "Consort of Lord Krishna.", slug: "krishna" }
      ],
      gurus: []
    },
    mantras: [
      {
        text: "ॐ श्रीं महालक्ष्म्यै नमः",
        transliteration: "Om Shreem Mahalakshmyai Namaha",
        translation: "Salutations to the Supreme Goddess of wealth and prosperity.",
        meaning: "The syllable 'Shreem' is the sound of abundance, attracting physical wellness, beauty, and positive resources.",
        breakdown: [
          { word: "ॐ", meaning: "The ultimate cosmic word" },
          { word: "श्रीं", meaning: "The seed sound of wealth and beauty" },
          { word: "महालक्ष्म्यै", meaning: "To the Great Lakshmi" },
          { word: "नमः", meaning: "I surrender my limitations" }
        ]
      }
    ],
    relatedDeitySlugs: ["vishnu", "saraswati", "parvati"]
  },

  parvati: {
    slug: "parvati",
    nameEnglish: "Devi Parvati",
    nameHindi: "देवी पार्वती",
    nameSanskrit: "पार्वती",
    role: "Goddess of Love, Devotion, Willpower, and Family Harmony in the Tridevi",
    meaning: "The Daughter of the Mountain (Parvata), representing unshakeable determination",
    heroImage: "/images/deities/parvati.png",
    bgGradient: "radial-gradient(circle, rgba(30, 10, 25, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#C026D3",
    mantraAmbience: { frequency: 288, type: "sine" },
    identity: {
      titles: ["Uma (Mother of light)", "Gauri (The golden one)", "Shakti (Cosmic energy)", "Himavati (Daughter of Himalayas)", "Jagadamba (Mother of the world)"],
      weapons: ["Trishula (Trident)", "Sword", "Kharga"],
      symbols: ["Mirror (representing reflection of self)", "Rosary", "Lotus bud", "Red vermilion"],
      mount: "Simha (The Lion) / Tiger",
      consort: "Lord Shiva",
      loka: "Mount Kailash",
      sacredColors: ["Pink", "Saffron Orange", "Deep Red"],
      sacredNumbers: [2, 9],
      sacredTrees: ["Bilva Tree", "Ashoka Tree"],
      sacredAnimals: ["Lion", "Cow", "Peacock"]
    },
    timeline: [
      {
        stage: "Himavan's Daughter",
        title: "Birth in the High Peaks",
        description: "Reincarnating as Gauri, she is born to King Himavan of the Himalayas, destined to reunite with Lord Shiva.",
        sanskritQuote: "ॐ ह्रीं उमादेव्यै नमः॥",
        quoteTranslation: "Salutations to Goddess Uma, who represents cosmic intelligence.",
        storyDetails: "After Sati self-immolated, she was reborn as Parvati, the daughter of Himavan (the king of mountains). Since childhood, she remembered her past connection with Shiva and dedicated her life to finding him, despite the mountain snows."
      },
      {
        stage: "Himalayan Tapas",
        title: "The Fire of Determination",
        description: "Parvati undertakes thousands of years of intense yogic penance in the snow, surviving on wind and leaves.",
        sanskritQuote: "तपोभिः प्राप्यते देवः शिवो मन्मथनाशनः॥",
        quoteTranslation: "By intense penance alone is Shiva, the destroyer of cupid, attained.",
        storyDetails: "Shiva was in deep meditation and ignored the material world. Parvati gave up all royal comforts, wearing tree bark and meditating in freezing rivers and blazing fires. Her spiritual energy (Tapas) shook the heavens, forcing Shiva to notice her devotion."
      },
      {
        stage: "Shiv-Parvati Union",
        title: "The Sacred Wedding",
        description: "Shiva tests Parvati's love, and finding it absolute, accepts her as his wife in a grand wedding at Triyuginarayan.",
        sanskritQuote: "शिवशक्तियुक्तो यदि भवति शक्तः प्रभवितुम्...",
        quoteTranslation: "United with Shakti, Shiva becomes capable of creating...",
        storyDetails: "Shiva came disguised as an old Brahmin, criticizing Shiva's behavior to test her. Parvati became angry at the insults and defended Shiva. Moved by her pure heart, Shiva revealed his true form and wed her, restoring balance between ascetism and family life."
      },
      {
        stage: "Motherhood",
        title: "Nurturing the Cosmic Guardians",
        description: "Parvati shapes Ganesha from clay and guides her children to protect the weak and clear obstacles.",
        sanskritQuote: "जगन्मातरं गौरीं प्रणमामि मुहुर्मुहुः...",
        quoteTranslation: "I bow again and again to Gauri, the mother of the world...",
        storyDetails: "While Shiva was away, Parvati created a child from turmeric paste to guard her door, breathing life into Ganesha. She also nurtured Kartikeya, presenting him with the spear of wisdom (Vel) to defeat ignorance, demonstrating her role as a protective mother."
      },
      {
        stage: "Ardhanarishvara",
        title: "The Half-Female Lord",
        description: "Parvati merges her physical form with Shiva, creating a singular form that transcends gender polarities.",
        sanskritQuote: "अर्धनारीश्वर स्वरूपाय नमः...",
        quoteTranslation: "Salutations to the form of Ardhanarishvara...",
        storyDetails: "To show that the creator and energy, male and female, consciousness and matter are inseparable, Parvati merged with Shiva, forming a figure that is half-male and half-female, representing complete non-dual cosmic harmony."
      }
    ],
    gallery: [
      {
        title: "Chola Somaskanda Bronze",
        type: "Bronze Sculpture",
        origin: "Tamil Nadu, 11th Century CE",
        description: "A beautiful bronze depiction of Shiva and Parvati seated together with baby Skanda (Kartikeya) between them."
      },
      {
        title: "Uma-Maheshwar Relief",
        type: "Stone Relief carving",
        origin: "Khajuraho, Madhya Pradesh, 10th Century CE",
        description: "An intimate and classic carving of Shiva and Parvati embracing, representing cosmic love and balance."
      }
    ],
    geography: [
      {
        templeName: "Meenakshi Amman Temple",
        region: "Madurai, Tamil Nadu",
        significance: "Worshipped as Meenakshi (the fish-eyed goddess), celebrating her wedding to Sundareswarar (Shiva).",
        coordinates: "9.9195° N, 78.1193° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Meenakshi+Amman+Temple+Madurai",
        routeDescription: "Located in the center of Madurai, characterized by its towering, colorful Gopurams visible across the skyline."
      }
    ],
    scriptures: [
      {
        category: "Puranas",
        title: "Shiva Purana",
        quote: "शिवे भक्तिरभेदा मे भवेत् सर्वत्र शाश्वती॥",
        quoteTranslation: "May my devotion to Shiva be undivided and eternal everywhere.",
        connection: "Recounts the life, penance, wedding, and spiritual teachings of Parvati."
      }
    ],
    festivals: [
      {
        name: "Gauri Tritiya / Teej",
        lunarDate: "Bhadrapada, Shukla Tritiya",
        description: "A festival celebrating Parvati's reunion and wedding with Lord Shiva.",
        regionalVariations: "Women fast, apply henna, wear green, and offer prayers to Gauri-Shankar for family harmony."
      }
    ],
    relationships: {
      family: [
        { name: "Shiva", relation: "Consort", slug: "shiva" },
        { name: "Ganesha", relation: "Son", slug: "ganesha" },
        { name: "Kartikeya", relation: "Son", slug: "kartikeya" },
        { name: "Himavan", relation: "Father" },
        { name: "Mena", relation: "Mother" }
      ],
      avatars: [
        { name: "Devi Durga", description: "The warrior aspect of Shakti.", slug: "durga" },
        { name: "Devi Kali", description: "The fierce time-governing aspect.", slug: "kali" }
      ],
      gurus: []
    },
    mantras: [
      {
        text: "ॐ पार्वत्यै नमः",
        transliteration: "Om Parvatyai Namaha",
        translation: "Salutations to the Divine Mother Parvati.",
        meaning: "A mantra to invoke inner strength, devotion, focus, and harmony in relationships.",
        breakdown: [
          { word: "ॐ", meaning: "The primordial vibration" },
          { word: "पार्वत्यै", meaning: "To Parvati, daughter of the mountains" },
          { word: "नमः", meaning: "Bowing down" }
        ]
      }
    ],
    relatedDeitySlugs: ["shiva", "ganesha", "kartikeya", "durga", "kali"]
  },

  durga: {
    slug: "durga",
    nameEnglish: "Devi Durga",
    nameHindi: "देवी दुर्गा",
    nameSanskrit: "दुर्गा",
    role: "The Invincible Warrior Mother and Protector of Cosmic Order in the Tridevi",
    meaning: "The One who is difficult to reach, who destroys distress and fort-like hurdles",
    heroImage: "/images/deities/durga.png",
    bgGradient: "radial-gradient(circle, rgba(34, 10, 10, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#991B1B",
    mantraAmbience: { frequency: 196, type: "sawtooth" },
    identity: {
      titles: ["Mahishasuramardini (Slayer of buffalo demon)", "Jagadamba (Mother of the universe)", "Simhavahini (Lion-rider)", "Bhagavati (Divine sovereign)"],
      weapons: ["Trishula (Trident)", "Sudarshana Chakra", "Kharga (Sword)", "Kodanda Bow", "Gada (Mace)"],
      symbols: ["Conch shell (Sound of victory)", "Lotus", "Water pot (Kamandalu)", "Abhaya Mudra (Fearless gesture)"],
      mount: "Simha (The Golden Lion)",
      consort: "Lord Shiva",
      loka: "Manidvipa (The Island of Jewels)",
      sacredColors: ["Bright Red", "Crimson Saffron", "Golden Yellow"],
      sacredNumbers: [9, 108],
      sacredTrees: ["Bilva Tree", "Banyan Tree"],
      sacredAnimals: ["Lion (Simha)", "Tiger"]
    },
    timeline: [
      {
        stage: "Fiery Manifestation",
        title: "Born of the Divine Flame",
        description: "When gods are defeated by Mahishasura, they project their inner anger, forming the radiant warrior Durga.",
        sanskritQuote: "अतुलं तत्र तत्तेजः सर्वदेवशरीरजम्।\nएकस्थं तदभून्नारी व्याप्तलोकत्रयं त्विषा॥",
        quoteTranslation: "An incomparable light born from the bodies of all gods gathered in one place, becoming a woman who filled the three worlds with her radiance.",
        storyDetails: "The buffalo demon Mahishasura held a boon that no man or god could kill him. He conquered heaven. The helpless gods assembled and directed their anger and energy into a single spot. From this blazing cosmic fire, Goddess Durga manifested, representing collective dynamic power."
      },
      {
        stage: "Arming the Warrior",
        title: "Gifts of the Heavens",
        description: "Each deity presents Durga with their primary weapon and ornament to prepare her for battle.",
        sanskritQuote: "ददौ त्रिशूलं पिनाकी चक्रं कृष्णोऽददात्ततः...",
        quoteTranslation: "Shiva gave his trident, Krishna gave his discus...",
        storyDetails: "To help her defeat the demon, Shiva offered his Trishula, Vishnu his Sudarshana Chakra, Varuna his conch, Agni his spear, and Himavan a majestic golden lion. Armed with ten weapons in ten hands, she was ready to defend dharma."
      },
      {
        stage: "Lion Ascent",
        title: "Riding into the Battlefield",
        description: "Durga rides her roaring lion into the battlefield, her battle cries shaking the foundations of the three worlds.",
        sanskritQuote: "सिंहवाहिनि दुर्गा देवि विजयं देहि मे सदा॥",
        quoteTranslation: "O Durga riding the lion, grant me victory always.",
        storyDetails: "Her lion represents valor and control over animal instincts. Riding it, she entered the battlefield, challenging the massive demon armies, demonstrating that righteousness stands fearlessly against overwhelming negative numbers."
      },
      {
        stage: "Nine-Day War",
        title: "Combatting the Demonic Illusions",
        description: "Durga fights Mahishasura for nine days as he changes shapes from buffalo to lion, elephant, and giant warrior.",
        sanskritQuote: "शुम्भनिशुम्भविनाशिनी मातर्जयतु जयतु...",
        quoteTranslation: "Slayer of Shumbha and Nishumbha, Mother, victory to you...",
        storyDetails: "Mahishasura tried to deceive her by transforming into various animals. Each time he shifted, Durga adapted her tactics, matching his physical strength with her calm, strategic wisdom, showing that cosmic energy remains centered amidst chaos."
      },
      {
        stage: "Mahishasura Slay",
        title: "The Decapitation on Vijayadashami",
        description: "Durga pins the buffalo demon under her foot and pierces his chest, decapitating him to restore cosmic peace.",
        sanskritQuote: "महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥",
        quoteTranslation: "Slayer of the buffalo demon, with beautiful matted hair, daughter of the mountain.",
        storyDetails: "As the demon emerged in his original human form from the decapitated neck of the buffalo, Durga pinned him down and pierced him with Shiva's trident, destroying his reign of terror. The gods showered flowers, celebrating the triumph of light."
      }
    ],
    gallery: [
      {
        title: "Mamallapuram Durga Relief",
        type: "Rock Wall Relief",
        origin: "Pallava Dynasty, Tamil Nadu, 7th Century CE",
        description: "A dramatic rock-cut carving showing Durga on her lion fighting the buffalo-headed demon Mahishasura."
      },
      {
        title: "Hoysaleswara Durga Temple",
        type: "Stone Carving",
        origin: "Hoysala Dynasty, Karnataka, 12th Century CE",
        description: "An intricately detailed stone relief of Durga with multiple arms holding weapons, showcasing deep carving details."
      }
    ],
    geography: [
      {
        templeName: "Vaishno Devi Temple",
        region: "Trikuta Mountains, Jammu & Kashmir",
        significance: "A highly revered cave shrine where Durga is worshipped as three self-manifested rock formations (Pindis).",
        coordinates: "33.0301° N, 74.9490° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Vaishno+Devi+Temple+Jammu",
        routeDescription: "A mountainous path starting from Katra, winding up the Trikuta hills to the sacred natural cave."
      }
    ],
    scriptures: [
      {
        category: "Puranas",
        title: "Devi Mahatmya (Durga Saptashati)",
        quote: "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
        quoteTranslation: "To that Devi who resides in all beings in the form of power, salutations to her, salutations to her, salutations to her.",
        connection: "The primary scripture describing her manifestation, battles, and theological status as supreme consciousness."
      }
    ],
    festivals: [
      {
        name: "Navratri / Durga Puja",
        lunarDate: "Ashvina, Shukla Pratipada to Dashami",
        description: "Ten days celebrating the victory of Durga over Mahishasura.",
        regionalVariations: "Massive pandals and clay idols in Bengal, Garba and Dandiya dances in Gujarat, and Ramlila performances in northern India."
      }
    ],
    relationships: {
      family: [
        { name: "Shiva", relation: "Consort", slug: "shiva" },
        { name: "Parvati", relation: "Original Form", slug: "parvati" }
      ],
      avatars: [
        { name: "Navadurga", description: "The nine distinct aspects of Durga worshipped during Navratri." }
      ],
      gurus: []
    },
    mantras: [
      {
        text: "ॐ दुं दुर्गायै नमः",
        transliteration: "Om Dum Durgayai Namaha",
        translation: "Salutations to the protective, invincible Mother Durga.",
        meaning: "The syllable 'Dum' is the defensive sound barrier, shielding the practitioner from negativity, fear, and obstacles.",
        breakdown: [
          { word: "ॐ", meaning: "The supreme cosmic reality" },
          { word: "दुं", meaning: "The seed sound of Durga, creating a defensive fortress" },
          { word: "दुर्गायै", meaning: "To Goddess Durga" },
          { word: "नमः", meaning: "Bowing down" }
        ]
      }
    ],
    relatedDeitySlugs: ["shiva", "parvati", "kali"]
  },

  kali: {
    slug: "kali",
    nameEnglish: "Devi Kali",
    nameHindi: "देवी काली",
    nameSanskrit: "काली",
    role: "The Fierce Goddess of Time, Ego Dissolution, and Ultimate Liberation",
    meaning: "The Dark One, who governs time (Kala), change, and formless space",
    heroImage: "/images/deities/kali.png",
    bgGradient: "radial-gradient(circle, rgba(15, 10, 20, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#111827",
    mantraAmbience: { frequency: 110, type: "sawtooth" }, // Deep bass frequency for grounding and raw power
    identity: {
      titles: ["Kalika (Dark Goddess)", "Shyama (Deep blue one)", "Adya Shakti (Primordial force)", "Dakshina Kali (Benevolent transformer)", "Bhadrakali (Auspicious warrior)"],
      weapons: ["Kharga (Curved Sword of discernment)"],
      symbols: ["Severed head (Ego death)", "Garland of skulls (Letters of Sanskrit alphabet)", "Bowl of blood", "Tongue stuck out (Surprise/Shame)"],
      mount: "Jackal / Standing on chest of Lord Shiva",
      consort: "Lord Shiva",
      loka: "Smashana (Cremation grounds) / Manidvipa",
      sacredColors: ["Charcoal Black", "Midnight Blue", "Blood Red"],
      sacredNumbers: [10],
      sacredTrees: ["Banyan Tree", "Shammi Tree"],
      sacredAnimals: ["Jackal", "Black Crow", "Black Dog"]
    },
    timeline: [
      {
        stage: "Brow Emergence",
        title: "Springing from the Warrior's Wrath",
        description: "During a battle crisis, Kali emerges directly from the furrowed brow of Goddess Durga as pure raw fury.",
        sanskritQuote: "तत कोपसञ्जातवक्त्रा भीषणा चामुण्डा...",
        quoteTranslation: "Then from her angry brow emerged the terrifying Chamunda-Kali...",
        storyDetails: "When Durga was attacked by demon generals Chanda and Munda, her face turned black with anger. Suddenly, from her forehead, Kali emerged with dark skin, hollow eyes, wielding a sword, representing the subconscious rage of justice."
      },
      {
        stage: "Slaying Chanda-Munda",
        title: "Earning the name Chamunda",
        description: "Kali defeats the two demon generals and presents their heads to Durga, earning the name Chamunda.",
        sanskritQuote: "यस्माच्चण्डं च मुण्डं च गृहीत्वा त्वमुपागता...",
        quoteTranslation: "Since you have captured Chanda and Munda and brought them to me...",
        storyDetails: "Kali fought the demon generals with unmatched speed, decapitating them and carrying their heads to Durga. Durga blessed her, declaring she would be worshipped in the world as Chamunda."
      },
      {
        stage: "Raktabija Defeat",
        title: "Swallowing the Cloning Blood",
        description: "The demon Raktabija multiplies from every drop of blood that hits the earth. Kali drinks his blood to end his lineage.",
        sanskritQuote: "रक्तबीजविनाशिनी मातर्जयतु...",
        quoteTranslation: "Destroyer of Raktabija, Mother, victory...",
        storyDetails: "Raktabija's clones made him unbeatable. Kali solved this by stretching her massive tongue across the battlefield, catching and drinking every drop of his blood before it touched the ground, while Durga attacked the main body."
      },
      {
        stage: "Cosmic Dance",
        title: "The Dance of Dissolution",
        description: "Swept away by the ecstasy of victory, Kali dances wildly, threatening to shatter the universe with her steps.",
        sanskritQuote: "करालवदना घोरा मुण्डमालाविभूषणा...",
        quoteTranslation: "Of terrifying face, fierce, adorned with a garland of skulls...",
        storyDetails: "Her dance represented the speed of time. To save the earth from being crushed under her feet, Shiva lay down in her path. When she stepped on his chest, she looked down, realized she had stepped on her husband, and stuck out her tongue in surprise, returning to a calm state."
      },
      {
        stage: "Mother of Time",
        title: "The Peace of Dissolution",
        description: "Standing on Shiva, she represents the union of active energy (Prakriti) and still consciousness (Purusha).",
        sanskritQuote: "क्रीं क्रीं क्रीं हूं हूं ह्रीं ह्रीं दक्षिणे कालिके...",
        quoteTranslation: "The primary seed sounds of Dakshina Kalika...",
        storyDetails: "Her dark skin represents the formless space in which the universe dissolves. Standing on the still body of Shiva shows that active energy requires a foundation of silent, pure awareness to exist, guiding souls to total liberation."
      }
    ],
    gallery: [
      {
        title: "Dakshineswar Kali Icon",
        type: "Basalt Stone Statue",
        origin: "Kolkata, West Bengal, 19th Century CE",
        description: "The famous black basalt statue of Bhavatarini (Kali) standing on a white marble reclining Shiva."
      }
    ],
    geography: [
      {
        templeName: "Kalighat Kali Temple",
        region: "Kolkata, West Bengal",
        significance: "One of the 51 Shakti Peethas, marking the spot where the toes of Sati's right foot fell.",
        coordinates: "22.5204° N, 88.3424° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Kalighat+Kali+Temple+Kolkata",
        routeDescription: "Located near the banks of the Adi Ganga canal in Kolkata, easily accessible via metro."
      }
    ],
    scriptures: [
      {
        category: "Tantras",
        title: "Mahanirvana Tantra",
        quote: "यथा नीलं जलं व्योम्नि तथा काली परात्परा॥",
        quoteTranslation: "Just as blue water appears in the sky, so does Kali appear in the supreme reality.",
        connection: "Main source explaining the metaphysical nature of Kali as the source of time and space."
      }
    ],
    festivals: [
      {
        name: "Kali Puja",
        lunarDate: "Kartika, Amavasya",
        description: "worshipping Kali on the dark night of Diwali to dispel inner darkness, fear, and ego.",
        regionalVariations: "Highly celebrated in Bengal and Assam with clay idols, hibiscus offerings, and night prayers."
      }
    ],
    relationships: {
      family: [
        { name: "Shiva", relation: "Consort", slug: "shiva" },
        { name: "Durga", relation: "Source", slug: "durga" }
      ],
      avatars: [
        { name: "Dasa Mahavidyas", description: "The ten wisdom goddesses representing ten aspects of time and knowledge." }
      ],
      gurus: []
    },
    mantras: [
      {
        text: "ॐ क्रीं कालिकायै नमः",
        transliteration: "Om Kreem Kalikayai Namaha",
        translation: "Salutations to the dark mother of time and change.",
        meaning: "The syllable 'Kreem' is the sound of action and transformation, cutting away material attachments and pride.",
        breakdown: [
          { word: "ॐ", meaning: "Primordial cosmic sound" },
          { word: "क्रीं", meaning: "The seed sound of Kali, action, and transformation" },
          { word: "कालिकायै", meaning: "To Goddess Kali" },
          { word: "नमः", meaning: "I surrender my pride" }
        ]
      }
    ],
    relatedDeitySlugs: ["shiva", "durga", "parvati"]
  },

  rama: {
    slug: "rama",
    nameEnglish: "Lord Rama",
    nameHindi: "भगवान राम",
    nameSanskrit: "राम",
    role: "The Seventh Avatar of Vishnu, embodying Righteousness and Duty (Maryada Purushottama)",
    meaning: "The One who pleases and brings joy to the hearts of all beings",
    heroImage: "/images/deities/rama.png",
    bgGradient: "radial-gradient(circle, rgba(22, 18, 10, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#059669",
    mantraAmbience: { frequency: 196, type: "sine" },
    identity: {
      titles: ["Maryada Purushottama (Ideal human)", "Raghunandana (Scion of Raghu)", "Ramachandra (Moon-like Rama)", "Sitapati (Lord of Sita)"],
      weapons: ["Kodanda Bow", "Divine Arrows of fire/wind"],
      symbols: ["Signet Ring (Rama Mudra)", "Crown", "Arrow case on back"],
      mount: "Royal Chariot",
      consort: "Goddess Sita",
      loka: "Saket Loka (The abode of light)",
      sacredColors: ["Saffron Orange", "Green", "White"],
      sacredNumbers: [7, 14],
      sacredTrees: ["Kalpavriksha", "Ashoka Tree"],
      sacredAnimals: ["Monkey (Vanara)", "Squirrel", "Eagle"]
    },
    timeline: [
      {
        stage: "Birth",
        title: "The Descent of Dharma in Ayodhya",
        description: "Rama is born as the eldest prince of Ayodhya to King Dasharatha and Queen Kausalya to defeat King Ravana.",
        sanskritQuote: "भये प्रगट कृपाला दीनदयाला कौसल्या हितकारी॥",
        quoteTranslation: "The compassionate and merciful Lord manifested, bringing joy to Kausalya.",
        storyDetails: "Born in the solar dynasty (Suryavansha) on Rama Navami, his birth brought joy to Ayodhya. He was named Rama by Sage Vasistha, who saw he would draw all hearts to himself."
      },
      {
        stage: "Vishwamitra",
        title: "Safeguarding the Vedic Sacrifice",
        description: "Accompanying Sage Vishwamitra, the young Rama defeats demonic forces to protect spiritual rituals in forests.",
        sanskritQuote: "विश्वामित्रवचनं श्रुत्वा रामो लक्ष्मणसंयुतः...",
        quoteTranslation: "Hearing Vishwamitra's words, Rama accompanied by Lakshmana went forth...",
        storyDetails: "Sage Vishwamitra requested Rama's help to protect his forest yajnas from demons Tataka, Subahu, and Maricha. The young prince defeated them, receiving divine weapons and martial secrets from the sage."
      },
      {
        stage: "Sita Swayamvar",
        title: "Breaking the Shiva Bow",
        description: "Rama strings and breaks the heavy Shiva Bow at Mithila, winning the hand of Princess Sita in marriage.",
        sanskritQuote: "भञ्जनं चापस्य रौद्रस्य...",
        quoteTranslation: "The breaking of the bow of Rudra...",
        storyDetails: "King Janaka challenged suitors to string the massive bow of Shiva. While mighty kings failed, Rama calmly lifted the bow, and as he strung it, it broke with a sound like thunder, establishing his marriage with Sita."
      },
      {
        stage: "Vanvas",
        title: "The 14-Year Forest Exile",
        description: "To honor his father's vow to Kaikeyi, Rama gives up his throne on his coronation day, heading to the forest with a smile.",
        sanskritQuote: "पितुर्वाक्यं शिरोधार्यं कृत्वा...",
        quoteTranslation: "Holding his father's words on his head...",
        storyDetails: "When Kaikeyi requested Rama's exile and Bharata's coronation, King Dasharatha was devastated. Rama accepted the decision calmly, comforting his parents, teaching that honoring promises and filial duty are higher than royal wealth."
      },
      {
        stage: "Kishkindha",
        title: "Alliance in the Monkey Kingdom",
        description: "After Sita is kidnapped, Rama travels south, meeting Sugriva and Hanuman, forming a sacred alliance.",
        sanskritQuote: "सुग्रीवमित्रं रामं प्रणमामि...",
        quoteTranslation: "I bow to Rama, the friend of Sugriva...",
        storyDetails: "In the forests of Kishkindha, Rama met Hanuman and helped Sugriva regain his kingdom from Vali. In return, Sugriva mobilized the monkey armies to search for Sita across all directions."
      },
      {
        stage: "Lanka",
        title: "Slaying the Ten-Headed Illusion",
        description: "Rama builds a floating stone bridge to Lanka, defeating Ravana in a legendary battle to rescue Sita.",
        sanskritQuote: "नमामि रामं रणरङ्गधीरम्॥",
        quoteTranslation: "I bow to Rama, who is steady in the theater of war.",
        storyDetails: "To cross the ocean, the monkey army wrote Rama's name on stones, causing them to float (Ram Setu). In Lanka, Rama fought Ravana, whose ten heads represented pride, anger, and desire, destroying him to restore dharma."
      },
      {
        stage: "Ayodhya",
        title: "The Return and Ramrajya",
        description: "Returning after 14 years, Rama is crowned King of Ayodhya, establishing an era of perfect justice and peace.",
        sanskritQuote: "रामचन्द्रचरणौ शरणं प्रपद्ये॥",
        quoteTranslation: "I seek refuge at the feet of Ramachandra.",
        storyDetails: "To celebrate his return, the citizens illuminated Ayodhya with clay lamps, starting the festival of Diwali. As king, Rama established Ramrajya—a system where the weakest citizen had equal rights and absolute justice prevailed."
      }
    ],
    gallery: [
      {
        title: "Deogarh Rama Relief",
        type: "Temple Stone relief",
        origin: "Dashavatara Temple, Deogarh, 6th Century CE",
        description: "An early Gupta-era relief carving depicting Rama and Lakshmana in forest exile, meeting sages."
      }
    ],
    geography: [
      {
        templeName: "Ram Janmabhoomi Mandir",
        region: "Ayodhya, Uttar Pradesh",
        significance: "The sacred birthplace of Lord Rama on the banks of the Sarayu River, built in traditional Nagara style.",
        coordinates: "26.8014° N, 82.1997° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Ram+Mandir+Ayodhya+Uttar+Pradesh",
        routeDescription: "Located in the ancient town of Ayodhya, accessible via Sarayu bathing ghats and royal avenues."
      }
    ],
    scriptures: [
      {
        category: "Ramayana",
        title: "Valmiki Ramayana",
        quote: "रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः॥",
        quoteTranslation: "Rama is the embodiment of Dharma, saintly, and of unshakeable truth-valor.",
        connection: "The primary epic detailing his life, character, exile, battle, and reign as written by Sage Valmiki."
      }
    ],
    festivals: [
      {
        name: "Rama Navami",
        lunarDate: "Chaitra, Shukla Navami",
        description: "Celebrating the birth of Lord Rama in Ayodhya.",
        regionalVariations: "Recitations of Ramayana, temple processions, and distribution of panakam (sweet cardamom water) across India."
      }
    ],
    relationships: {
      family: [
        { name: "Vishnu", relation: "Source", slug: "vishnu" },
        { name: "Sita", relation: "Consort", slug: "lakshmi" },
        { name: "Luv", relation: "Son" },
        { name: "Kush", relation: "Son" },
        { name: "Dasharatha", relation: "Father" },
        { name: "Kausalya", relation: "Mother" },
        { name: "Lakshmana", relation: "Brother" },
        { name: "Bharata", relation: "Brother" },
        { name: "Shatrughna", relation: "Brother" }
      ],
      avatars: [],
      gurus: [
        { name: "Sage Vasistha", role: "Royal family priest and spiritual guide who taught him Yoga Vasistha." },
        { name: "Sage Vishwamitra", role: "Martial arts guru who guided his early forest adventures." }
      ]
    },
    mantras: [
      {
        text: "ॐ रामाय नमः",
        transliteration: "Om Ramaya Namaha",
        translation: "I bow to Lord Rama, the embodiment of righteousness.",
        meaning: "A mantra that brings peace, mental balance, emotional control, and alignment with ethical duty (dharma).",
        breakdown: [
          { word: "ॐ", meaning: "Primordial cosmic sound" },
          { word: "रामाय", meaning: "To Rama, who brings joy to the mind" },
          { word: "नमः", meaning: "Bowing down" }
        ]
      }
    ],
    relatedDeitySlugs: ["vishnu", "hanuman", "krishna"]
  },

  krishna: {
    slug: "krishna",
    nameEnglish: "Lord Krishna",
    nameHindi: "भगवान कृष्ण",
    nameSanskrit: "कृष्ण",
    role: "The Eighth Avatar of Vishnu, Master of Play and Universal Philosopher (Lila Purushottama)",
    meaning: "The Dark, All-Attractive One, who draws individual souls to cosmic consciousness",
    heroImage: "/images/deities/krishna.png",
    bgGradient: "radial-gradient(circle, rgba(12, 10, 32, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#2563EB",
    mantraAmbience: { frequency: 147.85, type: "sawtooth" },
    identity: {
      titles: ["Lila Purushottama (Master of play)", "Vasudeva (Son of Vasudeva)", "Govinda (Protector of cows)", "Gopala (Cowherd boy)", "Yogeshwara (Lord of Yoga)"],
      weapons: ["Sudarshana Chakra", "Kaumodaki Gada"],
      symbols: ["Bansi (Flute)", "Peacock Feather in crown", "Kaustubha Gem", "Kadamba tree branch"],
      mount: "Royal Chariot",
      consort: "Goddess Radha / Rukmini",
      loka: "Goloka Vrindavan (The cosmic garden of play)",
      sacredColors: ["Peacock Blue", "Pitambara (Gold Yellow)", "Forest Green"],
      sacredNumbers: [8, 16000],
      sacredTrees: ["Kadamba Tree", "Tulsi"],
      sacredAnimals: ["Cow", "Peacock", "Calf"]
    },
    timeline: [
      {
        stage: "Birth",
        title: "The Midnight Descent in Mathura",
        description: "Born at midnight in Kansa's prison cell, Krishna is transported across the storming Yamuna to safety.",
        sanskritQuote: "वसुदेवसुतं देवं कंसचाणूरमर्दनम्।\nदेवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥",
        quoteTranslation: "I bow to Krishna, the son of Vasudeva, the destroyer of Kansa and Chanura, the supreme joy of Devaki, the guru of the universe.",
        storyDetails: "Born on Janmashtami, his birth cell unlocked by divine force. His father Vasudeva carried him in a basket across the flooded Yamuna River, shielded by the serpent Shesha, to Vrindavan, escaping Kansa's search."
      },
      {
        stage: "Gokul",
        title: "The butter thief",
        description: "Raising as a cowherd, Krishna steals butter, performs miracles, and wins the hearts of the villagers.",
        sanskritQuote: "नवनीतचौराय नमः...",
        quoteTranslation: "Salutations to the stealer of butter...",
        storyDetails: "Krishna stole butter (Makhan Chor) from Gopis, representing the divine stealing the hearts of devotees. He defeated various demon sent by Kansa, like Putana, Shakatasura, and Trinavarta, using play to dissolve evil."
      },
      {
        stage: "Vrindavan",
        title: "The Flute Call and Rasa Lila",
        description: "Playing his flute under the Kadamba tree, Krishna calls the Gopis to the bank of Yamuna for the dance of love.",
        sanskritQuote: "अधरं मधुरं वदनं मधुरं...",
        quoteTranslation: "His lips are sweet, his face is sweet...",
        storyDetails: "His flute music (Bansi) was so sweet that even animals stood still. The Rasa Lila represents the dance of the individual souls (Jivatmas) around the Supreme Soul (Paramatma), showing that pure love is the highest form of yoga."
      },
      {
        stage: "Govardhan",
        title: "Lifting the massive hill",
        description: "Krishna lifts the Govardhan hill on his pinky finger for seven days to shelter Gokul from Indra's storm.",
        sanskritQuote: "गोवर्धनधराय नमः...",
        quoteTranslation: "Salutations to the lifter of Govardhan hill...",
        storyDetails: "When Indra sent torrential rains to punish Vrindavan for stopping his yajna, Krishna lifted the entire hill, using it as a giant umbrella. This humbled Indra's pride and established that nature and simple hills are sacred."
      },
      {
        stage: "Mathura",
        title: "Slaying the Tyrant King Kansa",
        description: "Krishna returns to Mathura, defeats Kansa's wrestling champions, and destroys the tyrant king, freeing his birth parents.",
        sanskritQuote: "कंसध्वंसकाराय नमः...",
        quoteTranslation: "Salutations to the destroyer of Kansa...",
        storyDetails: "Kansa challenged Krishna to a wrestling match. Krishna easily defeated the royal wrestlers and dragged Kansa from his throne, ending his reign and restoring Ugrasena to the throne."
      },
      {
        stage: "Dwarka",
        title: "The Golden Ocean Kingdom",
        description: "Krishna constructs a fortress city, Dwarka, in the western sea to safeguard his citizens from invaders.",
        sanskritQuote: "द्वारकाधीशाय नमः...",
        quoteTranslation: "Salutations to the Lord of Dwarka...",
        storyDetails: "To protect the Yadavas from Jarasandha's constant attacks, Krishna built a golden capital city in the Arabian Sea off the coast of Gujarat, demonstrating his political wisdom and protection."
      },
      {
        stage: "Kurkshetra",
        title: "Arjuna's Charioteer",
        description: "Krishna serves as Arjuna's charioteer, driving him to the center of the battlefield in the war of Mahabharata.",
        sanskritQuote: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः...",
        quoteTranslation: "Wherever is Krishna, the Lord of Yoga, and wherever is Arjuna, the archer...",
        storyDetails: "Krishna refused to pick up weapons, choosing to act as Arjuna's guide and charioteer (Parthasarathy), proving that divine guidance in the seat of action is more important than physical force."
      },
      {
        stage: "Gita",
        title: "Speaking the Bhagavad Gita",
        description: "On the battlefield, Krishna speaks the timeless Bhagavad Gita, revealing his universal cosmic form (Vishwaroopam).",
        sanskritQuote: "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु॥",
        quoteTranslation: "Fix your mind on me, be devoted to me, worship me, bow down to me.",
        storyDetails: "When Arjuna was overcome by grief, Krishna spoke the 700 verses of the Gita, explaining Karma, Bhakti, and Jnana Yoga. He then revealed his Vishwaroopam—containing all stars, galaxies, and time cycles inside his singular body, dispelling Arjuna's doubts."
      }
    ],
    gallery: [
      {
        title: "Kalyanasundara Krishna Relief",
        type: "Cave Stone carving",
        origin: "Badami Caves, Karnataka, 6th Century CE",
        description: "A dynamic Chalukyan relief sculpture showing Krishna defeating the serpent Kaliya in the Yamuna River."
      }
    ],
    geography: [
      {
        templeName: "Dwarkadhish Temple",
        region: "Dwarka, Gujarat",
        significance: "Worshipped as the King of Dwarka, built on the spot where his palace sat, near the Gomti creek.",
        coordinates: "22.2442° N, 68.9684° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Dwarkadhish+Temple+Dwarka+Gujarat",
        routeDescription: "Located on the edge of the Arabian Sea, accessible by rail or coastal highway."
      }
    ],
    scriptures: [
      {
        category: "Gita",
        title: "Bhagavad Gita",
        quote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन॥",
        quoteTranslation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
        connection: " TIMELSS sermon spoken directly by Krishna to Arjuna on the battlefield of Kurukshetra."
      }
    ],
    festivals: [
      {
        name: "Krishna Janmashtami",
        lunarDate: "Bhadrapada, Krishna Ashtami",
        description: "Celebrating the midnight birth of Lord Krishna.",
        regionalVariations: "Dahi Handi (human pyramids breaking butter pots) in Maharashtra, beautiful decorations and midnight prayers in Mathura-Vrindavan."
      }
    ],
    relationships: {
      family: [
        { name: "Vishnu", relation: "Source", slug: "vishnu" },
        { name: "Radha", relation: "Consort (Love)", slug: "parvati" },
        { name: "Rukmini", relation: "Consort (Queen)", slug: "lakshmi" },
        { name: "Vasudeva", relation: "Father" },
        { name: "Devaki", relation: "Mother" },
        { name: "Nanda", relation: "Foster Father" },
        { name: "Yashoda", relation: "Foster Mother" },
        { name: "Balarama", relation: "Brother" },
        { name: "Subhadra", relation: "Sister" }
      ],
      avatars: [],
      gurus: [
        { name: "Sage Sandipani", role: "Taught Krishna the 64 arts in 64 days at Ujjain." }
      ]
    },
    mantras: [
      {
        text: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे।\nहरे राम हरे राम राम राम हरे हरे॥",
        transliteration: "Hare Krishna Hare Krishna Krishna Krishna Hare Hare\nHare Rama Hare Rama Rama Rama Hare Hare",
        translation: "The Maha Mantra, chanting the divine names of Krishna and Rama to cleanse the mind.",
        meaning: "Known as the Kali Santarana Mantra, designed to clear stress, anxiety, and ignorance in the modern era.",
        breakdown: [
          { word: "हरे", meaning: "The divine energy of love (Radha)" },
          { word: "कृष्णा", meaning: "The all-attractive supreme source (Krishna)" },
          { word: "राम", meaning: "The ultimate source of pleasure and righteousness (Rama)" }
        ]
      }
    ],
    relatedDeitySlugs: ["vishnu", "rama", "hanuman"]
  },

  hanuman: {
    slug: "hanuman",
    nameEnglish: "Lord Hanuman",
    nameHindi: "भगवान हनुमान",
    nameSanskrit: "हनुमान",
    role: "The embodiment of Strength, Courage, and Unconditional Devotion (Bhakti)",
    meaning: "He with the prominent jaw, indicating control over speech and pride",
    heroImage: "/images/deities/hanuman.png",
    bgGradient: "radial-gradient(circle, rgba(25, 12, 8, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#D97706",
    mantraAmbience: { frequency: 136.1, type: "triangle" },
    identity: {
      titles: ["Anjaneya (Son of Anjana)", "Bajrangbali (Diamond-limbed)", "Mahaveera (Great hero)", "Pawanputra (Son of wind)", "Sankat Mochan (Reliever of dangers)"],
      weapons: ["Gada (Mace representing strength)"],
      symbols: ["Sanjivani Hill in hand", "Rama Mudra ring", "Torn iron chains", "Orange sindoor (vermilion) coating"],
      mount: "None (Flies with the wind)",
      consort: "None (Ascetic Brahmachari)",
      loka: "Earth (Chiranjivi - dwells in forests)",
      sacredColors: ["Vermilion Orange", "Bright Red", "Maroon Gold"],
      sacredNumbers: [11, 40],
      sacredTrees: ["Sindoor Tree", "Banana Tree", "Tulsi"],
      sacredAnimals: ["Monkey"]
    },
    timeline: [
      {
        stage: "Devotion of Wind",
        title: "Leaping to the Sun",
        description: "As a baby, Hanuman mistakes the rising sun for a ripe mango and leaps to swallow it, receiving cosmic blessings.",
        sanskritQuote: "बालार्कप्रतिमं तेजं...",
        quoteTranslation: "With the brilliance of the rising sun...",
        storyDetails: "Born to Anjana and Kesari, blessed by the wind god Vayu. Seeing the sun, he flew into space. Indra struck him with a thunderbolt (vajra) on his jaw (hanu), making him unconscious. Vayu stopped the cosmic wind. To pacify him, the gods blessed Hanuman with near-invincibility and immense power."
      },
      {
        stage: "Meeting Rama",
        title: "The sacred encounter",
        description: "Hanuman disguised as a Brahmin meets Rama in the forests, recognizing his eternal master.",
        sanskritQuote: "श्रीरामदूतं शिरसा नमामि॥",
        quoteTranslation: "I bow my head to the messenger of Sri Rama.",
        storyDetails: "Rama was searching for Sita. Hanuman met him on behalf of Sugriva. Hearing Rama's voice, his disguise fell away, and he fell at his feet, pledging his life and strength to Rama's mission."
      },
      {
        stage: "Leap to Lanka",
        title: "Crossing the Vast Ocean",
        description: "Expanding to cosmic size, Hanuman leaps across the ocean to find Sita, defeating sea demons.",
        sanskritQuote: "मनोजवं मारुततुल्यवेगं...",
        quoteTranslation: "Swift as the mind, fast as the wind...",
        storyDetails: "To reach Lanka, Hanuman stood on Mount Mahendra, remembered Rama's name, and leaped. He bypassed the obstacles of Surasa and Simhika, landing in Lanka, demonstrating that faith can cross any boundary."
      },
      {
        stage: "Burning Lanka",
        title: "The fiery tail of warning",
        description: "Captured by Ravana's son, Hanuman's tail is set on fire. He breaks free and burns the golden city of Lanka.",
        sanskritQuote: "लङ्कादाहनकाराय नमः...",
        quoteTranslation: "Salutations to the burner of Lanka...",
        storyDetails: "Ravana ordered his tail to be wrapped in cloth and soaked in oil. Hanuman expanded his tail, making it longer. When ignited, he broke his bounds, leaped across roofs, setting the demonic capital ablaze as a warning of Rama's power."
      },
      {
        stage: "Sanjivani Peak",
        title: "Carrying the Mountain of Life",
        description: "Unable to identify the healing herb Sanjivani to save Lakshmana, Hanuman lifts the entire mountain and flies back.",
        sanskritQuote: "सञ्जीवनीशैलधराय नमः...",
        quoteTranslation: "Salutations to the carrier of Sanjivani mountain...",
        storyDetails: "Lakshmana was wounded by Ravana's weapon. The physician prescribed a rare glowing herb from the Himalayas before sunrise. Hanuman flew there. Confused by the herbs, he carved out the entire mountain on his palm and carried it back to Lanka."
      },
      {
        stage: "Ram Durbar",
        title: "Tearing open his chest",
        description: "When presented with a pearl necklace, Hanuman bites the pearls to find Rama's name, tearing his chest to show them in his heart.",
        sanskritQuote: "मम हृदये रामः...",
        quoteTranslation: "Rama resides in my heart...",
        storyDetails: "Sita gifted him a pearl necklace. Hanuman began breaking the pearls. When questioned, he stated any object without Rama's name was worthless. To prove it, he tore open his chest with his claws, revealing Rama and Sita residing in his skeletal heart."
      },
      {
        stage: "Chiranjivi",
        title: "The Immortal Guardian of Earth",
        description: "Blessed with immortality, Hanuman remains on Earth, present wherever Rama's name is chanted.",
        sanskritQuote: "यत्र यत्र रघुनाथकीर्तनं तत्र तत्र कृतमस्तकाञ्जलिम्॥",
        quoteTranslation: "Wherever the praise of Raghunath (Rama) is sung, there stands Hanuman with folded hands.",
        storyDetails: "At the end of Rama's avatar, he blessed Hanuman to remain on Earth in physical form as long as Rama's name is remembered, protecting devotees from negative forces and fear."
      }
    ],
    gallery: [
      {
        title: "Hampi Hanuman Relief",
        type: "Temple Stone carving",
        origin: "Vijayanagara Empire, Karnataka, 15th Century CE",
        description: "A dynamic carving of Hanuman holding the mace and raising his tail, carved on a pillar at Hampi."
      }
    ],
    geography: [
      {
        templeName: "Sankat Mochan Temple",
        region: "Varanasi, Uttar Pradesh",
        significance: "Established by Goswami Tulsidas, the spot where he had a vision of Hanuman, famed for curing astrological afflictions.",
        coordinates: "25.2818° N, 83.0012° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Sankat+Mochan+Temple+Varanasi",
        routeDescription: "Located near the Banaras Hindu University campus, accessible via local ghat streets."
      }
    ],
    scriptures: [
      {
        category: "Ramayana",
        title: "Hanuman Chalisa",
        quote: "जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुं लोक उजागर॥",
        quoteTranslation: "Victory to Hanuman, the ocean of wisdom and virtue. Victory to the Monkey King who illuminates the three worlds.",
        connection: "A 40-verse hymn composed by Tulsidas, describing his strength, achievements, and devotion."
      }
    ],
    festivals: [
      {
        name: "Hanuman Jayanti",
        lunarDate: "Chaitra, Shukla Purnima",
        description: "Celebrating the birth of Lord Hanuman.",
        regionalVariations: "Fasting, reading the Hanuman Chalisa or Sundarkand, and applying vermilion to Hanuman idols across temples."
      }
    ],
    relationships: {
      family: [
        { name: "Kesari", relation: "Father" },
        { name: "Anjana", relation: "Mother" },
        { name: "Vayu (Wind God)", relation: "Spiritual Father" },
        { name: "Rama", relation: "Eternal Master", slug: "rama" }
      ],
      avatars: [
        { name: "Panchamukha Hanuman", description: "The five-faced form representing five directions and aspects of protection." }
      ],
      gurus: [
        { name: "Surya (Sun God)", role: "Hanuman learned scriptures by flying alongside Surya's chariot across the sky." }
      ]
    },
    mantras: [
      {
        text: "ॐ हनुमते नमः",
        transliteration: "Om Hanumate Namaha",
        translation: "Salutations to the mighty, wise Hanuman.",
        meaning: "A mantra that infuses courage, clears fear of spirits or planets, and builds unshakeable physical strength.",
        breakdown: [
          { word: "ॐ", meaning: "Primordial cosmic seed" },
          { word: "हनुमते", meaning: "To Hanuman, who has no pride" },
          { word: "नमः", meaning: "Bowing down" }
        ]
      }
    ],
    relatedDeitySlugs: ["rama", "vishnu", "krishna", "shiva"]
  },

  ganesha: {
    slug: "ganesha",
    nameEnglish: "Lord Ganesha",
    nameHindi: "भगवान गणेश",
    nameSanskrit: "गणेश",
    role: "The Remover of Obstacles and Patron of Wisdom, Writing, and Beginnings",
    meaning: "The Lord of the Ganas (the celestial hosts of Shiva)",
    heroImage: "/images/deities/ganesha.png",
    bgGradient: "radial-gradient(circle, rgba(28, 18, 12, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#EA580C",
    mantraAmbience: { frequency: 147.85, type: "sine" },
    identity: {
      titles: ["Vigneshwara (Remover of obstacles)", "Ganapati (Lord of hosts)", "Lambodara (Large-bellied)", "Ekadanta (One-tusked)", "Vinayaka (Supreme leader)"],
      weapons: ["Parashu (Axe to cut ties)", "Pasha (Noose to bind stray thoughts)"],
      symbols: ["Modaka (Sweet of self-realization)", "Broken Tusk (Sacrifice for writing)", "Ankusha (Goad to guide focus)", "Durva grass"],
      mount: "Krauncha (The Sacred Mouse)",
      consort: "Riddhi (Prosperity) & Siddhi (Attainment)",
      loka: "Ganesha Loka (Svapnaloka)",
      sacredColors: ["Bright Orange", "Red", "Yellow Gold"],
      sacredNumbers: [21, 108],
      sacredTrees: ["Shammi Tree", "Durva Grass"],
      sacredAnimals: ["Elephant", "Mouse"]
    },
    timeline: [
      {
        stage: "Clay Creation",
        title: "Born of the Divine Mother's Will",
        description: "Goddess Parvati shapes baby Ganesha from clay/turmeric to guard her chamber entrance.",
        sanskritQuote: "ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि...",
        quoteTranslation: "Let us contemplate the one-tusked lord, let us meditate on the one with curved trunk...",
        storyDetails: "While Shiva was away, Parvati wanted a loyal guard. She gathered turmeric paste from her body and shaped a beautiful boy, breathing life into him, instructing him to allow no one to enter her chambers."
      },
      {
        stage: "Head of Wisdom",
        title: "Receiving the Elephant Head",
        description: "Shiva decapitates the boy in an argument, later replacing his head with an elephant's head to restore life.",
        sanskritQuote: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ...",
        quoteTranslation: "O curved trunk, massive body, with brilliance of millions of suns...",
        storyDetails: "Shiva tried to enter. The loyal guard Ganesha blocked him. Shiva decapitated the boy. Hearing Parvati's grief, Shiva sent his hosts north to bring the head of the first animal they found facing north. They returned with an elephant's head, which Shiva joined to Ganesha's body, blessing him as commander of his Ganas."
      },
      {
        stage: "Cosmic Race",
        title: "Parents as the Universe",
        description: "Challenged to race around the cosmos, Ganesha circumambulates his parents Shiva and Parvati, winning the challenge.",
        sanskritQuote: "मातापितृप्रदक्षिणा येन कृता...",
        quoteTranslation: "By whom the circumambulation of parents was performed...",
        storyDetails: "Kartikeya rode his peacock to circle the universe. Ganesha, with his slow mouse mount, simply walked around Shiva and Parvati, stating they represented the source of all creation, showing that wisdom wins over physical speed."
      },
      {
        stage: "Tusk Sacrifice",
        title: "Writing the Great Epic",
        description: "Ganesha breaks his tusk to use as a pen when his quill breaks while writing the Mahabharata for Sage Vyasa.",
        sanskritQuote: "लेखकाधिपतये नमः...",
        quoteTranslation: "Salutations to the chief of writers...",
        storyDetails: "Vyasa wanted to recite the Mahabharata. Ganesha agreed to write it on one condition: Vyasa must not stop. As he wrote, his pen broke. Not wanting to interrupt the flow, Ganesha broke his tusk, dipped it in ink, and continued writing, demonstrating commitment to preserving knowledge."
      },
      {
        stage: "Durva Offering",
        title: "Cooling the Cosmic Fire",
        description: "Ganesha swallows the fire demon Analasura, cooling his burning stomach with Durva grass.",
        sanskritQuote: "दूर्वाकुरप्रियेशाय नमः...",
        quoteTranslation: "Salutations to the lord who loves Durva grass...",
        storyDetails: "The fire demon was burning the earth. Ganesha swallowed him. The heat burned his stomach. Sages offered precious gems and waters but failed to cool it. Sages then offered 21 blades of Durva grass, which instantly cooled his stomach, proving that simple devotion pleases him."
      }
    ],
    gallery: [
      {
        title: "Ganesha Dancing Bronze",
        type: "Bronze Murti",
        origin: "Chola Dynasty, Tamil Nadu, 12th Century CE",
        description: "A dancing Ganesha (Nritya Ganapati) showing his trunk reaching for a modak, representing joyous learning."
      }
    ],
    geography: [
      {
        templeName: "Siddhivinayak Temple",
        region: "Prabhadevi, Mumbai, Maharashtra",
        significance: "A historic shrine where Ganesha is worshipped with his trunk positioned to the right, signifying rapid wish-fulfillment.",
        coordinates: "19.0166° N, 72.8302° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Siddhivinayak+Temple+Mumbai",
        routeDescription: "Located in the heart of Mumbai, accessible easily by taxi or suburban train."
      }
    ],
    scriptures: [
      {
        category: "Puranas",
        title: "Ganesha Purana",
        quote: "विघ्नेशाय नमस्तस्मै यस्य नादः परात्परः॥",
        quoteTranslation: "Salutations to the Lord of Obstacles, whose sound is beyond the supreme.",
        connection: "Main source detailing his creation, avatars, and philosophical teachings on non-duality."
      }
    ],
    festivals: [
      {
        name: "Ganesh Chaturthi",
        lunarDate: "Bhadrapada, Shukla Chaturthi",
        description: "The 10-day festival celebrating Ganesha's arrival on earth.",
        regionalVariations: "Massive clay idols, processions, immersion (Visarjan), and preparation of sweet modaks, especially in Maharashtra."
      }
    ],
    relationships: {
      family: [
        { name: "Shiva", relation: "Father", slug: "shiva" },
        { name: "Parvati", relation: "Mother", slug: "parvati" },
        { name: "Kartikeya", relation: "Brother", slug: "kartikeya" },
        { name: "Riddhi", relation: "Consort" },
        { name: "Siddhi", relation: "Consort" }
      ],
      avatars: [
        { name: "Vakratunda", description: "The first incarnation, riding a lion, to destroy the demon Matsara." }
      ],
      gurus: []
    },
    mantras: [
      {
        text: "ॐ गं गणपतये नमः",
        transliteration: "Om Gam Ganapataye Namaha",
        translation: "Salutations to the Lord Ganesha, remover of obstacles.",
        meaning: "The root sound 'Gam' clears fear, blocks, and intellectual confusion, and is chanted before starting any study or business.",
        breakdown: [
          { word: "ॐ", meaning: "Primordial cosmic sound" },
          { word: "गं", meaning: "The seed sound of Ganesha and intellect" },
          { word: "गणपतये", meaning: "To the Lord of hosts" },
          { word: "नमः", meaning: "I bow down" }
        ]
      }
    ],
    relatedDeitySlugs: ["shiva", "parvati", "kartikeya"]
  },

  kartikeya: {
    slug: "kartikeya",
    nameEnglish: "Lord Kartikeya",
    nameHindi: "भगवान कार्तिकेय",
    nameSanskrit: "कार्तिकेय",
    role: "The Commander-in-Chief of the Celestial Army Skanda / Murugan",
    meaning: "The One raised by the Krittikas (the stars of Pleiades)",
    heroImage: "/images/deities/kartikeya.png",
    bgGradient: "radial-gradient(circle, rgba(10, 20, 28, 0.95) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#0284C7",
    mantraAmbience: { frequency: 220, type: "sawtooth" },
    identity: {
      titles: ["Murugan (Beautiful one)", "Skanda (Attacker)", "Subramanya (Dear to seekers)", "Shanmukha (Six-faced)", "Kumara (Ever-youthful general)"],
      weapons: ["Vel (Divine Spear of wisdom)"],
      symbols: ["Rooster Banner (Seval Kodi)", "Vibhuti (Sacred Ash)", "Blue Peacock"],
      mount: "Paravani (The Sacred Peacock)",
      consort: "Devasena (celestial) & Valli (earthly/tribal)",
      loka: "Skandaloka",
      sacredColors: ["Bright Blue", "Vermilion Red", "Yellow"],
      sacredNumbers: [6],
      sacredTrees: ["Kadamba Tree", "Neem Tree"],
      sacredAnimals: ["Peacock", "Rooster", "Goat"]
    },
    timeline: [
      {
        stage: "Star Birth",
        title: "Sparked from the Cosmic Eye",
        description: "Born from six sparks of Shiva's third eye, carried by Agni and Ganga to the lake of reeds.",
        sanskritQuote: "ॐ शरवणभवाय नमः॥",
        quoteTranslation: "Salutations to the Lord born in the lake of reeds.",
        storyDetails: "Only a son of Shiva could kill the demon Tarakasura. Shiva projected six sparks from his third eye. Agni and Vayu carried them to the Ganga, who deposited them in the Sharavana reed lake. Six babies manifested, nurtured by the Krittika star sisters. When Parvati embraced them, they merged into one child with six heads."
      },
      {
        stage: "Skanda General",
        title: "Crowned Commander of Heavens",
        description: "The young Skanda is appointed general of the divine army to reclaim the heavens from demonic forces.",
        sanskritQuote: "सेनानीनामहं स्कन्दः...",
        quoteTranslation: "Among generals, I am Skanda (spoken by Krishna in Bhagavad Gita)...",
        storyDetails: "At a young age, Skanda was crowned general by Brahma. He organized the devas, instilling courage, and marched towards the demon strongholds to restore balance."
      },
      {
        stage: "Vel Gift",
        title: "Receiving the Spear of Wisdom",
        description: "Mother Parvati presents Kartikeya with the Vel (divine lance), representing sharp, single-focused intellect.",
        sanskritQuote: "वेलायुधाय नमः...",
        quoteTranslation: "Salutations to the holder of the Vel spear...",
        storyDetails: "To prepare him for the final battle, Parvati infused her Shakti into a spear and gifted it to him. The Vel represents a sharp, broad, and deep intellect, indicating that spiritual knowledge destroys ignorance."
      },
      {
        stage: "Battle of Soorapadman",
        title: "Slaying the Ego",
        description: "Kartikeya defeats the demon Soorapadman, converting his split body into a peacock and a rooster.",
        sanskritQuote: "सुब्रह्मण्यं भजेऽहं...",
        quoteTranslation: "I worship Subramanya...",
        storyDetails: "The demon took the form of a giant mango tree to escape. Kartikeya threw his Vel, splitting the tree. The two halves repented. Kartikeya converted one half into his peacock mount and the other into a rooster for his banner, transforming evil rather than destroying it."
      },
      {
        stage: "Hill Dwelling",
        title: "Renouncing the Material Competitions",
        description: "Losing a race for the divine fruit, Kartikeya renounces wealth and retires to Mount Palani in meditation.",
        sanskritQuote: "ज्ञानपण्डिताय नमः...",
        quoteTranslation: "Salutations to the master of knowledge...",
        storyDetails: "When Ganesha won the cosmic race by circumambulating their parents, Kartikeya felt disappointed and renounced his golden ornaments. He dressed as an ascetic and went to Mount Palani, showing that renunciation is the gate to ultimate wisdom."
      }
    ],
    gallery: [
      {
        title: "Chola Murugan Bronze",
        type: "Bronze Statue",
        origin: "Thanjavur, Tamil Nadu, 11th Century CE",
        description: "A bronze statue depicting Kartikeya as Subramanya, holding the Vel and blessing devotees."
      }
    ],
    geography: [
      {
        templeName: "Palani Murugan Temple",
        region: "Palani Hills, Tamil Nadu",
        significance: "One of the six holy abodes (Arupadaiveedu) of Murugan, where he stands in ascetic form (Dhandayuthapani).",
        coordinates: "10.4442° N, 77.5184° E",
        mapsLink: "https://www.google.com/maps/search/?api=1&query=Palani+Murugan+Temple+Tamil+Nadu",
        routeDescription: "A hill temple reached by climbing over 600 stone steps, or via cable car, offering views of the Western Ghats."
      }
    ],
    scriptures: [
      {
        category: "Puranas",
        title: "Skanda Purana",
        quote: "स्कन्द एव परं ज्योतिः स्कन्द एव परा गतिः॥",
        quoteTranslation: "Skanda is indeed the supreme light, Skanda is the supreme goal.",
        connection: "The largest Purana, detailing his birth, battles, and the significance of Shiva temples."
      }
    ],
    festivals: [
      {
        name: "Thaipusam",
        lunarDate: "Thai (January/February), Pushya star",
        description: "Celebrating Kartikeya receiving the Vel spear from Parvati.",
        regionalVariations: "Devotees carry Kavadi (decorated arches) and pierce their skin/cheeks with small lances as penance, widely celebrated in Tamil Nadu, Malaysia, and Singapore."
      }
    ],
    relationships: {
      family: [
        { name: "Shiva", relation: "Father", slug: "shiva" },
        { name: "Parvati", relation: "Mother", slug: "parvati" },
        { name: "Ganesha", relation: "Brother", slug: "ganesha" },
        { name: "Devasena", relation: "Consort" },
        { name: "Valli", relation: "Consort" }
      ],
      avatars: [],
      gurus: []
    },
    mantras: [
      {
        text: "ॐ शरवणभवाय नमः",
        transliteration: "Om Sharavana Bhavaya Namaha",
        translation: "Salutations to the Lord born in the lake of reeds.",
        meaning: "The six-letter mantra (Sa-Ra-Va-Na-Bha-Va) brings victory, dispels depression, and sharpens intellect.",
        breakdown: [
          { word: "ॐ", meaning: "Primordial seed sound" },
          { word: "शरवणभवाय", meaning: "To the one manifested in the lake of reeds" },
          { word: "नमः", meaning: "I bow" }
        ]
      }
    ],
    relatedDeitySlugs: ["shiva", "parvati", "ganesha"]
  },

  // Let's add other deities (Lord Rama, Lord Krishna are covered, Lord Hanuman is covered).
  // We need: Lord Vishnu (covered), Lord Brahma (covered), Devi Lakshmi (covered), Devi Saraswati (covered), Devi Parvati (covered), Devi Durga (covered), Devi Kali (covered)
  // Wait, let's verify if there are others:
  // Lord Rama (covered)
  // Lord Krishna (covered)
  // Lord Hanuman (covered)
  // Lord Ganesha (covered)
  // Lord Kartikeya (covered)
  // Wait, who is missing? Let's check:
  // Lord Shiva (covered)
  // Lord Vishnu (covered)
  // Lord Brahma (covered)
  // Lord Rama (covered)
  // Lord Krishna (covered)
  // Lord Hanuman (covered)
  // Lord Ganesha (covered)
  // Lord Kartikeya (covered)
  // Devi Lakshmi (covered)
  // Devi Saraswati (covered)
  // Devi Parvati (covered)
  // Devi Durga (covered)
  // Devi Kali (covered)
  // All 13 are fully covered! This is amazing!
};
