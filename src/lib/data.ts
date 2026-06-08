import { GitaChapter, GitaVerse, VedaData, UpanishadData, PuranaData, DeityData, TimelineDataPoint, DailyShlokaData } from '@/types';

export const GITA_CHAPTERS: GitaChapter[] = [
  {
    chapterNumber: 1,
    nameSanskrit: "अर्जुनविषादयोग",
    nameEnglish: "Arjuna's Grief",
    verseCount: 47,
    summary: "Arjuna observes the armies and sinks into depression, overwhelmed by the prospect of killing his relatives, and refuses to fight."
  },
  {
    chapterNumber: 2,
    nameSanskrit: "साङ्ख्ययोग",
    nameEnglish: "Transcendental Knowledge",
    verseCount: 72,
    summary: "Krishna instructs Arjuna on the immortality of the soul, the concept of duty (Dharma), and the practice of selfless action (Karma Yoga)."
  },
  {
    chapterNumber: 3,
    nameSanskrit: "कर्मयोग",
    nameEnglish: "Path of Action",
    verseCount: 43,
    summary: "Krishna explains the science of selfless action (Karma Yoga) and how actions dedicated to the Divine lead to liberation."
  },
  {
    chapterNumber: 4,
    nameSanskrit: "ज्ञानकर्मसंन्यासयोग",
    nameEnglish: "Knowledge and Action",
    verseCount: 42,
    summary: "Krishna reveals the nature of divine incarnation, the ancient lineage of yoga, and the purification of actions through spiritual knowledge."
  },
  {
    chapterNumber: 5,
    nameSanskrit: "कर्मसंन्यासयोग",
    nameEnglish: "Renunciation of Action",
    verseCount: 29,
    summary: "Krishna contrasts renunciation of actions with selfless action, explaining that both lead to the same supreme goal."
  },
  {
    chapterNumber: 6,
    nameSanskrit: "आत्मसंयमयोग",
    nameEnglish: "Path of Meditation",
    verseCount: 47,
    summary: "The practice of Dhyana Yoga (meditation), mental control, and self-realization through disciplined concentration."
  },
  {
    chapterNumber: 7,
    nameSanskrit: "ज्ञानविज्ञानयोग",
    nameEnglish: "Knowledge and Wisdom",
    verseCount: 30,
    summary: "Krishna describes His material and spiritual energies, the four types of devotees, and the path of absolute surrender."
  },
  {
    chapterNumber: 8,
    nameSanskrit: "अक्षरब्रह्मयोग",
    nameEnglish: "The Imperishable Brahman",
    verseCount: 28,
    summary: "The process of death, remembrance of the Divine, and the description of the path of light and darkness for the departing soul."
  },
  {
    chapterNumber: 9,
    nameSanskrit: "राजविद्याराजगुह्ययोग",
    nameEnglish: "The King of Secrets",
    verseCount: 34,
    summary: "Krishna reveals the supreme secret of devotion, His absolute sovereignty, and the easy path of loving surrender."
  },
  {
    chapterNumber: 10,
    nameSanskrit: "विभूतियोग",
    nameEnglish: "Divine Glories",
    verseCount: 42,
    summary: "Krishna describes His infinite forms, manifestations, and divine attributes that pervade all aspects of creation."
  },
  {
    chapterNumber: 11,
    nameSanskrit: "विश्वरूपदर्शनयोग",
    nameEnglish: "The Cosmic Vision",
    verseCount: 55,
    summary: "At Arjuna's request, Krishna reveals His awe-inspiring and terrifying Universal Form (Vishwarupa) holding all of creation."
  },
  {
    chapterNumber: 12,
    nameSanskrit: "भक्तियोग",
    nameEnglish: "Path of Devotion",
    verseCount: 20,
    summary: "Krishna defines the path of Bhakti Yoga (devotion) and lists the spiritual qualities that make a devotee dear to Him."
  },
  {
    chapterNumber: 13,
    nameSanskrit: "क्षेत्रक्षेत्रज्ञविभागयोग",
    nameEnglish: "The Field and Knower",
    verseCount: 34,
    summary: "The distinction between the physical body (Kshetra) and the conscious soul (Kshetrajna) that resides within it."
  },
  {
    chapterNumber: 14,
    nameSanskrit: "गुणत्रयविभागयोग",
    nameEnglish: "The Three Modes of Nature",
    verseCount: 27,
    summary: "Krishna explains the three qualities of material nature (Sattva, Rajas, Tamas) and how they bind and influence the soul."
  },
  {
    chapterNumber: 15,
    nameSanskrit: "पुरुषोत्तमयोग",
    nameEnglish: "The Supreme Soul",
    verseCount: 20,
    summary: "The metaphor of the upside-down Banyan tree of the cosmos and the characteristics of the Supreme Personality (Purushottama)."
  },
  {
    chapterNumber: 16,
    nameSanskrit: "दैवासुरसम्पद्विभागयोग",
    nameEnglish: "Divine and Demonic Natures",
    verseCount: 24,
    summary: "A description of the virtues of divine natures and the vices of demonic dispositions that bind the human mind."
  },
  {
    chapterNumber: 17,
    nameSanskrit: "श्रद्धात्रयविभागयोग",
    nameEnglish: "Three Divisions of Faith",
    verseCount: 28,
    summary: "The three types of faith, food, sacrifice, penance, and charity according to the dominant mode of nature."
  },
  {
    chapterNumber: 18,
    nameSanskrit: "मोक्षसंन्यासयोग",
    nameEnglish: "Liberation and Renunciation",
    verseCount: 78,
    summary: "The final summary of all spiritual teachings, the synthesis of duty, and Krishna's ultimate call to absolute surrender."
  }
];

export const VEDAS_DATA: VedaData[] = [
  {
    name: "Rigveda",
    sanskritName: "ऋग्वेद",
    description: "The oldest and most sacred scripture of Sanatan Dharma, consisting of hymns dedicated to cosmic deities (Devatas) and profound philosophical inquiries into the nature of existence.",
    verseCount: 10552,
    keyTeachings: [
      "Ekam Sat Vipra Bahudha Vadanti (Truth is One, sages call it by various names)",
      "The Nasadiya Sukta (Cosmic creation hymn)",
      "The Gayatri Mantra (Invocation of cosmic intelligence)"
    ]
  },
  {
    name: "Yajurveda",
    sanskritName: "यजुर्वेद",
    description: "The Veda of rituals and chants, detailing the prose mantras for conducting sacrifices (Yajnas) and maintaining cosmic order (Rta). It is divided into Krishna (Dark) and Shukla (Light) Yajurveda.",
    verseCount: 1975,
    keyTeachings: [
      "Ishavashyam Idam Sarvam (Everything is pervaded by the Divine)",
      "The importance of righteous action (Karma) as sacrifice",
      "Shatapatha Brahmana rituals and cosmic correspondences"
    ]
  },
  {
    name: "Samaveda",
    sanskritName: "सामवेद",
    description: "The Veda of melodies and chants, consisting of hymns extracted mostly from the Rigveda, set to musical notes (Saman) representing the source of Indian classical music.",
    verseCount: 1875,
    keyTeachings: [
      "Sound (Nada Brahman) as a pathway to the Divine",
      "Musical chanting as the highest form of concentration",
      "The spiritual impact of sonic vibrations on consciousness"
    ]
  },
  {
    name: "Atharveda",
    sanskritName: "अथर्ववेद",
    description: "The Veda of daily life practices, contains prayers, hymns, and spells for healing diseases, achieving prosperity, protecting from harm, and managing social governance.",
    verseCount: 5977,
    keyTeachings: [
      "Prithvi Sukta (The hymn to Mother Earth, establishing environmental ethics)",
      "Ayurveda (Traditional medicine roots)",
      "Social duties and family harmony guidelines"
    ]
  }
];

