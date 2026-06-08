export interface DeityEpisode {
  title: string;
  narrative: string;
  moralText?: string;
  scripture?: string;
}

export interface ScholarVerse {
  verseSanskrit: string;
  verseTranslation: string;
  sourceScripture: string;
  commentary?: string;
}

export interface DeityFamilyRelation {
  name: string;
  relation: string; // "Consort" | "Father" | "Mother" | "Son" | "Daughter" | "Brother" | "Sister" | "Avatar"
  slug?: string;
}

export interface DeityDetail {
  slug: string;
  nameEnglish: string;
  nameSanskrit: string;
  meaning: string;
  role: string;
  consort: string;
  divineFunction: string;
  vehicle: string;
  weapons: string[];
  sacredObjects: string[];
  domains: string[];
  
  // Below Hero profile
  originStory: string;
  majorEpisodes: DeityEpisode[];
  teachings: string[];
  familyTree: DeityFamilyRelation[];
  scriptures: string[];
  temples: string[];
  festivals: string[];
  mantras: { text: string; translation: string; meaning: string }[];
  meditationMeaning: string;
  
  // Mode specific overrides
  kidsSimplified: {
    summary: string;
    funFacts: string[];
    moralLesson: string;
  };
  
  // Visual assets
  heroImage: string;
  bgGradient: string;
  accentColor: string;
}

export const DEITIES_DATA: Record<string, DeityDetail> = {
  shiva: {
    slug: "shiva",
    nameEnglish: "Lord Shiva",
    nameSanskrit: "शिव",
    meaning: "The Auspicious One, who is pure consciousness",
    role: "The Destroyer of ego & regenerator of the cosmos in the Trimurti",
    consort: "Goddess Parvati",
    divineFunction: "Dissolution, Yoga, and Meditation",
    vehicle: "Nandi (the sacred bull)",
    weapons: ["Trishula (Trident)", "Pinaka Bow"],
    sacredObjects: ["Damru (cosmic drum)", "Crescent Moon", "Third Eye", "Rudraksha"],
    domains: ["Destruction", "Meditation", "Yoga", "Asceticism", "Cosmic Dance (Tandava)"],
    originStory: "Manifested from a pillar of infinite light (Jyotirlinga) before Brahma and Vishnu, showing that consciousness has no beginning or end.",
    majorEpisodes: [
      {
        title: "The Churning of the Ocean (Samudra Manthan)",
        narrative: "During the churning of the cosmic ocean, a deadly poison (Halahala) emerged that threatened all creation. Shiva drank the poison to protect the cosmos, holding it in his throat which turned blue, earning him the name Neelakantha.",
        moralText: "True power lies in protecting others, even if it requires absorbing pain or toxicity.",
        scripture: "Shiva Purana"
      },
      {
        title: "Taming of the Ganges (Ganga Avatarana)",
        narrative: "When the sacred river Ganga descended from heaven with force that would shatter the earth, Shiva caught her in his matted locks, releasing her in gentle streams to cleanse and bless humanity.",
        moralText: "Channel and govern intense energy with calm patience to turn destructive forces into blessings.",
        scripture: "Valmiki Ramayana"
      }
    ],
    teachings: [
      "Vairagya (Detachment): True freedom comes from detachment from the material illusions of the world.",
      "Self-Realization: Shiva is the inner self of all consciousness. Meditation is the path to realize this inner divinity.",
      "Equanimity: Remaining undisturbed by joy or grief, praise or blame."
    ],
    familyTree: [
      { name: "Parvati", relation: "Consort", slug: "parvati" },
      { name: "Ganesha", relation: "Son", slug: "ganesha" },
      { name: "Kartikeya", relation: "Son", slug: "kartikeya" }
    ],
    scriptures: ["Shiva Purana", "Rigveda", "Linga Purana", "Svetasvatara Upanishad"],
    temples: ["Kedarnath Temple (Uttarakhand)", "Kashi Vishwanath Temple (Uttar Pradesh)", "Somnath Temple (Gujarat)"],
    festivals: ["Maha Shivratri", "Shravan Somvar", "Pradosh Vrat"],
    mantras: [
      {
        text: "ॐ नमः शिवाय",
        translation: "Om Namah Shivaya",
        meaning: "I bow to the Auspicious One, the divine inner self."
      },
      {
        text: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
        translation: "Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam\nUrvarukam-Iva Bandhanan-Mrityor-Mukshiya Ma-Amritat",
        meaning: "We worship the three-eyed Lord who is fragrant and nourishes all. Just as a cucumber is liberated from its stalk, may He liberate us from death to immortality."
      }
    ],
    meditationMeaning: "Seated in deep meditation on Mount Kailash, smeared with holy ash, symbolizing that all physical forms dissolve into the formless supreme reality.",
    kidsSimplified: {
      summary: "Lord Shiva is the god of meditation and simple living. He loves to sit quietly in the snow-capped Himalayan mountains. He is very kind and gets pleased very quickly when children pray to him.",
      funFacts: [
        "Shiva has a third eye on his forehead which represents wisdom.",
        "The river Ganga flows out from Shiva's matted hair.",
        "His favorite vehicle is Nandi, a very loyal and strong bull."
      ],
      moralLesson: "Spend time in quiet thoughts, be simple, and always stand up to protect the weak."
    },
    heroImage: "/images/deities/shiva.png",
    bgGradient: "radial-gradient(circle, rgba(13, 27, 42, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#6D28D9"
  },
  vishnu: {
    slug: "vishnu",
    nameEnglish: "Lord Vishnu",
    nameSanskrit: "विष्णु",
    meaning: "The All-Pervading One, who sustains the universe",
    role: "The Preserver & Protector of cosmic order (Dharma) in the Trimurti",
    consort: "Goddess Lakshmi",
    divineFunction: "Sustenance, Protection, and Moral Order",
    vehicle: "Garuda (the celestial eagle)",
    weapons: ["Sudarshana Chakra (discus)", "Kaumodaki Gada (mace)"],
    sacredObjects: ["Panchajanya Shankha (conch)", "Padma (lotus)"],
    domains: ["Preservation", "Dharma", "Compassion", "Cosmic Order", "Reincarnation"],
    originStory: "Resting on the infinite coils of the serpent Shesha in the causal ocean of milk, projecting the material universe from his navel.",
    majorEpisodes: [
      {
        title: "The Descent of Lord Narasimha",
        narrative: "To protect his young devotee Prahlada from the tyrant demon Hiranyakashipu, who held a boon of near-invincibility, Vishnu manifested as Narasimha (half-man, half-lion) at twilight to destroy the evil king.",
        moralText: "The Divine will always manifest to protect those who have sincere, unwavering faith.",
        scripture: "Bhagavata Purana"
      },
      {
        title: "Samudra Manthan (Kurma Avatar)",
        narrative: "When the gods and demons churned the cosmic ocean, the mountain Mandara began to sink. Lord Vishnu took the form of Kurma (a giant tortoise) and supported the mountain on his back.",
        moralText: "Be the steady foundation that supports collective good endeavors during times of turbulence.",
        scripture: "Vishnu Purana"
      }
    ],
    teachings: [
      "Establishment of Dharma: Whenever righteousness declines and unrighteousness rises, one must act to restore balance.",
      "Karma Yoga: Perform your duties without attachment to the results, dedicating all actions to the Supreme.",
      "Universal Oneness: Seeing the Divine presence in all living beings."
    ],
    familyTree: [
      { name: "Lakshmi", relation: "Consort", slug: "lakshmi" },
      { name: "Brahma", relation: "Son (manifested from navel)", slug: "brahma" },
      { name: "Rama", relation: "Avatar", slug: "rama" },
      { name: "Krishna", relation: "Avatar", slug: "krishna" }
    ],
    scriptures: ["Vishnu Purana", "Bhagavata Purana", "Yajurveda", "Narada Purana"],
    temples: ["Badrinath Temple (Uttarakhand)", "Venkateswara Temple (Tirupati)", "Padmanabhaswamy Temple (Kerala)"],
    festivals: ["Vaikuntha Ekadashi", "Anant Chaturdashi", "Dev Uthani Ekadashi"],
    mantras: [
      {
        text: "ॐ नमो भगवते वासुदेवाय",
        translation: "Om Namo Bhagavate Vasudevaya",
        meaning: "I bow to the Lord who dwells in all beings, the all-pervading divine presence."
      },
      {
        text: "ॐ नमो नारायणाय",
        translation: "Om Namo Narayanaya",
        meaning: "Salutations to Lord Narayana, the ultimate refuge of all souls."
      }
    ],
    meditationMeaning: "Reclining peacefully on the serpent Shesha, symbolizing absolute peace and cosmic control amidst the waves of the material universe.",
    kidsSimplified: {
      summary: "Lord Vishnu is the protector of the universe. Whenever the world is in trouble, he comes down to Earth in different avatars (like a fish, a tortoise, a lion-man, Rama, and Krishna) to save us and make things right.",
      funFacts: [
        "He holds a spinning disc of light called the Sudarshana Chakra to defeat bad forces.",
        "He blows a beautiful conch shell to spread peace throughout the universe.",
        "His vehicle is Garuda, a giant, magical eagle."
      ],
      moralLesson: "Always protect your friends, speak the truth, and help make the world a better, kinder place."
    },
    heroImage: "/images/deities/vishnu.png",
    bgGradient: "radial-gradient(circle, rgba(14, 30, 20, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#D4A017"
  },
  brahma: {
    slug: "brahma",
    nameEnglish: "Lord Brahma",
    nameSanskrit: "ब्रह्मा",
    meaning: "The Creator, the source of expanding universe",
    role: "The Creator of the material universe in the Trimurti",
    consort: "Goddess Saraswati",
    divineFunction: "Creation, Design, and Intellectual projection",
    vehicle: "Hansa (the sacred swan)",
    weapons: ["Brahmastra"],
    sacredObjects: ["Kamandalu (water pot)", "Akshamala (rosary)", "Vedas (manuscripts)"],
    domains: ["Creation", "Knowledge", "Cosmology", "Intellect", "Vedic Wisdom"],
    originStory: "Manifested from a golden lotus arising from the navel of Lord Vishnu at the dawn of the Kalpa.",
    majorEpisodes: [
      {
        title: "Manifestation of the Vedas",
        narrative: "At the beginning of creation, Brahma manifested the four Vedas from his four mouths, laying down the spiritual and natural laws that govern all cosmic dimensions.",
        moralText: "Knowledge must be the starting point and guide for any creative work.",
        scripture: "Brahma Purana"
      }
    ],
    teachings: [
      "Cosmic Law: The universe operates on precise structural cycles (Yugas and Kalpas).",
      "Creativity as Service: The act of creation must serve the alignment of the cosmos, not personal ego.",
      "Sanctity of Knowledge: Preserving scriptures is essential to guide civilizations."
    ],
    familyTree: [
      { name: "Saraswati", relation: "Consort", slug: "saraswati" },
      { name: "Vishnu", relation: "Father (Source)", slug: "vishnu" },
      { name: "Narada", relation: "Son (Mind-born)", slug: "sages" }
    ],
    scriptures: ["Brahma Purana", "Atharvaveda", "Matsya Purana"],
    temples: ["Pushkar Brahma Temple (Rajasthan)", "Kumbakonam Brahma Temple (Tamil Nadu)"],
    festivals: ["Kartik Purnima", "Brahmotsavam"],
    mantras: [
      {
        text: "ॐ ब्रह्मणे नमः",
        translation: "Om Brahmane Namaha",
        meaning: "I offer my salutations to Brahma, the supreme creator intellect."
      }
    ],
    meditationMeaning: "His four faces look in all four directions, symbolizing his all-seeing watch over the created universe.",
    kidsSimplified: {
      summary: "Lord Brahma is the creator of the world. He has four faces and a long white beard. He designed all the animals, stars, oceans, and flowers in the universe.",
      funFacts: [
        "Brahma has four heads, so he can see everywhere at once.",
        "He rides a beautiful white swan that can separate water from milk.",
        "He holds a water pot showing that water is the source of all life."
      ],
      moralLesson: "Use your imagination to create good things and study hard to learn about the beautiful world."
    },
    heroImage: "/images/deities/brahma.png",
    bgGradient: "radial-gradient(circle, rgba(30, 20, 10, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#F97316"
  },
  saraswati: {
    slug: "saraswati",
    nameEnglish: "Devi Saraswati",
    nameSanskrit: "सरस्वती",
    meaning: "The flowing stream of speech and knowledge",
    role: "Goddess of knowledge, wisdom, music, and creative arts in the Tridevi",
    consort: "Lord Brahma",
    divineFunction: "Intellectual illumination and Creative flow",
    vehicle: "Swan (Hansa) / Peacock",
    weapons: ["None (holds Veena and Vedas)"],
    sacredObjects: ["Veena (lute)", "Manuscript", "Sphatik Mala (crystal rosary)"],
    domains: ["Knowledge", "Wisdom", "Music", "Fine Arts", "Speech", "Education"],
    originStory: "Formed from the creative energy of Brahma to bring logic, voice, and order to the silent and chaotic newly created universe.",
    majorEpisodes: [
      {
        title: "The Gift of Speech and Sound",
        narrative: "When the universe was first created, everything was silent and formless. Saraswati strummed the strings of her Veena, creating the primordial sound 'Om', giving speech, melody, and breathing rhythm to all creatures.",
        moralText: "Music and speech are divine gifts that should be used to bring harmony and beauty to life.",
        scripture: "Rigveda"
      }
    ],
    teachings: [
      "Discrimination (Viveka): Separating truth from falsehood, represented by the swan's ability to filter milk from water.",
      "Inner Harmony: The Veena teaches us to keep our mind tuned to the right spiritual frequency.",
      "Pursuit of Truth: Vidya (knowledge) is the highest wealth, leading to ultimate liberation."
    ],
    familyTree: [
      { name: "Brahma", relation: "Consort", slug: "brahma" }
    ],
    scriptures: ["Rigveda", "Devi Mahatmya", "Natya Shastra"],
    temples: ["Basar Gnana Saraswati Temple (Telangana)", "Koothanur Saraswati Temple (Tamil Nadu)"],
    festivals: ["Vasant Panchami", "Navratri (Saraswati Puja)"],
    mantras: [
      {
        text: "ॐ ऐं सरस्वत्यै नमः",
        translation: "Om Aim Saraswatyai Namaha",
        meaning: "I bow to the Goddess of wisdom and creative learning."
      },
      {
        text: "सरस्वति नमस्तुभ्यं वरदे कामरूपिणि।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा॥",
        translation: "Saraswati Namastubhyam Varade Kama-Rupini\nVidyarambham Karishyami Siddhir-Bhavatu Me Sada",
        meaning: "O Goddess Saraswati, I bow to you. You grant blessings and fulfill desires. As I begin my studies, may success always be mine."
      }
    ],
    meditationMeaning: "Seated on a white lotus, wearing pure white garments, representing the pristine purity of true knowledge, unpolluted by worldly desires.",
    kidsSimplified: {
      summary: "Goddess Saraswati is the goddess of learning, music, and art. She holds a beautiful musical instrument called the Veena and books of wisdom. She helps children do well in school and play music.",
      funFacts: [
        "She wears a bright white dress, which stands for purity and honesty.",
        "She sits on a lovely lotus flower.",
        "Her helper is a swan, a smart bird that makes wise choices."
      ],
      moralLesson: "Always be eager to learn, respect your books, and speak kindly to everyone."
    },
    heroImage: "/images/deities/saraswati.png",
    bgGradient: "radial-gradient(circle, rgba(10, 25, 30, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#0D9488"
  },
  lakshmi: {
    slug: "lakshmi",
    nameEnglish: "Devi Lakshmi",
    nameSanskrit: "लक्ष्मी",
    meaning: "The sign or goal, representing spiritual and material wealth",
    role: "Goddess of wealth, fortune, and spiritual prosperity in the Tridevi",
    consort: "Lord Vishnu",
    divineFunction: "Abundance, Auspiciousness, and Preservation of prosperity",
    vehicle: "Owl (Uluka) / Elephant (Gaja)",
    weapons: ["None"],
    sacredObjects: ["Lotus in hand", "Gold coins flowing from palm", "Kamandalu"],
    domains: ["Prosperity", "Wealth", "Beauty", "Fortune", "Auspiciousness", "Grace"],
    originStory: "Emerged from the ocean of milk during the Samudra Manthan, holding a lotus, choosing Vishnu as her consort.",
    majorEpisodes: [
      {
        title: "The Golden Shower (Kanakadhara)",
        narrative: "When Adi Shankaracharya recited a prayer for a poor woman who could only offer a single dry amla fruit to him, Lakshmi was moved by the woman's selfless devotion and showered her home with gooseberries made of solid gold.",
        moralText: "Sincere devotion and selflessness attract divine grace far more than grand material offerings.",
        scripture: "Puranic Legends"
      }
    ],
    teachings: [
      "Eightfold Abundance (Ashta Lakshmi): Wealth is not just money, but includes health, courage, children, success, food, and spiritual wisdom.",
      "Righteous Wealth (Dharma-Artha): Accumulating wealth through fair means and using it to support others.",
      "Purity of Mind: Lakshmi dwells only where there is cleanliness, truth, and peace."
    ],
    familyTree: [
      { name: "Vishnu", relation: "Consort", slug: "vishnu" }
    ],
    scriptures: ["Rigveda (Sri Suktam)", "Lakshmi Tantra", "Vishnu Purana"],
    temples: ["Mahalakshmi Temple (Kolhapur, Maharashtra)", "Sripuram Golden Temple (Vellore, Tamil Nadu)"],
    festivals: ["Diwali (Lakshmi Puja)", "Varalakshmi Vrat", "Dhanteras"],
    mantras: [
      {
        text: "ॐ श्रीं महालक्ष्म्यै नमः",
        translation: "Om Shreem Maha Lakshmyai Namaha",
        meaning: "Salutations to the Supreme Goddess of wealth and prosperity."
      }
    ],
    meditationMeaning: "Seated on a red lotus with gold coins flowing from her hand, representing spiritual growth and material abundance in perfect balance.",
    kidsSimplified: {
      summary: "Goddess Lakshmi is the goddess of wealth and happiness. She brings good luck, health, and joy to our families. She loves when we keep our homes clean and helpful.",
      funFacts: [
        "Gold coins fall from her hand to show that she feeds and helps everyone.",
        "She is accompanied by two royal elephants who shower her with water.",
        "Her name means 'aim', teaching us to keep good goals."
      ],
      moralLesson: "Keep your surroundings clean, share what you have with the poor, and be grateful for your blessings."
    },
    heroImage: "/images/deities/lakshmi.png",
    bgGradient: "radial-gradient(circle, rgba(32, 10, 15, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#BE185D"
  },
  parvati: {
    slug: "parvati",
    nameEnglish: "Devi Parvati",
    nameSanskrit: "पार्वती",
    meaning: "Daughter of the mountains (Parvata)",
    role: "Goddess of love, devotion, power, and household harmony in the Tridevi",
    consort: "Lord Shiva",
    divineFunction: "Shakti (cosmic energy), Willpower, and Devotion",
    vehicle: "Lion / Tiger",
    weapons: ["Trishula", "Sword"],
    sacredObjects: ["Lotus", "Mirror", "Rosary"],
    domains: ["Devotion", "Shakti", "Love", "Motherhood", "Meditation", "Determination"],
    originStory: "Born as the princess of the Himalayas, Himavan's daughter, as the reincarnation of Sati, to draw Shiva back into householder life.",
    majorEpisodes: [
      {
        title: "The Great Penance (Tapas of Parvati)",
        narrative: "To win Shiva's heart and awaken him from his deep ascetic meditation, Parvati undertook intense austerities in the cold mountains. Surviving on wind and leaves, her spiritual heat shook the cosmos, showing her absolute dedication.",
        moralText: "With immense willpower and single-minded focus, even the most difficult goals can be achieved.",
        scripture: "Shiva Purana"
      }
    ],
    teachings: [
      "Inner Power (Shakti): Every soul contains the active dynamic power to transform reality.",
      "Devotional Tapas: Persistent efforts and sacrifices are key to connecting with divine consciousness.",
      "Balance of Life: Harmonizing the inner ascetic path with the outer householder duties."
    ],
    familyTree: [
      { name: "Shiva", relation: "Consort", slug: "shiva" },
      { name: "Ganesha", relation: "Son", slug: "ganesha" },
      { name: "Kartikeya", relation: "Son", slug: "kartikeya" }
    ],
    scriptures: ["Shiva Purana", "Devi Gita", "Markandeya Purana"],
    temples: ["Meenakshi Amman Temple (Madurai, Tamil Nadu)", "Kashi Vishalakshi Temple (Varanasi)"],
    festivals: ["Navratri", "Gauri Tritiya", "Teej"],
    mantras: [
      {
        text: "ॐ पार्वत्यै नमः",
        translation: "Om Parvatyai Namaha",
        meaning: "Salutations to the Divine Mother Parvati."
      }
    ],
    meditationMeaning: "Seated peacefully next to Lord Shiva, representing the cosmic union of Purusha (consciousness) and Prakriti (matter/energy).",
    kidsSimplified: {
      summary: "Goddess Parvati is the loving mother of Ganesha and Kartikeya. She is very strong, brave, and represents mountain-like determination. She rides a mighty lion.",
      funFacts: [
        "She made baby Ganesha out of clay to protect her home.",
        "She did yoga in the cold snow for a long time to show her focus.",
        "Her home is Mount Kailash, the most peaceful place in the world."
      ],
      moralLesson: "Be determined like a mountain and love your family with all your heart."
    },
    heroImage: "/images/deities/parvati.png",
    bgGradient: "radial-gradient(circle, rgba(30, 10, 25, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#C026D3"
  },
  ganesha: {
    slug: "ganesha",
    nameEnglish: "Lord Ganesha",
    nameSanskrit: "गणेश",
    meaning: "Lord of the Ganas (celestial hosts)",
    role: "The Remover of obstacles and patron of wisdom and beginnings",
    consort: "Riddhi (Prosperity) & Siddhi (Attainment)",
    divineFunction: "Intellectual guidance, Obstacle clearance, and auspicious beginnings",
    vehicle: "Krauncha (the mouse)",
    weapons: ["Parashu (axe)", "Pasha (noose)"],
    sacredObjects: ["Modaka (sweet)", "Broken Tusk", "Ankusha (goad)"],
    domains: ["Wisdom", "Beginnings", "Obstacle Removal", "Intellect", "Writing"],
    originStory: "Created by Goddess Parvati from clay to guard her chambers, later given an elephant head by Lord Shiva, making him commander of the celestial hosts.",
    majorEpisodes: [
      {
        title: "The Cosmic Race",
        narrative: "Ganesha and his brother Kartikeya were challenged to race around the cosmos. Kartikeya flew off on his peacock. Ganesha simply walked around his parents Shiva and Parvati, stating they represented the entire universe, winning the challenge.",
        moralText: "Smart thinking and respect for parents can solve problems faster than physical speed.",
        scripture: "Ganesha Purana"
      },
      {
        title: "Scribe of the Mahabharata",
        narrative: "When Sage Vyasa wanted to compose the giant epic Mahabharata, Ganesha agreed to write it down on one condition: Vyasa must recite it without stopping. Ganesha broke his own tusk to use as a pen when his quill broke, proving his commitment.",
        moralText: "No sacrifice is too great for the preservation of knowledge and scriptures.",
        scripture: "Mahabharata introduction"
      }
    ],
    teachings: [
      "Wisdom over Strength: Use your intellect to navigate around obstacles rather than trying to break them blindly.",
      "Listen Carefully: His large ears remind us to listen more and speak less to gain wisdom.",
      "Mastery of Desires: Riding a mouse shows that even the small, busy desires of the mind must be controlled."
    ],
    familyTree: [
      { name: "Shiva", relation: "Father", slug: "shiva" },
      { name: "Parvati", relation: "Mother", slug: "parvati" },
      { name: "Kartikeya", relation: "Brother", slug: "kartikeya" },
      { name: "Riddhi & Siddhi", relation: "Consorts" }
    ],
    scriptures: ["Ganesha Purana", "Mudgala Purana", "Ganapati Atharvasirsha"],
    temples: ["Siddhivinayak Temple (Mumbai)", "Dagadusheth Halwai Temple (Pune)"],
    festivals: ["Ganesh Chaturthi", "Sankashti Chaturthi"],
    mantras: [
      {
        text: "ॐ गं गणपतये नमः",
        translation: "Om Gam Ganapataye Namaha",
        meaning: "Salutations to the Lord Ganesha, remover of obstacles."
      },
      {
        text: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
        translation: "Vakratunda Mahakaya Surya-Koti Samaprabha\nNirvighnam Kuru Me Deva Sarva-Karyeshu Sarvada",
        meaning: "O Lord with the curved trunk and massive body, whose brilliance is equal to millions of suns, please make all my works free of obstacles always."
      }
    ],
    meditationMeaning: "Seated comfortably with a modak in hand, representing the sweet reward of self-realization that comes from controlled focus.",
    kidsSimplified: {
      summary: "Lord Ganesha is the elephant-headed god who is loved by all children. He has a big belly and a tiny mouse friend. He helps you when you start writing, drawing, or taking exams.",
      funFacts: [
        "Ganesha loves eating sweet laddoos and modaks.",
        "He broke his own tusk so he could write down the Mahabharata epic.",
        "His mouse vehicle shows that no one is too small to be important."
      ],
      moralLesson: "Listen carefully, respect your parents, and use your intelligence to solve problems."
    },
    heroImage: "/images/deities/ganesha.png",
    bgGradient: "radial-gradient(circle, rgba(28, 18, 12, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#EA580C"
  },
  kartikeya: {
    slug: "kartikeya",
    nameEnglish: "Lord Kartikeya",
    nameSanskrit: "कार्तिकेय",
    meaning: "Born of the Krittikas (the stars of Pleiades)",
    role: "Commander-in-chief of the celestial army (Skanda/Murugan)",
    consort: "Devasena & Valli",
    divineFunction: "Defense, Victory, and Spiritual focus",
    vehicle: "Peacock (Paravani)",
    weapons: ["Vel (divine spear)"],
    sacredObjects: ["Rooster Banner", "Vibhuti"],
    domains: ["War", "Victory", "Courage", "Spiritual energy", "Focus"],
    originStory: "Born from six sparks of Shiva's third eye, carried by Agni and Ganga to the Sharavana lake, where he manifested as six babies, later joined by Parvati.",
    majorEpisodes: [
      {
        title: "Slaying of Tarakasura",
        narrative: "The demon Tarakasura could only be killed by a son of Shiva. The young Kartikeya, armed with the Vel (spear) gifted by Mother Parvati, led the gods in battle and defeated the demon, saving the heavens.",
        moralText: "Wisdom and purity can defeat the most deep-seated ignorance and darkness.",
        scripture: "Skanda Purana"
      }
    ],
    teachings: [
      "Sharpness of Focus: The spear (Vel) represents a sharp, deep intellect focused on truth.",
      "Control of Pride: Riding a peacock shows that he has tamed pride and ego, riding over them.",
      "Spiritual Strength: Courage in the face of spiritual hurdles."
    ],
    familyTree: [
      { name: "Shiva", relation: "Father", slug: "shiva" },
      { name: "Parvati", relation: "Mother", slug: "parvati" },
      { name: "Ganesha", relation: "Brother", slug: "ganesha" },
      { name: "Devasena & Valli", relation: "Consorts" }
    ],
    scriptures: ["Skanda Purana", "Kumara Sambhava", "Atharvaveda"],
    temples: ["Palani Murugan Temple (Tamil Nadu)", "Kataragama Temple (Sri Lanka)"],
    festivals: ["Thaipusam", "Skanda Sashti"],
    mantras: [
      {
        text: "ॐ शरवणभवाय नमः",
        translation: "Om Sharavana Bhavaya Namaha",
        meaning: "Salutations to the Lord born in the lake of reeds."
      }
    ],
    meditationMeaning: "Holding his spear, representing the sharp focus of spiritual consciousness cutting through darkness.",
    kidsSimplified: {
      summary: "Lord Kartikeya is Ganesha's brother and a brave general. He rides a beautiful peacock and carries a magical spear called the Vel. He is very fast and brave.",
      funFacts: [
        "He has six heads representing control over his senses.",
        "His peacock can catch poisonous snakes, showing fearlessness.",
        "He is highly celebrated in southern India as Lord Murugan."
      ],
      moralLesson: "Be brave, protect your siblings, and focus on your goals like an arrow."
    },
    heroImage: "/images/deities/kartikeya.png",
    bgGradient: "radial-gradient(circle, rgba(10, 20, 28, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#0284C7"
  },
  hanuman: {
    slug: "hanuman",
    nameEnglish: "Lord Hanuman",
    nameSanskrit: "हनुमान",
    meaning: "He with the prominent jaw, symbol of humility",
    role: "The Lord of Devotion and strength, ideal devotee of Rama",
    consort: "Celibate (Naishtika Brahmachari)",
    divineFunction: "Protection, Strength, and Unconditional service (Bhakti)",
    vehicle: "None (he flies with speed of wind)",
    weapons: ["Gada (Mace)"],
    sacredObjects: ["Rama Mudra (signet ring)", "Sanjivani Mountain"],
    domains: ["Strength", "Devotion", "Protection", "Humility", "Astrology cure"],
    originStory: "Born of the monkey-queen Anjana and King Kesari, blessed by the wind god Vayu as an incarnation of Shiva's Rudra power.",
    majorEpisodes: [
      {
        title: "Leaping Across the Ocean",
        narrative: "To search for Sita who was captured in Lanka, Hanuman expanded his size and leaped across the vast ocean, defeating sea monsters and flying with the power of absolute faith and devotion to Rama.",
        moralText: "When working in service of truth, no ocean is too wide to cross.",
        scripture: "Ramayana (Sundarakand)"
      },
      {
        title: "Carrying the Sanjivani Mountain",
        narrative: "When Lakshmana was wounded in battle and needed a rare herb from the Himalayas before sunrise, Hanuman flew to the mountains. Unable to identify the herb, he lifted the entire Dronagiri mountain and carried it back to Lanka.",
        moralText: "Do not let incomplete knowledge stop you; find a grand way to fulfill your duty.",
        scripture: "Ramayana (Yuddhakand)"
      }
    ],
    teachings: [
      "Bhakti (Devotion): Surrendering personal ego to the service of the Divine creates infinite strength.",
      "Humility: Despite possessing immense power, Hanuman remained a humble servant.",
      "Fearlessness: Chanting Hanuman's name removes all fears and negative energies."
    ],
    familyTree: [
      { name: "Kesari", relation: "Father" },
      { name: "Anjana", relation: "Mother" },
      { name: "Rama", relation: "Master", slug: "rama" }
    ],
    scriptures: ["Valmiki Ramayana", "Ramcharitmanas", "Hanuman Chalisa"],
    temples: ["Sankat Mochan Temple (Varanasi)", "Mehndipur Balaji Temple (Rajasthan)"],
    festivals: ["Hanuman Jayanti", "Sundarkand path"],
    mantras: [
      {
        text: "ॐ हनुमते नमः",
        translation: "Om Hanumate Namaha",
        meaning: "Salutations to the mighty, wise Hanuman."
      },
      {
        text: "मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥",
        translation: "Mano-Javam Maruta-Tulya-Vegam Jitendriyam Buddhimatam Varishtham\nVatatmajam Vanara-Yutha-Mukhyam Sri-Rama-Dutam Sharanam Prapadye",
        meaning: "I seek refuge in the messenger of Sri Rama, who is swift as the mind, fast as the wind, has mastered his senses, is chief of the monkeys, and is the wisest."
      }
    ],
    meditationMeaning: "Kneeling at the feet of Rama and Sita, holding his chest open to reveal them in his heart, representing absolute devotion.",
    kidsSimplified: {
      summary: "Lord Hanuman is a super-strong monkey god who can fly, grow as big as a mountain, or become as tiny as a bee. He loves Rama very much and always helps those in trouble.",
      funFacts: [
        "As a baby, he thought the Sun was a ripe mango and tried to eat it!",
        "He carried an entire mountain of magical healing herbs on his palm.",
        "Chanting the 'Hanuman Chalisa' gives you courage when you feel scared."
      ],
      moralLesson: "True strength comes from being helpful, kind, and humble."
    },
    heroImage: "/images/deities/hanuman.png",
    bgGradient: "radial-gradient(circle, rgba(25, 12, 8, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#D97706"
  },
  durga: {
    slug: "durga",
    nameEnglish: "Devi Durga",
    nameSanskrit: "दुर्गा",
    meaning: "The Invincible, who protects from distress (Durgati)",
    role: "The Divine Warrior Mother and protector against cosmic evil in the Tridevi",
    consort: "Lord Shiva",
    divineFunction: "Cosmic justice, War against evil, and protective Shakti",
    vehicle: "Lion (representing dharma and valor)",
    weapons: ["Trishula (trident)", "Sudarshana Chakra", "Kharga (sword)", "Kodanda Bow"],
    sacredObjects: ["Lotus", "Conch Shell", "Gada", "Water Pot"],
    domains: ["Protection", "Courage", "Shakti", "Cosmic Order", "Victory"],
    originStory: "Manifested from the combined fiery energies of all the gods when they were defeated by the demon Mahishasura.",
    majorEpisodes: [
      {
        title: "Slaying of Mahishasura",
        narrative: "The buffalo demon Mahishasura had a boon that no man or god could kill him. Durga, combining all divine powers and weapons, rode a lion and fought him for nine days, decapitating him on the tenth day.",
        moralText: "Feminine energy (Shakti) is supreme and manifests to restore cosmic order when all else fails.",
        scripture: "Devi Mahatmya (Durga Saptashati)"
      }
    ],
    teachings: [
      "Inner Courage: Face life's challenges with lion-like courage without backing down.",
      "Defense of Righteousness: Force must be used to defeat stubborn, cruel evil.",
      "Motherly Protection: The Divine Mother always shields her children who ask for help."
    ],
    familyTree: [
      { name: "Shiva", relation: "Consort", slug: "shiva" },
      { name: "Parvati", relation: "Manifestation", slug: "parvati" }
    ],
    scriptures: ["Devi Mahatmya", "Markandeya Purana", "Devi Bhagavata Purana"],
    temples: ["Vaishno Devi Temple (Katra, Jammu)", "Kamakhya Temple (Guwahati, Assam)"],
    festivals: ["Navratri", "Durga Puja", "Vijayadashami"],
    mantras: [
      {
        text: "ॐ दुं दुर्गायै नमः",
        translation: "Om Dum Durgayai Namaha",
        meaning: "Salutations to the protective, invincible Mother Durga."
      },
      {
        text: "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥",
        translation: "Sarva-Mangala-Mangalye Shive Sarvartha-Sadhike\nSharanye Tryambake Gauri Narayani Namostute",
        meaning: "O Auspicious One, who gives auspiciousness, spouse of Shiva, who fulfills all goals, refuge of all, three-eyed Gauri, salutations to you."
      }
    ],
    meditationMeaning: "Riding a roaring lion, holding ten weapons in ten hands, showing that she commands all directions of space and handles all threats.",
    kidsSimplified: {
      summary: "Goddess Durga is a warrior queen mother who protects us from bad things. She rides a big, friendly lion and has ten arms, each holding a special gift or weapon from the gods.",
      funFacts: [
        "She has ten hands so she can do ten helpful things at the same time.",
        "She defeated a giant buffalo demon who was bothering everyone.",
        "The festival of Durga Puja celebrates her victory with beautiful decorations."
      ],
      moralLesson: "Be brave, protect the environment, and always stand up for what is right."
    },
    heroImage: "/images/deities/durga.png",
    bgGradient: "radial-gradient(circle, rgba(34, 10, 10, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#991B1B"
  },
  kali: {
    slug: "kali",
    nameEnglish: "Devi Kali",
    nameSanskrit: "काली",
    meaning: "The Dark One, who represents time (Kala) and change",
    role: "The Fierce Goddess of time, transformation, and ego-destruction",
    consort: "Lord Shiva",
    divineFunction: "Dissolution of illusion, liberation, and rapid spiritual change",
    vehicle: "Jackal (stands on Shiva)",
    weapons: ["Kharga (curved sword)"],
    sacredObjects: ["Severed head", "Garland of skulls", "Bowl of blood"],
    domains: ["Time", "Transformation", "Ego Dissolution", "Liberation", "Tantra"],
    originStory: "Emerged from the furrowed brow of Goddess Durga during a battlefield crisis to drink the blood of demonic forces.",
    majorEpisodes: [
      {
        title: "The Slaying of Raktabija",
        narrative: "The demon Raktabija had a boon: every drop of his blood touching the ground created another copy of him. Kali stretched out her tongue to catch and drink every drop of blood before it could touch the earth, defeating him.",
        moralText: "Negative habits (like Raktabija's clones) must be cut off at the root before they multiply.",
        scripture: "Devi Mahatmya"
      }
    ],
    teachings: [
      "Ego Death: The severed head represents cutting away the pride of 'I' and 'mine'.",
      "Impermanence: Time (Kali) devours all physical forms, encouraging focus on the eternal soul.",
      "Radical Love: Underneath her fierce look, she is a mother who liberates her devotees from fear."
    ],
    familyTree: [
      { name: "Shiva", relation: "Consort", slug: "shiva" },
      { name: "Durga", relation: "Source", slug: "durga" }
    ],
    scriptures: ["Devi Mahatmya", "Mundaka Upanishad", "Mahanirvana Tantra"],
    temples: ["Kalighat Kali Temple (Kolkata)", "Dakshineswar Kali Temple (Kolkata)"],
    festivals: ["Kali Puja", "Diwali"],
    mantras: [
      {
        text: "ॐ क्रीं कालिकायै नमः",
        translation: "Om Kreem Kalikayai Namaha",
        meaning: "Salutations to the dark mother of time and change."
      }
    ],
    meditationMeaning: "Stands with one foot on Shiva, who is lying down in peace, representing that active energy (Prakriti) requires quiet consciousness (Purusha) as its base.",
    kidsSimplified: {
      summary: "Goddess Kali is the fierce protector mother. She looks scary because she has dark blue skin and holds a sword, but she only scares bad thoughts away to keep you safe.",
      funFacts: [
        "Her tongue is stuck out in surprise because she accidentally stepped on Lord Shiva.",
        "She wears a garland of skulls, which represent the letters of the alphabet.",
        "She is highly loved in Bengal, where people sing sweet songs to her."
      ],
      moralLesson: "Do not judge anyone by their scary outer look, and focus on clearing bad thoughts from your head."
    },
    heroImage: "/images/deities/kali.png",
    bgGradient: "radial-gradient(circle, rgba(15, 10, 20, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#111827"
  },
  rama: {
    slug: "rama",
    nameEnglish: "Lord Rama",
    nameSanskrit: "राम",
    meaning: "The one who pleases and brings joy to the world",
    role: "The Seventh Avatar of Vishnu, Maryada Purushottama (the ideal king)",
    consort: "Goddess Sita",
    divineFunction: "Social order, Righteous human behavior, and Dharma",
    vehicle: "Royal Chariot",
    weapons: ["Kodanda Bow", "Sacred arrows"],
    sacredObjects: ["Royal Crown", "Sita's ring"],
    domains: ["Dharma", "Duty", "Kingship", "Honor", "Righteousness", "Truth"],
    originStory: "Born as the eldest prince of Ayodhya to King Dasharatha and Queen Kausalya to defeat the multi-headed demon king Ravana.",
    majorEpisodes: [
      {
        title: "The Exile and Devotion",
        narrative: "To fulfill his father's vow, Rama happily gave up his claim to the throne of Ayodhya on the day of his coronation and went to live in the forest for fourteen years, showing perfect filial duty.",
        moralText: "Honor your promises and perform your family duties, even when it demands great personal sacrifice.",
        scripture: "Valmiki Ramayana"
      },
      {
        title: "Building the Floating Bridge (Ram Setu)",
        narrative: "To rescue Sita from Lanka, Rama's army of monkeys had to cross the ocean. They wrote Rama's name on heavy stones, and the stones floated on the water, enabling them to build a bridge.",
        moralText: "Even the heaviest weights (or problems) float easily when aligned with the Divine name.",
        scripture: "Ramayana"
      }
    ],
    teachings: [
      "Maryada (Boundaries): Live within the boundary of moral laws and social duties.",
      "Equanimity in Duty: Rama accepted both coronation and forest exile with the same calm smile.",
      "Ideal Leader: A leader's highest duty is the welfare and moral satisfaction of their citizens."
    ],
    familyTree: [
      { name: "Vishnu", relation: "Source", slug: "vishnu" },
      { name: "Sita", relation: "Consort" },
      { name: "Luv & Kush", relation: "Sons" },
      { name: "Lakshmana", relation: "Brother" },
      { name: "Hanuman", relation: "Devotee", slug: "hanuman" }
    ],
    scriptures: ["Valmiki Ramayana", "Ramcharitmanas", "Yoga Vasistha"],
    temples: ["Ram Mandir (Ayodhya)", "Kalaram Temple (Nashik)", "Rameswaram Temple (Tamil Nadu)"],
    festivals: ["Rama Navami", "Diwali", "Dussehra"],
    mantras: [
      {
        text: "ॐ रामाय नमः",
        translation: "Om Ramaya Namaha",
        meaning: "I bow to Lord Rama, the embodiment of righteousness."
      },
      {
        text: "श्री राम जय राम जय जय राम",
        translation: "Sri Rama Jaya Rama Jaya Jaya Rama",
        meaning: "Victory to Lord Rama, who represents the light of Dharma."
      }
    ],
    meditationMeaning: "Holding the Kodanda bow, standing straight and tall, representing the steadfastness of truth and justice.",
    kidsSimplified: {
      summary: "Lord Rama is a prince who showed us how to be a perfect child, a perfect sibling, and a perfect king. He is famous for building a floating bridge of stones to cross the ocean.",
      funFacts: [
        "His bow, Kodanda, was so heavy that only he could string it.",
        "The monkeys wrote his name on stones to make them float on water.",
        "Diwali is celebrated because Rama returned home to Ayodhya after 14 years."
      ],
      moralLesson: "Obey your parents, care for your siblings, and always do your duty with a smile."
    },
    heroImage: "/images/deities/rama.png",
    bgGradient: "radial-gradient(circle, rgba(22, 18, 10, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#059669"
  },
  krishna: {
    slug: "krishna",
    nameEnglish: "Lord Krishna",
    nameSanskrit: "कृष्ण",
    meaning: "The dark or all-attractive one, who draws souls to himself",
    role: "The Eighth Avatar of Vishnu, Lila Purushottama (the master of play)",
    consort: "Goddess Radha / Rukmini",
    divineFunction: "Bhakti (love), Cosmic wisdom, and philosophical integration",
    vehicle: "Chariot (driven by Daruka)",
    weapons: ["Sudarshana Chakra", "Kaumodaki Gada"],
    sacredObjects: ["Bansi (flute)", "Peacock Feather", "Kaustubha Gem"],
    domains: ["Bhakti", "Wisdom", "Divine Love", "Yoga", "Play (Lila)", "Diplomacy"],
    originStory: "Born in a prison cell in Mathura to Devaki and Vasudeva to destroy the tyrant king Kansa, raised as a cowherd boy in the woods of Vrindavan.",
    majorEpisodes: [
      {
        title: "Lifting of the Govardhan Hill",
        narrative: "To protect the village of Vrindavan from the heavy rains sent by the angry rain god Indra, Krishna lifted the entire Govardhan hill on the pinky finger of his left hand for seven days, sheltering all animals and humans.",
        moralText: "The Divine protects the humble who seek shelter, showing that nature's forces are under cosmic control.",
        scripture: "Bhagavata Purana"
      },
      {
        title: "Revealing the Gita on the Battlefield",
        narrative: "When Arjuna was confused and refused to fight at Kurukshetra, Krishna stood as his charioteer and spoke the Bhagavad Gita, explaining the paths of duty, knowledge, and devotion, showing his cosmic form (Vishwaroopam).",
        moralText: "Perform your righteous duties without fear or attachment to results; the soul is eternal.",
        scripture: "Bhagavad Gita"
      }
    ],
    teachings: [
      "Nishkama Karma: Focus on your actions, not the rewards. Perform work as a dedication.",
      "Surrender (Sharanagati): Abandon all relative duties and seek refuge in the Supreme alone.",
      "Life as a Play: Meet the challenges of life with a joyful smile, treating it as a divine game."
    ],
    familyTree: [
      { name: "Vishnu", relation: "Source", slug: "vishnu" },
      { name: "Radha", relation: "Consort (Love)", slug: "radha" },
      { name: "Rukmini", relation: "Consort (Queen)" },
      { name: "Pradyumna", relation: "Son" },
      { name: "Subhadra", relation: "Sister" }
    ],
    scriptures: ["Bhagavad Gita", "Bhagavata Purana", "Mahabharata", "Harivamsa"],
    temples: ["Dwarkadhish Temple (Dwarka, Gujarat)", "Bankey Bihari Temple (Vrindavan, UP)", "Guruvayur Temple (Kerala)"],
    festivals: ["Krishna Janmashtami", "Radhashtami", "Holi"],
    mantras: [
      {
        text: "ॐ कृष्णाय नमः",
        translation: "Om Krishnaya Namaha",
        meaning: "I bow to Lord Krishna, the supreme source of love and wisdom."
      },
      {
        text: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे।\nहरे राम हरे राम राम राम हरे हरे॥",
        translation: "Hare Krishna Hare Krishna Krishna Krishna Hare Hare\nHare Rama Hare Rama Rama Rama Hare Hare",
        meaning: "The Maha Mantra, chanting the divine names of Krishna and Rama to cleanse the mind."
      }
    ],
    meditationMeaning: "Standing cross-legged, playing the flute under a Kadamba tree, representing the divine melody calling the individual soul home.",
    kidsSimplified: {
      summary: "Lord Krishna is a cheerful god who loves playing the flute and eating butter. As a boy, he did many magical things, like defeating monsters, lifting a hill on his finger, and dancing on a river serpent.",
      funFacts: [
        "Krishna wore a beautiful peacock feather in his crown.",
        "He loved playing tricks, like hiding his friends' butter pots.",
        "His flute music was so sweet that even cows stood still to listen."
      ],
      moralLesson: "Do your work happily, love your friends, and face difficult times with a smile."
    },
    heroImage: "/images/deities/krishna.png",
    bgGradient: "radial-gradient(circle, rgba(12, 10, 32, 0.9) 0%, rgba(5, 5, 8, 1) 100%)",
    accentColor: "#2563EB"
  }
};