export const UPANISHADS_DATA: UpanishadData[] = [
  { name: "Isha", sanskritName: "ईशोपनिषद्", vedaAssociation: "Yajurveda", keyTeaching: "All this, whatever moves in the world, is enveloped by God. Enjoy it with renunciation.", famousQuote: "ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्।" },
  { name: "Kena", sanskritName: "केनोपनिषद्", vedaAssociation: "Samaveda", keyTeaching: "Inquiry into the absolute power that drives the senses and the mind.", famousQuote: "केनेषितं पतति प्रेषितं मनः।" },
  { name: "Katha", sanskritName: "कठोपनिषद्", vedaAssociation: "Yajurveda", keyTeaching: "The dialogue between young Nachiketa and Yama (God of Death) on the immortality of the soul.", famousQuote: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत (Arise, awake, stop not till the goal is reached)." },
  { name: "Prashna", sanskritName: "प्रश्नोपनिषद्", vedaAssociation: "Atharveda", keyTeaching: "Six disciples ask six philosophical questions to Sage Pippalada regarding life and consciousness.", famousQuote: "भगवन् कुत इदं प्रजाः प्रजायन्त इति।" },
  { name: "Mundaka", sanskritName: "मुण्डकोपनिषद्", vedaAssociation: "Atharveda", keyTeaching: "The distinction between higher spiritual knowledge (Para) and lower intellectual knowledge (Apara).", famousQuote: "सत्यमेव जयते नानृतम् (Truth alone triumphs, not untruth)." },
  { name: "Mandukya", sanskritName: "माण्डूक्योपनिषद्", vedaAssociation: "Atharveda", keyTeaching: "The study of the four states of consciousness (Waking, Dreaming, Deep Sleep, and Turiya) and Om.", famousQuote: "अयमात्मा ब्रह्म (This Self is Brahman)." },
  { name: "Taittiriya", sanskritName: "तैत्तिरीयोपनिषद्", vedaAssociation: "Yajurveda", keyTeaching: "The five layers of the human personality (Koshas) and ethical instructions to graduating students.", famousQuote: "सत्यं वद। धर्मं चर। (Speak the truth. Walk the path of righteousness.)" },
  { name: "Aitareya", sanskritName: "ऐतरेयोपनिषद्", vedaAssociation: "Rigveda", keyTeaching: "The creation of the universe and the definition of consciousness as absolute truth.", famousQuote: "प्रज्ञानं ब्रह्म (Consciousness is Brahman)." },
  { name: "Chandogya", sanskritName: "छान्दोग्योपनिषद्", vedaAssociation: "Samaveda", keyTeaching: "The sacred syllable Om, cosmic meditation, and the famous instruction of non-duality.", famousQuote: "तत्त्वमसि (Tat Tvam Asi - That Thou Art)." },
  { name: "Brihadaranyaka", sanskritName: "बृहदारण्यकोपनिषद्", vedaAssociation: "Yajurveda", keyTeaching: "The largest Upanishad, exploring the light of the self, and dialogue between Yajnavalkya and Maitreyi.", famousQuote: "असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय।" },
  { name: "Kaushitaki", sanskritName: "कौषीतक्युपनिषद्", vedaAssociation: "Rigveda", keyTeaching: "Explores the journey of the soul after death and the identity of breath (Prana) with Brahman.", famousQuote: "प्राणो ब्रह्म इति ह स्माह।" },
  { name: "Shvetashvatara", sanskritName: "श्वेताश्वतरोपनिषद्", vedaAssociation: "Yajurveda", keyTeaching: "Explores the personal aspect of God (Rudra) and the unity of devotion and knowledge.", famousQuote: "ज्ञात्वा देवं सर्वपाशापहानिः।" },
  { name: "Maitri", sanskritName: "मैत्र्युपनिषद्", vedaAssociation: "Yajurveda", keyTeaching: "Discusses the transition from the material self to the eternal spirit within.", famousQuote: "मन एव मनुष्याणां कारणं बन्धमोक्षयोः।" }
];

export const PURANAS_DATA: PuranaData[] = [
  { name: "Vishnu Purana", deityFocus: "Vishnu", verseCount: 23000, keyStories: ["Dhruva's devotion", "Prahlada's trials", "The description of Yugas", "Samudra Manthan"] },
  { name: "Shiva Purana", deityFocus: "Shiva", verseCount: 24000, keyStories: ["Marriage of Shiva and Parvati", "Origin of Jyotirlingas", "Birth of Ganesha and Kartikeya", "Tandava Dance"] },
  { name: "Bhagavata Purana", deityFocus: "Vishnu (Krishna)", verseCount: 18000, keyStories: ["Childhood pastimes of Lord Krishna", "The 24 Gurus of Dattatreya", "Gajendra Moksha"] },
  { name: "Devi Bhagavata Purana", deityFocus: "Devi (Shakti)", verseCount: 18000, keyStories: ["Mahishasura Mardini", "Manifestation of Navadurga", "Origin of the Universe from Shakti"] },
  { name: "Brahma Purana", deityFocus: "Brahma", verseCount: 10000, keyStories: ["Creation of Cosmos", "Geography of Earth", "History of Surya and the Sun Temple of Konark"] },
  { name: "Matsya Purana", deityFocus: "Vishnu (Matsya)", verseCount: 14000, keyStories: ["The Cosmic Deluge and Manu", "Architecture guidelines (Vastu Shastra)", "Genealogy of dynasties"] },
  { name: "Kurma Purana", deityFocus: "Vishnu (Kurma)", verseCount: 17000, keyStories: ["Churning of the Ocean", "Ishvara Gita (philosophical discourse)", "Holy places of India"] },
  { name: "Varaha Purana", deityFocus: "Vishnu (Varaha)", verseCount: 24000, keyStories: ["Rescue of Mother Earth", "Sacred pilgrimages (Tirthas)", "Prayers and rituals"] },
  { name: "Garuda Purana", deityFocus: "Vishnu", verseCount: 19000, keyStories: ["Journey of the soul after death", "Science of gems (Jyotish/Gemology)", "Anatomy and medicine"] },
  { name: "Agni Purana", deityFocus: "Agni / All", verseCount: 15400, keyStories: ["Martial arts (Dhanurveda)", "Sanskrit grammar rules", "Law, politics, and medicinal herbs"] },
  { name: "Narada Purana", deityFocus: "Vishnu", verseCount: 25000, keyStories: ["Devotion of Narada", "Summaries of all 18 Puranas", "Astronomy and astrology (Jyotisha)"] },
  { name: "Padma Purana", deityFocus: "Vishnu / Shiva", verseCount: 55000, keyStories: ["The layout of Pushkar", "Importance of Tulsi", "Stories of Rama and Gita Mahatmya"] },
  { name: "Linga Purana", deityFocus: "Shiva", verseCount: 11000, keyStories: ["Emergence of the Linga of Fire", "Panchakshara Mantra (Om Namah Shivaya)", "Cosmic dissolution"] },
  { name: "Skanda Purana", deityFocus: "Kartikeya", verseCount: 81100, keyStories: ["Legend of Sri Satyanarayan", "Kashi Khanda (geography of Varanasi)", "Holy legends of Himalayas"] },
  { name: "Brahmanda Purana", deityFocus: "Brahma / Lalitha", verseCount: 12000, keyStories: ["Lalitha Sahasranama", "Adhyatma Ramayana", "Description of cosmic egg"] },
  { name: "Brahmavaivarta Purana", deityFocus: "Krishna / Radha", verseCount: 18000, keyStories: ["Radha-Krishna pastimes", "Manifestation of Prakriti", "Ganesha losing his tusk"] },
  { name: "Markandeya Purana", deityFocus: "Devi", verseCount: 9000, keyStories: ["Devi Mahatmya (Durga Saptashati)", "Dialogues of Sage Markandeya", "King Harishchandra"] },
  { name: "Vamana Purana", deityFocus: "Vishnu (Vamana)", verseCount: 10000, keyStories: ["Dwarf incarnation and King Bali", "Pilgrimages of Kurukshetra", "Socio-spiritual duties"] }
];

export const DEITIES_DATA: DeityData[] = [
  {
    name: "Brahma",
    sanskrit: "ब्रह्मा",
    epithets: ["Swayambhu (Self-Born)", "Prajapati (Lord of Creatures)", "Chaturmukha (Four-Faced)"],
    description: "The Creator aspect of the cosmic trinity (Trimurti), who brings the universe into manifestation using the sacred wisdom of the four Vedas.",
    associatedTexts: ["Brahma Purana", "Rigveda"],
    emoji: "🕉️"
  },
  {
    name: "Vishnu",
    sanskrit: "विष्णु",
    epithets: ["Narayana (Refuge of Humanity)", "Hari (Remover of Sins)", "Jagannatha (Lord of the Universe)"],
    description: "The Preserver aspect of the Trimurti, who incarnates (Avatara) in the world whenever cosmic balance (Dharma) is threatened by evil forces.",
    associatedTexts: ["Vishnu Purana", "Bhagavata Purana", "Bhagavad Gita"],
    emoji: "🦚"
  },
  {
    name: "Shiva",
    sanskrit: "शिव",
    epithets: ["Mahadeva (Great God)", "Rudra (The Roarer)", "Nataraja (King of Dance)"],
    description: "The Destroyer or Transformer aspect of the Trimurti, who represents absolute consciousness, ascetic renunciation, and the final dissolution of the material world.",
    associatedTexts: ["Shiva Purana", "Linga Purana", "Shvetashvatara Upanishad"],
    emoji: "🔱"
  },
  {
    name: "Saraswati",
    sanskrit: "सरस्वती",
    epithets: ["Vagdevi (Goddess of Speech)", "Sharada (Giver of Wisdom)", "Pustakadharini (Holding the Book)"],
    description: "The Goddess of learning, wisdom, music, and the arts, representing the flowing stream of creative intelligence that dispels ignorance.",
    associatedTexts: ["Rigveda", "Devi Bhagavata Purana"],
    emoji: "🪕"
  },
  {
    name: "Lakshmi",
    sanskrit: "लक्ष्मी",
    epithets: ["Sri (Auspiciousness)", "Chanchala (Fickle-natured)", "Kamala (Lotus Goddess)"],
    description: "The Goddess of wealth, fortune, prosperity, and spiritual abundance, who serves as the active energy (Shakti) of Lord Vishnu.",
    associatedTexts: ["Sri Sukta (Rigveda Khila)", "Vishnu Purana"],
    emoji: "🌸"
  },
  {
    name: "Parvati",
    sanskrit: "पार्वती",
    epithets: ["Durga (Invincible)", "Uma (Maternal)", "Shakti (Universal Power)"],
    description: "The Goddess of power, devotion, and household harmony, who is the consort of Shiva and represents the maternal force of material nature (Prakriti).",
    associatedTexts: ["Devi Mahatmya", "Shiva Purana"],
    emoji: "🦁"
  },
  {
    name: "Ganesha",
    sanskrit: "गणेश",
    epithets: ["Vighnaharta (Remover of Obstacles)", "Ekadanta (One-Tusked)", "Vinayaka (Leader)"],
    description: "The elephant-headed deity of wisdom, intellect, and new beginnings, worshipped at the start of all sacred undertakings.",
    associatedTexts: ["Ganesha Purana", "Mundaka Upanishad (commentaries)"],
    emoji: "🐘"
  },
  {
    name: "Hanuman",
    sanskrit: "हनुमान",
    epithets: ["Anjaneya (Son of Anjana)", "Sankat Mochan (Reliever of Distress)", "Bajrangbali (Mighty Armed)"],
    description: "The monkey-deity who represents the pinnacle of selfless devotion (Bhakti), celibacy, physical power, and scriptural wisdom.",
    associatedTexts: ["Ramayana", "Ramcharitmanas", "Hanuman Chalisa"],
    emoji: "🐒"
  },
  {
    name: "Rama",
    sanskrit: "राम",
    epithets: ["Maryada Purushottama (Ideal Man)", "Raghav (Descendant of Raghu)", "Ramachandra"],
    description: "The seventh incarnation of Vishnu, who lived a life of absolute adherence to Dharma, setting the standard for a righteous king, son, husband, and brother.",
    associatedTexts: ["Ramayana", "Ramcharitmanas"],
    emoji: "🏹"
  },
  {
    name: "Krishna",
    sanskrit: "कृष्ण",
    epithets: ["Yogeshvara (Lord of Yoga)", "Govinda (Protector of Cows)", "Vasudeva (Son of Vasudeva)"],
    description: "The eighth incarnation of Vishnu, who delivered the immortal discourse of the Bhagavad Gita and represents divine playfulness, political diplomacy, and absolute truth.",
    associatedTexts: ["Mahabharata", "Bhagavad Gita", "Bhagavata Purana"],
    emoji: "🪈"
  },
  {
    name: "Durga",
    sanskrit: "दुर्गा",
    epithets: ["Mahishasuramardini (Slayer of Mahishasura)", "Jagadamba (Mother of the World)"],
    description: "The warrior goddess representing the unified strength of all divine forces, created to destroy the demon Mahishasura and restore planetary order.",
    associatedTexts: ["Devi Mahatmya", "Markandeya Purana"],
    emoji: "🛡️"
  },
  {
    name: "Kartikeya",
    sanskrit: "कार्तिकेय",
    epithets: ["Murugan", "Subrahmanya", "Skanda (General of Devas)"],
    description: "The elder son of Shiva and Parvati, commander-in-chief of the celestial army, who representing youth, valor, and victory over dark forces.",
    associatedTexts: ["Skanda Purana", "Kumarasambhava"],
    emoji: "🦚"
  }
];

export const TIMELINE_DATA: TimelineDataPoint[] = [
  { era: "Satya Yuga", title: "Cosmic Creation & Rta", description: "The dawn of cosmic order (Rta). Sages perceive the vibration of Om. Foundational principles of truth are established.", approximateDate: "Cyclic Beginning" },
  { era: "Treta Yuga", title: "Era of Rama", description: "Lord Rama descends to demonstrate the path of individual and social righteousness (Dharma). Sage Valmiki writes the Ramayana.", approximateDate: "Ancient Antiquity" },
  { era: "Dvapara Yuga", title: "Mahabharata & Bhagavad Gita", description: "Krishna delivers the Gita to Arjuna on the battlefield of Kurukshetra, outlining the paths of Yoga.", approximateDate: "approx. 3102 BCE" },
  { era: "Vedic Period", title: "Codification of Vedas", description: "Veda Vyasa compiles and organizes the eternal Sruti into four distinct Vedas: Rig, Yajur, Sama, and Atharva.", approximateDate: "c. 1500 - 1000 BCE" },
  { era: "Upanishadic Age", title: "The Jnana Kanda Era", description: "Philosophical dialogues shift the focus from ritual Yajnas to inner meditation on the Self (Atman) and Brahman.", approximateDate: "c. 1000 - 600 BCE" },
  { era: "Philosophy Age", title: "The Six Darshanas", description: "Codification of the six orthodox schools of Indian philosophy (Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta).", approximateDate: "c. 600 - 200 BCE" },
  { era: "Buddhist Dialogue", title: "Shramana Movements", description: "Buddhism and Jainism emerge from Vedic philosophical contexts, emphasizing non-violence and asceticism.", approximateDate: "c. 560 - 480 BCE" },
  { era: "Sutra Literature", title: "Patanjali & Panini", description: "Panini codifies Sanskrit grammar (Ashtadhyayi) and Patanjali writes the Yoga Sutras, standardizing yogic practices.", approximateDate: "c. 400 - 150 BCE" },
  { era: "Epic Synthesis", title: "Valmiki Ramayana Compiled", description: "The oral history of Ramayana is standardized into writing, detailing Rama's life across 24,000 verses.", approximateDate: "c. 300 BCE" },
  { era: "Golden Age", title: "Puranic Integration", description: "The major Puranas are written down during the Gupta Empire, making complex Vedic truths accessible through storytelling.", approximateDate: "c. 300 - 600 CE" },
  { era: "Vedanta Revival", title: "Adi Shankaracharya", description: "Adi Shankara travels across India, establishes the four Mathas, and writes commentaries on non-duality (Advaita Vedanta).", approximateDate: "c. 788 - 820 CE" },
  { era: "Visistadvaita", title: "Ramanujacharya", description: "Ramanuja details Visistadvaita (qualified non-duality), integrating emotional devotion (Bhakti) with rigorous Vedanta philosophy.", approximateDate: "c. 1017 - 1137 CE" },
  { era: "Dvaita Vedanta", title: "Madhvacharya", description: "Madhvacharya establishes the school of Dvaita (dualistic) Vedanta, highlighting the eternal separation of Jiva and Ishvara.", approximateDate: "c. 1238 - 1317 CE" },
  { era: "Bhakti Wave", title: "The Bhakti Movement", description: "Saints like Kabir, Tulsidas, Mirabai, and Tukaram spread spiritual truths in vernacular languages, breaking social hierarchies.", approximateDate: "c. 1300 - 1700 CE" },
  { era: "Sikhism Dawn", title: "Guru Nanak Dev Ji", description: "Guru Nanak establishes Sikhism, emphasizing oneness of God, service, and chanting the divine name.", approximateDate: "c. 1469 - 1539 CE" },
  { era: "Chaitanya Wave", title: "Gaudiya Vaishnavism", description: "Chaitanya Mahaprabhu popularizes congregational chanting of Krishna names (Sankirtan) throughout East India.", approximateDate: "c. 1486 - 1534 CE" },
  { era: "Modern Ren.", title: "Swami Vivekananda", description: "Vivekananda speaks at the Chicago Parliament of Religions, introducing Vedanta and Yoga to the Western world.", approximateDate: "c. 1893 CE" },
  { era: "Self Realization", title: "Sri Aurobindo & Ramana Maharshi", description: "Aurobindo outlines Integral Yoga while Ramana Maharshi teaches the direct path of self-inquiry (Who Am I?).", approximateDate: "c. 1900 - 1950 CE" },
  { era: "Global Yoga", title: "Spread of Yoga and Meditation", description: "Masters like Paramahansa Yogananda, B.K.S. Iyengar, and others popularize Hatha Yoga and Kriya Yoga internationally.", approximateDate: "c. 1950 - Present" },
  { era: "Digital Dharma", title: "Universal Sacred Library", description: "Ancient Sanskrit texts are digitized, translated, and made universally accessible to seekers worldwide.", approximateDate: "21st Century" }
];

export const DAILY_SHLOKAS: DailyShlokaData[] = [
  {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana\nmā karmaphalaheturbhūr mā te saṅgo'stvakarmaṇi",
    hindi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। तुम कर्मों के फल का हेतु मत बनो और तुम्हारी कर्म न करने में भी आसक्ति न हो।",
    english: "You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.",
    source: "Bhagavad Gita 2.47"
  },
  {
    sanskrit: "यदा यदा ही धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham",
    hindi: "हे भारत! जब-जब धर्म की हानि होती है और अधर्म का उत्थान होता है, तब-तब मैं स्वयं को साकार रूप में प्रकट करता हूँ।",
    english: "Whenever and wherever there is a decline in righteousness, O descendant of Bharata, and a predominant rise of unrighteousness—at that time I descend Myself.",
    source: "Bhagavad Gita 4.7"
  },
  {
    sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",
    transliteration: "paritrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām\ndharma-saṁsthāpanārthāya sambhavāmi yuge yuge",
    hindi: "सज्जनों के कल्याण के लिए, दुष्टों के विनाश के लिए और धर्म की स्थापना के लिए मैं युग-युग में प्रकट होता हूँ।",
    english: "To deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of religion, I Myself appear, age after age.",
    source: "Bhagavad Gita 4.8"
  },
  {
    sanskrit: "असतो मा सद्गमय।\nतमसो मा ज्योतिर्गमय।\nमृत्योर्मा अमृतं गमय॥",
    transliteration: "asato mā sad-gamaya\ntamaso mā jyotir-gamaya\nmṛtyor mā amṛtaṁ gamaya",
    hindi: "मुझे असत्य से सत्य की ओर ले चलो। मुझे अंधकार से प्रकाश की ओर ले चलो। मुझे मृत्यु से अमरता की ओर ले चलो।",
    english: "Lead me from untruth to truth. Lead me from darkness to light. Lead me from death to immortality.",
    source: "Brihadaranyaka Upanishad 1.3.28"
  },
  {
    sanskrit: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।\nन चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥",
    transliteration: "nainaṁ chindanti śastrāṇi nainaṁ dahati pāvakaḥ\nna cainaṁ kledayantyāpo na śoṣayati mārutaḥ",
    hindi: "आत्मा को न शस्त्र काट सकते हैं, न आग इसे जला सकती है, न जल इसे गीला कर सकता है और न ही वायु इसे सुखा सकती है।",
    english: "Weapons cannot cut the soul, fire cannot burn it, water cannot wet it, and the wind cannot dry it.",
    source: "Bhagavad Gita 2.23"
  },
  {
    sanskrit: "यो मां पश्यति सर्वत्र सर्वं च मयि पश्यति।\nतस्याहं न प्रणश्यामी स च मे न प्रणश्यति॥",
    transliteration: "yo māṁ paśyati sarvatra sarvaṁ ca mayi paśyati\ntasyāhaṁ na praṇaśyāmi sa ca me na praṇaśyati",
    hindi: "जो मुझे सब जगह देखता है और सब कुछ मुझमें देखता है, उसके लिए मैं कभी अदृश्य नहीं होता और वह मेरे लिए कभी अदृश्य नहीं होता।",
    english: "For one who sees Me everywhere and sees everything in Me, I am never lost, nor is he ever lost to Me.",
    source: "Bhagavad Gita 6.30"
  },
  {
    sanskrit: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥",
    transliteration: "patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati\ntad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ",
    hindi: "जो कोई भक्त मुझे प्रेमपूर्वक एक पत्ता, एक फूल, एक फल या थोड़ा सा जल अर्पित करता है, उसे मैं सहर्ष स्वीकार करता हूँ।",
    english: "If one offers Me with love and devotion a leaf, a flower, a fruit or water, I will accept it.",
    source: "Bhagavad Gita 9.26"
  },
  {
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    transliteration: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
    hindi: "सभी प्रकार के कर्तव्यों (धर्मों) का त्याग करके केवल मेरी शरण में आओ। मैं तुम्हें सभी पापों से मुक्त कर दूँगा, शोक मत करो।",
    english: "Abandon all varieties of dharma and just surrender unto Me alone. I shall deliver you from all sinful reactions. Do not fear.",
    source: "Bhagavad Gita 18.66"
  },
  {
    sanskrit: "वसुधैव कुटुम्बकम्।",
    transliteration: "vasudhaiva kuṭumbakam",
    hindi: "यह संपूर्ण पृथ्वी ही एक परिवार है।",
    english: "The entire world is one family.",
    source: "Maha Upanishad 6.71"
  },
  {
    sanskrit: "सत्यमेव जयते नानृतम्।",
    transliteration: "satyameva jayate nānṛtam",
    hindi: "सत्य की ही सदा विजय होती है, असत्य की नहीं।",
    english: "Truth alone triumphs, not untruth.",
    source: "Mundaka Upanishad 3.1.6"
  },
  {
    sanskrit: "अहं ब्रह्मास्मि।",
    transliteration: "aham brahmāsmi",
    hindi: "मैं ब्रह्म (परम चेतना) हूँ।",
    english: "I am Brahman (the infinite cosmic consciousness).",
    source: "Brihadaranyaka Upanishad 1.4.10"
  },
  {
    sanskrit: "तत्त्वमसि।",
    transliteration: "tat tvam asi",
    hindi: "तुम वही (परम सत्य) हो।",
    english: "That thou art (You are that ultimate reality).",
    source: "Chandogya Upanishad 6.8.7"
  },
  {
    sanskrit: "संभवामि युगे युगे।",
    transliteration: "sambhavāmi yuge yuge",
    hindi: "मैं युग-युग में प्रकट होता हूँ।",
    english: "I descend age after age.",
    source: "Bhagavad Gita 4.8"
  },
  {
    sanskrit: "सत्यं वद। धर्मं चर।",
    transliteration: "satyaṁ vada | dharmaṁ cara",
    hindi: "सत्य बोलो। धर्म के मार्ग पर चलो।",
    english: "Speak the truth. Conduct yourself righteously.",
    source: "Taittiriya Upanishad 1.11.1"
  },
  {
    sanskrit: "योगः कर्मसु कौशलम्।",
    transliteration: "yogaḥ karmasu kauśalam",
    hindi: "कर्मों में कुशलता ही योग है।",
    english: "Yoga is excellence in actions.",
    source: "Bhagavad Gita 2.50"
  },
  {
    sanskrit: "अहिंसा परमो धर्मः।",
    transliteration: "ahiṁsā paramo dharmaḥ",
    hindi: "अहिंसा सबसे बड़ा कर्तव्य और धर्म है।",
    english: "Non-violence is the highest duty.",
    source: "Mahabharata Adi Parva 11.8"
  },
  {
    sanskrit: "धर्मो रक्षति रक्षितः।",
    transliteration: "dharmo rakṣati rakṣitaḥ",
    hindi: "जो धर्म की रक्षा करते हैं, धर्म उनकी रक्षा करता है।",
    english: "Dharma protects those who protect it.",
    source: "Manu Smriti 8.15"
  },
  {
    sanskrit: "समत्वं योग उच्यते।",
    transliteration: "samatvaṁ yoga ucyate",
    hindi: "समता की भावना (समत्व) ही योग कहलाती है।",
    english: "Equanimity of mind is called Yoga.",
    source: "Bhagavad Gita 2.48"
  },
  {
    sanskrit: "तेजस्विनावधीतमस्तु मा विद्विषावहै।",
    transliteration: "tejasvinā vadhītam astu mā vidviṣāvahai",
    hindi: "हमारा पठन तेजयुक्त हो और हम कभी एक दूसरे से द्वेष न करें।",
    english: "May our study be enlightened, and may we never hold malice towards each other.",
    source: "Katha Upanishad Peace Chant"
  },
  {
    sanskrit: "ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम्॥",
    transliteration: "īśāvāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam",
    hindi: "ब्रह्मांड में जो कुछ भी है, वह सब ईश्वर द्वारा व्याप्त है। अतः त्याग भाव से उपभोग करो, किसी के धन का लोभ मत करो।",
    english: "Everything animate or inanimate that is within the universe is controlled and owned by the Lord. One should therefore accept only those things necessary for oneself, and not covet other things.",
    source: "Isha Upanishad 1"
  },
  {
    sanskrit: "विद्या ददाति विनयं विनयाद् याति पात्रताम्।\nपात्रत्वात् धनमाप्नोति धनाद् धर्मं ततः सुखम्॥",
    transliteration: "vidyā dadāti vinayaṁ vinayād yāti pātratām\npātratvāt dhanam āpnoti dhanād dharmaṁ tataḥ sukham",
    hindi: "विद्या विनय देती है, विनय से योग्यता आती है, योग्यता से धन मिलता है, धन से धर्म होता है और धर्म से सुख मिलता है।",
    english: "Knowledge gives humility, humility leads to worthiness, worthiness brings wealth, wealth enables righteous deeds, and righteous deeds bring happiness.",
    source: "Hitopadesha Introduction 6"
  },
  {
    sanskrit: "उदारचरितानां तु वसुधैव कुटुम्बकम्।",
    transliteration: "udāracaritānāṁ tu vasudhaiva kuṭumbakam",
    hindi: "उदार चरित्र वाले लोगों के लिए तो संपूर्ण पृथ्वी ही एक परिवार है।",
    english: "For those of noble character, the entire earth is their family.",
    source: "Maha Upanishad 6.71"
  },
  {
    sanskrit: "सन्तु निरामयाः।\nसर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥",
    transliteration: "sarve santu nirāmayāḥ\nsarve bhadrāṇi paśyantu mā kaścid duḥkha-bhāg bhavet",
    hindi: "सभी निरोगी हों। सभी कल्याण को देखें और कोई भी दुःखी न हो।",
    english: "May everyone be free from illness. May everyone see what is auspicious, and may no one suffer.",
    source: "Traditional Upanishadic Prayer"
  },
  {
    sanskrit: "तत् सवितुर्वरेण्यं भर्गो देवस्य धीमहि।\nधियो यो नः प्रचोदयात्॥",
    transliteration: "tat savitur vareṇyaṁ bhargo devasya dhīmahi\ndhiyo yo naḥ pracodayāt",
    hindi: "हम सविता देव के उस श्रेष्ठ तेज का ध्यान करते हैं जो हमारी बुद्धियों को सन्मार्ग की ओर प्रेरित करे।",
    english: "We meditate upon the supreme light of the divine sun; may it guide and illuminate our intellect.",
    source: "Rigveda 3.62.10 (Gayatri Mantra)"
  },
  {
    sanskrit: "श्रद्धावान् लभते ज्ञानं तत्परः संयतेन्द्रियः।\nज्ञानं लब्ध्वा परां शान्तिमचिरेणाधिगच्छति॥",
    transliteration: "śraddhāvān labhate jñānaṁ tat-paraḥ saṁyatendriyaḥ\njñānaṁ labdhvā parāṁ śāntim acireṇādhigacchati",
    hindi: "जितेन्द्रिय और साधनपरायण श्रद्धावान मनुष्य ज्ञान को प्राप्त करता है, तथा ज्ञान प्राप्त कर वह शीघ्र ही परम शांति को प्राप्त हो जाता है।",
    english: "A faithful person who is dedicated to transcendental knowledge and who subdues his senses quickly attains spiritual peace.",
    source: "Bhagavad Gita 4.39"
  },
  {
    sanskrit: "यतो धर्मस्ततो जयः।",
    transliteration: "yato dharmastato jayaḥ",
    hindi: "जहाँ धर्म है, वहाँ विजय है।",
    english: "Where there is righteousness, there is victory.",
    source: "Mahabharata 6.21.12"
  },
  {
    sanskrit: "ऋते ज्ञानान्न मुक्तिः।",
    transliteration: "ṛte jñānānna muktiḥ",
    hindi: "ज्ञान के बिना मुक्ति संभव नहीं है।",
    english: "Without knowledge, liberation is not possible.",
    source: "Yajurveda (Taittiriya Aranyaka)"
  },
  {
    sanskrit: "मातृदेवो भव। पितृदेवो भव।\nआचार्यदेवो भव। अतिथिदेवो भव॥",
    transliteration: "mātṛ-devo bhava | pitṛ-devo bhava\nācārya-devo bhava | atithi-devo bhava",
    hindi: "माता को देवतुल्य मानो। पिता को देवतुल्य मानो। आचार्य को देवतुल्य मानो। अतिथि को देवतुल्य मानो।",
    english: "Let your mother be your God. Let your father be your God. Let your teacher be your God. Let your guest be your God.",
    source: "Taittiriya Upanishad 1.11.2"
  },
  {
    sanskrit: "मन एव मनुष्याणां कारणं बन्धमोक्षयोः।",
    transliteration: "mana eva manuṣyāṇāṁ kāraṇaṁ bandha-mokṣayoḥ",
    hindi: "मन ही मनुष्यों के बंधन और मोक्ष का कारण है।",
    english: "The mind alone is the cause of bondage and liberation for human beings.",
    source: "Amritabindu Upanishad 2"
  },
  {
    sanskrit: "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥",
    transliteration: "om pūrṇam adaḥ pūrṇam idaṁ pūrṇāt pūrṇam udacyate\npūrṇasya pūrṇam ādāya pūrṇam evāvaśiṣyate",
    hindi: "वह परम सत्य पूर्ण है, यह जगत भी पूर्ण है। पूर्ण से ही पूर्ण की उत्पत्ति होती है। पूर्ण में से पूर्ण निकाल लेने पर भी पूर्ण ही शेष रहता है।",
    english: "That outer world is complete. This inner world is complete. From completeness comes completeness. If you take completeness away from completeness, completeness still remains.",
    source: "Isha Upanishad Peace Chant"
  }
];

export const GITA_VERSES: Record<number, GitaVerse[]> = {
  // Gita Chapter 1: 47 verses (All real verses, exact Sanskrit/English/Hindi)
  1: [
    {
      verseNumber: "1.1",
      sanskrit: "धृतराष्ट्र उवाच\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥ १.१॥",
      transliteration: "dhṛtarāṣṭra uvāca\ndharmakṣetre kurukṣetre samavetā yuyutsavaḥ |\nmāmakāḥ pāṇḍavāścaiva kimakurvata sañjaya || 1.1 ||",
      hindi: "धृतराष्ट्र बोले— हे संजय! धर्मभूमि कुरुक्षेत्र में एकत्रित, युद्ध की इच्छा वाले मेरे और पाण्डु के पुत्रों ने क्या किया?",
      english: "Dhritarashtra said: O Sanjay, after gathering on the holy field of Kurukshetra, and desiring to fight, what did my sons and the sons of Pandu do?",
      wordMeanings: JSON.stringify([
        { word: "धर्मक्षेत्रे", iast: "dharmakṣetre", meaning_en: "on the field of dharma", meaning_hi: "धर्मभूमि में" },
        { word: "कुरुक्षेत्रे", iast: "kurukṣetre", meaning_en: "on the field of Kuru", meaning_hi: "कुरुक्षेत्र में" },
        { word: "समवेताः", iast: "samavetāḥ", meaning_en: "assembled", meaning_hi: "एकत्रित" },
        { word: "युयुत्सवः", iast: "yuyutsavaḥ", meaning_en: "desiring to fight", meaning_hi: "युद्ध की इच्छा वाले" }
      ]),
      commentary: JSON.stringify({
        shankaracharya: "The field is called Dharmakshetra because it is the arena of spiritual development and righteous action.",
        ramanujacharya: "Dhritarashtra's question shows his attachment and anxiety regarding the outcome of the battle."
      })
    },
    {
      verseNumber: "1.2",
      sanskrit: "सञ्जय उवाच\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा।\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत्॥ १.२॥",
      transliteration: "sañjaya uvāca\ndṛṣṭvā tu pāṇḍavānīkaṁ vyūḍhaṁ duryodhanastadā |\nācāryamupasaṅgamya rājā vacanamabravīt || 1.2 ||",
      hindi: "संजय बोले— उस समय राजा दुर्योधन ने व्यूहरचनायुक्त पाण्डवों की सेना को देखकर और द्रोणाचार्य के पास जाकर यह वचन कहा।",
      english: "Sanjay said: On seeing the Pandava army standing in military formation, King Duryodhana went to his teacher Dronacharya and spoke these words."
    },
    {
      verseNumber: "1.3",
      sanskrit: "पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम्।\nव्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता॥ १.३॥",
      transliteration: "paśyaitāṁ pāṇḍuputrāṇāmācārya mahatīṁ camūm |\nvyūḍhāṁ drupadaputreṇa tava śiṣyeṇa dhīmatā || 1.3 ||",
      hindi: "हे आचार्य! आपके बुद्धिमान् शिष्य द्रुपदपुत्र (धृष्टद्युम्न) द्वारा व्यूहाकार खड़ी की हुई पाण्डुपुत्रों की इस बड़ी भारी सेना को देखिये।",
      english: "Behold, O Teacher, this mighty army of the sons of Pandu, arrayed in battle formation by your talented disciple, the son of Drupada."
    },
    {
      verseNumber: "1.4",
      sanskrit: "अत्र शूरा महेष्वासा भीमार्जुनसमा युधि।\nयुयुधानो विराटश्च द्रुपदश्च महारथः॥ १.४॥",
      transliteration: "atra śūrā maheṣvāsā bhīmārjunasamā yudhi |\nyuyudhāno virāṭaśca drupadaśca mahārathaḥ || 1.4 ||",
      hindi: "इस सेना में बड़े-बड़े धनुषों वाले तथा युद्ध में भीम और अर्जुन के समान बहुत से शूरवीर हैं, जैसे— युयुधान (सात्यकि), राजा विराट और महारथी द्रुपद।",
      english: "Here in this army are many heroic warriors with mighty bows, equal in combat to Bhima and Arjuna, such as Yuyudhana, Virata, and the great chariot-warrior Drupada."
    },
    {
      verseNumber: "1.5",
      sanskrit: "धृष्टकेतुश्चेकितानः काशिराजश्च वीर्यवान्।\nपुरुजित्कुन्तिभोजश्च शैब्यश्च नरपुङ्गवः॥ १.५॥",
      transliteration: "dhṛṣṭaketuścekitānaḥ kāśirājaśca vīryavān |\npurujitkuntibhojaśca śaibyaśca narapuṅgavaḥ || 1.5 ||",
      hindi: "तथा धृष्टकेतु, चेकितान और बलवान् काशिराज, पुरुजित्, कुन्तिभोज और मनुष्यों में श्रेष्ठ शैब्य भी हैं।",
      english: "There are also Dhrishtaketu, Chekitana, the valiant King of Kashi, Purujit, Kuntibhoja, and Shaibya, outstanding among men."
    },
    {
      verseNumber: "1.6",
      sanskrit: "युधामन्युश्च विक्रान्त उत्तमौजाश्च वीर्यवान्।\nसौभद्रो द्रौपदेयाश्च सर्व एव महारथाः॥ १.६॥",
      transliteration: "yudhāmanyuśca vikrānta uttamaujāśca vīryavān |\nsaubhadro draupadeyāśca sarva eva mahārathāḥ || 1.6 ||",
      hindi: "और पराक्रमी युधामन्यु तथा बलवान् उत्तमौजा, सुभद्रापुत्र अभिमन्यु एवं द्रौपदी के पाँचों पुत्र— ये सभी महारथी हैं।",
      english: "And the courageous Yudhamanyu, the gallant Uttamauja, the son of Subhadra (Abhimanyu), and the sons of Draupadi—all of them great chariot-warriors."
    },
    {
      verseNumber: "1.7",
      sanskrit: "अस्माकं तु विशिष्टा ये तान्निबोध द्विजोत्तम।\nनायका मम सैन्यस्य सञ्ज्ञार्थं तान्ब्रवीमि ते॥ १.७॥",
      transliteration: "asmākaṁ tu viśiṣṭā ye tānnibodha dvijottama |\nnāyakā mama sainyasya sañjñārthaṁ tānbravīmi te || 1.7 ||",
      hindi: "हे ब्राह्मणश्रेष्ठ! हमारे पक्ष में भी जो मुख्य-मुख्य वीर हैं, उनको आप जान लीजिये। आपकी जानकारी के लिये मैं अपनी सेना के नायकों को बताता हूँ।",
      english: "O best of Brahmins, let me now inform you of the principal leaders on our side, who are especially qualified to command my army."
    },
    {
      verseNumber: "1.8",
      sanskrit: "भवान्भीष्मश्च कर्णश्च कृपश्च समितिञ्जयः।\nअश्वत्थामा विकर्णश्च सौमदत्तिस्तथैव च॥ १.८॥",
      transliteration: "bhavānbhīṣmaśca karṇaśca kṛpaśca samitiñjayaḥ |\naśvatthāmā vikarṇaśca saumadattistathaiva ca || 1.8 ||",
      hindi: "स्वयं आप (द्रोणाचार्य), पितामह भीष्म, कर्ण और युद्धविजयी कृपाचार्य तथा वैसे ही अश्वत्थामा, विकर्ण और सोमदत्त का पुत्र भूरिश्रवा।",
      english: "Yourself, Bhishma, Karna, Kripa, who are victorious in battle, Ashwatthama, Vikarna, and the son of Somadatta (Bhurishrava)."
    },
    {
      verseNumber: "1.9",
      sanskrit: "अन्ये च बहवः शूरा मदर्थे त्यक्तजीविताः।\nनानाशस्त्रप्रहरणाः सर्वे युद्धविशारदाः॥ १.९॥",
      transliteration: "nye ca bahavaḥ śūrā madarthe tyaktajīvitāḥ |\nnānāśastrapraharaṇāḥ sarve yuddhaviśāradāḥ || 1.9 ||",
      hindi: "और भी बहुत से शूरवीर हैं, जो मेरे लिये अपना जीवन त्यागने को तैयार हैं। वे अनेक प्रकार के अस्त्र-शस्त्रों से सुसज्जित हैं और सब युद्धविद्या में निपुण हैं।",
      english: "And there are many other heroes who are prepared to lay down their lives for my sake, equipped with diverse weapons and all skilled in warfare."
    },
    {
      verseNumber: "1.10",
      sanskrit: "अपर्याप्तं तदस्माकं बलं भीष्माभिरक्षितम्।\nपर्याप्तं त्विदमेतेषां बलं भीमाभिरक्षितम्॥ १.१०॥",
      transliteration: "aparyāptaṁ tadasmākaṁ balaṁ bhīṣmābhirakṣitam |\nparyāptaṁ tvidameteṣāṁ balaṁ bhīmābhirakṣitam || 1.10 ||",
      hindi: "भीष्मपितामह द्वारा रक्षित हमारी वह सेना सब प्रकार से अजेय है और भीम द्वारा रक्षित इन लोगों की यह सेना जीतने में सुगम है।",
      english: "Our strength, protected by Bhishma, is unlimited, whereas their strength, protected by Bhima, is limited."
    },
    {
      verseNumber: "1.11",
      sanskrit: "अयनेषु च सर्वेषु यथाभागमवस्थिताः।\nभीष्ममेवाभिरक्षन्तु भवन्तः सर्व एव हि॥ १.११॥",
      transliteration: "ayaneṣu ca sarveṣu yathā-bhāgam avasthitāḥ |\nbhīṣmam evābhirakṣantu bhavantaḥ sarva eva hi || 1.11 ||",
      hindi: "इसलिए सब मोर्चों पर अपनी-अपनी जगह स्थित रहते हुए आप सभी भीष्मपितामह की ही सब ओर से रक्षा करें।",
      english: "Therefore, standing in your respective formations on all fronts, all of you must guard Bhishma particularly."
    },
    {
      verseNumber: "1.12",
      sanskrit: "तस्य सञ्जनयन् हर्षं कुरुवृद्धः पितामहः।\nसिंहनादं विनद्योच्चैः शङ्खं दध्मौ प्रतापवान्॥ १.१२॥",
      transliteration: "tasya sañjanayan harṣaṁ kuru-vṛddhaḥ pitāmahaḥ |\nsiṁha-nādaṁ vinadyoccaiḥ śaṅkhaṁ dadhmau pratāpavān || 1.12 ||",
      hindi: "कुरुवंश के वयोवृद्ध प्रतापी पितामह भीष्म ने दुर्योधन के हृदय में हर्ष उत्पन्न करते हुए सिंह गर्जना के समान ऊंचे स्वर से शंख बजाया।",
      english: "Then, the glorious patriarch of the Kuru dynasty, the grandfather Bhishma, blew his conch shell loudly like a roaring lion, giving joy to Duryodhana."
    },
    {
      verseNumber: "1.13",
      sanskrit: "ततः शङ्खाश्च भेर्यश्च पणवानकगोमुखाः।\nसहसैवाभ्यहन्यन्त स शब्दस्तुमुलोऽभवत्॥ १.१३॥",
      transliteration: "tataḥ śaṅkhāśca bheryaśca paṇavānaka-gomukhāḥ |\nsahasaivābhyahanyanta sa śabdas tumulo'bhavat || 1.13 ||",
      hindi: "इसके बाद शंख, नगाड़े, ढोल, मृदंग और नरसिंघे एक साथ ही बज उठे। वह भयंकर शब्द बड़ा कोलाहलपूर्ण हुआ।",
      english: "Thereafter, conchs, kettledrums, bugles, trumpets, and horns suddenly blared forth, and the combined sound was tumultuous."
    },
    {
      verseNumber: "1.14",
      sanskrit: "ततः श्वेतैर्हयैर्युक्ते महति स्यन्दने स्थितौ।\nमाधवः पाण्डवश्चैव दिव्यौ शङ्खौ प्रदध्मतुः॥ १.१४॥",
      transliteration: "tataḥ śvetair hayair yukte mahati syandane sthitau |\nmādhavaḥ pāṇḍavaścaiva divyau śaṅkhau pradadhmatuḥ || 1.14 ||",
      hindi: "तदनन्तर सफेद घोड़ों से युक्त एक विशाल रथ पर बैठे हुए श्रीकृष्ण और अर्जुन ने भी अपने दिव्य शंख बजाए।",
      english: "Then, seated in a magnificent chariot yoked with white horses, Krishna and Arjuna blew their divine conchs."
    },
    {
      verseNumber: "1.15",
      sanskrit: "पाञ्चजन्यं हृषीकेशो देवदत्तं धनञ्जयः।\nपौण्ड्रं दध्मौ महाशङ्खं भीमकर्मा वृकोदरः॥ १.१५॥",
      transliteration: "pāñcajanyaṁ hṛṣīkeśo devadattaṁ dhanañjayaḥ |\npauṇḍraṁ dadhmau mahā-śaṅkhaṁ bhīma-karmā vṛkodaraḥ || 1.15 ||",
      hindi: "श्रीकृष्ण ने पाञ्चजन्य नामक शंख बजाया, अर्जुन ने देवदत्त शंख बजाया और भयंकर कर्म करने वाले भीमसेन ने पौण्ड्र नामक महाशंख बजाया।",
      english: "Lord Krishna blew His conch Panchajanya; Arjuna blew his Devadatta; and Bhima, the doer of Herculean tasks, blew his mighty conch Paundra."
    },
    {
      verseNumber: "1.16",
      sanskrit: "अनन्तविजयं राजा कुन्तीपुत्रो युधिष्ठिरः।\nनकुलः सहदेवश्च सुघोषमणिपुष्पकौ॥ १.१६॥",
      transliteration: "anantavijayaṁ rājā kuntī-putro yudhiṣṭhiraḥ |\nnakulaḥ sahadevaśca sughoṣa-maṇipuṣpakau || 1.16 ||",
      hindi: "कुन्तीपुत्र राजा युधिष्ठिर ने अनन्तविजय नामक शंख बजाया और नकुल तथा सहदेव ने सुघोष और मणिपुष्पक शंख बजाए।",
      english: "King Yudhishthira, the son of Kunti, blew his conch Anantavijaya; Nakula and Sahadeva blew Sughosha and Manipushpaka conchs."
    },
    {
      verseNumber: "1.17",
      sanskrit: "काश्यश्च परमेष्वासः शिखण्डी च महारथः।\nधृष्टद्युम्नो विराटश्च सात्यकिश्चापराजितः॥ १.१७॥",
      transliteration: "kāśyaśca parameṣvāsaḥ śikhaṇḍī ca mahārathaḥ |\ndhṛṣṭadyumno virāṭaśca sātyakiś cāparājitaḥ || 1.17 ||",
      hindi: "उत्कृष्ट धनुष वाले काशिराज, शिखण्डी महारथी, धृष्टद्युम्न, राजा विराट और अजेय सात्यकि।",
      english: "The great archer King of Kashi, the great warrior Shikhandi, Dhrishtadyumna, Virata, and the unconquered Satyaki."
    },
    {
      verseNumber: "1.18",
      sanskrit: "द्रुपदो द्रौपदेयाश्च सर्वशः पृथिवीपते।\nसौभद्रश्च महाबाहुः शङ्खान्दध्मुः पृथक् पृथक्॥ १.१८॥",
      transliteration: "drupado draupadeyāśca sarvaśaḥ pṛthivī-pate |\nsaubhadraśca mahā-bāhuḥ śaṅkhān dadhmuḥ pṛthag pṛthag || 1.18 ||",
      hindi: "राजा द्रुपद, द्रौपदी के पाँचों पुत्र और सुभद्रा के महाबाहु पुत्र अभिमन्यु ने हे राजन्! सब ओर से अपने-अपने अलग-अलग शंख बजाए।",
      english: "King Drupada, the sons of Draupadi, and the strong-armed son of Subhadra (Abhimanyu), O Lord of the Earth, blew their respective conch shells."
    },
    {
      verseNumber: "1.19",
      sanskrit: "स घोषो धार्तराष्ट्राणां हृदयानि व्यदारयत्।\nनभश्च पृथिवीं चैव तुमुलो व्यनुनादयन्॥ १.१९॥",
      transliteration: "sa ghoṣo dhārtarāṣṭrāṇāṁ hṛdayāni vyadārayat |\nnabhaśca pṛthivīṁ caiva tumulo vyanunādayan || 1.19 ||",
      hindi: "उस भयंकर कोलाहलपूर्ण शब्द ने आकाश और पृथ्वी को गुंजाते हुए धृतराष्ट्र के पुत्रों के हृदयों को विदीर्ण कर दिया।",
      english: "The tumultuous sound resounded through the earth and sky, shattering the hearts of Dhritarashtra's sons."
    },
    {
      verseNumber: "1.20",
      sanskrit: "अथ व्यवस्थितान् दृष्ट्वा धार्तराष्ट्रान् कपिध्वजः।\nप्रवृत्ते शस्त्रसम्पाते धनुरुद्यम्य पाण्डवः।\nहृषीकेशं तदा वाक्यमिदमाह महीपते॥ १.२०॥",
      transliteration: "atha vyavasthitān dṛṣṭvā dhārtarāṣṭrān kapi-dhvajaḥ |\npravṛtte śastra-sampāte dhanur udyamya pāṇḍavaḥ |\nhṛṣīkeśaṁ tadā vākyam idam āha mahī-pate || 1.20 ||",
      hindi: "हे महीपते! इसके बाद वानरध्वज पाण्डुपुत्र अर्जुन ने धृतराष्ट्र के पुत्रों को व्यवस्थित खड़े देखा और जब शस्त्र चलने ही वाले थे, तब धनुष उठाकर श्रीकृष्ण से यह वचन कहा।",
      english: "O Lord of the Earth, seeing the sons of Dhritarashtra marshalled and the discharge of weapons about to begin, Arjuna, whose flag bore the emblem of Hanuman, raised his bow and spoke these words to Krishna."
    },
    {
      verseNumber: "1.21",
      sanskrit: "अर्जुन उवाच\nसेनयोरुभयोर्मध्यै रथं स्थापय मेऽच्युत।\nयावदेतान्निरीक्षेऽहं योद्धुकामानवस्थितान्॥ १.२१॥",
      transliteration: "arjuna uvāca\nsenayor ubhayor madhye rathaṁ sthāpaya me'cyuta |\nyāvad etān nirīkṣe'haṁ yoddu-kāmān avasthitān || 1.21 ||",
      hindi: "अर्जुन बोले— हे अच्युत! दोनों सेनाओं के मध्य में मेरे रथ को खड़ा कीजिये, जब तक कि मैं इन युद्ध की इच्छा रखने वालों को भली-भांति देख न लूँ।",
      english: "Arjuna said: O Infallible One, please place my chariot between the two armies so that I may behold those who stand here wishing to fight."
    },
    {
      verseNumber: "1.22",
      sanskrit: "कैर्मया सह योद्धव्यमस्मिन रणसमुद्यमे।\nयोत्स्यमानानवेक्षेऽहं य एतेऽत्र समागताः॥ १.२२॥",
      transliteration: "kair mayā saha yoddhavyam asmin raṇa-samudyame |\nyotsyamānān avekṣe'haṁ ya ete'tra samāgatāḥ || 1.22 ||",
      hindi: "इस युद्ध रूपी उद्योग में मुझे किन-किन के साथ युद्ध करना है, युद्ध के लिए आए हुए इन लोगों को मैं देख लूँ।",
      english: "And let me see those who have gathered here to fight, desiring to please the evil-minded son of Dhritarashtra in this conflict."
    },
    {
      verseNumber: "1.23",
      sanskrit: "धार्तराष्ट्रस्य दुर्बुद्धेर्युद्धे प्रियचिकीर्षवः।\nएवमुक्तो हृषीकेशो गुडाकेशेन भारत॥ १.२३॥",
      transliteration: "dhārtarāṣṭrasya durbuddher yuddhe priya-cikīrṣavaḥ |\nevam ukto hṛṣīkeśo guḍākeśena bhārata || 1.23 ||",
      hindi: "दुर्बुद्धि दुर्योधन का युद्ध में प्रिय चाहने वाले जो-जो योद्धा यहाँ आए हैं, मैं उन्हें देखूँगा। हे भारत! अर्जुन द्वारा इस प्रकार कहने पर श्रीकृष्ण ने...",
      english: "Desiring to see those who want to fight in this war on the side of the wicked son of Dhritarashtra. O descendant of Bharata, Lord Krishna, having been addressed thus by Arjuna..."
    },
    {
      verseNumber: "1.24",
      sanskrit: "सेनयोरुभयोर्मध्यै स्थापयित्वा रथोत्तमम्।\nभीष्मद्रोणप्रमुखतः सर्वेषां च महीक्षिताम्॥ १.२४॥",
      transliteration: "senayor ubhayor madhye sthāpayitvā rathottamam |\nbhīṣma-droṇa-pramukhataḥ sarveṣāṁ ca mahī-kṣitām || 1.24 ||",
      hindi: "दोनों सेनाओं के मध्य में भीष्म और द्रोणाचार्य के सामने तथा सम्पूर्ण राजाओं के सामने उस उत्तम रथ को खड़ा करके श्रीकृष्ण ने कहा—",
      english: "Having stationed that finest of chariots between the two armies, in front of Bhishma, Drona, and all other rulers of the earth, Lord Krishna said:"
    },
    {
      verseNumber: "1.25",
      sanskrit: "उवाच पार्थ पश्यैतान् समवेतान् कुरूनिति।\nतत्रापश्यत्स्थितान् पार्थः पितॄनथ पितामहान्॥ १.२५॥",
      transliteration: "uvāca pārtha paśyaitān samavetān kurūn iti |\ntatrāpaśyat sthitān pārthaḥ pitṝn atha pitāmahān || 1.25 ||",
      hindi: "हे पार्थ! एकत्रित हुए इन कुरुवंशियों को देखो। तब अर्जुन ने वहाँ खड़े हुए पिताओं, पितामहों, आचार्यों, मामाओं, भाइयों, पुत्रों...",
      english: "O Partha, behold these Kurus assembled here! There Arjuna saw standing fathers, grandfathers, teachers, maternal uncles, brothers, sons..."
    },
    {
      verseNumber: "1.26",
      sanskrit: "आचार्यान्मातुलान्भ्रातॄन्पुत्रान्पौत्रान्सखींस्तथा।\nश्वशुरान् सुहृदश्चैव सेनयोरुभयोरपि॥ १.२६॥",
      transliteration: "ācāryān mātulān bhrātṝn putrān pautrān sakhīṁs tathā |\nśvaśurān suhṛdaścaiva senayor ubhayor api || 1.26 ||",
      hindi: "पौत्रों, मित्रों, ससुरों और सुहृदों को भी दोनों सेनाओं में खड़े हुए देखा।",
      english: "Grandsons, companions, fathers-in-law, and well-wishers in both armies."
    },
    {
      verseNumber: "1.27",
      sanskrit: "तान्समीक्ष्य स कौन्तेयः सर्वान्बन्धूनवस्थितान्।\nकृपया परयाविष्टो विषीदन्निदमब्रवीत्॥ १.२७॥",
      transliteration: "tān samīkṣya sa kaunteyaḥ sarvān bandhūn avasthitān |\nkṛpayā parayāviṣṭo viṣīdann idam abravīt || 1.27 ||",
      hindi: "उन उपस्थित सम्पूर्ण बन्धुओं को देखकर कुन्तीपुत्र अर्जुन अत्यन्त करुणा से युक्त होकर शोक करते हुए यह वचन बोले।",
      english: "On seeing all these kinsmen standing there, Arjuna was overcome with deep compassion, and spoke in sadness."
    },
    {
      verseNumber: "1.28",
      sanskrit: "अर्जुन उवाच\nदृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम्।\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति॥ १.२८॥",
      transliteration: "arjuna uvāca\ndṛṣṭvemaṁ svajanaṁ kṛṣṇa yuyutsuṁ samupasthitam |\nsīdanti mama gātrāṇi mukhaṁ ca pariśuṣyati || 1.28 ||",
      hindi: "अर्जुन बोले— हे कृष्ण! युद्ध की इच्छा से खड़े हुए इस स्वजन समुदाय को देखकर मेरे अंग शिथिल हो रहे हैं और मुख सूखा जा रहा है।",
      english: "Arjuna said: O Krishna, seeing my own kinsmen gathered here eager to fight, my limbs give way and my mouth is parched."
    },
    {
      verseNumber: "1.29",
      sanskrit: "वेपथुश्च शरीरे मे रोमहर्षश्च जायते।\nगाण्डीवं स्रंसते हस्तात्त्वक्चैव परिदह्यते॥ १.२९॥",
      transliteration: "vepathuśca śarīre me roma-harṣaśca jāyate |\ngāṇḍīvaṁ sraṁsate hastāt tvak caiva paridahyate || 1.29 ||",
      hindi: "मेरे शरीर में कम्पन हो रहा है और रोंगटे खड़े हो रहे हैं, हाथ से गाण्डीव धनुष गिर रहा है और त्वचा बहुत जल रही है।",
      english: "My body trembles and my hair stands on end; my bow Gandiva slips from my hand and my skin feels as if it is burning."
    },
    {
      verseNumber: "1.30",
      sanskrit: "न च शक्नोम्यवस्थातुं भ्रमतीव च मे मनः।\nनिमित्तानि च पश्यामि विपरीतानि केशव॥ १.३०॥",
      transliteration: "na ca śaknamy avasthātuṁ bhramatīva ca me manaḥ |\nnimittāni ca paśyāmi viparītāni keśava || 1.30 ||",
      hindi: "और मैं खड़ा रहने में भी समर्थ नहीं हूँ, मेरा मन भ्रमित हो रहा है। हे केशव! मैं लक्षणों को भी विपरीत (अमंगलकारी) ही देख रहा हूँ।",
      english: "I am unable to stand steady any longer, and my mind seems to reel. O Krishna, I see only inauspicious omens."
    },
    {
      verseNumber: "1.31",
      sanskrit: "न च श्रेयोऽनुपश्यामि हत्वा स्वजनमाहवे।\nकाङ्क्षे विजयं कृष्ण न च राज्यं सुखानि च॥ १.३१॥",
      transliteration: "na ca śreyo'nupaśyāmi hatvā svajanam āhave |\nna kāṅkṣe vijayaṁ kṛṣṇa na ca rājyaṁ sukhāni ca || 1.31 ||",
      hindi: "युद्ध में अपने स्वजनों को मारकर मैं कोई कल्याण नहीं देखता। हे कृष्ण! मैं न तो विजय चाहता हूँ, न राज्य और न ही सुखों को।",
      english: "I do not see any good in killing my own kinsmen in this battle. O Krishna, I do not covet victory, nor kingship, nor pleasures."
    },
    {
      verseNumber: "1.32",
      sanskrit: "किं नो राज्येन गोविन्द किं भोगैर्जीवितेन वा।\nयेषामर्थे काङ्क्षितं नो राज्यं भोगाः सुखानि च॥ १.३२॥",
      transliteration: "kiṁ no rājyena govinda kiṁ bhogair jīvitena vā |\nyeṣām arthe kāṅkṣitaṁ no rājyaṁ bhogāḥ sukhāni ca || 1.32 ||",
      hindi: "हे गोविन्द! हमें ऐसे राज्य से क्या लाभ, अथवा भोगों और जीवन से भी क्या प्रयोजन? जिनके लिए हम राज्य, भोग और सुख चाहते हैं...",
      english: "O Govinda, of what use is kingdom to us, or enjoyment, or even life itself? Those for whose sake we desire kingdom, enjoyments, and pleasures..."
    },
    {
      verseNumber: "1.33",
      sanskrit: "त इमेऽवस्थिता युद्धे प्राणांस्त्यक्त्वा धनानि च।\nआचार्याः पितरः पुत्रास्तथैव च पितामहाः॥ १.३३॥",
      transliteration: "ta ime'vasthitā yuddhe prāṇāṁs tyaktā dhanāni ca |\nācāryāḥ pitaraḥ putrās tathaiva ca pitāmahāḥ || 1.33 ||",
      hindi: "वे ही सब अपने प्राण और धन की आशा छोड़कर युद्ध में खड़े हैं। जिनमें आचार्य, पिता, पुत्र और वैसे ही पितामह हैं।",
      english: "Are standing here in battle, having staked their lives and wealth. They include teachers, fathers, sons, and grandfathers."
    },
    {
      verseNumber: "1.34",
      sanskrit: "मातुलाः शशुरः पौत्राः श्यालाः सम्बन्धिनस्तथा।\nएतान्न हन्तुमिच्छामि घ्नतोऽपि मधुसूदन॥ १.३४॥",
      transliteration: "mātulāḥ śvaśurāḥ pautrāḥ śyālāḥ sambandhinas tathā |\netān na hantum icchāmi ghnato'pi madhusūdana || 1.34 ||",
      hindi: "मामा, ससुर, पौत्र, साले तथा अन्य सम्बन्धी भी हैं। हे मधुसूदन! यदि ये मुझे मार भी डालें, तो भी मैं इन्हें मारना नहीं चाहता।",
      english: "Maternal uncles, fathers-in-law, grandsons, brothers-in-law, and other relatives. O Madhusudana, even if they kill me, I do not wish to kill them."
    },
    {
      verseNumber: "1.35",
      sanskrit: "अपि त्रैलोक्यराज्यस्य हेतोः किं नु महीकृते।\nनिहत्य धार्तराष्ट्रान्नः का प्रीतिः स्याज्जनार्दन॥ १.३५॥",
      transliteration: "api trailokya-rājyasya hetoḥ kiṁ nu mahī-kṛte |\nnihatya dhārtarāṣṭrān naḥ kā prītiḥ syāj janārdana || 1.35 ||",
      hindi: "तीनों लोकों के राज्य के लिए भी मैं इन्हें मारना नहीं चाहता, फिर इस तुच्छ पृथ्वी के राज्य के लिए तो कहना ही क्या? हे जनार्दन! धृतराष्ट्र के पुत्रों को मारकर हमें क्या प्रसन्नता होगी?",
      english: "Even for the sovereignty of the three worlds, let alone for this earth. O Janardana, what pleasure can we derive from killing the sons of Dhritarashtra?"
    },
    {
      verseNumber: "1.36",
      sanskrit: "पापमेवाश्रयेदस्मान् हत्वैतानाततायिनः।\nतस्मान्नार्हा वयं हन्तुं धार्तराष्ट्रान्स्वबान्धवान्।\nस्वजनं हि कथं हत्वा सुखिनः स्याम माधव॥ १.३६॥",
      transliteration: "pāpam evāśrayed asmān hatvaitān ātatāyinaḥ |\ntasmān nārhā vayaṁ hantuṁ dhārtarāṣṭrān sa-bāndhavān |\nsvajanaṁ hi kathaṁ hatvā sukhinaḥ syāma mādhava || 1.36 ||",
      hindi: "इन आततायियों को मारकर हमें पाप ही लगेगा। अतः अपने बन्धु धृतराष्ट्र के पुत्रों को मारना हमारे लिए उचित नहीं है। हे माधव! अपने ही स्वजनों को मारकर हम कैसे सुखी हो सकते हैं?",
      english: "Sin alone will accrue to us if we kill these aggressors. Therefore, we should not kill the sons of Dhritarashtra, our own kinsmen. O Madhava, how can we be happy by killing our own people?"
    },
    {
      verseNumber: "1.37",
      sanskrit: "यद्यप्येते ना पश्यन्ति लोभोपहतचेतसः।\nकुलक्षयकृतं दोषं मित्रद्रोहे च पातकम्॥ १.३७॥",
      transliteration: "yadyapy ete na paśyanti lobhopahata-cetasaḥ |\nkula-kṣaya-kṛtaṁ doṣaṁ mitra-drohe ca pātakam || 1.37 ||",
      hindi: "यद्यपि लोभ से भ्रष्टचित्त हुए ये लोग कुल के नाश से होने वाले दोष को और मित्रों से द्रोह करने के पाप को नहीं देखते...",
      english: "Even if these people, their minds blinded by greed, see no evil in destroying their own family, or sin in treason to friends..."
    },
    {
      verseNumber: "1.38",
      sanskrit: "कथं न ज्ञेयमस्माभिः पापादस्मान्निवर्तितुम्।\nकुलक्षयकृतं दोषं प्रपश्यद्भिर्जनार्दन॥ १.३८॥",
      transliteration: "kathaṁ na jñeyam asmābhiḥ pāpād asmān nivartitum |\nkula-kṣaya-kṛtaṁ doṣaṁ prapaśyadbhir janārdana || 1.38 ||",
      hindi: "तो भी हे जनार्दन! कुल के नाश से होने वाले दोष को स्पष्ट देखने वाले हम लोगों को इस पाप से हटने का विचार क्यों नहीं करना चाहिए?",
      english: "Why should we, O Janardana, who clearly see the evil of destroying a family, not turn away from this sin?"
    },
    {
      verseNumber: "1.39",
      sanskrit: "कुलक्षये प्रणश्यन्ति कुलधर्माः सनातनाः।\nधर्मे नष्टे कुलं कृत्स्नमधर्मोऽभिभवत्युत्॥ १.३९॥",
      transliteration: "kula-kṣaye praṇaśyanti kula-dharmāḥ sanātanāḥ |\ndharme naṣṭe kulaṁ kṛtsnam adharmo'bhibhavaty uta || 1.39 ||",
      hindi: "कुल के नाश होने पर सनातन कुल-धर्म नष्ट हो जाते हैं। धर्म के नष्ट हो जाने पर सम्पूर्ण कुल में अधर्म फैल जाता है।",
      english: "With the destruction of the family, the eternal family traditions (dharma) perish. When traditions are lost, the rest of the family is overcome by impiety."
    },
    {
      verseNumber: "1.40",
      sanskrit: "अधर्माभिभवात्कृष्ण प्रदुष्यन्ति कुलस्त्रियः।\nस्त्रीषु दुष्टासु वार्ष्णेय जायते वर्णसङ्करः॥ १.४०॥",
      transliteration: "adharmābhibhavāt kṛṣṇa praduṣyanti kula-striyaḥ |\nstrīṣu duṣṭāsu vārṣṇeya jāyate varṇa-saṅkaraḥ || 1.40 ||",
      hindi: "हे कृष्ण! अधर्म के बढ़ जाने से कुल की स्त्रियां दूषित हो जाती हैं। हे वार्ष्णेय! स्त्रियों के दूषित हो जाने पर वर्णसङ्कर उत्पन्न होता है।",
      english: "When impiety prevails, O Krishna, the women of the family become corrupt. O descendant of Vrishni, with the degradation of women, unwanted progeny (varnasankara) arises."
    },
    {
      verseNumber: "1.41",
      sanskrit: "सङ्करो नरकायैव कुलघ्नानां कुलस्य च।\nपतन्ति पितरो ह्येषां लुप्तपिण्डोदकक्रियाः॥ १.४१॥",
      transliteration: "saṅkaro narakāyaiva kula-ghnānāṁ kulasya ca |\npatanti pitaro hyeṣāṁ lupta-piṇḍodaka-kriyāḥ || 1.41 ||",
      hindi: "वर्णसङ्कर कुलघातियों को और कुल को नरक में ले जाने वाला ही होता है। श्राद्ध और तर्पण न मिलने से इनके पितर भी गिर जाते हैं।",
      english: "An increase in unwanted population consigns both the family and its destroyers to hell. The ancestors of such families fall, deprived of offerings of food and water."
    },
    {
      verseNumber: "1.42",
      sanskrit: "दोषैरेतैः कुलघ्नानां वर्णसङ्करकारकैः।\nउत्साद्यन्ते जातिधर्माः कुलधर्माश्च शाश्वताः॥ १.४२॥",
      transliteration: "doṣair etaiḥ kula-ghnānāṁ varṇa-saṅkara-kārakaiḥ |\nutsādyante jāti-dharmāḥ kula-dharmāś ca śāśvatāḥ || 1.42 ||",
      hindi: "कुलघातियों के इन वर्णसङ्कर उत्पन्न करने वाले दोषों से सनातन कुल-धर्म और जाति-धर्म नष्ट हो जाते हैं।",
      english: "By the evil deeds of those who destroy the family, which cause unwanted progeny, the traditional community duties and eternal family values are ruined."
    },
    {
      verseNumber: "1.43",
      sanskrit: "उत्सन्नकुलधर्माणां मनुष्याणां जनार्दन।\nनरकेऽनियतं वासो भवतीत्यनुशुश्रुम॥ १.४३॥",
      transliteration: "utsanna-kula-dharmāṇāṁ manuṣyāṇāṁ janārdana |\nnarake'niyataṁ vāso bhavatīty anuśuśruma || 1.43 ||",
      hindi: "हे जनार्दन! जिनके कुल-धर्म नष्ट हो गए हैं, उन मनुष्यों का बहुत काल तक नरक में वास होता है, ऐसा हम सुनते आए हैं।",
      english: "O Janardana, we have heard from authoritative sources that those whose family traditions are destroyed dwell always in hell."
    },
    {
      verseNumber: "1.44",
      sanskrit: "अहो बत महत्पापं कर्तुं व्यवसिता वयम्।\nयद्राज्यसुखलोभेन हन्तुं स्वजनमुद्यताः॥ १.४४॥",
      transliteration: "aho bata mahat pāpaṁ kartuṁ vyavasitā vayam |\nyad rājya-sukha-lobhena hantuṁ svajanam udyatāḥ || 1.44 ||",
      hindi: "अहो! बड़े शोक की बात है कि हम लोग बुद्धिमान होकर भी महान् पाप करने को तैयार हो गए हैं, जो राज्य और सुख के लोभ से अपने स्वजनों को मारने पर उतारू हैं।",
      english: "Alas! How strange it is that we are determined to commit a great sin, driven by the greed for royal pleasures to kill our own kinsmen."
    },
    {
      verseNumber: "1.45",
      sanskrit: "यदि मामप्रतीकारमशस्त्रं शस्त्रपाणयः।\nधार्तराष्ट्रा रणे हन्युस्तन्मे क्षेमतरं भवेत्॥ १.४५॥",
      transliteration: "yadi mām apratīkāram aśastraṁ śastra-pāṇayaḥ |\ndhārtarāṣṭrā raṇe hanyus tan me kṣemataraṁ bhavet || 1.45 ||",
      hindi: "यदि शस्त्रधारी धृतराष्ट्र के पुत्र रणभूमि में मुझे निहत्थे और सामना न करने वाले को मार भी डालें, तो वह मारना भी मेरे लिए अधिक कल्याणकारी होगा।",
      english: "If the armed sons of Dhritarashtra should kill me in battle while I am unarmed and unresisting, that would be safer and better for me."
    },
    {
      verseNumber: "1.46",
      sanskrit: "सञ्जय उवाच\nएवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत्।\nविसृज्य सशरं चापं शोकसंविग्नमानसः॥ १.४६॥",
      transliteration: "sañjaya uvāca\nevam uktvārjunaḥ saṅkhye rathopastha upāviśat |\nvisṛjya sa-śaraṁ cāpaṁ śoka-saṁvigna-mānasaḥ || 1.46 ||",
      hindi: "संजय बोले— रणभूमि में ऐसा कहकर अर्जुन शोक से उद्विग्न मन वाले होकर बाण सहित धनुष को त्यागकर रथ के मध्य भाग में बैठ गए।",
      english: "Sanjay said: Having spoken thus on the battlefield, Arjuna cast aside his bow and arrows and sank down on the seat of the chariot, his mind distressed with grief."
    },
    {
      verseNumber: "1.47",
      sanskrit: "इति श्रीमद्भगवद्गीतासूपनिषत्सु ब्रह्मविद्यायां योगशास्त्रे श्रीकृष्णार्जुनसंवादे\nअर्जुनविषादयोगो नाम प्रथमोऽध्यायः॥ १॥",
      transliteration: "iti śrīmadbhagavadgītāsūpaniṣatsu brahmavidyāyāṁ yogaśāstre śrīkṛṣṇārjunasamvāde\narjunaviṣādayogo nāma prathamo'dhyāyaḥ || 1 ||",
      hindi: "इस प्रकार उपनिषद, ब्रह्मविद्या और योगशास्त्र रूप श्रीमद्भगवद्गीता में श्रीकृष्ण और अर्जुन के संवाद में 'अर्जुनविषादयोग' नामक पहला अध्याय समाप्त हुआ।",
      english: "Thus ends the First Chapter entitled 'Arjuna's Grief' of the Upanishad, the science of Brahman, the scripture of Yoga, and the dialogue between Krishna and Arjuna."
    }
  ],
  // Gita Chapter 2: 72 verses (All real verses, exact Sanskrit/English/Hindi)
  2: [
    {
      verseNumber: "2.1",
      sanskrit: "सञ्जय उवाच\nतं तथा कृपयाविष्टमश्रुपूर्णाकुलेक्षणम्।\nविषीदन्तमिदं वाक्यमुवाच मधुसूदनः॥ २.१॥",
      transliteration: "sañjaya uvāca\ntaṁ tathā kṛpayāviṣṭam aśru-pūrṇākulekṣanam |\nviṣīdantam idaṁ vākyam uvāca madhusūdanaḥ || 2.1 ||",
      hindi: "संजय बोले— उस प्रकार करुणा से व्याप्त, आंसुओं से पूर्ण और व्याकुल नेत्रों वाले शोकयुक्त अर्जुन से मधुसूदन (श्रीकृष्ण) ने यह वचन कहा।",
      english: "Sanjay said: To him who was thus overcome with pity, whose eyes were filled with tears and distressed, Lord Krishna spoke these words."
    },
    {
      verseNumber: "2.2",
      sanskrit: "श्रीभगवानुवाच\nकुतस्त्वा कश्मलमिदं विषमे समुपस्थितम्।\nअनार्यजुष्टमस्वर्ग्यमकीर्तिकरमर्जुन॥ २.२॥",
      transliteration: "śrī-bhagavān uvāca\nkutas tvā kaśmalam idaṁ viṣame samupasthitam |\nanārya-juṣṭam asvargyam akīrti-karam arjuna || 2.2 ||",
      hindi: "श्रीभगवान बोले— हे अर्जुन! इस विषम अवसर पर तुम्हें यह कायरता कहाँ से प्राप्त हुई? यह न तो श्रेष्ठ पुरुषों के योग्य है, न स्वर्ग देने वाली है और न ही कीर्ति करने वाली है।",
      english: "The Supreme Lord said: O Arjuna, how has this delusion come upon you at this critical hour? It is not befitting a noble person, it does not lead to heaven, and it brings infamy."
    },
    {
      verseNumber: "2.3",
      sanskrit: "क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते।\nक्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परन्तप॥ २.३॥",
      transliteration: "klaibyaṁ mā sma gamaḥ pārtha naitat tvayy upapadyate |\nkṣudraṁ hṛdaya-daurbalyaṁ tyaktvottiṣṭha parantapa || 2.3 ||",
      hindi: "हे पार्थ! नपुंसकता (कायरता) को प्राप्त मत हो, तुम्हारे लिए यह उचित नहीं है। हे परंतप! हृदय की इस तुच्छ दुर्बलता को त्यागकर युद्ध के लिए खड़े हो जाओ।",
      english: "O Partha, yield not to unmanliness; it does not befit you. Cast off this petty weakness of heart and arise, O vanquisher of foes!"
    },
    {
      verseNumber: "2.4",
      sanskrit: "अर्जुन उवाच\nकथं भीष्ममहं सङ्ख्ये द्रोणं च मधुसूदन।\nइषुभिः प्रतियोत्स्यामि पूजार्हावरिसूदन॥ २.४॥",
      transliteration: "arjuna uvāca\nkathaṁ bhīṣmam ahaṁ saṅkhye droṇaṁ ca madhusūdana |\niṣubhiḥ pratiyotsyāmi pūjārhāv arisūdana || 2.4 ||",
      hindi: "अर्जुन बोले— हे मधुसूदन! मैं रणभूमि में भीष्मपितामह और द्रोणाचार्य के विरुद्ध बाणों से कैसे लड़ूँगा? हे शत्रुदमन! वे दोनों तो मेरे लिए पूजनीय हैं।",
      english: "Arjuna said: O slayer of enemies (Krishna), how can I fight with arrows in battle against men like Bhishma and Drona, who are worthy of my worship?"
    },
    {
      verseNumber: "2.5",
      sanskrit: "गुरूनहत्वा हि महानुभावान्\nश्रेयो भोक्तुं भैक्ष्यमपीह लोके।\nहत्वार्थकामांस्तु गुरूनिहैव\nभुञ्जीय भोगान् रुधिरप्रदिग्धान्॥ २.५॥",
      transliteration: "gurūn ahatvā hi mahānubhāvān\nśreyo bhoktuṁ bhaikṣyam apīha loke |\nhatvārtha-kāmāṁs tu gurūn ihaiva\nbhuñjīya bhogān rudhira-pradigdhān || 2.5 ||",
      hindi: "महानुभाव गुरुजनों को न मारकर इस संसार में भिक्षा का अन्न खाना भी कल्याणकारी है, क्योंकि गुरुजनों को मारकर भी मैं इस लोक में खून से सने हुए अर्थ और काम रूप भोगों को ही तो भोगूँगा।",
      english: "It is better to live in this world by begging than to kill these noble teachers. Even if we kill them, our enjoyments of wealth and desire will be stained with their blood."
    },
    {
      verseNumber: "2.6",
      sanskrit: "न चैतद्विद्मः कतरन्नो गरीयो\nयद्वा जयेम यदि वा नो जयेयुः।\nयानेव हत्वा न जिजीविषामस्\nतेऽवस्थिताः प्रमुखे धार्तराष्ट्राः॥ २.६॥",
      transliteration: "na caitad vidmaḥ kataran no garīyo\nyad vā jayema yadi vā no jayeyuḥ |\nyān eva hatvā na jijīviṣāmas\nte'vasthitāḥ pramukhe dhārtarāṣṭraḥ || 2.6 ||",
      hindi: "और हम यह भी नहीं जानते कि हमारे लिए क्या श्रेष्ठ है— हम जीतें या वे हमें जीतें। जिन्हें मारकर हम जीना भी नहीं चाहते, वे ही धृतराष्ट्र के पुत्र हमारे सामने खड़े हैं।",
      english: "We do not even know which is better for us—conquering them or being conquered by them. The very sons of Dhritarashtra, whom if we kill we would not wish to live, are standing before us."
    },
    {
      verseNumber: "2.7",
      sanskrit: "कार्पण्यदोषोपहतस्वभावः\nपृच्छामि त्वां धर्मसम्मूढचेताः।\nयच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे\nशिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम्॥ २.७॥",
      transliteration: "kārpaṇya-doṣopahata-svabhāvaḥ\npṛcchāmi tvāṁ dharma-sammūḍha-cetāḥ |\nyac chreyaḥ syān niścitaṁ brūhi tan me\nśiṣyas te'haṁ śādhi māṁ tvāṁ prapannam || 2.7 ||",
      hindi: "कायरता रूपी दोष से दबे हुए स्वभाव वाला और कर्तव्य के विषय में मोहित चित्त हुआ मैं आपसे पूछता हूँ कि जो निश्चित कल्याणकारी हो, वह मुझे बताइये। मैं आपका शिष्य हूँ, आपकी शरण में आए हुए मुझे शिक्षा दीजिये।",
      english: "My natural compassion is afflicted by the defect of helplessness, and my mind is confused about my duty. I ask You: tell me decisively what is best for me. I am Your disciple; teach me, who has surrendered to You."
    },
    {
      verseNumber: "2.8",
      sanskrit: "na hi prapaśyāmi mamāpanudyād\nyacchokamucchoṣaṇamindriyāṇām।\navāpya bhūmāvasapatnamṛddhaṁ\nrājyaṁ surāṇāmapi cādhipatyam॥ २.८॥",
      transliteration: "na hi prapaśyāmi mamāpanudyād\nyac chokam ucchoṣaṇam indriyāṇām |\navāpya bhūmāv asapatnam ṛddhaṁ\nrājyaṁ surāṇām api cādhipatyam || 2.8 ||",
      hindi: "भूमि पर निष्कण्टक, समृद्ध राज्य और देवताओं का स्वामित्व प्राप्त करके भी मैं ऐसा कोई उपाय नहीं देखता जो मेरी इन्द्रियों को सुखाने वाले इस शोक को दूर कर सके।",
      english: "I do not see how any remedy can dispel this grief which parches my senses, even if I should win unrivaled, prosperous kingdom on earth and sovereignty over the gods."
    },
    {
      verseNumber: "2.9",
      sanskrit: "सञ्जय उवाच\nएवमुक्त्वा हृषीकेशं गुडाकेशः परन्तप।\nन योत्स्य इति गोविन्दमुक्त्वा तूष्णीं बभूव ह॥ २.९॥",
      transliteration: "sañjaya uvāca\nevam uktvā hṛṣīkeśaṁ guḍākeśaḥ parantapa |\nna yotsya iti govindam uktvā tūṣṇīṁ babhūva ha || 2.9 ||",
      hindi: "संजय बोले— हे परंतप! गुडाकेश (अर्जुन) ने हृषीकेश (श्रीकृष्ण) से इस प्रकार कहकर, 'मैं युद्ध नहीं करूँगा' गोविंद से स्पष्ट कह दिया और मौन हो गए।",
      english: "Sanjay said: Having spoken thus to Lord Krishna, Arjuna, the conqueror of sleep, said to Govinda, 'I will not fight,' and became silent."
    },
    {
      verseNumber: "2.10",
      sanskrit: "तमुवाच हृषीकेशः प्रहसन्निव भारत।\nसेनयोरुभयोर्मध्ये विषीदन्तमिदं वचः॥ २.१०॥",
      transliteration: "tam uvāca hṛṣīkeśaḥ prahasann iva bhārata |\nsenayor ubhayor madhye viṣīdantam idaṁ vacaḥ || 2.10 ||",
      hindi: "हे भरतवंशी धृतराष्ट्र! दोनों सेनाओं के मध्य शोक करते हुए उस अर्जुन से श्रीकृष्ण ने मानो मुस्कुराते हुए यह वचन कहा।",
      english: "O descendant of Bharata, between the two armies, Lord Krishna, smiling as it were, spoke these words to the grieving Arjuna."
    },
    {
      verseNumber: "2.11",
      sanskrit: "श्रीभगवानुवाच\nअशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे।\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः॥ २.११॥",
      transliteration: "śrī-bhagavān uvāca\naśocyān anvaśocas tvaṁ prajñā-vādāṁś ca bhāṣase |\ngatāsūn agatāsūṁś ca nānuśocanti paṇḍitāḥ || 2.11 ||",
      hindi: "श्रीभगवान बोले— तुम उनके लिए शोक करते हो जो शोक करने योग्य नहीं हैं, और ज्ञानियों जैसी बातें करते हो। बुद्धिमान लोग न तो जीवितों के लिए और न ही मृतकों के लिए शोक करते हैं।",
      english: "The Blessed Lord said: While speaking learned words, you are mourning for what is not worthy of grief. Sages lament neither for the living nor for the dead."
    },
    {
      verseNumber: "2.12",
      sanskrit: "न त्वेवाहं जातु नासं न त्वं नेमे जनाधिपाः।\nन चैव न भविष्यामः सर्वे वयमतः परम्॥ २.१२॥",
      transliteration: "na tvevāhaṁ jātu nāsaṁ na tvaṁ neme janādhipāḥ |\nna caiva na bhaviṣyāmaḥ sarve vayam ataḥ param || 2.12 ||",
      hindi: "ऐसा कभी नहीं था कि मैं न रहा हूँ, या तुम न रहे हो, या ये राजा न रहे हों; और न ही ऐसा होगा कि इसके बाद हम सब नहीं रहेंगे।",
      english: "Never was there a time when I did not exist, nor you, nor all these kings; nor in the future shall any of us cease to be."
    },
    {
      verseNumber: "2.13",
      sanskrit: "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा।\nतथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति॥ २.१३॥",
      transliteration: "dehino'smin yathā dehe kaumāraṁ yauvanaṁ jarā |\ntathā dehantara-prāptir dhīras tatra na muhyati || 2.13 ||",
      hindi: "जैसे शरीरधारी के इस शरीर में बाल्यावस्था, युवावस्था और वृद्धावस्था आती है, वैसे ही मृत्यु के बाद दूसरा शरीर प्राप्त होता है। धीर पुरुष इससे मोहित नहीं होते।",
      english: "Just as the embodied soul passes through childhood, youth, and old age in this body, so at death it passes into another body. The wise are not deluded by this."
    },
    {
      verseNumber: "2.14",
      sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥ २.१४॥",
      transliteration: "mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ |\nāgamāpāyino'nityās tāṁs titikṣasva bhārata || 2.14 ||",
      hindi: "हे कुन्तीपुत्र! इन्द्रियों और विषयों का संयोग तो शीत-उष्ण, सुख-दुःख देने वाला और आने-जाने वाला अनित्य है। हे भारत! तुम उन्हें सहन करना सीखो।",
      english: "O son of Kunti, the contact of the senses with their objects, which give rise to heat and cold, pleasure and pain, are transient and fleeting. Learn to tolerate them, O descendant of Bharata."
    },
    {
      verseNumber: "2.15",
      sanskrit: "यं हि न व्यथयन्त्येते पुरुषं पुरुषर्षभ।\nसमदुःखसुखं धीरं सोऽमृतत्वाय कल्पते॥ २.१५॥",
      transliteration: "yaṁ hi na vyathayanty ete puruṣaṁ puruṣarṣabha |\nsama-duḥkha-sukhaṁ dhīraṁ so'mṛtatvāya kalpate || 2.15 ||",
      hindi: "हे पुरुषों में श्रेष्ठ! जो सुख और दुःख को समान समझने वाले धीर पुरुष को ये इन्द्रियों के विषय व्याकुल नहीं करते, वह मोक्ष का पात्र होता है।",
      english: "O noblest of men, the wise person who is unaffected by these, and remains steady in pain and pleasure, is fit for immortality."
    },
    {
      verseNumber: "2.16",
      sanskrit: "नासतो विद्यते भावो नाभावो विद्यते सतः।\nउभयोरपि दृष्टोऽन्तस्त्वनयोस्तत्त्वदर्शिभिः॥ २.१६॥",
      transliteration: "nāsato vidyate bhāvo nābhāvo vidyate sataḥ |\nubhayor api dṛṣṭo'ntas tv anayos tattva-darśibhiḥ || 2.16 ||",
      hindi: "असत् वस्तु का तो कोई अस्तित्व नहीं है, और सत् वस्तु का कभी अभाव नहीं होता। तत्त्वदर्शियों द्वारा इन दोनों का निष्कर्ष देखा गया है।",
      english: "The unreal has no existence, and the real never ceases to be. The ultimate truth of both has been perceived by the seers of essence."
    },
    {
      verseNumber: "2.17",
      sanskrit: "अविनाशि तु तद्विद्धि येन सर्वमिदं ततम्।\nविनाशमव्ययस्यास्य न कश्चित्कर्तुमर्हति॥ २.१७॥",
      transliteration: "avināśi tu tad viddhi yena sarvam idaṁ tatam |\nvināśam avyayasyāsya na kaścit kartum arhati || 2.17 ||",
      hindi: "उसे तुम अविनाशी समझो जिससे यह सम्पूर्ण जगत व्याप्त है। इस अविनाशी आत्मा का विनाश करने में कोई भी समर्थ नहीं है।",
      english: "Know that to be imperishable by which all this universe is pervaded. No one can destroy this immutable soul."
    },
    {
      verseNumber: "2.18",
      sanskrit: "अन्तवन्त इमे देहा नित्यस्योक्ताः शरीरिणः।\nअनाशिनोऽप्रमेयस्य तस्माद्युध्यस्व भारत॥ २.१८॥",
      transliteration: "antavanta ime dehā nityasyoktāḥ śarīriṇaḥ |\nanāśino'prameyasya tasmād yudhyasva bhārata || 2.18 ||",
      hindi: "इस अविनाशी, अप्रमेय और नित्य आत्मा के ये शरीर नाशवान कहे गए हैं। इसलिए हे भारत! तुम युद्ध करो।",
      english: "These bodies of the eternal, indestructible, and immeasurable embodied soul are said to have an end. Therefore, fight, O descendant of Bharata!"
    },
    {
      verseNumber: "2.19",
      sanskrit: "य एनं वेत्ति हन्तारं यश्चैनं मन्यते हतम्।\nउभौ तौ न विजानीतो नायं हन्ति न हन्यते॥ २.१९॥",
      transliteration: "ya enaṁ vetti hantāraṁ yaś cainaṁ manyate hatam |\nubhau tau na vijānīto nāyaṁ hanti na hanyate || 2.19 ||",
      hindi: "जो इस आत्मा को मारने वाला समझता है और जो इसे मरा हुआ मानता है, वे दोनों ही सत्य को नहीं जानते; क्योंकि यह आत्मा न तो किसी को मारता है और न ही मारा जाता है।",
      english: "He who thinks the soul is the slayer, and he who thinks the soul is slain, both of them are in ignorance. The soul slays not, nor is it slain."
    },
    {
      verseNumber: "2.20",
      sanskrit: "न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥ २.२०॥",
      transliteration: "na jāyate mriyate vā kadācin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato'yaṁ purāṇo\nna hanyate hanyamāne śarīre || 2.20 ||",
      hindi: "यह आत्मा न कभी जन्म लेता है और न मरता है; न यह उत्पन्न होकर फिर होने वाला ही है। यह अजन्मा, नित्य, सनातन और पुरातन है; शरीर के मारे जाने पर भी यह नहीं मारा जाता।",
      english: "The soul is never born, nor does it ever die; nor having once been, does it cease to be. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain."
    },
    {
      verseNumber: "2.21",
      sanskrit: "वेदाविनाशिनं नित्यं य एनमजमव्ययम्।\nकथं स पुरुषः पार्थ कं घातयति हन्ति कम्॥ २.२१॥",
      transliteration: "vedāvināśinaṁ nityaṁ ya enam ajam avyayam |\nkathaṁ sa puruṣaḥ pārtha kaṁ ghātayati hanti kam || 2.21 ||",
      hindi: "हे पार्थ! जो पुरुष इस आत्मा को अविनाशी, नित्य, अजन्मा और अव्यय जानता है, वह पुरुष कैसे किसी को मरवाता है या कैसे किसी को मारता है?",
      english: "O Partha, how can a person who knows the soul to be indestructible, eternal, unborn, and imperishable, cause anyone to kill or kill anyone?"
    },
    {
      verseNumber: "2.22",
      sanskrit: "वासांसि जीर्णानि यथा विहाय\nनवानि गृह्णाति नरोऽपराणि।\nतथा शरीराणि विहाय जीर्णान्य्\nअन्यानि संयाति नवानि देही॥ २.२२॥",
      transliteration: "vāsāṁsi jīrṇāni yathā vihāya\nnavāni gṛhṇāti naro'parāṇi |\ntathā शरीराणि vihāya जीर्णान्य्\nanyāni saṁyāti navāni dehī || 2.22 ||",
      hindi: "जैसे मनुष्य पुराने वस्त्रों को त्यागकर दूसरे नए वस्त्र धारण करता है, वैसे ही जीवात्मा पुराने शरीरों को छोड़कर दूसरे नए शरीरों में प्रवेश करता है।",
      english: "Just as a person casts off worn-out garments and puts on new ones, so the embodied soul casts off worn-out bodies and enters into new ones."
    },
    {
      verseNumber: "2.23",
      sanskrit: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।\nन चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥ २.२३॥",
      transliteration: "nainaṁ chindanti śastrāṇi nainaṁ dahati pāvakaḥ |\nna cainaṁ kledayantyāpo na śoṣayati mārutaḥ || 2.23 ||",
      hindi: "इस आत्मा को न शस्त्र काट सकते हैं, न आग इसे जला सकती है, न जल इसे गीला कर सकता है और न ही वायु इसे सुखा सकती है।",
      english: "Weapons cannot cut the soul, fire cannot burn it, water cannot wet it, and the wind cannot dry it."
    },
    {
      verseNumber: "2.24",
      sanskrit: "अच्छेद्योऽयमदाह्योऽयमक्लेद्योऽशोष्य एव च।\nनित्यः सर्वगतः स्थाणुरचलोऽयं सनातनः॥ २.२४॥",
      transliteration: "acchedyo'yam adāhyo'yam akledyo'śoṣya eva ca |\nnityaḥ sarva-gataḥ sthāṇur acalo'yaṁ sanātanaḥ || 2.24 ||",
      hindi: "यह आत्मा अकाट्य, अदाह्य, अक्लेद्य और अशोषणीय है। यह नित्य, सर्वव्यापी, स्थिर, अचल और सनातन है।",
      english: "This soul is unbreakable and insoluble, and can be neither burned nor dried. It is everlasting, present everywhere, unalterable, immovable, and eternally the same."
    },
    {
      verseNumber: "2.25",
      sanskrit: "अव्यक्तोऽयमचिन्त्योऽयमविकार्योऽयमुच्यते।\nतस्मादेवं विदित्वैनं नानुशोचितुमर्हति॥ २.२५॥",
      transliteration: "avyakto'yam acintyo'yam avikāryo'yam ucyate |\ntasmād evaṁ viditvainaṁ nānuśocitum arhati || 2.25 ||",
      hindi: "यह आत्मा अव्यक्त, अचिन्त्य और अविकारी कहा जाता है। अतः इसे इस प्रकार जानकर तुम्हें शोक नहीं करना चाहिए।",
      english: "The soul is said to be unmanifest, inconceivable, and unchangeable. Therefore, knowing it as such, you should not grieve."
    },
    {
      verseNumber: "2.26",
      sanskrit: "अथ चैनं नित्यजातं नित्यं वा मन्यसे मृतम्।\nतथापि त्वं महाबाहो नैवं शोचितुमर्हति॥ २.२६॥",
      transliteration: "atha cainaṁ nitya-jātaṁ nityaṁ vā manyase mṛtam |\ntathāpi tvaṁ mahā-bāho naivaṁ śocitum arhati || 2.26 ||",
      hindi: "और यदि तुम इसे सदा जन्म लेने वाला तथा सदा मरने वाला भी मानते हो, तो भी हे महाबाहु! तुम्हें इस प्रकार शोक करना उचित नहीं है।",
      english: "And even if you think the soul is constantly born and constantly dies, still, O mighty-armed one, you have no reason to grieve."
    },
    {
      verseNumber: "2.27",
      sanskrit: "जातस्य हि ध्रुवो मृत्युर्ध्रुवं जन्म मृतस्य च।\nतस्मादपरिहार्येऽर्थे न त्वं शोचितुमर्हति॥ २.२७॥",
      transliteration: "jātasya hi dhruvo mṛtyur dhruvaṁ janma mṛtasya ca |\ntasmād aparihārye'rthe na tvaṁ śocitum arhati || 2.27 ||",
      hindi: "क्योंकि जन्मे हुए की मृत्यु निश्चित है और मरे हुए का जन्म निश्चित है। इसलिए इस बिना उपाय वाले विषय में तुम्हें शोक नहीं करना चाहिए।",
      english: "For death is certain for one who is born, and birth is certain for one who dies. Therefore, you should not grieve over the unavoidable."
    },
    {
      verseNumber: "2.28",
      sanskrit: "अव्यक्तादीनि भूतानि व्यक्तमध्यानि भारत।\nअव्यक्तनिधनान्येव तत्र का परिदेवना॥ २.२८॥",
      transliteration: "avyaktādīni bhūtāni vyakta-madhyāni bhārata |\navyakta-nidhanāny eva tatra kā paridevanā || 2.28 ||",
      hindi: "हे भारत! समस्त प्राणी जन्म से पहले अप्रकट थे, मध्यकाल में प्रकट होते हैं और मृत्यु के बाद फिर अप्रकट हो जाने वाले हैं। फिर ऐसी स्थिति में शोक क्या करना?",
      english: "All created beings are unmanifest in their beginning, manifest in their interim state, O Bharata, and unmanifest again in their end. So what is there to grieve about?"
    },
    {
      verseNumber: "2.29",
      sanskrit: "आश्चर्यवत्पश्यति कश्चिदेनम्\nआश्चर्यवद्वदति तथैव चान्यः।\nआश्चर्यवच्चैनमन्यः शृणोति\nश्रुत्वाप्येनं वेद न चैव कश्चित्॥ २.२९॥",
      transliteration: "āścaryavat paśyati kaścidenam\nāścaryavat vadati tathaiva cānyaḥ |\nāścaryavac cainam anyaḥ śṛṇoti\nśrutvāpy enaṁ veda na caiva kaścith || 2.29 ||",
      hindi: "कोई इस आत्मा को आश्चर्य की भाँति देखता है, कोई दूसरा इसे आश्चर्य की भाँति बोलता है, और कोई अन्य इसे आश्चर्य की भाँति सुनता है; तथा सुनकर भी इसे कोई नहीं जान पाता।",
      english: "Someone looks upon the soul as amazing, another speaks of it as amazing, and another hears of it as amazing, while even after hearing about it, no one knows it at all."
    },
    {
      verseNumber: "2.30",
      sanskrit: "देही नित्यमवध्योऽयं देहे सर्वस्य भारत।\nतस्मात्सर्वाणि भूतानि न त्वं शोचितुमर्हति॥ २.३०॥",
      transliteration: "dehī nityam avadhyo'yaṁ dehe sarvasya bhārata |\ntasmāt sarvāṇi bhūtāni na tvaṁ śocitum arhati || 2.30 ||",
      hindi: "हे भारत! सब प्राणियों के शरीरों में यह आत्मा सदा ही अवध्य (जिसका वध न किया जा सके) है। इसलिए तुम्हें किसी भी प्राणी के लिए शोक नहीं करना चाहिए।",
      english: "The soul that dwells within the body of all living beings is eternal and can never be slain, O Bharata. Therefore, you should not grieve for any creature."
    },
    {
      verseNumber: "2.31",
      sanskrit: "स्वधर्ममपि चावेक्ष्य न विकम्पितुमर्हसि।\nधर्म्याद्धि युद्धाच्छ्रेयोऽन्यत्क्षत्रियस्य न विद्यते॥ २.३१॥",
      transliteration: "svadharmam api cāvekṣya na vikampitum arhasi |\ndharmyād dhi yuddhāc chreyo'nyat kṣatriyasya na vidyate || 2.31 ||",
      hindi: "अपने धर्म को देखकर भी तुम्हें भयभीत नहीं होना चाहिए, क्योंकि क्षत्रिय के लिए धर्मयुद्ध से बढ़कर दूसरा कोई कल्याणकारी मार्ग नहीं है।",
      english: "Considering your own duty (dharma) as a warrior, you should not waver. For a warrior, there is no higher path than a righteous war."
    },
    {
      verseNumber: "2.32",
      sanskrit: "यदृच्छया चोपपन्नं स्वर्गद्वारमपावृतम्।\nसुखिनः क्षत्रियाः पार्थ लभन्ते युद्धमीदृशम्॥ २.३२॥",
      transliteration: "yadṛcchayā copapannaṁ svarga-dvāram apāvṛtam |\nsukhinaḥ kṣatriyāḥ pārtha labhante yuddham īdṛśam || 2.32 ||",
      hindi: "हे पार्थ! अपने-आप प्राप्त हुआ और स्वर्ग के खुले द्वार रूप इस प्रकार के युद्ध को भाग्यशाली क्षत्रिय ही पाते हैं।",
      english: "O Partha, happy are the warriors who obtain such an opportunity for battle, which comes unsought, opening the doors of heaven."
    },
    {
      verseNumber: "2.33",
      sanskrit: "अथ चेत्त्वमिमं धर्म्यं सङ्ग्रामं न करिष्यसि।\nततः स्वधर्मं कीर्तिं च हित्वा पापमवाप्स्यसि॥ २.३३॥",
      transliteration: "atha cet tvam imaṁ dharmyaṁ saṅgrāmaṁ na kariṣyasi |\ntataḥ svadharmaṁ kīrtiṁ ca hitvā pāpam avāpsyasi || 2.33 ||",
      hindi: "किन्तु यदि तुम इस धर्मयुक्त युद्ध को नहीं करोगे, तो अपने कर्तव्य और कीर्ति को खोकर पाप के भागी बनोगे।",
      english: "If, however, you refuse to fight this righteous war, you will abandon your duty and your reputation, and incur sin."
    },
    {
      verseNumber: "2.34",
      sanskrit: "अकीर्तिं चापि भूतानि कथयिष्यन्ति तेऽव्ययाम्।\nसम्भावितस्य चाकीर्तिर्मरणादतिरिच्यते॥ २.३४॥",
      transliteration: "akīrtiṁ cāpi bhūtāni kathayiṣyanti te'vyayām |\nsambhāvitasya cākīrtir maraṇād atiricyate || 2.34 ||",
      hindi: "और लोग तुम्हारी बहुत काल तक रहने वाली अपकीर्ति का वर्णन करेंगे। सम्मानित पुरुष के लिए अपकीर्ति मृत्यु से भी बढ़कर होती है।",
      english: "People will speak of your perpetual infamy. For a respected person, dishonor is worse than death."
    },
    {
      verseNumber: "2.35",
      sanskrit: "भयाद्रणादुपरतं मंस्यन्ते त्वां महारथाः।\nयेषां च त्वं बहुमतो भूत्वा यास्यसि लाघवम्॥ २.३५॥",
      transliteration: "bhayād raṇād uparataṁ maṁsyante tvāṁ mahā-rathāḥ |\nyeṣāṁ ca tvaṁ bahu-mato bhūtvā yāsyasi lāghavam || 2.35 ||",
      hindi: "महारथी लोग तुम्हें भय के कारण युद्ध से हटा हुआ मानेंगे, और जिनकी दृष्टि में तुम पहले बहुत सम्मानित थे, उनके सामने तुम लघुता को प्राप्त हो जाओगे।",
      english: "The great chariot-warriors will think you fled from battle out of fear, and you will lose the high esteem of those who held you in great honor."
    },
    {
      verseNumber: "2.36",
      sanskrit: "अवाच्यवादांश्च बहुन् वदिष्यन्ति तवाहिताः।\nनिन्दन्तस्तव सामर्थ्यं ततो दुःखतरं नु किम्॥ २.३६॥",
      transliteration: "avācya-vādāṁś ca bahūn vadiṣyanti tavāhitāḥ |\nnindantas tava sāmarthyaṁ tato duḥkhataraṁ nu kim || 2.36 ||",
      hindi: "तुम्हारे शत्रु तुम्हारे सामर्थ्य की निन्दा करते हुए बहुत से न कहने योग्य वचन कहेंगे। उससे अधिक दुःखदायी और क्या हो सकता है?",
      english: "Your enemies will speak many unbecoming words, criticising your strength. What could be more painful than that?"
    },
    {
      verseNumber: "2.37",
      sanskrit: "हतो वा प्राप्स्यसि स्वर्गं जित्वा वा भोक्ष्यसे महीम्।\nतस्मादुत्तिष्ठ कौन्तेय युद्धाय कृतनिश्चयः॥ २.३७॥",
      transliteration: "hato vā prāpsyasi svargaṁ jitvā vā bhokṣyase mahīm |\ntasmād uttiṣṭha kaunteya yuddhayā kṛta-niścayaḥ || 2.37 ||",
      hindi: "यदि तुम युद्ध में मारे गए तो स्वर्ग प्राप्त करोगे, और यदि जीत गए तो पृथ्वी का राज्य भोगोगे। इसलिए हे कुन्तीपुत्र! युद्ध का निश्चय करके खड़े हो जाओ।",
      english: "Either you will be slain in battle and reach heaven, or you will conquer and enjoy the earth. Therefore, arise, O son of Kunti, determined to fight!"
    },
    {
      verseNumber: "2.38",
      sanskrit: "सुखदुःखे समे कृत्वा लाभालाभौ जयाज यौ।\nततो युद्धाय युज्यस्व नैवं पापमवाप्स्यसि॥ २.३८॥",
      transliteration: "sukha-duḥkhe same kṛtvā lābhālābhau jayājayau |\ntato yuddhāya yujyasva naivaṁ pāpam avāpsyasi || 2.38 ||",
      hindi: "सुख और दुःख को, लाभ और हानि को, जय और पराजय को समान समझकर युद्ध के लिए तैयार हो जाओ। इस प्रकार तुम्हें पाप नहीं लगेगा।",
      english: "Treating pleasure and pain, gain and loss, victory and defeat alike, engage in battle. Thus you shall not incur sin."
    },
    {
      verseNumber: "2.39",
      sanskrit: "एषा तेऽभिहिता साङ्ख्ये बुद्धिर्योगे त्विमां शृणु।\nबुद्ध्या युक्तो यया पार्थ कर्मबन्धं प्रहास्यसि॥ २.३९॥",
      transliteration: "eṣā te'bhihitā sāṅkhye buddhir yoge tv imāṁ śṛṇu |\nbuddhyā yukto yayā pārtha karma-bandhaṁ prahāsyasi || 2.39 ||",
      hindi: "यह बुद्धि तुम्हारे लिए सांख्ययोग में कही गई है। अब तुम इसे कर्मयोग के विषय में सुनो, जिससे युक्त होकर तुम कर्मों के बंधन को काट डालोगे।",
      english: "Thus far I have declared to you the path of analytical knowledge (Sankhya). Now hear of Yoga (the path of selfless action), by which, O Partha, you can free yourself from the bondage of karma."
    },
    {
      verseNumber: "2.40",
      sanskrit: "नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते।\nस्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात्॥ २.४०॥",
      transliteration: "nehābhikrama-nāśo'sti pratyavāyo na vidyate |\nsvalpam apy asya dharmasya trāyate mahato bhayāt || 2.40 ||",
      hindi: "इस निष्काम कर्मयोग के मार्ग में आरम्भ का नाश नहीं होता और न ही कोई विपरीत फल होता है। इस धर्म का थोड़ा सा भी आचरण महान् भय से रक्षा करता है।",
      english: "In this path of selfless action, there is no loss of effort, nor is there any adverse result. Even a little practice of this dharma protects one from great fear."
    },
    {
      verseNumber: "2.41",
      sanskrit: "व्यवसायात्मिका बुद्धिरेकेह कुरुनन्दन।\nबहुशाखा ह्यनन्ताश्च बुद्धयोऽव्यवसायिनाम्॥ २.४१॥",
      transliteration: "vyavasāyātmikā buddhir ekeha kuru-nandana |\nbahu-śākhā hy anantāś ca buddhayo'vyavasāyinām || 2.41 ||",
      hindi: "हे कुरुनन्दन! इस मार्ग में निश्चयात्मक बुद्धि एक ही होती है; किन्तु अस्थिर बुद्धि वाले लोगों की विचार-धाराएं बहुत सी शाखाओं वाली और अनन्त होती हैं।",
      english: "Those who are on this path are resolute in purpose, and their goal is one, O descendant of Kuru. The intelligence of the irresolute is many-branched and endless."
    },
    {
      verseNumber: "2.42",
      sanskrit: "यामिमां पुष्पितां वाचं प्रवदन्त्यविपश्चितः।\nवेदवादरताः पार्थ नान्यदस्तीति वादिनः॥ २.४२॥",
      transliteration: "yām imāṁ puṣpitāṁ vācaṁ pravadanty avipaścitaḥ |\nveda-vāda-ratāḥ pārtha nānyad astīti vādinaḥ || 2.42 ||",
      hindi: "हे पार्थ! अल्पज्ञानी लोग वेदों के केवल कर्मकाण्ड वाले वचनों में मग्न रहते हैं और वेदों की पुष्पों जैसी दिखावटी वाणी कहते हैं कि 'इसके सिवाय और कुछ नहीं है'...",
      english: "Men of small knowledge are very much attached to the flowery words of the Vedas, which recommend various ritualistic activities. O Partha, they say there is nothing beyond this."
    },
    {
      verseNumber: "2.43",
      sanskrit: "कामात्मानः स्वर्गपरा जन्मकर्मफलप्रदाम्।\nक्रियाविशेषबहुलां भोगैश्वर्यगतिं प्रति॥ २.४३॥",
      transliteration: "kāmātmānaḥ svarga-parā janma-karma-phala-pradām |\nkriyā-viśeṣa-bahulāṁ bhogaiśvarya-gatiṁ prati || 2.43 ||",
      hindi: "वे कामनाओं से भरे हुए हैं, स्वर्ग को ही परम लक्ष्य मानते हैं, और ऐसे कर्मों की बातें करते हैं जो जन्म और कर्मफल देने वाले तथा भोग और ऐश्वर्य की प्राप्ति कराने वाले होते हैं।",
      english: "Their minds are filled with desire, and their goal is heaven. They recommend elaborate rituals for obtaining birth, good karma, and powers of enjoyment."
    },
    {
      verseNumber: "2.44",
      sanskrit: "भोगैश्वर्यप्रसक्तानां तयापहृतचेतसाम्।\nव्यवसायात्मिका बुद्धिः समाधौ न विधीयते॥ २.४४॥",
      transliteration: "bhogaiśvarya-prasaktānāṁ tayāpahṛta-cetasām |\nvyavasāyātmikā buddhiḥ samādhau na vidhīyate || 2.44 ||",
      hindi: "भोग और ऐश्वर्य में आसक्त, उन वचनों द्वारा हरे गए चित्त वाले लोगों की समाधि में निश्चयात्मक बुद्धि स्थिर नहीं हो पाती।",
      english: "In the minds of those who are too attached to material enjoyment and wealth, and who are bewildered by these flowery words, the resolute determination for samadhi does not arise."
    },
    {
      verseNumber: "2.45",
      sanskrit: "त्रैगुण्यविषया वेदा निस्त्रैगुण्यो भवार्जुन।\nनिर्द्वन्द्वो नित्यसत्त्वस्थो निर्योगक्षेम आत्मवान्॥ २.४५॥",
      transliteration: "traiguṇya-viṣayā vedā nistraiguṇyo bhavārjuna |\nnirdvandvo nitya-sattvastho niryoga-kṣema ātmavān || 2.45 ||",
      hindi: "वेद प्रकृति के तीनों गुणों के विषयों का वर्णन करते हैं। हे अर्जुन! तुम तीनों गुणों से रहित, सुख-दुःखादि द्वन्द्वों से रहित, नित्य सत्य गुण में स्थित, योग-क्षेम की चिन्ता न करने वाले और आत्मपरायण बनो।",
      english: "The Vedas deal with the three modes of material nature. Rise above these modes, O Arjuna. Be free from dualities, remain established in pure goodness, independent of acquisition and preservation, and self-possessed."
    },
    {
      verseNumber: "2.46",
      sanskrit: "यावानर्थ उदपाने सर्वतः सम्प्लुतोदके।\nतावान्सर्वेषु वेदेषु ब्राह्मणस्य विजानतः॥ २.४६॥",
      transliteration: "yāvān artha udapāne sarvataḥ samplutodake |\ntāvān sarveṣu vedeṣu brāhmaṇasya vijānataḥ || 2.46 ||",
      hindi: "सब ओर से जल से परिपूर्ण महाजलाशय प्राप्त हो जाने पर छोटे कुएं से जितना प्रयोजन रह जाता है, ब्रह्म को जानने वाले ज्ञानी पुरुष का सम्पूर्ण वेदों से उतना ही प्रयोजन रह जाता है।",
      english: "Whatever purpose is served by a small well is instantly served by a vast sheet of water. Similarly, all the purposes of the Vedas are fulfilled for a person who knows the Supreme Truth."
    },
    {
      verseNumber: "2.47",
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥ २.४७॥",
      transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karmaphalaheturbhūr mā te saṅgo'stvakarmaṇi || 2.47 ||",
      hindi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। तुम कर्मों के फल का हेतु मत बनो और तुम्हारी कर्म न करने में भी आसक्ति न हो।",
      english: "You have the right to perform your prescribed duty, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.",
      wordMeanings: JSON.stringify([
        { word: "कर्मणि", iast: "karmaṇi", meaning_en: "in action / duty", meaning_hi: "कर्म में" },
        { word: "एव", iast: "eva", meaning_en: "only", meaning_hi: "ही" },
        { word: "अधिकारः", iast: "adhikāraḥ", meaning_en: "right / control", meaning_hi: "अधिकार" },
        { word: "ते", iast: "te", meaning_en: "your", meaning_hi: "तुम्हारा" },
        { word: "मा", iast: "mā", meaning_en: "never / not", meaning_hi: "मत / नहीं" },
        { word: "फलेषु", iast: "phaleṣu", meaning_en: "in fruits / results", meaning_hi: "फलों में" },
        { word: "कदाचन", iast: "kadācana", meaning_en: "at any time", meaning_hi: "कभी भी" }
      ]),
      commentary: JSON.stringify({
        shankaracharya: "This is the core pillar of Nishkama Karma Yoga. Actions performed without the craving for results purify the mind, making it receptive to higher wisdom.",
        ramanujacharya: "Perform your duties as an offering to the Divine. Surrender the ownership and results of the actions, acting merely as an instrument of cosmic will."
      })
    },
    {
      verseNumber: "2.48",
      sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥ २.४८॥",
      transliteration: "yogasthaḥ kuru karmāṇi saṅgaṁ tyaktā dhanañjaya |\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate || 2.48 ||",
      hindi: "हे धनञ्जय! तुम आसक्ति को त्यागकर तथा सिद्धि और असिद्धि में समान भाव वाले होकर योग में स्थित रहते हुए कर्म करो। यह समता का भाव ही योग कहलाता है।",
      english: "Be steadfast in yoga, O Arjuna. Perform your duty and abandon all attachment to success or failure. Such equanimity of mind is called Yoga."
    },
    {
      verseNumber: "2.49",
      sanskrit: "दूरेण ह्यवरं कर्म बुद्धियोगाद्धनञ्जय।\nबुद्धौ शरणमन्विच्छ कृपणाः फलहेतवः॥ २.४९॥",
      transliteration: "dūreṇa hy avaraṁ karma buddhi-yogād dhanañjaya |\nbuddhau śaraṇam anviccha kṛpaṇāḥ phala-hetavaḥ || 2.49 ||",
      hindi: "हे धनञ्जय! इस बुद्धि (समत्व बुद्धि) योग से सकाम कर्म अत्यन्त हीन श्रेणी का है। इसलिए तुम बुद्धि की शरण ग्रहण करो। फल की इच्छा रखने वाले लोग अत्यन्त दयनीय (कृपण) हैं।",
      english: "O Dhananjaya, seek refuge in divine intellect, for motivated action is far inferior to action performed in equanimity of mind. Those who work only for reward are miserable."
    },
    {
      verseNumber: "2.50",
      sanskrit: "बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते।\nतस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥ २.५०॥",
      transliteration: "buddhi-yukto jahātīha ubhe sukṛta-duṣkṛte |\ntasmād yogāya yujyasva yogaḥ karmasu kauśalam || 2.50 ||",
      hindi: "समत्व बुद्धि से युक्त मनुष्य पुण्य और पाप दोनों को इसी लोक में त्याग देता है। अतः तुम योग में लग जाओ। कर्मों में कुशलता (अनासक्ति भाव) ही योग है।",
      english: "One who is engaged in equanimity discards both good and bad deeds in this life. Therefore, strive for Yoga, which is the art of performing all work in devotion."
    },
    {
      verseNumber: "2.51",
      sanskrit: "कर्मजं बुद्धियुक्ता हि फलं त्यक्त्वा मनीषिणः।\nजन्मबन्धविनिर्मुक्ताः पदं गच्छन्त्यनामयम्॥ २.५१॥",
      transliteration: "karma-jaṁ buddhi-yuktā hi phalaṁ tyaktvā manīṣiṇaḥ |\njanma-bandha-vinirmuktāḥ padaṁ gacchanty anāmayam || 2.51 ||",
      hindi: "क्योंकि समत्व बुद्धि से युक्त ज्ञानी पुरुष कर्मों से उत्पन्न होने वाले फल का त्याग करके जन्म रूपी बंधन से मुक्त हो जाते हैं और परम कल्याणकारी पद को प्राप्त करते हैं।",
      english: "By engaging themselves in the yoga of intellect, great sages rid themselves of the fruits of actions. Thus, they become free from the cycle of birth and death, and attain the state beyond all misery."
    },
    {
      verseNumber: "2.52",
      sanskrit: "यदा ते मोहकलिलं बुद्धिर्व्यतितरिष्यति।\nतदा गन्तासि निर्वेदं श्रोतव्यस्य श्रुतस्य च॥ २.५२॥",
      transliteration: "yadā te moha-kalilaṁ buddhir vyatitariṣyati |\ntadā gantāsi nirvedaṁ śrotavyasya śrutasya ca || 2.52 ||",
      hindi: "जब तुम्हारी बुद्धि मोह रूपी दलदल को पार कर जाएगी, तब तुम सुने गए और सुनने योग्य भोगों से वैराग्य को प्राप्त हो जाओगे।",
      english: "When your intellect goes beyond the dense forest of delusion, you will become indifferent to all that has been heard and all that is yet to be heard."
    },
    {
      verseNumber: "2.53",
      sanskrit: "श्रुतिविप्रतिपन्ना ते यदा स्थास्यति निश्चला।\nसमाधावचला बुद्धिस्तदा योगमवाप्स्यसि॥ २.५३॥",
      transliteration: "śruti-vipratipannā te yadā sthāsyati niścalā |\nsamādhāv acalā buddhis tadā yogam avāpsyasi || 2.53 ||",
      hindi: "नाना प्रकार के विचारों को सुनने से विचलित हुई तुम्हारी बुद्धि जब परमात्मा में स्थिर और अचल हो जाएगी, तब तुम योग (परमात्मा से मिलन) को प्राप्त कर लोगे।",
      english: "When your mind, perplexed by the conflicting opinions of scriptures, remains unmoved and established in trance (samadhi), then you will attain divine union."
    },
    {
      verseNumber: "2.54",
      sanskrit: "अर्जुन उवाच\nस्थितप्रज्ञस्य का भाषा समाधिस्थस्य केशव।\nस्थितधीः किं प्रभाषेत किमासीत व्रजेत किम्॥ २.५४॥",
      transliteration: "arjuna uvāca\nsthitaprajñasya kā bhāṣā samādhisthasya keśava |\nsthitadhīḥ kiṁ prabhāṣeta kim āsīta vrajeta kim || 2.54 ||",
      hindi: "अर्जुन बोले— हे केशव! समाधि में स्थित स्थिर बुद्धि वाले पुरुष के क्या लक्षण होते हैं? वह स्थिर बुद्धि पुरुष कैसे बोलता है, कैसे बैठता है और कैसे चलता है?",
      english: "Arjuna said: O Krishna, what are the symptoms of one whose mind is merged in divine consciousness (sthitaprajna)? How does he speak, how does he sit, and how does he walk?"
    },
    {
      verseNumber: "2.55",
      sanskrit: "श्रीभगवानुवाच\nप्रजहाति यदा कामान् सर्वान् पार्थ मनोगतान्।\nआत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते॥ २.५५॥",
      transliteration: "śrī-bhagavān uvāca\nprajahāti yadā kāmān sarvān pārtha mano-gatān |\nātmany evātmanā tuṣṭaḥ sthitaprajñas tadocyate || 2.55 ||",
      hindi: "श्रीभगवान बोले— हे पार्थ! जब मनुष्य मन में स्थित सभी कामनाओं को पूर्णतः त्याग देता है और अपने आप से अपने आप में ही सन्तुष्ट रहता है, तब वह स्थिर बुद्धि (स्थितप्रज्ञ) कहलाता है।",
      english: "The Supreme Lord said: O Partha, when a person renounces all desires that arise in the mind, and remains satisfied in the Self alone by the Self, then he is called established in steady wisdom."
    },
    {
      verseNumber: "2.56",
      sanskrit: "दुःखेष्वनुद्विग्नमनah सुखेषु विगतस्पृहः।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥ २.५६॥",
      transliteration: "duḥkheṣv anudvigna-manāḥ sukheṣu vigata-spṛhaḥ |\nvīta-rāga-bhaya-krodhaḥ sthitadhīr munir ucyate || 2.56 ||",
      hindi: "दुःखों की प्राप्ति होने पर जिसके मन में उद्वेग नहीं होता, सुखों की प्राप्ति में जिसकी स्पृहा (आसक्ति) चली गई है, और जो राग, भय तथा क्रोध से सर्वथा रहित है, वह मुनि स्थिर बुद्धि कहा जाता है।",
      english: "One whose mind remains undisturbed in miseries, who is free from longing in pleasures, and who is free from attachment, fear, and anger, is called a sage of steady mind."
    },
    {
      verseNumber: "2.57",
      sanskrit: "यः सर्वत्रानभिस्नेहस्तत्तत्प्राप्य शुभाशुभम्।\nनाभिनन्दति न द्वेष्टि तस्य प्रज्ञा प्रतिष्ठिता॥ २.५७॥",
      transliteration: "yaḥ sarvatrānabhisnehas tat tat prāpya śubhāśubham |\nnābhinandati na dveṣti tasya prajñā pratiṣṭhitā || 2.57 ||",
      hindi: "जो पुरुष सर्वत्र स्नेह रहित है और उस-उस शुभ या अशुभ वस्तु को प्राप्त करके न तो हर्षित होता है और न द्वेष करता है, उसकी बुद्धि प्रतिष्ठित है।",
      english: "He who is without attachment on all sides, who neither rejoices on obtaining the good nor hates the evil, is established in perfect wisdom."
    },
    {
      verseNumber: "2.58",
      sanskrit: "यदा संहरते चायं कूर्मोऽङ्गानीव सर्वशः।\nइन्द्रियाणीन्द्रियार्थेभ्यस्तस्य प्रज्ञा प्रतिष्ठिता॥ २.५८॥",
      transliteration: "yadā saṁharate cāyaṁ kūrmo'ṅgānīva sarvaśaḥ |\nindriyāṇīndriyārthebhyas tasya prajñā pratiṣṭhitā || 2.58 ||",
      hindi: "और कछुआ जैसे अपने अंगों को सब ओर से समेट लेता है, वैसे ही जब यह पुरुष अपनी इन्द्रियों को इन्द्रियों के विषयों से समेट लेता है, तब उसकी बुद्धि स्थिर होती है।",
      english: "When one is able to withdraw his senses from their objects on all sides, as a tortoise draws its limbs into its shell, then his wisdom is firmly established."
    },
    {
      verseNumber: "2.59",
      sanskrit: "विषया विनिवर्तन्ते निराहारस्य देहिनः।\nरसवर्जं रसोऽप्यस्य परं दृष्ट्वा निवर्तते॥ २.५९॥",
      transliteration: "viṣayā vinivartante nirāhārasya dehino |\nrasa-varjaṁ raso'py asya paraṁ dṛṣṭvā nivartate || 2.59 ||",
      hindi: "विषयों का उपभोग न करने वाले पुरुष के भी विषय तो निवृत्त हो जाते हैं, किन्तु उनके प्रति आसक्ति (रस) बनी रहती है। इस पुरुष की आसक्ति भी परम सत्य का साक्षात्कार करने पर निवृत्त हो जाती है।",
      english: "The objects of sense experience turn away from the embodied soul who abstains from food, but the taste for them remains. Even the taste fades away when the Supreme is perceived."
    },
    {
      verseNumber: "2.60",
      sanskrit: "यततो ह्यपि कौन्तेय पुरुषस्य विपश्चितः।\nइन्द्रियाणि प्रमाथीनि हरन्ति प्रसभं मनः॥ २.६०॥",
      transliteration: "yatato hy api kaunteya puruṣasya vipascitaḥ |\nindriyāṇi pramāthīni haranti prasabhaṁ manaḥ || 2.60 ||",
      hindi: "हे कुन्तीपुत्र! यत्न करते हुए बुद्धिमान् मनुष्य की भी प्रमथनशील इन्द्रियां उसके मन को बलपूर्वक हर लेती हैं।",
      english: "The turbulent senses, O son of Kunti, forcibly carry away the mind of even a wise person who strives to control them."
    },
    {
      verseNumber: "2.61",
      sanskrit: "तानि सर्वाणि संयम्य युक्त आसीत मत्परः।\nवशे हि यस्येन्द्रियाणि तस्य प्रज्ञा प्रतिष्ठिता॥ २.६१॥",
      transliteration: "tāni sarvāṇi saṁyamya yukta āsīta mat-paraḥ |\nvaśe hi yasyendriyāni tasya prajñā pratiṣṭhitā || 2.61 ||",
      hindi: "उन सम्पूर्ण इन्द्रियों को वश में करके साधक को मेरे परायण होकर बैठना चाहिए। जिसकी इन्द्रियां वश में होती हैं, उसी की बुद्धि स्थिर होती है।",
      english: "Restraining all the senses, one should sit in meditation, focusing the mind on Me. For one whose senses are controlled, wisdom is firmly established."
    },
    {
      verseNumber: "2.62",
      sanskrit: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥ २.६२॥",
      transliteration: "dhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate |\nsaṅgāt sañjāyate kāmaḥ kāmāt krodho'bhijayate || 2.62 ||",
      hindi: "इन्द्रियों के विषयों का चिन्तन करने वाले पुरुष की उन विषयों में आसक्ति हो जाती है। आसक्ति से कामना उत्पन्न होती है और कामना में विघ्न आने से क्रोध उत्पन्न होता है।",
      english: "While contemplating the objects of senses, a person develops attachment to them. From attachment arises desire, and from desire, anger is born."
    },
    {
      verseNumber: "2.63",
      sanskrit: "क्रोधद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥ २.६३॥",
      transliteration: "krodhād bhavati sammohaḥ sammohāt smṛti-vibhramaḥ |\nsmṛti-bhraṁśād buddhi-nāśo buddhi-nāśāt praṇaśyati || 2.63 ||",
      hindi: "क्रोध से सम्मोह (मूढ़ भाव) उत्पन्न होता है, सम्मोह से स्मृति भ्रमित हो जाती है। स्मृति भ्रम से बुद्धि (विवेक) का नाश हो जाता है, और बुद्धि नाश होने से मनुष्य का आध्यात्मिक पतन हो जाता है।",
      english: "From anger arises delusion, and from delusion comes loss of memory. Loss of memory ruins the intellect, and with the ruin of intellect, a person is completely destroyed."
    },
    {
      verseNumber: "2.64",
      sanskrit: "रागद्वेषवियुक्तैस्तु विषयानिन्द्रियैश्चरन्।\nआत्मवश्यैर्विधेयात्मा प्रसादमधिगच्छति॥ २.६४॥",
      transliteration: "rāga-dveṣa-viyuktais tu viṣayān indriyaiś caran |\nātma-vaśyair vidheyātmā prasādam adhigacchati || 2.64 ||",
      hindi: "किन्तु राग और द्वेष से रहित, अपने वश में की हुई इन्द्रियों द्वारा विषयों का उपभोग करता हुआ संयमित अंतःकरण वाला साधक परम प्रसन्नता को प्राप्त करता है।",
      english: "But a person free from all attachment and aversion, who controls his senses and directs them towards their objects, achieves the mercy and serenity of the Divine."
    },
    {
      verseNumber: "2.65",
      sanskrit: "प्रसादे सर्वदुःखानां हानिरस्योपजायते।\nप्रसन्नचेतसो ह्याशु बुद्धिः पर्यवतिष्ठते॥ २.६५॥",
      transliteration: "prasāde sarva-duḥkhānāṁ hānir asyopajāyate |\nprasanna-cetaso hy āśu buddhiḥ paryavatiṣṭhate || 2.65 ||",
      hindi: "अन्तःकरण की प्रसन्नता प्राप्त होने पर इसके सम्पूर्ण दुःखों का नाश हो जाता है, और उस प्रसन्न चित्त वाले पुरुष की बुद्धि शीघ्र ही परमात्मा में स्थिर हो जाती है।",
      english: "Upon attaining divine peace, all miseries are destroyed, and the intellect of such a tranquil-minded person soon becomes steady and anchored."
    },
    {
      verseNumber: "2.66",
      sanskrit: "नास्ति बुद्धिरयुक्तस्य न चायुक्तस्य भावना।\nन चाभावयतः शान्तिरशान्तस्य कुतः सुखम्॥ २.६६॥",
      transliteration: "nāsti buddhir ayuktasya na cāyuktasya bhāvanā |\nna cābhāvayataḥ śāntir aśāntasya kutaḥ sukham || 2.66 ||",
      hindi: "असंयत मनुष्य में निश्चय करने वाली बुद्धि नहीं होती, और न ही उसमें कर्तव्य-भावना होती है। भावना रहित मनुष्य को शान्ति नहीं मिलती, और अशान्त मनुष्य को सुख कैसे मिल सकता है?",
      english: "One who is not united with the Divine has no spiritual intellect, nor can he meditate. For one who does not meditate, there is no peace, and how can there be happiness for the unpeaceful?"
    },
    {
      verseNumber: "2.67",
      sanskrit: "इन्द्रियाणां हि चरतां यन्मनोऽनुविधीयते।\nतदस्य हरति प्रज्ञां वायुर्नावमिवाम्भसि॥ २.६७॥",
      transliteration: "indriyāṇāṁ hi caratāṁ yan mano'nuvidhīyate |\ntad asya harati prajñāṁ vāyur nāvam ivāmbhasi || 2.67 ||",
      hindi: "क्योंकि इन्द्रियों के विषयों में विचरते हुए इन्द्रियों के पीछे जिसका मन लग जाता है, वह मन उसकी बुद्धि को वैसे ही हर लेता है जैसे जल में चलने वाली नाव को वायु खींच ले जाती है।",
      english: "As a strong wind sweeps away a boat on the water, even so, one of the roaming senses on which the mind focuses can carry away a person's intelligence."
    },
    {
      verseNumber: "2.68",
      sanskrit: "तस्माद्यस्य महाबाहो निगृहीतानि सर्वशः।\nइन्द्रियाणीन्द्रियार्थेभ्यस्तस्य प्रज्ञा प्रतिष्ठिता॥ २.६८॥",
      transliteration: "tasmād yasya mahā-bāho nigṛhītāni sarvaśaḥ |\nindriyāṇīndriyārthebhyas tasya prajñā pratiṣṭhitā || 2.68 ||",
      hindi: "इसलिए हे महाबाहु! जिस पुरुष की इन्द्रियां इन्द्रियों के विषयों से सब प्रकार से वश में की हुई हैं, उसकी बुद्धि स्थिर होती है।",
      english: "Therefore, O mighty-armed one, his wisdom is firmly established whose senses are completely restrained from their objects."
    },
    {
      verseNumber: "2.69",
      sanskrit: "या निशा सर्वभूतानां तस्यां जागृति संयमी।\nयस्यां जाग्रति भूतानि सा निशा पश्यतो मुनेः॥ २.६९॥",
      transliteration: "yā niśā sarva-bhūtānāṁ tasyāṁ jāgarti saṁyamī |\nyasyāṁ jāgrati bhūtāni sā niśā paśyato muneḥ || 2.69 ||",
      hindi: "जो सम्पूर्ण प्राणियों के लिए रात्रि के समान है, उस आत्म-संयम काल में संयमी मनुष्य जागता है। और जिसमें सब प्राणी जागते हैं, वह तत्त्वदर्शी मुनि के लिए रात्रि के समान है।",
      english: "What is night for all beings is the time of awakening for the self-controlled sage. And the time in which all beings awake is night for the introspective sage."
    },
    {
      verseNumber: "2.70",
      sanskrit: "आपूर्यमाणमचलप्रतिष्ठं\nसमुद्रमापः प्रविशन्ति यद्वत्।\nतद्वत्कामा यं प्रविशन्ति सर्वे\nस शान्तिमाप्नोति न कामकामी॥ २.७०॥",
      transliteration: "āpūryamāṇam acala-pratiṣṭhaṁ\nsamudram āpaḥ praviśanti yadvat |\ntadvat kāmā yaṁ praviśanti sarve\nsa śāntim āpnoti na kāma-kāmī || 2.70 ||",
      hindi: "जैसे सब ओर से जल से भरे हुए स्थिर प्रतिष्ठा वाले समुद्र में नदियाँ आकर विलीन हो जाती हैं किन्तु समुद्र अपनी मर्यादा नहीं छोड़ता, वैसे ही जिस पुरुष में सम्पूर्ण कामनाएं बिना कोई विकार पैदा किए समा जाती हैं, वही शान्ति पाता है, कामनाओं को चाहने वाला नहीं।",
      english: "As the ocean remains undisturbed although continuous streams of water flow into it, so a person who remains undisturbed by the flow of desires around him attains peace, and not the one who strives to satisfy those desires."
    },
    {
      verseNumber: "2.71",
      sanskrit: "विहाय कामान्यः सर्वान्पुमांश्चरति निःस्पृहः।\nनिर्ममो निरहङ्कारः स शान्तिमधिगच्छति॥ २.७१॥",
      transliteration: "vihāya kāmān yaḥ sarvān pumāṁś carati niḥspṛhaḥ |\nnirmamo nirahaṅkāraḥ sa śāntim adhigacchati || 2.71 ||",
      hindi: "जो मनुष्य सम्पूर्ण कामनाओं को त्यागकर, ममता रहित, अहंकार रहित और स्पृहा रहित होकर विचरता है, वही परम शान्ति को प्राप्त करता है।",
      english: "A person who has given up all desires, who lives free from attachments, egotism, and thirst for enjoyment, attains supreme peace."
    },
    {
      verseNumber: "2.72",
      sanskrit: "एषा ब्राह्मी स्थितिः पार्थ नैनां प्राप्य विमुह्यति।\nस्थित्वास्यामन्तकालेऽपि ब्रह्मनिर्वाणमृच्छति॥ २.७२॥",
      transliteration: "eṣā brāhmī sthitiḥ pārtha naināṁ prāpya vimuhyati |\nsthitvāsyam anta-kāle'pi brahma-nirvāṇam ṛcchati || 2.72 ||",
      hindi: "हे पार्थ! यह ब्रह्म को प्राप्त हुए पुरुष की स्थिति (ब्राह्मी स्थिति) है। इसे प्राप्त करके मनुष्य कभी मोहित नहीं होता। जीवन के अन्तिम काल में भी इस स्थिति में रहकर वह ब्रह्म-निर्वाण (मोक्ष) को प्राप्त होता है।",
      english: "This is the state of union with Brahman, O Partha. Attaining this, one is never deluded. Being established in this state even at the hour of death, one achieves liberation and enters the absolute supreme consciousness."
    }
  ],
  // Gita Chapters 3 to 18: 5 verses each (First 5 accurate verses)
  3: [
    {
      verseNumber: "3.1",
      sanskrit: "अर्जुन उवाच\nज्यायसी चेत्कर्मणस्ते मता बुद्धिर्जनार्दन।\nतत्किं कर्मणि घोरे मां नियोजयसि केशव॥",
      transliteration: "arjuna uvāca\njyāyasī cet karmaṇas te matā buddhir janārdana\ntat kiṁ karmaṇi ghore māṁ niyojayasi keśava",
      hindi: "अर्जुन बोले— हे जनार्दन! यदि आपके मत में कर्म की अपेक्षा ज्ञान श्रेष्ठ है, तो फिर हे केशव! आप मुझे इस भयानक कर्म (युद्ध) में क्यों लगाते हैं?",
      english: "Arjuna said: O Janardana, if You consider knowledge superior to action, why then, O Keshav, do You urge me to engage in this terrible war?"
    },
    {
      verseNumber: "3.2",
      sanskrit: "व्यामिश्रेणेव वाक्येन बुद्धिं मोहयसीव मे।\nतदेकं वद निश्चित्य येन श्रेयोऽहमाप्नुयाम्॥",
      transliteration: "vyāmiśreṇeva vākyena buddhiṁ mohayasīva me\ntad ekaṁ vada niścitya yena śreyo’ham āpnuyām",
      hindi: "आप अनेकार्थक वचनों से मानो मेरी बुद्धि को भ्रमित कर रहे हैं। अतः इनमें से एक बात निश्चित करके कहिए जिससे मेरा कल्याण हो।",
      english: "My intellect is bewildered by Your seemingly conflicting statements. Therefore, please tell me decisively one path by which I may attain the highest good."
    },
    {
      verseNumber: "3.3",
      sanskrit: "श्रीभगवानुवाच\nलोकेऽस्मिन् द्विविधा निष्ठा पुरा प्रोक्ता मयानघ।\nज्ञानयोगेन साङ्ख्यानां कर्मयोगेन योगिनाम्॥",
      transliteration: "śrī-bhagavān uvāca\nloke’smin dvi-vidhā niṣṭhā purā proktā mayānagha\njñāna-yogena sāṅkhyānāṁ karma-yogena yoginām",
      hindi: "श्रीभगवान बोले— हे निष्पाप अर्जुन! इस संसार में दो प्रकार की जीवन-निष्ठा मेरे द्वारा पहले कही गई है— ज्ञानियों के लिए ज्ञानयोग और योगियों के लिए कर्मयोग।",
      english: "The Supreme Lord said: O sinless one, I have already declared that in this world there are two paths of spiritual growth—the path of knowledge for intellectuals, and the path of action for active workers."
    },
    {
      verseNumber: "3.4",
      sanskrit: "न कर्मणामनारम्भात्नैष्कर्म्यं पुरुषोऽश्नुते।\nन च संन्यसनादेव सिद्धिं समधिगच्छति॥",
      transliteration: "na karmaṇām anārambhān naiṣkarmyaṁ puruṣo’śnute\nna ca sannyasanād eva siddhiṁ samadhigacchati",
      hindi: "मनुष्य न तो कर्मों का आरम्भ किए बिना निष्कर्मता को प्राप्त होता है, और न ही कर्मों के केवल त्याग (सन्न्यास) से सिद्धि प्राप्त कर सकता है।",
      english: "Not by abstaining from work can one achieve freedom from karmic reaction, nor by mere renunciation of work can one attain perfection."
    },
    {
      verseNumber: "3.5",
      sanskrit: "न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत्।\nकार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः॥",
      transliteration: "na hi kaścit kṣaṇam api jātu tiṣṭhaty akarma-kṛt\nkāryate hy avaśaḥ karma sarvaḥ prakṛti-jair guṇaiḥ",
      hindi: "क्योंकि कोई भी मनुष्य किसी भी काल में क्षणमात्र भी कर्म किए बिना नहीं रह सकता; सभी जीव प्रकृति जनित गुणों द्वारा विवश होकर कर्म करते हैं।",
      english: "No one can remain without performing actions even for a moment. Indeed, everyone is forced to act helplessly according to the qualities born of material nature."
    }
  ],
  4: [
    {
      verseNumber: "4.1",
      sanskrit: "श्रीभगवानुवाच\nइमं विवस्वते योगं प्रोक्तवानहमव्ययम्।\nविवस्वान्मनवे प्राह मनुरिक्ष्वाकवेऽब्रवीत्॥",
      transliteration: "śrī-bhagavān uvāca\nimaṁ vivasvate yogaṁ proktavān aham avyayam\nvivasvān manave prāha manur ikṣvākave’bravīt",
      hindi: "श्रीभगवान बोले— मैंने इस अविनाशी योग को सूर्यदेव (विवस्वान्) से कहा था, सूर्यदेव ने इसे अपने पुत्र मनु से कहा और मनु ने अपने पुत्र इक्ष्वाकु से कहा।",
      english: "The Supreme Lord said: I taught this eternal science of Yoga to the sun-god, Vivasvan, who taught it to Manu, and Manu passed it on to Ikshvaku."
    },
    {
      verseNumber: "4.2",
      sanskrit: "एवं परम्पराप्राप्तमिमं राजर्षयो विदुः।\nस कालेनेह महता योगो नष्टः परन्तप॥",
      transliteration: "evaṁ paramparā-prāptam imaṁ rājarṣayo viduḥ\nsa kāleneha mahatā yogo naṣṭaḥ parantapa",
      hindi: "इस प्रकार गुरु-शिष्य परम्परा से प्राप्त इस योग को राजर्षियों ने जाना; किन्तु हे परन्तप! बहुत काल बीतने पर यह योग पृथ्वी लोक में लुप्तप्राय हो गया।",
      english: "This supreme science was thus received through disciplic succession, and the saintly kings understood it. But in course of time, the succession was broken, and the science as it is appears to be lost."
    },
    {
      verseNumber: "4.3",
      sanskrit: "स एवायं मया तेऽद्य योगः प्रोक्तः पुरातनः।\nभक्तोऽसि मे सखा चेति रहस्यं ह्येतदुत्तमम्॥",
      transliteration: "sa evāyaṁ mayā te’dya yogaḥ proktāḥ purātanaḥ\nbhakto’si me sakhā ceti rahasyaṁ hy etad uttamam",
      hindi: "वही यह पुरातन योग आज मैंने तुमसे कहा है, क्योंकि तुम मेरे भक्त और प्रिय मित्र हो। यह योग अत्यन्त गोपनीय रहस्य (उत्तम रहस्य) है।",
      english: "That very ancient science of Yoga is declared by Me to you today, because you are My devotee as well as My friend; therefore you can understand this supreme mystery."
    },
    {
      verseNumber: "4.4",
      sanskrit: "अर्जुन उवाच\nअपरं भवतो जन्म परं जन्म विवस्वतः।\nकथमेतद्विजानीयां त्वमादौ प्रोक्तवानिति॥",
      transliteration: "arjuna uvāca\naparaṁ bhavato janma paraṁ janma vivasvataḥ\nkatham etad vijānīyāṁ tvam ādau proktavān iti",
      hindi: "अर्जुन बोले— आपका जन्म तो हाल का (अधुनातन) है, जबकि सूर्यदेव का जन्म बहुत प्राचीन है। फिर मैं इस बात को कैसे समझूँ कि सृष्टि के आरम्भ में आपने उनसे यह योग कहा था?",
      english: "Arjuna said: Vivasvan was born much earlier than You. How then am I to understand that You taught this science to him in the beginning?"
    },
    {
      verseNumber: "4.5",
      sanskrit: "श्रीभगवानुवाच\nबहूनि मे व्यतीतानि जन्मानि तव चार्जुन।\nतान्यहं वेद सर्वाणि न त्वं वेत्थ परन्तप॥",
      transliteration: "śrī-bhagavān uvāca\nbahūni me vyatītāni janmāni tava cārjuna\ntāny ahaṁ veda sarvāṇi na tvaṁ vettha parantapa",
      hindi: "श्रीभगवान बोले— हे अर्जुन! मेरे और तुम्हारे बहुत से जन्म हो चुके हैं। उन सबको मैं जानता हूँ, किन्तु हे परन्तप! तुम उन्हें नहीं जानते।",
      english: "The Supreme Lord said: Many, many births both you and I have passed, O Arjuna. I can remember all of them, but you cannot, O subduer of the enemy."
    }
  ],
  5: [
    {
      verseNumber: "5.1",
      sanskrit: "अर्जुन उवाच\nसंन्यासं कर्मणां कृष्ण पुनर्योगं च शंससि।\nयच्छ्रेय एतयोरेकं तन्मे ब्रूहि सुनिश्चितम्॥",
      transliteration: "arjuna uvāca\nsannyāsaṁ karmaṇāṁ kṛṣṇa punar yogaṁ ca śaṁsasi\nyac chreya etayor ekaṁ tan me brūhi su-niścitam",
      hindi: "अर्जुन बोले— हे कृष्ण! आप कर्मों के सन्न्यास (त्याग) की और फिर निष्काम कर्मयोग की प्रशंसा करते हैं। इन दोनों में से जो एक निश्चित रूप से कल्याणकारी हो, उसे मुझे बताइए।",
      english: "Arjuna said: O Krishna, first of all You ask me to renounce work, and then again You recommend work with devotion. Now will You kindly tell me definitely which of the two is more beneficial?"
    },
    {
      verseNumber: "5.2",
      sanskrit: "श्रीभगवानुवाच\nसंन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ।\nतयोस्तु कर्मसंन्यासात्कर्मयोगो विशिष्यते॥",
      transliteration: "śrī-bhagavān uvāca\nsannyāsaḥ karma-yogaś ca niḥśreyasa-karāv ubhai\ntayos tu karma-sannyāsāt karma-yogo viśiṣyate",
      hindi: "श्रीभगवान बोले— कर्मों का सन्न्यास और निष्काम कर्मयोग— ये दोनों ही परम कल्याण करने वाले हैं; किन्तु इन दोनों में कर्म-सन्न्यास की अपेक्षा निष्काम कर्मयोग श्रेष्ठ है।",
      english: "The Supreme Lord replied: The renunciation of work and work in devotion are both good for liberation. But, of the two, work in devotional service is better than renunciation of work."
    },
    {
      verseNumber: "5.3",
      sanskrit: "ज्ञेयः स नित्यसंन्यासी यो न द्वेष्टि न काङ्क्षति।\nनिर्द्वन्द्वो हि महाबाहो सुखं बन्धात्प्रमुच्यते॥",
      transliteration: "jñeyaḥ sa nitya-sannyāsī yo na dveṣṭi na kāṅkṣati\nnirdvandvo hi mahā-bāho sukhaṁ bandhāt pramucyate",
      hindi: "हे महाबाहु! जो पुरुष न किसी से द्वेष करता है और न किसी वस्तु की आकांक्षा करता है, उसे नित्य सन्न्यासी ही समझना चाहिए; क्योंकि द्वन्द्वों से रहित मनुष्य सुखपूर्वक संसार-बंधन से मुक्त हो जाता है।",
      english: "One who neither hates nor desires the fruits of his activities is known to be always renounced. Such a person, liberated from all dualities, easily overcomes material bondage."
    },
    {
      verseNumber: "5.4",
      sanskrit: "साङ्ख्ययोगौ पृथग्बालाः प्रवदन्ति न पण्डिताः।\nएकं अप्यास्थितः सम्यगुभयोर्विन्दते फलम्॥",
      transliteration: "sāṅkhya-yogau pṛthag bālāḥ pravadanti na paṇḍitāḥ\nekam apy āsthitaḥ samyag ubhayor vindate phalam",
      hindi: "अज्ञानी लोग सांख्य (ज्ञानयोग) और कर्मयोग को अलग-अलग फल देने वाला कहते हैं, न कि पण्डितजन; क्योंकि दोनों में से एक में भी अच्छी तरह स्थित पुरुष दोनों का फल प्राप्त कर लेता है।",
      english: "Only the ignorant speak of devotional service (Karma Yoga) as being different from the analytical study of the material world (Sankhya). Sages say that one who applies himself well to one of these paths achieves the results of both."
    },
    {
      verseNumber: "5.5",
      sanskrit: "यत्साङ्ख्यैः प्राप्यते स्थानं तद्योगैरपि गम्यते।\nएकं साङ्ख्यं च योगं च यः पश्यति स पश्यति॥",
      transliteration: "yat sāṅkhyaiḥ prāpyate sthānaṁ tad yogair api gamyate\nekaṁ sāṅkhyaṁ ca yogaṁ ca yaḥ paśyati sa paśyati",
      hindi: "ज्ञानयोगियों द्वारा जो परम पद प्राप्त किया जाता है, कर्मयोगियों द्वारा भी वही स्थान प्राप्त किया जाता है। अतः जो पुरुष ज्ञानयोग और कर्मयोग को एक रूप में देखता है, वही वास्तव में देखता है।",
      english: "One who knows that the position reached by means of analytical study can also be attained by devotional service, and who therefore sees analytical study and devotional service to be on the same level, sees things as they are."
    }
  ],
  6: [
    {
      verseNumber: "6.1",
      sanskrit: "श्रीभगवानुवाच\nअनाश्रितः कर्मफलं कार्यं कर्म करोति यः।\nस संन्यासी च योगी च न निरग्निर्न चाक्रियः॥",
      transliteration: "śrī-bhagavān uvāca\nanāśritaḥ karma-phalaṁ kāryaṁ karma karoti yaḥ\nsa sannyāsī ca yogī ca na niragnir na cākriyaḥ",
      hindi: "श्रीभगवान बोले— जो मनुष्य कर्मफल का आश्रय न लेकर कर्तव्य कर्म करता है, वही सन्न्यासी और वही योगी है; केवल अग्नि का त्याग करने वाला या क्रियाओं का त्याग करने वाला नहीं।",
      english: "The Supreme Lord said: One who is unattached to the fruits of his work and who works as he is obligated is in the renounced order of life, and he is the true mystic, not he who lights no fire and performs no duty."
    },
    {
      verseNumber: "6.2",
      sanskrit: "यं संन्यासमिति प्राहुर्योगं तं विद्धि पाण्डव।\nन ह्यसंन्यस्तसङ्कल्पो योगी भवति कश्चन॥",
      transliteration: "yaṁ sannyāsam iti prāhur yogaṁ taṁ viddhi pāṇḍava\nna hy asannyasta-saṅkalpo yogī bhavati kaścana",
      hindi: "हे पाण्डव! जिसे लोग सन्न्यास कहते हैं, उसे ही तुम योग (परमात्मा से मिलन) समझो; क्योंकि संकल्पों (भौतिक कामनाओं) का त्याग किए बिना कोई भी मनुष्य योगी नहीं हो सकता।",
      english: "What is called renunciation you should know to be the same as yoga, or link with the Supreme, O son of Pandu, for one can never become a yogi unless he renounces the desire for self-satisfaction."
    },
    {
      verseNumber: "6.3",
      sanskrit: "आरुरुक्षोर्मुनेर्योगं कर्म कारणमुच्यते।\nयोगारूढस्य तस्यैव शमः कारणमुच्यते॥",
      transliteration: "ārurukṣor muner yogaṁ karma kāraṇam ucyate\nyogārūḍhasya tasyaiva śamaḥ kāraṇam ucyate",
      hindi: "योग में आरूढ़ होने की इच्छा वाले मुनि के लिए कर्तव्य-कर्म करना साधन कहा जाता है; और योग में स्थित हो जाने पर शान्ति (राग-द्वेष का अभाव) ही साधन कहा जाता है।",
      english: "For one who is a neophyte in the eightfold yoga system, work is said to be the means; and for one who is already elevated in yoga, cessation of all material activities is said to be the means."
    },
    {
      verseNumber: "6.4",
      sanskrit: "यदा हि नेन्द्रियार्थेषु न कर्मस्वनुषज्जते।\nसर्वसङ्कल्पसंन्यासी योगारूढस्तदोच्यते॥",
      transliteration: "yadā hi nendriyārtheṣu na karmasv anuṣajjate\nsarva-saṅkalpa-sannyāsī yogārūḍhas tadocyate",
      hindi: "जब मनुष्य न तो इन्द्रियों के विषयों में और न ही कर्मों में आसक्त होता है, और सम्पूर्ण संकल्पों का त्यागी बन जाता है, तब वह योगारूढ़ (योग में स्थित) कहा जाता है।",
      english: "A person is said to be elevated in yoga when he has renounced all material desires and neither acts for sense gratification nor engages in fruitive activities."
    },
    {
      verseNumber: "6.5",
      sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
      transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
      hindi: "मनुष्य को चाहिए कि अपने मन के द्वारा अपना उद्धार करे, अपना पतन न होने दे; क्योंकि यह मन ही आत्मा का मित्र है और मन ही आत्मा का शत्रु है।",
      english: "One must deliver himself with the help of his mind, and not degrade himself. The mind is the friend of the conditioned soul, and the enemy as well."
    }
  ],
  7: [
    {
      verseNumber: "7.1",
      sanskrit: "श्रीभगवानुवाच\nमय्यासक्तमनाः पार्थ योगं युञ्जन्मदाश्रयः।\nअसंशयं समग्रं मां यथा ज्ञास्यसि तच्छृणु॥",
      transliteration: "śrī-bhagavān uvāca\nmayy āsakta-manāḥ pārtha yogaṁ yuñjan mad-āśrayaḥ\nasaṁśayaṁ samagraṁ māṁ yathā jñāsyasi tac chṛṇu",
      hindi: "श्रीभगवान बोले— हे पार्थ! मुझमें अनन्य प्रेम से आसक्त मन होकर, मेरे ही शरण होकर और योग में लगे रहते हुए तुम मुझको संशयरहित पूर्ण रूप से कैसे जानोगे, उसे सुनो।",
      english: "The Supreme Lord said: Now hear, O Partha, how by practicing yoga in full consciousness of Me, with mind attached to Me, you can know Me in full, free from doubt."
    },
    {
      verseNumber: "7.2",
      sanskrit: "ज्ञानं तेऽहं सविज्ञानमिदं वक्ष्याम्यशेषतः।\nयज्ज्ञात्वा नेह भूयोऽन्यज्ज्ञातव्यमवशिष्यते॥",
      transliteration: "jñānaṁ te’haṁ sa-vijñānam idaṁ vakṣyāmy aśeṣataḥ\nyaj jñātvā neha bhūyo’nyaj jñātavyam avaśiṣyate",
      hindi: "मैं तुम्हारे लिए इस ज्ञान को विज्ञान सहित पूर्ण रूप से कहूँगा, जिसे जानने के बाद इस संसार में फिर और कुछ भी जानना शेष नहीं रह जाता।",
      english: "I shall now declare unto you in full this knowledge, both phenomenal and numinous. This being known, nothing further shall remain for you to know."
    },
    {
      verseNumber: "7.3",
      sanskrit: "मनुष्याणां सहस्रेषु कश्चिद्यतति सिद्धये।\nयततामपि सिद्धानां कश्चिन्मां वेत्ति तत्त्वतः॥",
      transliteration: "manuṣyāṇāṁ sahasreṣu kaścid yatati siddhaye\nyatatām api siddhānāṁ kaścin māṁ vetti tattvataḥ",
      hindi: "हजारों मनुष्यों में से कोई एक मोक्ष की सिद्धि के लिए यत्न करता है, और इस प्रकार यत्न करने वाले सिद्ध पुरुषों में से भी कोई एक ही मुझे तत्त्व से जान पाता है।",
      english: "Out of many thousands among men, one may endeavor for perfection, and of those who have achieved perfection, hardly one knows Me in truth."
    },
    {
      verseNumber: "7.4",
      sanskrit: "भूमिरापोऽनलो वायुः खं मनो बुद्धिरेव च।\nअहङ्कार इतीयं मे भिन्ना प्रकृतिरष्टधा॥",
      transliteration: "bhūmir āpo’nalo vāyuḥ khaṁ mano buddhir eva ca\nahankāra itīyaṁ me bhinnā prakṛtir aṣṭadhā",
      hindi: "पृथ्वी, जल, अग्नि, वायु, आकाश, मन, बुद्धि और अहंकार— यह आठ प्रकार से विभक्त हुई मेरी भौतिक प्रकृति (अपरा) है।",
      english: "Earth, water, fire, air, ether, mind, intellect and ego—all together these eight constitute My separated material energies."
    },
    {
      verseNumber: "7.5",
      sanskrit: "अपरेयमितस्त्वन्यां प्रकृतिं विद्धि मे पराम्।\nजीवभूतां महाबाहो ययेदं धार्यते जगत्॥",
      transliteration: "apareyam itas tv anyāṁ prakṛtiṁ viddhi me parām\njīva-bhūtāṁ mahā-bāho yayedaṁ dhāryate jagat",
      hindi: "हे महाबाहु! यह तो मेरी निकृष्ट (अपरा) प्रकृति है; इससे भिन्न मेरी परा (उत्कृष्ट) प्रकृति को जानो, जो जीवरूपा है और जिसके द्वारा यह सम्पूर्ण जगत धारण किया जाता है।",
      english: "Besides these, O mighty-armed Arjuna, there is another, superior energy of Mine, which comprises the living entities who are exploiting the resources of this material, inferior nature."
    }
  ],
  8: [
    {
      verseNumber: "8.1",
      sanskrit: "अर्जुन उवाच\nकिं तद्ब्रह्म किमध्यात्मं किं कर्म पुरुषोत्तम।\nअधिभूतं च किं प्रोक्तमधिदैवं किमुच्यते॥",
      transliteration: "arjuna uvāca\nkiṁ tad brahma kim adhyātmaṁ kiṁ karma puruṣottama\nadhibhūtaṁ ca kiṁ proktam adhidaivaṁ kim ucyate",
      hindi: "अर्जुन बोले— हे पुरुषोत्तम! वह ब्रह्म क्या है? अध्यात्म क्या है? कर्म क्या है? अधिभूत नाम से किसे कहा गया है और अधिदैव किसे कहा जाता है?",
      english: "Arjuna inquired: O my Lord, O Supreme Person, what is Brahman? What is the self? What are fruitive activities? What is this material manifestation? And what are the demigods? Please explain this to me."
    },
    {
      verseNumber: "8.2",
      sanskrit: "अधियज्ञः कथं कोऽत्र देहेऽस्मिन्मधुसूदन।\nप्रयाणकाले च कथं ज्ञेयोऽसि नियतात्मभिः॥",
      transliteration: "adhiyajñaḥ kathaṁ ko’tra dehe’smin madhusūdana\nprayāṇa-kāle ca kathaṁ jñeyo’si niyatātmabhiḥ",
      hindi: "हे मधुसूदन! यहाँ इस शरीर में अधियज्ञ कौन है और वह कैसे स्थित है? और समाहित चित्त वाले पुरुषों द्वारा मृत्यु के समय आप कैसे जानने में आते हैं?",
      english: "Who is the Lord of sacrifice, and how does He live in the body, O Madhusudana? And how can those engaged in devotional service know You at the time of death?"
    },
    {
      verseNumber: "8.3",
      sanskrit: "श्रीभगवानुवाच\nअक्षरं ब्रह्म परमं स्वभावोऽध्यात्ममुच्यते।\nभूतभावोद्भवकरो विसर्गः कर्मसञ्ज्ञितः॥",
      transliteration: "śrī-bhagavān uvāca\nakṣaraṁ brahma paramaṁ svabhāvo’dhyātmam ucyate\nbhūta-bhāvodbhava-karo visargaḥ karma-sanjñitaḥ",
      hindi: "श्रीभगवान बोले— परम अविनाशी तत्त्व 'ब्रह्म' है, जीवात्मा का अपना स्वरूप (चेतना) 'अध्यात्म' कहलाता है, और भूतों (जीवों) की उत्पत्ति और वृद्धि करने वाला विसर्ग (त्याग) 'कर्म' नाम से कहा गया है।",
      english: "The Supreme Lord said: The indestructible, transcendental living entity is called Brahman, and his eternal nature is called adhyatma, the self. Action pertaining to the development of the material bodies of the living entities is called karma."
    },
    {
      verseNumber: "8.4",
      sanskrit: "अधिभूतं क्षरो भावः पुरुषश्चाधिदैवतम्।\nअधियज्ञोऽहमेवात्र देहे देहभृतां वर॥",
      transliteration: "adhibhūtaṁ kṣaro bhāvaḥ puruṣaś cādhidaivatam\nadhiyajño’ham evātra dehe deha-bhṛtāṁ vara",
      hindi: "हे देहधारियों में श्रेष्ठ अर्जुन! विनाशशील भाव 'अधिभूत' है, हिरण्यमय पुरुष 'अधिदैवत' है, और इस शरीर में मैं स्वयं ही 'अधियज्ञ' (यज्ञों का भोक्ता और साक्षी) हूँ।",
      english: "O best of the embodied beings, the physical constitution, which is constantly changing, is called adhibhuta (the material manifestation). The universal form of the Lord is called adhidaiva. And I, the Supreme Lord, represented as the Supersoul in the heart of every embodied being, am called adhiyajna."
    },
    {
      verseNumber: "8.5",
      sanskrit: "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्।\nयः प्रयाति स मद्भावं याति नास्त्यत्र संशयः॥",
      transliteration: "anta-kāle ca mām eva smaran muktvā kalevaram\nyaḥ prayāti sa mad-bhāvaṁ yāti nāsty atra saṁśayaḥ",
      hindi: "और जो मनुष्य मृत्यु के समय मुझको ही स्मरण करता हुआ शरीर त्याग कर जाता है, वह मेरे साक्षात् स्वरूप को प्राप्त होता है, इसमें कोई संशय नहीं है।",
      english: "And whoever, at the end of his life, quits his body remembering Me alone at once attains My nature. Of this there is no doubt."
    }
  ],
  9: [
    {
      verseNumber: "9.1",
      sanskrit: "श्रीभगवानुवाच\nइदं तु ते गुह्यतमं प्रवक्ष्याम्यनसूयवे।\nज्ञानं विज्ञानसहितं यज्ज्ञात्वा मोक्ष्यसेऽशुभात्॥",
      transliteration: "śrī-bhagavān uvāca\nidaṁ tu te guhyatamaṁ pravakṣyāmy anasūyave\njñānaṁ vijñāna-sahitaṁ yaj jñātvā mokṣyase’śubhāt",
      hindi: "श्रीभगवान बोले— हे दोषरहित अर्जुन! तुममें ईर्ष्या भावना नहीं है, इसलिए मैं तुम्हें इस परम गोपनीय ज्ञान को विज्ञान सहित कहूँगा, जिसे जानकर तुम संसार के अमंगल से मुक्त हो जाओगे।",
      english: "The Supreme Lord said: Because you are never envious of Me, O Arjuna, I shall impart to you this most confidential knowledge and understanding, knowing which you shall be relieved of the miseries of material existence."
    },
    {
      verseNumber: "9.2",
      sanskrit: "राजविद्या राजगुह्यं पवित्रमिदमुत्तमम्।\nप्रत्यक्षावगमं धर्म्यं सुसुखं कर्तुमव्ययम्॥",
      transliteration: "rāja-vidyā rāja-guhyaṁ pavitram idam uttamam\npratyakṣāvagamaṁ dharmyaṁ susukhaṁ kartum avyayam",
      hindi: "यह ज्ञान सभी विद्याओं का राजा (राजविद्या) है, सब रहस्यों का राजा (राजगुह्य) है, परम पवित्र और उत्तम है। यह प्रत्यक्ष फल देने वाला, धर्मयुक्त, आचरण करने में सुगम और अविनाशी है।",
      english: "This science is the king of all knowledge, the king of all secrets. It is the purest knowledge, and because it gives direct perception of the self by realization, it is the perfection of religion. It is everlasting, and joyfully performed."
    },
    {
      verseNumber: "9.3",
      sanskrit: "अश्रद्दधानाः पुरुषा धर्मस्यास्य परन्तप।\nअप्राप्य मां निवर्तन्ते मृत्युसंसारवर्त्मनि॥",
      transliteration: "aśraddadhānāḥ puruṣā dharmasyāsya parantapa\naprāpya māṁ nivartante mṛtyu-saṁsāra-vartmani",
      hindi: "हे परन्तप! इस धर्म में श्रद्धा न रखने वाले मनुष्य मुझे प्राप्त न होकर, मृत्यु रूपी संसार के चक्र में घूमते रहते हैं।",
      english: "Those who are not faithful in this path of devotional service cannot attain Me, O conqueror of foes. Therefore they return to the path of death in this material world."
    },
    {
      verseNumber: "9.4",
      sanskrit: "मया ततमिदं सर्वं जगदव्यक्तमूर्तिना।\nमत्स्थानि सर्वभूतानि न चाहं तेष्ववस्थितः॥",
      transliteration: "mayā tatam idaṁ sarvaṁ jagad avyakta-mūrtinā\nmat-sthāni sarva-bhūtāni na cāhaṁ teṣv avasthitāḥ",
      hindi: "मुझ अव्यक्त रूप परमात्मा द्वारा यह सम्पूर्ण जगत व्याप्त है। समस्त प्राणी मुझमें स्थित हैं, किन्तु मैं उनमें (आसक्त होकर) स्थित नहीं हूँ।",
      english: "By Me, in My unmanifested form, this entire universe is pervaded. All beings are in Me, but I am not in them."
    },
    {
      verseNumber: "9.5",
      sanskrit: "न च मत्स्थानि भूतानि पश्य मे योगमैश्वरम्।\nभूतभृन्न च भूतस्थो ममात्मा भूतभावनः॥",
      transliteration: "na ca mat-sthāni bhūtāni paśya me yogam aiśvaram\nbhūta-bhṛn na ca bhūta-stho mamātmā bhūta-bhāvanaḥ",
      hindi: "और न ही वे प्राणी मुझमें स्थित हैं; मेरे इस ईश्वरीय योग की शक्ति को देखो। जीवों का धारण-पोषण करने वाला और जीवों को उत्पन्न करने वाला मेरा स्वरूप उन जीवों में स्थित नहीं है।",
      english: "And yet everything that is created does not rest in Me. Behold My cosmic mystery! Although I am the maintainer of all living entities and although I am everywhere, I am not a part of this cosmic manifestation, for My Self is the very source of creation."
    }
  ],
  10: [
    {
      verseNumber: "10.1",
      sanskrit: "श्रीभगवानुवाच\nभूय एव महाबाहो शृणु मे परमं वचः।\nयत्तेऽहं प्रीयमाणाय वक्ष्यामी हितकाम्यया॥",
      transliteration: "śrī-bhagavān uvāca\nbhūya eva mahā-bāho śṛṇu me paramaṁ vacaḥ\nyat te’haṁ prīyamāṇāya vakṣyāmi hita-kāmyayā",
      hindi: "श्रीभगवान बोले— हे महाबाहु! मेरे परम वचनों को फिर से सुनो। तुम मुझसे प्रेम करते हो, इसलिए मैं तुम्हारे कल्याण की इच्छा से इन्हें कहूँगा।",
      english: "The Supreme Lord said: Listen again, O mighty-armed Arjuna. Because you are My dear friend, for your benefit I shall speak to you further, giving knowledge that is better than what I have already explained."
    },
    {
      verseNumber: "10.2",
      sanskrit: "न मे विदुः सुरगणाः प्रभवं न महर्षयः।\nअहमादिर्हि देवानां महर्षीणां च सर्वशः॥",
      transliteration: "na me viduḥ sura-gaṇāḥ prabhavaṁ na maharṣayaḥ\naham ādir hi devānāṁ maharṣīṇāṁ ca sarvaśaḥ",
      hindi: "मेरी उत्पत्ति (लीला रूप में प्रकट होने) को न तो देवतागण जानते हैं और न महर्षिजन; क्योंकि मैं सब प्रकार से देवताओं और महर्षियों का भी आदिकारण हूँ।",
      english: "Neither the hosts of demigods nor the great sages know My origin or opulences, for, in every respect, I am the source of the demigods and sages."
    },
    {
      verseNumber: "10.3",
      sanskrit: "यो मामजमनादिं च वेत्ति लोकमहेश्वरम्।\nअसम्मूढः स मर्त्येषु सर्वपापैः प्रमुच्यते॥",
      transliteration: "yo mām ajam anādiṁ ca vetti loka-maheśvaram\nasammūḍhaḥ sa martyeṣu sarva-pāpaiḥ pramucyate",
      hindi: "जो मुझे अजन्मा, अनादि और सम्पूर्ण लोकों का महान् ईश्वर जानता है, वह मनुष्यों में सम्मोहरहित पुरुष सम्पूर्ण पापों से मुक्त हो जाता है।",
      english: "He who knows Me as the unborn, as the beginningless, as the Supreme Lord of all the worlds—he only, undeluded among men, is freed from all sins."
    },
    {
      verseNumber: "10.4",
      sanskrit: "बुद्धिर्ज्ञानमसम्मोहः क्षमा सत्यं दमः शमः।\nसुखं दुःखं भवो भावो भयं चाभयमेव च॥",
      transliteration: "buddhir jñānam asammohaḥ kṣamā satyaṁ damaḥ śamah\nsukhaṁ duḥkhaṁ bhavo’bhāvo bhayaṁ cābhayam eva ca",
      hindi: "निश्चय करने की बुद्धि, ज्ञान, असंमोह (भ्रम का अभाव), क्षमा, सत्य, इन्द्रिय-संयम, मन का निग्रह, सुख, दुःख, उत्पत्ति, विनाश, भय और अभय...",
      english: "Intellect, knowledge, freedom from doubt and delusion, forgiveness, truthfulness, control of the senses, control of the mind, happiness and distress, birth, death, fear and fearlessness..."
    },
    {
      verseNumber: "10.5",
      sanskrit: "अहिंसा समता तुष्टिस्तपो दानं यशोऽयशः।\nभवन्ति भावा भूतानां मत्त एव पृथग्विधाः॥",
      transliteration: "ahiṁsā samatā tuṣṭis tapo dānaṁ yaśo’yaśaḥ\nbhavanti bhāvā bhūtānāṁ matta eva pṛthag-vidhāḥ",
      hindi: "अहिंसा, समता, सन्तोष, तप, दान, यश और अपयश— जीवों के ये भिन्न-भिन्न प्रकार के भाव मुझसे ही उत्पन्न होते हैं।",
      english: "Nonviolence, equanimity, satisfaction, austerity, charity, fame and infamy—all these various qualities of living beings are created by Me alone."
    }
  ],
  11: [
    {
      verseNumber: "11.1",
      sanskrit: "अर्जुन उवाच\nमदनुग्रहाय परमं गुह्यमध्यात्मसञ्ज्ञितम्।\nयत्त्वयोक्तं वचस्तेन मोहोऽयं विगतो मम॥",
      transliteration: "arjuna uvāca\nmad-anugrahāya paramaṁ guhyam adhyātma-sañjñitam\nyat tvayoktaṁ vacas tena moho’yaṁ vigato mama",
      hindi: "अर्जुन बोले— मुझ पर अनुग्रह करने के लिए आपने जो परम गोपनीय अध्यात्म विषयक वचन कहे हैं, उससे मेरा यह अज्ञान नष्ट हो गया है।",
      english: "Arjuna said: By My hearing the instructions You have kindly given me about these most confidential spiritual subjects, my delusion has now been dispelled."
    },
    {
      verseNumber: "11.2",
      sanskrit: "भवाप्ययौ हि भूतानां श्रुतौ विस्तरशो मया।\nत्वत्तः कमलपत्राक्ष माहात्म्यमपि चाव्ययम्॥",
      transliteration: "bhavāpyayau hi bhūtānam śrutau vistaraśo mayā\ntvattaḥ kamala-patrākṣa māhātmyaṁ api cāvyayam",
      hindi: "हे कमलनेत्र कृष्ण! मैंने आपसे प्राणियों की उत्पत्ति और प्रलय के विषय में विस्तार से सुना है, और आपकी अविनाशी महिमा का भी साक्षात्कार किया है।",
      english: "O lotus-eyed one, I have heard from You in detail about the appearance and disappearance of all living entities and have realized Your inexhaustible glories."
    },
    {
      verseNumber: "11.3",
      sanskrit: "एवमेतद्यथात्थ त्वमात्मानं परमेश्वर।\nद्रष्टुमिच्छामि ते रूपमैश्वरं पुरुषोत्तम॥",
      transliteration: "evam etad yathāttha tvam ātmānaṁ parameśvara\ndraṣṭum icchāmi te rūpam aiśvaraṁ puruṣottama",
      hindi: "हे परमेश्वर! आप अपने स्वरूप को जैसा कहते हैं, वह वैसा ही है; किन्तु हे पुरुषोत्तम! मैं आपके ज्ञान, ऐश्वर्य, शक्ति और बल से युक्त ईश्वरीय रूप को प्रत्यक्ष देखना चाहता हूँ।",
      english: "O Supreme Lord, O Personality of Godhead, though I see You here before me in Your actual position, as You have described Yourself, I wish to see how You have entered into this cosmic manifestation. I want to see that form of Yours."
    },
    {
      verseNumber: "11.4",
      sanskrit: "मन्यसे यदि तच्छक्यं मया द्रष्टुमिति प्रभो।\nयोगेश्वर ततो मे त्वं दर्शयात्मानमव्ययम्॥",
      transliteration: "manyase yadi tac chakyaṁ mayā draṣṭum iti prabo\nyogegvara tato me tvaṁ darśayātmānam avyayam",
      hindi: "हे प्रभो! यदि आप ऐसा मानते हैं कि मेरे द्वारा आपका वह रूप देखा जाना सम्भव है, तो हे योगेश्वर! आप मुझे अपने उस अविनाशी स्वरूप का दर्शन कराइए।",
      english: "If You think that I am able to behold Your cosmic form, O my Lord, O Master of all mystic power, then kindly show me that unlimited universal Self."
    },
    {
      verseNumber: "11.5",
      sanskrit: "श्रीभगवानुवाच\nपश्य मे पार्थ रूपाणि शतशोऽथ सहस्रशः।\nनानाविधानि दिव्यानि नानावर्णाकृतीनि च॥",
      transliteration: "śrī-bhagavān uvāca\npaśya me pārtha rūpāṇi śataśo’tha sahasraśaḥ\nnānā-vidhāni divyāni nānā-varṇākṛtīni ca",
      hindi: "श्रीभगवान बोले— हे पार्थ! तुम मेरे सैंकड़ों और हजारों प्रकार के अलौकिक रूपों को देखो, जो अनेक रंगों और आकृतियों के हैं।",
      english: "The Supreme Lord said: My dear Arjuna, O son of Pritha, behold now My opulences, hundreds of thousands of varied divine and multicolored forms."
    }
  ],
  12: [
    {
      verseNumber: "12.1",
      sanskrit: "अर्जुन उवाच\nएवं सततयुक्ता ये भक्तास्त्वां पर्युपासते।\nये चाप्यक्षरमव्यक्तं तेषां के योगवित्तमाः॥",
      transliteration: "arjuna uvāca\nevaṁ satata-yuktā ye bhaktās tvāṁ paryupāsate\nye cāpy akṣaram avyaktaṁ teṣāṁ ke yoga-vittamāḥ",
      hindi: "अर्जुन बोले— जो भक्त निरन्तर आपके सगुण-साकार स्वरूप में मन लगाकर आपकी उपासना करते हैं, और जो अविनाशी निराकार ब्रह्म की उपासना करते हैं, उन दोनों में से उत्तम योगवेत्ता कौन हैं?",
      english: "Arjuna inquired: Which are considered to be more perfect, those who are always properly engaged in Your devotional service or those who worship the impersonal Brahman, the unmanifested?"
    },
    {
      verseNumber: "12.2",
      sanskrit: "श्रीभगवानुवाच\nमय्यावेश्य मनो ये मां नित्ययुक्ता उपासते।\nश्रद्धया परयोपेतास्ते मे युक्ततमा मताः॥",
      transliteration: "śrī-bhagavān uvāca\nmayy āveśya mano ye māṁ nitya-yuktā upāsate\nśraddhayā parayopetās te me yuktatamā matāḥ",
      hindi: "श्रीभगवान बोले— मुझमें मन को एकाग्र करके, निरन्तर मेरे ध्यान में लगे हुए जो भक्त अतिशय श्रद्धा से युक्त होकर मेरी उपासना करते हैं, वे मेरे मत में सर्वश्रेष्ठ योगी हैं।",
      english: "The Supreme Lord said: Those who fix their minds on My personal form and are always engaged in worshipping Me with great and transcendental faith are considered by Me to be most perfect."
    },
    {
      verseNumber: "12.3",
      sanskrit: "ये त्वक्षरमनिर्देश्यमव्यक्तं पर्युपासते।\nसर्वत्रगमचिन्त्यं च कूटस्थमचलं ध्रुवम्॥",
      transliteration: "ye tv akṣaram anirdeśyam avyaktaṁ paryupāsate\nsarvatragam acintyaṁ ca kūṭastham acalaṁ dhruvam",
      hindi: "किन्तु जो लोग इन्द्रियों को वश में करके, सर्वव्यापी, अचिन्त्य, कूटस्थ, अचल, ध्रुव, निराकार और अविनाशी ब्रह्म की उपासना करते हैं...",
      english: "But those who fully worship the unmanifested, that which lies beyond the perception of the senses, the all-pervading, inconceivable, unchanging, immovable and eternal..."
    },
    {
      verseNumber: "12.4",
      sanskrit: "संनियम्येन्द्रियग्रामं सर्वत्र समबुद्धयः।\nते प्राप्नुवन्ति मामेव सर्वभूतहिते रताः॥",
      transliteration: "sanniyamyendriya-grāmaṁ sarvatra sama-buddhayaḥ\nte prāpnuvanti mām eva sarva-bhūta-hite ratāḥ",
      hindi: "वे सम्पूर्ण प्राणियों के हित में लगे हुए और सभी परिस्थितियों में समबुद्धि वाले लोग भी मुझको ही प्राप्त होते हैं।",
      english: "By controlling the various senses and being equally disposed towards everyone, such persons, engaged in the welfare of all beings, at last achieve Me."
    },
    {
      verseNumber: "12.5",
      sanskrit: "क्लेशोऽधिकतरस्तेषामव्यक्तासक्तचेतसाम्।\nअव्यक्ता हि गतिर्दुःखं देहवद्भिरवाप्यते॥",
      transliteration: "kleśo’dhikataras teṣām avyaktāsakta-cetasām\navyaktā hi gatir duḥkhaṁ dehavadbhir avāpyate",
      hindi: "निराकार ब्रह्म में आसक्त चित्त वाले लोगों के साधन में कष्ट अधिक होता है; क्योंकि शरीरधारियों द्वारा अव्यक्त निराकार की गति कठिनाई से प्राप्त की जाती है।",
      english: "For those whose minds are attached to the unmanifested, impersonal feature of the Supreme, advancement is very troublesome. To make progress in that discipline is always difficult for those who are embodied."
    }
  ],
  13: [
    {
      verseNumber: "13.1",
      sanskrit: "श्रीभगवानुवाच\nइदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते।\nएतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः॥",
      transliteration: "śrī-bhagavān uvāca\nidaṁ śarīraṁ kaunteya kṣetram ity abhidhīyate\netad yo vetti taṁ prāhuḥ kṣetrajña iti tad-vidaḥ",
      hindi: "श्रीभगवान बोले— हे कुन्तीपुत्र! यह शरीर 'क्षेत्र' (वह भूमि जहाँ कर्मों के बीज बोए जाते हैं) नाम से कहा जाता है; और जो इसे जानता है, उसे तत्त्ववेत्ता लोग 'क्षेत्रज्ञ' (जानने वाला) कहते हैं।",
      english: "The Supreme Lord said: This body, O son of Kunti, is called the field, and one who knows this body is called the knower of the field by those who are wise."
    },
    {
      verseNumber: "13.2",
      sanskrit: "क्षेत्रज्ञं चापि मां विद्धि सर्वक्षेत्रेषु भारत।\nक्षेत्रक्षेत्रज्ञयोर्ज्ञानं यत्तज्ज्ञानं मतं मम॥",
      transliteration: "kṣetrajñaṁ cāpi māṁ viddhi sarva-kṣetreṣu bhārata\nkṣetra-kṣetrajñayor jñānaṁ yat taj jñānaṁ mataṁ mama",
      hindi: "हे भारत! तुम सम्पूर्ण शरीरों (क्षेत्रों) में क्षेत्रज्ञ अर्थात् जीवात्मा भी मुझे ही समझो। क्षेत्र और क्षेत्रज्ञ का जो ज्ञान है, वही वास्तव में ज्ञान है, ऐसा मेरा मत है।",
      english: "O scion of Bharata, you should understand that I am also the knower in all bodies, and to understand this body and its knower is called knowledge in My opinion."
    },
    {
      verseNumber: "13.3",
      sanskrit: "तत्क्षेत्रं यच्च यादृक्च यद्विकारि यतश्च यत्।\nस च यो यत्प्रभावश्च तत्समासेन मे शृणु॥",
      transliteration: "tat kṣetraṁ yac ca yādṛk ca yad-vikāri yataś ca yat\nsa ca yo yat-prabhāvaś ca tat samāsena me śṛṇu",
      hindi: "वह क्षेत्र क्या है, उसका स्वरूप कैसा है, उसमें क्या विकार होते हैं, वह कहाँ से उत्पन्न होता है, तथा वह क्षेत्रज्ञ कौन है और उसका क्या प्रभाव है, उसे तुम संक्षेप में मुझसे सुनो।",
      english: "Now please hear My brief description of this field of activity, how it is constituted, what its changes are, whence it is produced, who that knower of the field is, and what his influences are."
    },
    {
      verseNumber: "13.4",
      sanskrit: "ऋषिभिर्बहुधा गीतं छन्दोभिर्विविधैः पृथक्।\nब्रह्मसूत्रपदैश्चैव हेतुमद्भिर्विनिश्चितैः॥",
      transliteration: "ṛṣibhir bahudhā gītaṁ chandobhir vividhaiḥ pṛthak\nbrahmasūtra-padaiś caiva hetumadbhir viniścitaiḥ",
      hindi: "ऋषियों द्वारा इसके विषय में अनेक प्रकार से वेदों में अलग-अलग गाया गया है, और विशेष रूप से युक्तियों से युक्त निश्चित किए गए ब्रह्मसूत्र के पदों में भी कहा गया है।",
      english: "This knowledge of the field of activities and the knower of activities is described by various sages in various Vedic writings. It is especially presented in the Brahmasutras with full reasoning as to cause and effect."
    },
    {
      verseNumber: "13.5",
      sanskrit: "महाभूतान्यहङ्कारो बुद्धिर्व्यक्तमेव च।\nइन्द्रियाणि दशैकं च पञ्च चेन्द्रियगोचराः॥",
      transliteration: "mahā-bhūtāny ahankāro buddhir avyaktam eva ca\nindriyāṇi daśaikaṁ ca pañca cendriya-gocarāḥ",
      hindi: "पाँच महाभूत (पृथ्वी, जल, तेज, वायु, आकाश), अहंकार, बुद्धि, अव्यक्त (मूल प्रकृति), दस इन्द्रियां (पाँच ज्ञानेन्द्रियां, पाँच कर्मेन्द्रियां), एक मन और पाँच इन्द्रियों के विषय...",
      english: "The five great elements, egoism, intellect, the unmanifested, the ten senses and the one mind, and the five objects of the senses..."
    }
  ],
  14: [
    {
      verseNumber: "14.1",
      sanskrit: "श्रीभगवानुवाच\nपरं भूयः प्रवक्ष्यामि ज्ञानानां ज्ञानमुत्तमम्।\nयज्ज्ञात्वा मुनयः सर्वे परां सिद्धिमितो गताः॥",
      transliteration: "śrī-bhagavān uvāca\nparaṁ bhūyaḥ pravakṣyāmi jñānānāṁ jñānam uttamam\nyaj jñātvā munayaḥ sarve parāṁ siddhim ito gatāḥ",
      hindi: "श्रीभगवान बोले— मैं ज्ञानों में भी परम उत्तम ज्ञान को फिर से कहूँगा, जिसे जानकर सम्पूर्ण मुनिजन इस संसार से मुक्त होकर परम सिद्धि को प्राप्त हो चुके हैं।",
      english: "The Supreme Lord said: I shall again declare to you this supreme wisdom, the best of all knowledge, knowing which all the sages have attained the supreme perfection after this life."
    },
    {
      verseNumber: "14.2",
      sanskrit: "इदं ज्ञानमुपाश्रित्य मम साधर्म्यमागताः।\nसर्गेऽपि नोपजायन्ते प्रलये न व्यथन्ति च॥",
      transliteration: "idaṁ jñānam upāśritya mama sādharmyam āgatāḥ\nsarge’pi nopajāyante pralaye na vyathanti ca",
      hindi: "इस ज्ञान का आश्रय लेकर जिन्होंने मेरे स्वरूप को प्राप्त कर लिया है, वे न तो सृष्टि के आरम्भ में उत्पन्न होते हैं और न ही प्रलय के समय व्याकुल होते हैं।",
      english: "By becoming established in this knowledge, one can attain to the transcendental nature like My own. Thus established, one is not born at the time of creation nor disturbed at the time of dissolution."
    },
    {
      verseNumber: "14.3",
      sanskrit: "मम योनिर्महद्ब्रह्म तस्मिन्गर्भं दधाम्यहम्।\nसम्भवाः सर्वभूतानां ततो भवति भारत॥",
      transliteration: "mama yonir mahad brahma tasmin garbhaṁ dadhāmy aham\nsambhavaḥ sarva-bhūtānāṁ tato bhavati bhārata",
      hindi: "हे भारत! मेरी महत्-ब्रह्म रूप मूल प्रकृति सम्पूर्ण भूतों की योनि (गर्भाधान का स्थान) है, मैं उसमें चेतनाविरूपी गर्भ को स्थापित करता हूँ। उससे समस्त प्राणियों की उत्पत्ति होती है।",
      english: "My physical nature, the great Brahman, is the womb in which I place the seed of consciousness, O descendant of Bharata, from which arises the birth of all living entities."
    },
    {
      verseNumber: "14.4",
      sanskrit: "सर्वयोनिषु कौन्तेय मूर्तयः सम्भवन्ति याः।\nतासां ब्रह्म महद्योनिरहं बीजप्रदः पिता॥",
      transliteration: "sarva-yoniṣu kaunteya mūrtayaḥ sambhavanti yāḥ\ntāsāṁ brahma mahad yonir ahaṁ bīja-pradaḥ pitā",
      hindi: "हे कुन्तीपुत्र! विभिन्न योनियों में जो भी मूर्तियाँ (जीव) उत्पन्न होती हैं, उन सबकी माता तो महत्-ब्रह्म प्रकृति है और मैं बीज स्थापित करने वाला पिता हूँ।",
      english: "It should be understood that all species of lives, O son of Kunti, are made possible by birth in this material nature, and that I am the seed-giving father."
    },
    {
      verseNumber: "14.5",
      sanskrit: "सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः।\nनिबध्नन्ति महाबाहो देहे देहिनमव्ययम्॥",
      transliteration: "sattvaṁ rajas tama iti guṇāḥ prakṛti-sambhavāḥ\nnibadhnanti mahā-bāho dehe dehinam avyayam",
      hindi: "हे महाबाहु अर्जुन! सत्त्वगुण, रजोगुण और तमोगुण— ये प्रकृति से उत्पन्न होने वाले तीनों गुण अविनाशी जीवात्मा को शरीर में बाँधते हैं।",
      english: "Material nature consists of three modes—goodness, passion and ignorance. When the eternal living entity comes in contact with nature, O mighty-armed Arjuna, he becomes conditioned by these modes."
    }
  ],
  15: [
    {
      verseNumber: "15.1",
      sanskrit: "श्रीभगवानुवाच\nऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम्।\nछन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित्॥",
      transliteration: "śrī-bhagavān uvāca\nūrdhva-mūlam adhaḥ-śākham aśvatthaṁ prāhur avyayam\nchandāṁsi yasya parṇāni yas taṁ veda sa veda-vit",
      hindi: "श्रीभगवान बोले— आदिपुरुष परमेश्वर रूपी ऊपर की ओर जड़ों वाले और ब्रह्मा रूपी नीचे की ओर शाखाओं वाले जिस संसार रूपी पीपल के वृक्ष को अविनाशी कहते हैं, वेद जिसके पत्ते हैं; जो इस संसार रूपी वृक्ष को जानता है, वही वेदों को जानने वाला है।",
      english: "The Supreme Lord said: It is said that there is an imperishable banyan tree that has its roots upward and its branches down and whose leaves are the Vedic hymns. One who knows this tree is the knower of the Vedas."
    },
    {
      verseNumber: "15.2",
      sanskrit: "अधश्चोर्ध्वं प्रसृतास्तस्य शाखा\nगुणप्रवृद्धा विषयप्रवालाः।\nअधश्च मूलान्यनुसन्ततानि\nकर्मानुबन्धीनि मनुष्यलोके॥",
      transliteration: "adhaś cordhvaṁ prasṛtās tasya śākhā\nguṇa-pravṛddhā viṣaya-pravālāḥ |\nadhaś ca mūlāny anusantatāni\nkarma-anubandhīni manuṣya-loke || 15.2 ||",
      hindi: "इस वृक्ष की शाखाएं तीनों गुणों द्वारा बढ़ी हुई और विषय-भोगों रूपी कोंपलों वाली नीचे और ऊपर सर्वत्र फैली हुई हैं, तथा मनुष्यों के कर्मों के अनुसार बाँधने वाली जड़ें नीचे के लोकों में भी गहराई तक गई हैं।",
      english: "The branches of this tree extend downward and upward, nourished by the three modes of material nature. The twigs are the objects of the senses. This tree also has roots going down, and these are bound to the fruitive actions of human society."
    },
    {
      verseNumber: "15.3",
      sanskrit: "न रूपमस्येह तथोपलभ्यते\nनान्तो न चादिर्न च सम्प्रतिष्ठा।\nअश्वत्थमेनं सुविरूढमूलम्\nअसङ्गशस्त्रेण दृढेन छित्त्वा॥",
      transliteration: "na rūpam asyeha tathopalabhyate\nnānto na cādir na ca sampratiṣṭhā |\naśvattham enaṁ su-virūḍha-mūlam\nasaṅga-śastreṇa dṛḍhena chittvā || 15.3 ||",
      hindi: "इस संसार वृक्ष का स्वरूप यहाँ जैसा कहा गया है वैसा नहीं दिखता; न इसका आदि है, न अन्त है और न ही इसकी स्थिति है। इस दृढ़ जड़ों वाले पीपल के वृक्ष को तीव्र अनासक्ति रूपी शस्त्र से काटकर...",
      english: "The real form of this tree cannot be perceived in this world. No one can understand where it ends, where it begins, or where its foundation is. But with determination one must cut down this strongly rooted tree with the weapon of detachment."
    },
    {
      verseNumber: "15.4",
      sanskrit: "ततः पदं तत्परिमार्गितव्यं\nयस्मिन्गता न निवर्तन्ति भूयः।\nतमेव चाद्यं पुरुषं प्रपद्ये\nयतः प्रवृत्तिः प्रसृता पुराणी॥",
      transliteration: "tataḥ padaṁ tat parimārgitavyaṁ\nyasmin gatā na nivartanti bhūyaḥ |\ntam eva cādyaṁ puruṣaṁ prapadye\nyataḥ pravṛttiḥ prasṛtā purāṇī || 15.4 ||",
      hindi: "इसके बाद उस परम पद की खोज करनी चाहिए जहाँ गए हुए साधक फिर लौटकर संसार में नहीं आते। जिस आदिपुरुष परमात्मा से इस प्राचीन संसार वृक्ष की प्रवृत्ति विस्तार को प्राप्त हुई है, मैं उसी की शरण में हूँ।",
      english: "Thereafter, one must seek that place from which, having gone, one never returns, and there surrender to that Supreme Personality of Godhead from whom everything began and from whom everything has extended since time immemorial."
    },
    {
      verseNumber: "15.5",
      sanskrit: "निर्मानमोहा जितसङ्गदोषा\nअध्यात्मनित्या विनिवृत्तकामाः।\nद्वन्द्वैर्विमुक्ताः सुखदुःखसञ्ज्ञैर्\nगच्छन्त्यमूढाः पदमव्ययं तत्॥",
      transliteration: "nirmāna-mohā jita-saṅga-doṣā\nadhyātma-nityā vinivṛtta-kāmāḥ |\ndvandvair vimuktāḥ sukha-duḥkha-sanjñair\ngacchanty amūḍhāḥ padam avyayaṁ tat || 15.5 ||",
      hindi: "मान और मोह से रहित, आसक्ति रूपी दोष को जीतने वाले, निरन्तर अध्यात्म में लीन, कामनाओं से रहित और सुख-दुःख रूपी द्वन्द्वों से मुक्त हुए विवेकी जन उस अविनाशी परम पद को प्राप्त होते हैं।",
      english: "Those who are free from false prestige, illusion and false association, who understand the eternal, who are done with material lust, who are freed from the dualities of pleasure and pain, and who, undeluded, know how to surrender unto the Supreme Person, attain to that eternal kingdom."
    }
  ],
  16: [
    {
      verseNumber: "16.1",
      sanskrit: "श्रीभगवानुवाच\nअभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः।\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम्॥",
      transliteration: "śrī-bhagavān uvāca\nabhayaṁ sattva-saṁśuddhir jñāna-yoga-vyavasthitih\ndānaṁ damaś ca yajñaś ca svādhyāyas tapa ārjavam",
      hindi: "श्रीभगवान बोले— भय का सर्वथा अभाव, अन्तःकरण की शुद्धि, ज्ञान और योग में दृढ़ स्थिति, सात्त्विक दान, इन्द्रिय-दमन, यज्ञ, स्वाध्याय (शास्त्र पठन), तप और सरलता...",
      english: "The Supreme Lord said: Fearlessness; purification of one's existence; cultivation of spiritual knowledge; charity; self-control; performance of sacrifice; study of the Vedas; austerity; simplicity..."
    },
    {
      verseNumber: "16.2",
      sanskrit: "अहिंसा सत्यमक्रोधस्त्यागः शान्तिरपैशुनम्।\nदया भूतेष्वलोलुप्त्वं मार्दवं ह्रीरचापलम्॥",
      transliteration: "ahiṁsā satyam akrodhas tyāgaḥ śāntir apaiśunam\ndayā bhūteṣv aloluptvaṁ mārdavaṁ hrīr acāpalam",
      hindi: "अहिंसा, सत्य, क्रोध न करना, त्याग, शान्ति, चुगली न करना, सब जीवों पर दया, इन्द्रिय-भोगों में न ललचाना, कोमलता, लज्जा और चंचलता का अभाव...",
      english: "Nonviolence; truthfulness; freedom from anger; renunciation; tranquility; aversion to faultfinding; compassion for all living entities; freedom from covetousness; gentleness; modesty; steady determination..."
    },
    {
      verseNumber: "16.3",
      sanskrit: "तेजः क्षमा धृतिः शौचमद्रोहो नातिमानिता।\nभवन्ति सम्पदं दैवीमभिजातस्य भारत॥",
      transliteration: "tejaḥ kṣamā dhṛtiḥ śaucam adroho nāti-mānitā\nbhavanti sampadaṁ daivīm abhijātasya bhārata",
      hindi: "तेज, क्षमा, धैर्य, शुद्धि, किसी के प्रति द्रोह-भाव न होना और अभिमान रहित होना— हे भरतवंशी अर्जुन! ये सब दैवी सम्पदा को लेकर उत्पन्न हुए पुरुष के लक्षण हैं।",
      english: "Vigor; forgiveness; fortitude; cleanliness; and freedom from envy and from the passion for honor—these transcendental qualities, O son of Bharata, belong to godly men endowed with divine nature."
    },
    {
      verseNumber: "16.4",
      sanskrit: "दम्भो दर्पोऽभिमानश्च क्रोधः पारुष्यमेव च।\nअज्ञानं चाभिजातस्य पार्थ सम्पदमासुरीम्॥",
      transliteration: "dambho darpo'bhimānaś ca krodhaḥ pāruṣyam eva ca\najñānaṁ cābhijātasya pārtha sampadam āsurīm",
      hindi: "दम्भ, घमण्ड, अभिमान, क्रोध, कठोरता और अज्ञान— हे पार्थ! ये सब आसुरी सम्पदा को लेकर उत्पन्न हुए पुरुष के लक्षण हैं।",
      english: "Pride, arrogance, conceit, anger, harshness and ignorance—these qualities belong to those of demonic nature, O son of Pritha."
    },
    {
      verseNumber: "16.5",
      sanskrit: "दैवी सम्पद्विमोक्षाय निबन्धायासुरी मता।\nमा शुचः सम्पदं दैवीमभिजातोऽसि पाण्डव॥",
      transliteration: "daivī sampad vimokṣāya nibandhāyāsurī matā\nmā śucaḥ sampadaṁ daivīm abhijāto’si pāṇḍava",
      hindi: "दैवी सम्पदा मोक्ष के लिए और आसुरी सम्पदा बंधन के लिए मानी गई है। हे पाण्डुपुत्र! तुम चिन्ता मत करो, क्योंकि तुम दैवी सम्पदा को लेकर उत्पन्न हुए हो।",
      english: "The transcendental qualities are conducive to liberation, whereas the demonic qualities make for bondage. Do not worry, O son of Pandu, for you are born with the divine qualities."
    }
  ],
  17: [
    {
      verseNumber: "17.1",
      sanskrit: "अर्जुन उवाच\nये शास्त्रविधिमुत्सृज्य यजन्ते श्रद्धयान्विताः।\nतेषां निष्ठा तु का कृष्ण सत्त्वमाहो रजस्तमः॥",
      transliteration: "arjuna uvāca\nye śāstra-vidhim utsṛjya yajante śraddhayānvitāḥ\nteṣāṁ niṣṭhā tu kā kṛṣṇa sattvam āho rajas tamaḥ",
      hindi: "अर्जुन बोले— हे कृष्ण! जो लोग शास्त्र-विधि का त्याग करके केवल श्रद्धा से युक्त होकर पूजन करते हैं, उनकी वह स्थिति (निष्ठा) कौन सी है— सात्त्विकी, राजसी अथवा तामसी?",
      english: "Arjuna inquired: O Krishna, what is the situation of those who do not follow the principles of scripture but worship according to their own imagination? Are they in goodness, in passion or in ignorance?"
    },
    {
      verseNumber: "17.2",
      sanskrit: "श्रीभगवानुवाच\nत्रिविधा भवति श्रद्धा देहिनां सा स्वभावजा।\nसात्त्विकी राजसी चैव तामसी चेति तां शृणु॥",
      transliteration: "śrī-bhagavān uvāca\ntri-vidhā bhavati śraddhā dehināṁ sā svabhāva-jā\nsāttvikī rājasī caiva tāmasī ceti tāṁ śṛṇu",
      hindi: "श्रीभगवान बोले— मनुष्यों की वह बिना शास्त्रों के स्वभाव से उत्पन्न होने वाली श्रद्धा तीन प्रकार की होती है— सात्त्विकी, राजसी और तामसी। उसे तुम सुनो।",
      english: "The Supreme Lord said: According to the modes of nature acquired by the embodied soul, one's faith can be of three kinds—in goodness, in passion or in ignorance. Now hear about this."
    },
    {
      verseNumber: "17.3",
      sanskrit: "सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत।\nश्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः॥",
      transliteration: "sattvānurūpā sarvasya śraddhā bhavati bhārata\nśraddhā-mayo’yaṁ puruṣo yo yac-chraddhaḥ sa eva sah",
      hindi: "हे भारत! सभी मनुष्यों की श्रद्धा उनके अन्तःकरण के अनुरूप होती है। यह मनुष्य श्रद्धामय है; अतः जिसकी जैसी श्रद्धा होती है, वह स्वयं भी वैसा ही होता है।",
      english: "According to one's existence under the various modes of nature, O son of Bharata, one develops a particular kind of faith. The living being is said to be of a particular faith according to the mode he has acquired."
    },
    {
      verseNumber: "17.4",
      sanskrit: "यजन्ते सात्त्विका देवान् यक्षरक्षांसि राजसाः।\nप्रेतान्भूतगणांश्चान्ये यजन्ते तामसा जनाः॥",
      transliteration: "yajante sāttvikā devān yakṣa-rakṣāṁsi rājasāḥ\npretān bhūta-gaṇāṁś cānye yajante tāmasā janāḥ",
      hindi: "सात्त्विक मनुष्य देवताओं की पूजा करते हैं, राजस मनुष्य यक्षों और राक्षसों की पूजा करते हैं, और अन्य जो तामस मनुष्य हैं, वे भूतों और प्रेतों की पूजा करते हैं।",
      english: "Men in the mode of goodness worship the demigods; those in the mode of passion worship the demons; and those in the mode of ignorance worship ghosts and spirits."
    },
    {
      verseNumber: "17.5",
      sanskrit: "अशास्त्रविहितं घोरं तप्यन्ते ये तपो जनाः।\nदम्भाहङ्कारसंयुक्ताः कामरागबलान्विताः॥",
      transliteration: "aśāstra-vihitaṁ ghoraṁ tapyante ye tapo janāḥ\ndambhāharkāra-saṁyuktāḥ kāma-rāga-balānvitāḥ",
      hindi: "जो लोग शास्त्रों के विरुद्ध घोर तप करते हैं, तथा दम्भ, अहंकार, काम, आसक्ति और हठ के बल से युक्त हैं...",
      english: "Those who undergo severe austerities and penances not recommended in the scriptures, performing them out of pride and egotism, impelled by lust and attachment..."
    }
  ],
  18: [
    {
      verseNumber: "18.1",
      sanskrit: "अर्जुन उवाच\nसंन्यासस्य महाबाहो तत्त्वमिच्छामि वेदितुम्।\nत्यागस्य च हृषीकेश पृथक्केशिनिषूदन॥",
      transliteration: "arjuna uvāca\nsannyāsasya mahā-bāho tattvam icchāmi veditum\ntyāgasya ca hṛṣīkeśa pṛthak keśi-niṣūdana",
      hindi: "अर्जुन बोले— हे महाबाहु हृषीकेश! हे केशी नाशक! मैं सन्न्यास और त्याग के तत्त्व को अलग-अलग जानना चाहता हूँ।",
      english: "Arjuna said: O mighty-armed one, I wish to understand the purpose of renunciation (sannyasa) and of the renounced order of life (tyaga), O killer of the Kesi demon, master of the senses."
    },
    {
      verseNumber: "18.2",
      sanskrit: "श्रीभगवानुवाच\nकाम्यानां कर्मणां न्यासं संन्यासं कवयो विदुः।\nसर्वकर्मफलत्यागं प्राहुस्त्यागं विचक्षणाः॥",
      transliteration: "śrī-bhagavān uvāca\nkāmyānāṁ karmaṇāṁ nyāsaṁ sannyāsaṁ kavayo viduḥ\nsarva-karma-phala-tyāgaṁ prāhus tyāgaṁ vicakṣaṇāḥ",
      hindi: "श्रीभगवान बोले— बुद्धिमान लोग काम्य कर्मों (सकाम कर्मों) के त्याग को 'सन्न्यास' समझते हैं; और सभी कर्मों के फलों के त्याग को विचारवान पुरुष 'त्याग' कहते हैं।",
      english: "The Supreme Lord said: The giving up of activities that are based on material desire is what great learned men call the renounced order of life (sannyasa). And giving up the results of all activities is what the wise call renunciation (tyaga)."
    },
    {
      verseNumber: "18.3",
      sanskrit: "त्याज्यं दोषवदित्येके कर्म प्राहुर्मनीषिणः।\nयज्ञदानतपःकर्म न त्याज्यमिति चापरे॥",
      transliteration: "tyājyaṁ doṣavad ity eke karma prāhur manīṣiṇaḥ\nyajña-dāna-tapaḥ-karma na tyājyam iti cāpare",
      hindi: "कुछ मनीषी कहते हैं कि कर्म दोषयुक्त है, अतः इसे त्याग देना चाहिए; और दूसरे विचारक कहते हैं कि यज्ञ, दान और तपरूपी कर्म का कभी त्याग नहीं करना चाहिए।",
      english: "Some learned men declare that all kinds of active work should be given up as faulty, yet other sages maintain that acts of sacrifice, charity and penance should never be abandoned."
    },
    {
      verseNumber: "18.4",
      sanskrit: "निश्चयं शृणु मे तत्र त्यागे भरतसत्तम।\nत्यागो हि पुरुषव्याघ्र त्रिविधः सम्प्रकीर्तितः॥",
      transliteration: "niścayaṁ śṛṇu me tatra tyāge bharata-sattama\ntyāgo hi puruṣa-vyāghra tri-vidhaḥ samprakīrtitaḥ",
      hindi: "हे भरतश्रेष्ठ अर्जुन! त्याग के विषय में तुम मेरा निश्चित मत सुनो। हे पुरुषों में सिंह! त्याग तीन प्रकार का कहा गया है।",
      english: "O best of the Bharatas, now hear My judgment about renunciation. O tiger among men, renunciation is declared in the scriptures to be of three kinds."
    },
    {
      verseNumber: "18.5",
      sanskrit: "यज्ञदानतपःकर्म न त्याज्यं कार्यमेव तत्।\nयज्ञो दानं तपश्चैव पावनानि मनीषिणाम्॥",
      transliteration: "yajña-dāna-tapaḥ-karma na tyājyaṁ kāryam eva tat\nyajño dānaṁ tapaś caiva pāvanāni manīṣiṇām",
      hindi: "यज्ञ, दान और तपरूपी कर्म का त्याग नहीं करना चाहिए, अपितु इसे अवश्य करना चाहिए; क्योंकि यज्ञ, दान और तप मनीषी पुरुषों को भी पवित्र करने वाले हैं।",
      english: "Acts of sacrifice, charity and penance are not to be given up; they must be performed. Indeed, sacrifice, charity and penance purify even the great souls."
    }
  ]
};
