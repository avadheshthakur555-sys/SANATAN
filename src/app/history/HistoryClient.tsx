"use client";

import React, { useState, useEffect, startTransition } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";
import { 
  Compass, History, Globe, Leaf, ChevronDown, CheckCircle, Sparkles, Scroll as ScrollIcon, Feather,
  Users, BookOpen, Award
} from "lucide-react";

interface ChapterData {
  id: number;
  title: string;
  sanskritTitle: string;
  date: string;
  headline: string;
  storySummary: string;
  keyFigures: string;
  keyScripture: string;
  whyItMatters: string;
  imagePath: string;
}

const CHAPTERS: ChapterData[] = [
  {
    id: 1,
    title: "Origins of Dharma",
    sanskritTitle: "सनातनधर्मोत्पत्तिः",
    date: "~75,000 BCE",
    headline: "Dawn of the Cosmic Order",
    storySummary: "In the primordial mists of ancient India, along the banks of glacier-fed rivers, humanity first awakened to the cosmic rhythms of nature. Sages in silent forest contemplation perceived Rta—the self-regulating, eternal order of the cosmos. Early communities gathered around sacred fires, laying the foundations of the Eternal Way (Sanatan Dharma) through rituals of purification and cosmic harmony.",
    keyFigures: "Primordial Sages (Adi Rishis)",
    keyScripture: "Rigvedic Hymns on Rta",
    whyItMatters: "It demonstrates that spiritual awareness and ecological consciousness are not recent constructs but co-evolved with human consciousness.",
    imagePath: "/images/origins-dharma.png"
  },
  {
    id: 2,
    title: "Vedic Revelation",
    sanskritTitle: "वेदसंज्ञा",
    date: "~3500 - 1500 BCE",
    headline: "The Eternal Breath of Sound",
    storySummary: "High in the pristine cave sanctuaries of the Himalayas, the Saptarishis (Seven Sages) entered deep states of meditative absorption (Samadhi). Within the quiet of their inner space, they cognized the Shruti—the timeless, uncreated vibrational sounds of the universe. These were not composed but 'heard', preserved with absolute phonetic precision through oral recitation for millennia.",
    keyFigures: "Saptarishis (Vashistha, Viswamitra, Bharadvaja)",
    keyScripture: "The Four Vedas (Rig, Sama, Yajur, Atharva)",
    whyItMatters: "It represents the most successful oral preservation system in human history, keeping ancient heritage 100% intact.",
    imagePath: "/images/vedic-revelation.png"
  },
  {
    id: 3,
    title: "Ramayana Era",
    sanskritTitle: "रामायणकालः",
    date: "~2500 BCE (Traditional)",
    headline: "The Path of the Ideal Human",
    storySummary: "The divine prince Rama, embodiment of righteousness (Maryada), accepted a fourteen-year forest exile to honor his father's word. From the courts of Ayodhya, through the deep wilderness of Dandakaranya, and across the ocean bridge to Lanka, his journey established the model of living within moral boundaries, duty, and unconditional devotion.",
    keyFigures: "Sri Rama, Sita Devi, Lakshmana, Hanuman",
    keyScripture: "Valmiki Ramayana (Adikavya)",
    whyItMatters: "It offers the definitive moral blueprint for personal relations, leadership, and ethical society (Ramrajya).",
    imagePath: "/images/ramayana-era.png"
  },
  {
    id: 4,
    title: "Mahabharata Era",
    sanskritTitle: "महाभारतकालः",
    date: "~3102 BCE (Traditional)",
    headline: "Duty Amidst the Storm",
    storySummary: "On the war-torn plains of Kurukshetra, the cosmic conflict of duty unfolded. As the archer Arjuna faltered in despair, Lord Krishna froze time between the two armies to deliver the Bhagavad Gita. He revealed the eternal nature of the soul (Atman), the yoga of selfless action (Karma Yoga), and his grand cosmic form (Vishvarupa).",
    keyFigures: "Sri Krishna, Arjuna, Bhishma, Vyasa",
    keyScripture: "Bhagavad Gita / Mahabharata",
    whyItMatters: "It teaches that spiritual wisdom is not just for quiet caves, but must be lived in the midst of life's heaviest conflicts.",
    imagePath: "/images/mahabharata-era.png"
  },
  {
    id: 5,
    title: "Upanishadic Wisdom",
    sanskritTitle: "उपनिषद्ज्ञानम्",
    date: "~1500 - 600 BCE",
    headline: "The Dialogues of Absolute Oneness",
    storySummary: "Moving away from external rituals, seekers gathered in forest hermitages (Aranyakas) around realized masters. Through profound dialogues and relentless questioning, they sought the core of existence. They arrived at the ultimate realization: the individual soul (Atman) is identical to the universal consciousness (Brahman).",
    keyFigures: "Sage Yajnavalkya, Gargi Vachaknavi, King Janaka",
    keyScripture: "Major Upanishads (Brihadaranyaka, Chandogya, Katha)",
    whyItMatters: "It shifted human focus from outward ceremonies to internal meditation and philosophical self-inquiry.",
    imagePath: "/images/upanishadic-wisdom.png"
  },
  {
    id: 6,
    title: "Classical Bharat",
    sanskritTitle: "सुवर्णयुगः",
    date: "~800 BCE - 400 CE",
    headline: "The Synthesis of Science and Spirit",
    storySummary: "Bharat became a global lighthouse of knowledge. Universities like Takshashila and Nalanda drew thousands of international scholars. This era witnessed massive achievements in Sanskrit grammar, mathematics (the concept of Zero), surgery, astronomy, and statecraft—perfectly balancing rational science with spiritual depth.",
    keyFigures: "Panini, Sushruta, Aryabhata, Chanakya",
    keyScripture: "Ashtadhyayi, Sushruta Samhita, Arthashastra",
    whyItMatters: "It demonstrated that rigorous science and deep spirituality are not opposites, but twin expressions of the same truth.",
    imagePath: "/images/civilization-journey.png"
  },
  {
    id: 7,
    title: "Yoga Tradition",
    sanskritTitle: "योगपरम्परा",
    date: "~500 BCE - 200 CE",
    headline: "The Science of Mind Control",
    storySummary: "Recognizing that a chaotic mind is the source of human suffering, Sage Patanjali systematically compiled the Yoga Sutras. He structured the Eightfold Path (Ashtanga)—from ethical disciplines (Yama-Niyama) to physical postures (Asana), breath control (Pranayama), and final absorption (Samadhi), turning spirituality into an exact science.",
    keyFigures: "Sage Patanjali, Early Nath Yogis",
    keyScripture: "Patanjali's Yoga Sutras",
    whyItMatters: "It provided a universal, non-sectarian methodology for human self-mastery and mental peace.",
    imagePath: "/images/deities/shiva.png"
  },
  {
    id: 8,
    title: "Jain Tradition",
    sanskritTitle: "जैनधर्मः",
    date: "~599 - 527 BCE",
    headline: "The Triumph of Non-Violence",
    storySummary: "Vardhamana Mahavira, the 24th Tirthankara, renounced his kingdom to seek liberation. He revitalized the Jain path, emphasizing Ahimsa (absolute non-injury to all living beings), Anekantavada (the multi-faceted nature of truth), and Aparigraha (non-possession), showing the path of extreme self-conquest and purity.",
    keyFigures: "Bhagavan Mahavira, Tirthankara Parsvanatha",
    keyScripture: "Tattvartha Sutra, Kalpa Sutra",
    whyItMatters: "It established non-violence as the supreme ethical duty (Ahimsa Paramo Dharmah), deeply shaping Bharat's moral fiber.",
    imagePath: "/images/jain-tradition.png"
  },
  {
    id: 9,
    title: "Buddhist Tradition",
    sanskritTitle: "बौद्धपरम्परा",
    date: "~563 - 483 BCE",
    headline: "The Middle Path to Peace",
    storySummary: "Prince Siddhartha Gautama walked away from luxury to understand the cause of human sorrow. Under the Bodhi tree in Gaya, he achieved supreme enlightenment, becoming the Buddha. He taught the Four Noble Truths and the Eightfold Path, offering a practical way to transcend desires and enter the state of Nirvana.",
    keyFigures: "Gautama Buddha, Emperor Ashoka",
    keyScripture: "Dhammapada, Tripitaka",
    whyItMatters: "It spread the light of compassion and mindfulness across Asia, forming a bridge of peace between nations.",
    imagePath: "/images/buddhist-tradition.png"
  },
  {
    id: 10,
    title: "Puranic Age",
    sanskritTitle: "पौराणिकयुगः",
    date: "~300 - 1000 CE",
    headline: "The Tapestry of Divine Stories",
    storySummary: "To bring deep philosophical truths to the common person, sages composed the Puranas. Through grand stories of creation, yugas, deities, and kings, they explained the laws of karma and devotion. This era saw the rise of majestic stone-cut temples, elaborate festivals, and the worship of Shiva, Vishnu, and Devi.",
    keyFigures: "Sage Vyasa, Gupta Rulers, Temple Architects",
    keyScripture: "Srimad Bhagavatam, Vishnu Purana, Shiva Purana",
    whyItMatters: "It translated abstract philosophy into a vibrant, living culture of storytelling, arts, and community festivals.",
    imagePath: "/images/deities/vishnu.png"
  },
  {
    id: 11,
    title: "Adi Shankaracharya",
    sanskritTitle: "आदिशङ्कराचार्यः",
    date: "~788 - 820 CE",
    headline: "The Unifier of the Four Corners",
    storySummary: "In a lifespan of just thirty-two years, a young monk walked the entire length of Bharat on foot. With razor-sharp logic, he engaged in intellectual debates, revived the non-dual truth of Advaita Vedanta, and established four spiritual monasteries (Mathas) in the North, South, East, and West, reunifying the spiritual borders of the land.",
    keyFigures: "Adi Shankaracharya, Padmapada, Totakacharya",
    keyScripture: "Vivekachudamani, Brahma Sutra Bhashya",
    whyItMatters: "He provided a logical, intellectual shield to Sanatan Dharma, showing that the ultimate reality is one without a second.",
    imagePath: "/images/temples/kedarnath.jpg"
  },
  {
    id: 12,
    title: "Bhakti Revolution",
    sanskritTitle: "भक्तिआन्दोलनम्",
    date: "~1000 - 1700 CE",
    headline: "The Ecstasy of Divine Love",
    storySummary: "A wave of devotional ecstasy swept across Bharat, dissolving social divisions. Poet-saints sang in the language of the common people. They taught that God does not belong to dry libraries or rigid rules, but to the heart of anyone who loves. Mirabai sang for Krishna, Kabir wove verses of unity, and Chaitanya danced in kirtan.",
    keyFigures: "Mirabai, Sant Kabir, Chaitanya Mahaprabhu, Sant Tukaram",
    keyScripture: "Ramcharitmanas, Sur Sagar, Kabir Bijak",
    whyItMatters: "It democratized spiritual life, making liberation accessible to all through simple, heartfelt love.",
    imagePath: "/images/deities/durga.png"
  },
  {
    id: 13,
    title: "Sikh Gurus",
    sanskritTitle: "सिखगुरुपरम्परा",
    date: "1469 - 1708 CE",
    headline: "The Path of Truth and Sacrifice",
    storySummary: "Beginning with Guru Nanak, ten spiritual masters established a path of absolute devotion, equality, and social justice. Facing severe oppression, the Gurus stood as shields for the freedom of faith. Guru Gobind Singh created the Khalsa—saint-soldiers dedicated to protecting the innocent and standing for truth.",
    keyFigures: "Guru Nanak Dev, Guru Tegh Bahadur, Guru Gobind Singh",
    keyScripture: "Guru Granth Sahib",
    whyItMatters: "It combined deep mystical devotion with active, fearless protection of human rights and religious freedom.",
    imagePath: "/images/sikh-gurus.png"
  },
  {
    id: 14,
    title: "Colonial Renaissance",
    sanskritTitle: "नवजागरणकालः",
    date: "~1800 - 1920 CE",
    headline: "The Awakening of Global Vedanta",
    storySummary: "Faced with British colonial rule and cultural criticism, Bharat's spiritual core rose in defense. Reformers purified social practices, and in 1893, Swami Vivekananda stood before the Parliament of Religions in Chicago. By addressing the audience as 'Sisters and brothers of America', he introduced the timeless wisdom of Vedanta and Yoga to the global mind.",
    keyFigures: "Swami Vivekananda, Sri Ramakrishna, Maharishi Dayananda, Sri Aurobindo",
    keyScripture: "Complete Works of Swami Vivekananda, The Life Divine",
    whyItMatters: "It restored national self-esteem and launched the global spread of Indian philosophy to the Western hemisphere.",
    imagePath: "/images/hero-temple-sanctum.png"
  },
  {
    id: 15,
    title: "Independence Era",
    sanskritTitle: "स्वतन्त्रतासङ्ग्रामः",
    date: "1920 - 1950 CE",
    headline: "The Strength of Truth",
    storySummary: "The struggle for freedom became a modern expression of Dharma. Drawing inspiration from the Bhagavad Gita, leaders launched movements based on Satyagraha (insistence on truth) and Ahimsa (non-violence). The moral force of ancient teachings proved stronger than colonial empires, leading to the birth of a free democratic republic.",
    keyFigures: "Mahatma Gandhi, Sardar Patel, Netaji Subhas Chandra Bose",
    keyScripture: "Bhagavad Gita (interpreted as a guide to action)",
    whyItMatters: "It showed that ancient spiritual values can be used as practical tools for political liberation and social reform.",
    imagePath: "/images/hero-curtain-alt.jpg"
  },
  {
    id: 16,
    title: "Modern Global Dharma",
    sanskritTitle: "वैश्विकसनातनधर्मः",
    date: "1950 CE - Present",
    headline: "The Flow of Eternal Wisdom Today",
    storySummary: "In the digital age, Sanatan Dharma has crossed all oceans. Millions practice Yoga and meditation for well-being. Modern physics converges with Upanishadic concepts of cosmic scales. Ancient Sanskrit texts are preserved in cloud archives, and grand temples rise on every continent, ensuring the eternal stream continues to guide humanity.",
    keyFigures: "Global Yoga Teachers, Sanskrit Scholars, Digital Archivists",
    keyScripture: "Digital Archives of the Vedas and Gita",
    whyItMatters: "It shows that Sanatan Dharma's principles of peace, harmony, and cosmic unity are crucial guides for the global future.",
    imagePath: "/images/temples/somnath.jpg"
  }
];

const ROMAN_NUMERALS = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI"];

const TRANSLATIONS = {
  EN: {
    pilgrimageTitle: "Journey Through Sanatan Civilization",
    pilgrimageSubtitle: "A Sacred Graphic Novel of Sanatan Dharma",
    pilgrimageDesc: "A visual narrative chronicle spanning thousands of years of Dharma history. Designed like an ancient travel manuscript, bringing sacred landscapes and cosmic stories to life.",
    jumpToMilestone: "Jump to Chapter",
    keyFigures: "Key Figures",
    keyScripture: "Key Scripture",
    whyItMatters: "Why It Matters",
    legacy: "Historical Legacy",
    continueJourney: "Continue Journey to Chapter",
    presentDayTitle: "Sanatan Dharma Today",
    presentDaySubtitle: "The Eternal Stream in the 21st Century",
    globalYoga: "Global Yoga",
    globalYogaDesc: "Over 300 million practitioners globally cultivating mindfulness, physical health, and mental peace based on the Yoga Sutras.",
    vedanta: "Vedanta Philosophy",
    vedantaDesc: "The global spread of non-dual consciousness and oneness, integrating with modern physics and cosmic inquiry.",
    ayurveda: "Ayurveda Medicine",
    ayurvedaDesc: "Natural, holistic healthcare restoring harmony between mind, body, and ecology.",
    digitalPreservation: "Digital Preservation",
    digitalPreservationDesc: "Sanskrit digital cloud archives, AI translation, and blockchain-protected manuscript databases ensuring preservation for millennia.",
    futureDharma: "Future of Dharma",
    futureDharmaDesc: "Guiding the planetary future through the principles of Vasudhaiva Kutumbakam (The World is One Family) and ecological divinity."
  },
  HI: {
    pilgrimageTitle: "सनातन सभ्यता की यात्रा",
    pilgrimageSubtitle: "सनातन धर्म का एक सचित्र महाकाव्य",
    pilgrimageDesc: "धर्म के इतिहास के हजारों वर्षों का एक दृश्य आख्यान। एक प्राचीन यात्रा पांडुलिपि की तरह डिज़ाइन किया गया, जो पवित्र परिदृश्यों और ब्रह्मांडीय कहानियों को जीवंत करता है।",
    jumpToMilestone: "अध्याय पर जाएँ",
    keyFigures: "प्रमुख व्यक्तित्व",
    keyScripture: "प्रमुख ग्रंथ",
    whyItMatters: "यह क्यों महत्वपूर्ण है",
    legacy: "ऐतिहासिक विरासत",
    continueJourney: "अध्याय पर यात्रा जारी रखें",
    presentDayTitle: "आज का सनातन धर्म",
    presentDaySubtitle: "२१वीं सदी में बहती शाश्वत धारा",
    globalYoga: "वैश्विक योग",
    globalYogaDesc: "योग सूत्रों पर आधारित मानसिक शांति और शारीरिक स्वास्थ्य के लिए दुनिया भर में ३० करोड़ से अधिक अभ्यासकर्ता।",
    vedanta: "वेदान्त दर्शन",
    vedantaDesc: "अद्वैत चेतना और एकता का वैश्विक प्रसार, जो आधुनिक भौतिकी और ब्रह्मांडीय जांच के साथ एकीकृत हो रहा है।",
    ayurveda: "आयुर्वेद विज्ञान",
    ayurvedaDesc: "मन, शरीर और पर्यावरण के बीच सद्भाव को बहाल करने वाली प्राकृतिक, समग्र स्वास्थ्य सेवा।",
    digitalPreservation: "डिजिटल संरक्षण",
    digitalPreservationDesc: "संस्कृत डिजिटल क्लाउड अभिलेखागार, एआई अनुवाद, और पांडुलिपि डेटाबेस जो आने वाले सहस्राब्दियों के लिए संरक्षण सुनिश्चित करते हैं।",
    futureDharma: "धर्म का भविष्य",
    futureDharmaDesc: "वसुधैव कुटुम्बकम् और पर्यावरण-दिव्यता के सिद्धांतों के माध्यम से वैश्विक भविष्य का मार्गदर्शन करना।"
  },
  SA: {
    pilgrimageTitle: "सनातनसभ्यतायाः यात्रा",
    pilgrimageSubtitle: "सनातनधर्मस्य सचित्रं महाकाव्यम्",
    pilgrimageDesc: "धर्मेतिहासस्य सहस्रशः वर्षाणां दृश्यरूपकम्। प्राचीनयात्राग्रन्थवत् रचितम्, यत् पवित्रभूमिकाः दार्शनिककथाः च प्रदर्शयति।",
    jumpToMilestone: "अध्यायं चिनुत",
    keyFigures: "मुख्यपुरुषाः",
    keyScripture: "मुख्यशास्त्रम्",
    whyItMatters: "किमर्थं महत्त्वपूर्णम्",
    legacy: "ऐतिहासिकविरासत",
    continueJourney: "अध्यायं प्रति यात्रां निरन्तरं कुरु",
    presentDayTitle: "अद्यतनः सनातनधर्मः",
    presentDaySubtitle: "एकविंशतिशताब्द्यां शाश्वती धारा",
    globalYoga: "वैश्विकयोगः",
    globalYogaDesc: "योगसूत्रानुसारं मानसिकशान्तये शारीरिकस्वास्थ्यलाभाय च विश्वे त्रिंशत्कोटिभ्यः अधिकजनाः योगं कुर्वन्ति।",
    vedanta: "वेदान्तदर्शनम्",
    vedantaDesc: "अद्वैतचेतनायाः वैश्विकप्रसारः, यः आधुनिकभौतिकशास्त्रेण सह एकीकृतः भवति।",
    ayurveda: "आयुर्वेदशास्त्रम्",
    ayurvedaDesc: "मनसः, शरीरस्य, प्रकृतेश्च सामञ्जस्यं स्थापयन्ती स्वाभाविकी समग्रचिकित्सा।",
    digitalPreservation: "अङ्कीयसंरक्षणम्",
    digitalPreservationDesc: "संस्कृतग्रन्थानां अङ्कीयमेघसञ्चयः, कृत्रिममेधा-अनुवादः च, yeन ज्ञानं सुरक्षितं भवति।",
    futureDharma: "धर्मस्य भविष्यम्",
    futureDharmaDesc: "वसुधैवकुटुम्बकम् इति सिद्धान्तेन वैश्विकभविष्यस्य दिव्यमार्गदर्शनम्।"
  }
};

const CHAPTER_TRANSLATIONS = {
  EN: {
    1: {
      title: "Origins of Dharma",
      headline: "Dawn of the Cosmic Order",
      storySummary: "In the primordial mists of ancient India, along the banks of glacier-fed rivers, humanity first awakened to the cosmic rhythms of nature. Sages in silent forest contemplation perceived Rta—the self-regulating, eternal order of the cosmos. Early communities gathered around sacred fires, laying the foundations of the Eternal Way (Sanatan Dharma) through rituals of purification and cosmic harmony.",
      keyFigures: "Primordial Sages (Adi Rishis)",
      keyScripture: "Rigvedic Hymns on Rta",
      whyItMatters: "It demonstrates that spiritual awareness and ecological consciousness co-evolved with human consciousness.",
      legacy: "Established the concept of ecological harmony and Rta, which still guides Hindu respect for nature."
    },
    2: {
      title: "Vedic Revelation",
      headline: "The Eternal Breath of Sound",
      storySummary: "High in the pristine cave sanctuaries of the Himalayas, the Saptarishis (Seven Sages) entered deep states of meditative absorption (Samadhi). Within the quiet of their inner space, they cognized the Shruti—the timeless, uncreated vibrational sounds of the universe. These were not composed but 'heard', preserved with absolute phonetic precision through oral recitation for millennia.",
      keyFigures: "Saptarishis (Vashistha, Viswamitra, Bharadvaja)",
      keyScripture: "The Four Vedas (Rig, Sama, Yajur, Atharva)",
      whyItMatters: "It represents the most successful oral preservation system in human history, keeping ancient heritage 100% intact.",
      legacy: "Created the phonetic and oral chanting systems recognized by UNESCO as a masterpiece of human heritage."
    },
    3: {
      title: "Ramayana Era",
      headline: "The Path of the Ideal Human",
      storySummary: "The divine prince Rama, embodiment of righteousness (Maryada), accepted a fourteen-year forest exile to honor his father's word. From the courts of Ayodhya, through the deep wilderness of Dandakaranya, and across the ocean bridge to Lanka, his journey established the model of living within moral boundaries, duty, and unconditional devotion.",
      keyFigures: "Sri Rama, Sita Devi, Lakshmana, Hanuman",
      keyScripture: "Valmiki Ramayana (Adikavya)",
      whyItMatters: "It offers the definitive moral blueprint for personal relations, leadership, and ethical society (Ramrajya).",
      legacy: "Formed the bedrock of social duties, ideals of governance, and family structures across Asia."
    },
    4: {
      title: "Mahabharata Era",
      headline: "Duty Amidst the Storm",
      storySummary: "On the war-torn plains of Kurukshetra, the cosmic conflict of duty unfolded. As the archer Arjuna faltered in despair, Lord Krishna froze time between the two armies to deliver the Bhagavad Gita. He revealed the eternal nature of the soul (Atman), the yoga of selfless action (Karma Yoga), and his grand cosmic form (Vishvarupa).",
      keyFigures: "Sri Krishna, Arjuna, Bhishma, Vyasa",
      keyScripture: "Bhagavad Gita / Mahabharata",
      whyItMatters: "It teaches that spiritual wisdom is not just for quiet caves, but must be lived in the midst of life's heaviest conflicts.",
      legacy: "Gave birth to the Bhagavad Gita, the universal handbook of crisis management and selfless duty."
    },
    5: {
      title: "Upanishadic Wisdom",
      headline: "The Dialogues of Absolute Oneness",
      storySummary: "Moving away from external rituals, seekers gathered in forest hermitages (Aranyakas) around realized masters. Through profound dialogues and relentless questioning, they sought the core of existence. They arrived at the ultimate realization: the individual soul (Atman) is identical to the universal consciousness (Brahman).",
      keyFigures: "Sage Yajnavalkya, Gargi Vachaknavi, King Janaka",
      keyScripture: "Major Upanishads (Brihadaranyaka, Chandogya, Katha)",
      whyItMatters: "It shifted human focus from outward ceremonies to internal meditation and philosophical self-inquiry.",
      legacy: "Shaped global non-dual philosophy, directly influencing Western thinkers like Schopenhauer and Emerson."
    },
    6: {
      title: "Classical Bharat",
      headline: "The Synthesis of Science and Spirit",
      storySummary: "Bharat became a global lighthouse of knowledge. Universities like Takshashila and Nalanda drew thousands of international scholars. This era witnessed massive achievements in Sanskrit grammar, mathematics (the concept of Zero), surgery, astronomy, and statecraft—perfectly balancing rational science with spiritual depth.",
      keyFigures: "Panini, Sushruta, Aryabhata, Chanakya",
      keyScripture: "Ashtadhyayi, Sushruta Samhita, Arthashastra",
      whyItMatters: "It demonstrated that rigorous science and deep spirituality are not opposites, but twin expressions of the same truth.",
      legacy: "Pioneered foundational concepts of mathematics (Zero), surgery (Sushruta), grammar (Panini), and global trade."
    },
    7: {
      title: "Yoga Tradition",
      headline: "The Science of Mind Control",
      storySummary: "Recognizing that a chaotic mind is the source of human suffering, Sage Patanjali systematically compiled the Yoga Sutras. He structured the Eightfold Path (Ashtanga)—from ethical disciplines (Yama-Niyama) to physical postures (Asana), breath control (Pranayama), and final absorption (Samadhi), turning spirituality into an exact science.",
      keyFigures: "Sage Patanjali, Early Nath Yogis",
      keyScripture: "Patanjali's Yoga Sutras",
      whyItMatters: "It provided a universal, non-sectarian methodology for human self-mastery and mental peace.",
      legacy: "Evolved into the world's premier wellness system, transforming the mental and physical health of millions."
    },
    8: {
      title: "Jain Tradition",
      headline: "The Triumph of Non-Violence",
      storySummary: "Vardhamana Mahavira, the 24th Tirthankara, renounced his kingdom to seek liberation. He revitalized the Jain path, emphasizing Ahimsa (absolute non-injury to all living beings), Anekantavada (the multi-faceted nature of truth), and Aparigraha (non-possession), showing the path of extreme self-conquest and purity.",
      keyFigures: "Bhagavan Mahavira, Tirthankara Parsvanatha",
      keyScripture: "Tattvartha Sutra, Kalpa Sutra",
      whyItMatters: "It established non-violence as the supreme ethical duty (Ahimsa Paramo Dharmah), deeply shaping Bharat's moral fiber.",
      legacy: "Solidified absolute non-violence (Ahimsa) and multiplicity of truth (Anekantavada) in Indian ethos."
    },
    9: {
      title: "Buddhist Tradition",
      headline: "The Middle Path to Peace",
      storySummary: "Prince Siddhartha Gautama walked away from luxury to understand the cause of human sorrow. Under the Bodhi tree in Gaya, he achieved supreme enlightenment, becoming the Buddha. He taught the Four Noble Truths and the Eightfold Path, offering a practical way to transcend desires and enter the state of Nirvana.",
      keyFigures: "Gautama Buddha, Emperor Ashoka",
      keyScripture: "Dhammapada, Tripitaka",
      whyItMatters: "It spread the light of compassion and mindfulness across Asia, forming a bridge of peace between nations.",
      legacy: "Spread mindfulness, meditation, and compassion globally, establishing peace routes across East and South Asia."
    },
    10: {
      title: "Puranic Age",
      headline: "The Tapestry of Divine Stories",
      storySummary: "To bring deep philosophical truths to the common person, sages composed the Puranas. Through grand stories of creation, yugas, deities, and kings, they explained the laws of karma and devotion. This era saw the rise of majestic stone-cut temples, elaborate festivals, and the worship of Shiva, Vishnu, and Devi.",
      keyFigures: "Sage Vyasa, Gupta Rulers, Temple Architects",
      keyScripture: "Srimad Bhagavatam, Vishnu Purana, Shiva Purana",
      whyItMatters: "It translated abstract philosophy into a vibrant, living culture of storytelling, arts, and community festivals.",
      legacy: "Revitalized daily ritual, temple architecture, and festival culture that define modern Hinduism today."
    },
    11: {
      title: "Adi Shankaracharya",
      headline: "The Unifier of the Four Corners",
      storySummary: "In a lifespan of just thirty-two years, a young monk walked the entire length of Bharat on foot. With razor-sharp logic, he engaged in intellectual debates, revived the non-dual truth of Advaita Vedanta, and established four spiritual monasteries (Mathas) in the North, South, East, and West, reunifying the spiritual borders of the land.",
      keyFigures: "Adi Shankaracharya, Padmapada, Totakacharya",
      keyScripture: "Vivekachudamani, Brahma Sutra Bhashya",
      whyItMatters: "He provided a logical, intellectual shield to Sanatan Dharma, showing that the ultimate reality is one without a second.",
      legacy: "Re-established the intellectual supremacy of Advaita Vedanta and unified Bharat through the four Mathas."
    },
    12: {
      title: "Bhakti Revolution",
      headline: "The Ecstasy of Divine Love",
      storySummary: "A wave of devotional ecstasy swept across Bharat, dissolving social divisions. Poet-saints sang in the language of the common people. They taught that God does not belong to dry libraries or rigid rules, but to the heart of anyone who loves. Mirabai sang for Krishna, Kabir wove verses of unity, and Chaitanya danced in kirtan.",
      keyFigures: "Mirabai, Sant Kabir, Chaitanya Mahaprabhu, Sant Tukaram",
      keyScripture: "Ramcharitmanas, Sur Sagar, Kabir Bijak",
      whyItMatters: "It democratized spiritual life, making liberation accessible to all through simple, heartfelt love.",
      legacy: "Democratized spirituality, empowering poets from all backgrounds to express divine love in native languages."
    },
    13: {
      title: "Sikh Gurus",
      headline: "The Path of Truth and Sacrifice",
      storySummary: "Beginning with Guru Nanak, ten spiritual masters established a path of absolute devotion, equality, and social justice. Facing severe oppression, the Gurus stood as shields for the freedom of faith. Guru Gobind Singh created the Khalsa—saint-soldiers dedicated to protecting the innocent and standing for truth.",
      keyFigures: "Guru Nanak Dev, Guru Tegh Bahadur, Guru Gobind Singh",
      keyScripture: "Guru Granth Sahib",
      whyItMatters: "It combined deep mystical devotion with active, fearless protection of human rights and religious freedom.",
      legacy: "Infused the concept of selfless service (Langar) and the fearless defense of human rights into the global spirit."
    },
    14: {
      title: "Colonial Renaissance",
      headline: "The Awakening of Global Vedanta",
      storySummary: "Faced with British colonial rule and cultural criticism, Bharat's spiritual core rose in defense. Reformers purified social practices, and in 1893, Swami Vivekananda stood before the Parliament of Religions in Chicago. By addressing the audience as 'Sisters and brothers of America', he introduced the timeless wisdom of Vedanta and Yoga to the global mind.",
      keyFigures: "Swami Vivekananda, Sri Ramakrishna, Maharishi Dayananda, Sri Aurobindo",
      keyScripture: "Complete Works of Swami Vivekananda, The Life Divine",
      whyItMatters: "It restored national self-esteem and launched the global spread of Indian philosophy to the Western hemisphere.",
      legacy: "Introduced Vedanta to the global stage through Swami Vivekananda, inspiring modern spiritual movements."
    },
    15: {
      title: "Independence Era",
      headline: "The Strength of Truth",
      storySummary: "The struggle for freedom became a modern expression of Dharma. Drawing inspiration from the Bhagavad Gita, leaders launched movements based on Satyagraha (insistence on truth) and Ahimsa (non-violence). The moral force of ancient teachings proved stronger than colonial empires, leading to the birth of a free democratic republic.",
      keyFigures: "Mahatma Gandhi, Sardar Patel, Netaji Subhas Chandra Bose",
      keyScripture: "Bhagavad Gita (interpreted as a guide to action)",
      whyItMatters: "It showed that ancient spiritual values can be used as practical tools for political liberation and social reform.",
      legacy: "Demonstrated that passive resistance (Satyagraha) and moral force can dismantle global empires."
    },
    16: {
      title: "Modern Global Dharma",
      headline: "The Flow of Eternal Wisdom Today",
      storySummary: "In the digital age, Sanatan Dharma has crossed all oceans. Millions practice Yoga and meditation for well-being. Modern physics converges with Upanishadic concepts of cosmic scales. Ancient Sanskrit texts are preserved in cloud archives, and grand temples rise on every continent, ensuring the eternal stream continues to guide humanity.",
      keyFigures: "Global Yoga Teachers, Sanskrit Scholars, Digital Archivists",
      keyScripture: "Digital Archives of the Vedas and Gita",
      whyItMatters: "It shows that Sanatan Dharma's principles of peace, harmony, and cosmic unity are crucial guides for the global future.",
      legacy: "Propelled ancient wisdom into the digital space, blending quantum physics with non-dual consciousness."
    }
  },
  HI: {
    1: {
      title: "धर्म का उद्गम",
      headline: "ब्रह्मांडीय व्यवस्था का उदय",
      storySummary: "प्राचीन भारत के आदिम कोहरे में, हिमनद से पोषित नदियों के किनारे, मानवता पहली बार प्रकृति की ब्रह्मांडीय लय के प्रति जागृत हुई। जंगलों में मौन चिंतन में लीन ऋषियों ने ऋत को महसूस किया - जो ब्रह्मांड की स्व-नियमन और शाश्वत व्यवस्था है। शुरुआती समुदाय पवित्र अग्नि के चारों ओर एकत्र हुए, और उन्होंने शुद्धिकरण और ब्रह्मांडीय सद्भाव के अनुष्ठानों के माध्यम से शाश्वत मार्ग (सनातन धर्म) की नींव रखी।",
      keyFigures: "आदि ऋषि",
      keyScripture: "ऋग्वेद के ऋत सूक्त",
      whyItMatters: "यह दर्शाता है कि आध्यात्मिक चेतना और पारिस्थितिक जागरूकता हाल की संरचनाएँ नहीं हैं बल्कि मानव चेतना के साथ ही विकसित हुई हैं।",
      legacy: "पारिस्थितिक सद्भाव और ऋत की अवधारणा स्थापित की, जो आज भी प्रकृति के प्रति हिंदू सम्मान का मार्गदर्शन करती है।"
    },
    2: {
      title: "वैदिक प्रकटीकरण",
      headline: "ध्वनी की शाश्वत श्वास",
      storySummary: "हिमालय की प्राचीन कंदराओं में, सप्तर्षियों ने गहन ध्यान और समाधि की अवस्था में प्रवेश किया। अपने आंतरिक आकाश की शांति में, उन्होंने श्रुति को अनुभव किया - जो ब्रह्मांड की शाश्वत, अनादि ध्वनि कंपन है। ये रचे नहीं गए थे बल्कि 'सुने' गए थे, जिन्हें पूर्ण ध्वन्यात्मक सटीकता के साथ मौखिक रूप से सहस्राब्दियों तक सुरक्षित रखा गया था।",
      keyFigures: "सप्तर्षि (वशिष्ठ, विश्वामित्र, भरद्वाज)",
      keyScripture: "चार वेद (ऋग्वेद, सामवेद, यजुर्वेद, अथर्ववेद)",
      whyItMatters: "यह मानव इतिहास में सबसे सफल मौखिक संरक्षण प्रणाली का प्रतिनिधित्व करता है, जिसने प्राचीन विरासत को 100% सुरक्षित रखा है।",
      legacy: "यूनेस्को द्वारा मानव विरासत की उत्कृष्ट कृति के रूप में मान्यता प्राप्त ध्वन्यात्मक और मौखिक जप प्रणालियों का निर्माण किया।"
    },
    3: {
      title: "रामायण युग",
      headline: "आदर्श मानव का मार्ग",
      storySummary: "धर्म के साक्षात विग्रह, दिव्य राजकुमार श्री राम ने अपने पिता के वचन का सम्मान करने के लिए चौदह वर्ष का वनवास सहर्ष स्वीकार किया। अयोध्या के राजमहलों से लेकर दंडकारण्य के घने जंगलों तक, और लंका तक समुद्र पर बने सेतु तक, उनकी यात्रा ने नैतिक सीमाओं, कर्तव्य और बिना शर्त भक्ति के आदर्श स्थापित किए।",
      keyFigures: "श्री राम, सीता देवी, लक्ष्मण, हनुमान",
      keyScripture: "वाल्मीकि रामायण (आदिकाव्य)",
      whyItMatters: "यह व्यक्तिगत संबंधों, नेतृत्व और एक आदर्श नैतिक समाज (रामराज्य) का निश्चित खाका प्रस्तुत करता है।",
      legacy: "पूरे एशिया में सामाजिक कर्तव्यों, शासन के आदर्शों और पारिवारिक संरचनाओं की आधारशिला रखी।"
    },
    4: {
      title: "महाभारत युग",
      headline: "तूफान के बीच कर्तव्य",
      storySummary: "कुरुक्षेत्र के युद्ध मैदान में कर्तव्य का महान ब्रह्मांडीय संघर्ष छिड़ गया। जब धनुर्धर अर्जुन विषाद से घिर गए, तब भगवान कृष्ण ने दोनों सेनाओं के बीच समय को रोककर भगवद्गीता का उपदेश दिया। उन्होंने आत्मा की अमरता, निष्काम कर्म योग और अपने विराट स्वरूप का रहस्य प्रकट किया।",
      keyFigures: "श्री कृष्ण, अर्जुन, भीष्म, व्यास",
      keyScripture: "भगवद्गीता / महाभारत",
      whyItMatters: "यह सिखाता है कि आध्यात्मिक ज्ञान केवल शांत गुफाओं के लिए नहीं है, बल्कि जीवन के सबसे कठिन संघर्षों के बीच भी जिया जाना चाहिए।",
      legacy: "भगवद्गीता को जन्म दिया, जो संकट प्रबंधन और निस्वार्थ कर्तव्य की सार्वभौमिक मार्गदर्शिका है।"
    },
    5: {
      title: "उपनिषद ज्ञान",
      headline: "पूर्ण अद्वैत संवाद",
      storySummary: "बाहरी अनुष्ठानों से हटकर, साधक और जिज्ञासु वन आश्रमों (आरण्यक) में आत्मज्ञानी गुरुओं के पास एकत्रित हुए। गहन संवादों और निरंतर प्रश्नों के माध्यम से, उन्होंने अस्तित्व के सार को खोजा। वे अंतिम सत्य तक पहुँचे: व्यक्तिगत आत्मा और ब्रह्मांडीय चेतना (ब्रह्म) एक ही हैं।",
      keyFigures: "याज्ञवल्क्य, गार्गी वाचक्नवी, राजा जनक",
      keyScripture: "प्रमुख उपनिषद (बृहदारण्यक, छान्दोग्य, कठ)",
      whyItMatters: "इसने मानव ध्यान को बाहरी कर्मकांडों से हटाकर आंतरिक ध्यान और दार्शनिक आत्म-अन्वेषण की ओर मोड़ा।",
      legacy: "वैश्विक अद्वैत दर्शन को आकार दिया, जिसने शोपेनहावर और इमर्सन जैसे पश्चिमी विचारकों को सीधे प्रभावित किया।"
    },
    6: {
      title: "शास्त्रीय भारत",
      headline: "विज्ञान और अध्यात्म का समन्वय",
      storySummary: "भारत ज्ञान का वैश्विक प्रकाशस्तंभ बन गया। तक्षशिला और नालंदा जैसे विश्वविद्यालयों ने हजारों अंतरराष्ट्रीय विद्वानों को आकर्षित किया। इस युग ने संस्कृत व्याकरण (पाणिनी), गणित (शून्य की खोज), शल्य चिकित्सा (सुश्रुत), खगोल विज्ञान और नीतिशास्त्र में अभूतपूर्व प्रगति देखी - जो तर्कसंगत विज्ञान को आध्यात्मिक गहराई के साथ संतुलित करती थी।",
      keyFigures: "पाणिनी, सुश्रुत, आर्यभट्ट, चाणक्य",
      keyScripture: "अष्टाध्यायी, सुश्रुत संहिता, अर्थशास्त्र",
      whyItMatters: "यह साबित करता है कि गहन अध्यात्म और तर्कसंगत विज्ञान विरोधी नहीं, बल्कि एक ही सत्य की दो धाराएँ हैं।",
      legacy: "गणित (शून्य), शल्य चिकित्सा (सुश्रुत), व्याकरण (पाणिनी) और वैश्विक व्यापार की मूलभूत अवधारणाओं का मार्ग प्रशस्त किया।"
    },
    7: {
      title: "योग परंपरा",
      headline: "मन के नियंत्रण का विज्ञान",
      storySummary: "यह समझते हुए कि अशांत मन ही मानव दुख का मूल कारण है, महर्षि पतंजलि ने व्यवस्थित रूप से योग सूत्रों का संकलन किया। उन्होंने अष्टांग योग (यम, नियम, आसन, प्राणायाम, प्रत्याहार, धारणा, ध्यान, समाधि) की संरचना की, जिससे आध्यात्मिकता एक व्यावहारिक विज्ञान बन गई।",
      keyFigures: "महर्षि पतंजलि, प्रारंभिक नाथ योगी",
      keyScripture: "पतंजलि योग सूत्र",
      whyItMatters: "इसने मानव आत्म-नियंत्रण और मानसिक शांति के लिए एक सार्वभौमल, गैर-सांप्रदायिक पद्धति प्रदान की।",
      legacy: "दुनिया की अग्रणी कल्याण प्रणाली के रूप में विकसित हुआ, जिसने करोड़ों लोगों के मानसिक और शारीरिक स्वास्थ्य को सुधारा।"
    },
    8: {
      title: "जैन परंपरा",
      headline: "अहिंसा की विजय",
      storySummary: "२४वें तीर्थंकर वर्धमान महावीर ने मुक्ति की खोज में अपने राज्य का त्याग कर दिया। उन्होंने जैन मार्ग को पुनर्जीवित किया, जिसमें अहिंसा (सभी जीवों के प्रति पूर्ण दया), अनेकांतवाद (सत्य के बहुआयामी रूप) और अपरिग्रह पर विशेष बल दिया, जो आत्म-विजय का मार्ग दिखाता है।",
      keyFigures: "भगवान महावीर, तीर्थंकर पार्श्वनाथ",
      keyScripture: "तत्वार्थ सूत्र, कल्प सूत्र",
      whyItMatters: "इसने अहिंसा को परम कर्तव्य (अहिंसा परमो धर्मः) के रूप में स्थापित किया, जिसने भारत के नैतिक ताने-बाने को गहराई से आकार दिया।",
      legacy: "भारतीय लोकाचार में पूर्ण अहिंसा (अहिंसा) और सत्य की बहुलता (अनेकांतवाद) को सुदृढ़ किया।"
    },
    9: {
      title: "बौद्ध परंपरा",
      headline: "शांति का मध्यम मार्ग",
      storySummary: "राजकुमार सिद्धार्थ गौतम ने मानव दुख के कारणों को समझने के लिए विलासिता का त्याग कर दिया। गया में बोधि वृक्ष के नीचे, उन्होंने परम ज्ञान प्राप्त किया और बुद्ध कहलाए। उन्होंने चार आर्य सत्य और अष्टांगिक मार्ग सिखाया, जो तृष्णा से परे जाकर निर्वाण प्राप्त करने का व्यावहारिक मार्ग है।",
      keyFigures: "गौतम बुद्ध, सम्राट अशोक",
      keyScripture: "धम्मपद, त्रिपिटक",
      whyItMatters: "इसने पूरे एशिया में करुणा और सचेतनता का प्रकाश फैलाया, जिससे विभिन्न देशों के बीच शांति का सेतु बना।",
      legacy: "वैश्विक स्तर पर सचेतनता, ध्यान और करुणा का प्रसार किया, पूर्व और दक्षिण एशिया में शांति मार्ग स्थापित किए।"
    },
    10: {
      title: "पौराणिक युग",
      headline: "दैवीय कथाओं का ताना-बाना",
      storySummary: "आम जनमानस तक गहरे दार्शनिक सत्यों को पहुँचाने के लिए ऋषियों ने पुराणों की रचना की। सृष्टि, युगों, देवी-देवताओं और राजाओं की भव्य कहानियों के माध्यम से उन्होंने कर्म और भक्ति के नियमों को समझाया। इस युग में भव्य मंदिरों, उत्सवों और शिव, विष्णु एवं देवी की पूजा का विस्तार हुआ।",
      keyFigures: "वेध व्यास, गुप्त शासक, मंदिर शिल्पकार",
      keyScripture: "श्रीमद्भागवत, विष्णु पुराण, शिव पुराण",
      whyItMatters: "इसने अमूर्त दर्शन को कहानी कहने, कला और त्योहारों की एक जीवंत, लोकप्रिय संस्कृति में बदल दिया।",
      legacy: "दैनिक अनुष्ठान, मंदिर वास्तुकला और उत्सव संस्कृति को पुनर्जीवित किया जो आज आधुनिक हिंदू धर्म को परिभाषित करते हैं।"
    },
    11: {
      title: "आदि शंकराचार्य",
      headline: "चार कोनों के सूत्रधार",
      storySummary: "मात्र बत्तीस वर्ष के जीवनकाल में, एक युवा संन्यासी ने पैदल ही पूरे भारत की यात्रा की। अपनी तीक्ष्ण तार्किक बुद्धि से उन्होंने शास्त्रार्थ किए, अद्वैत वेदांत के सत्य को पुनर्जीवित किया और देश की चारों दिशाओं में चार मठों की स्थापना करके आध्यात्मिक एकता को सुदृढ़ किया।",
      keyFigures: "आदि शंकराचार्य, पदमपाद, तोटकाचार्य",
      keyScripture: "विवेकचूड़ामणि, ब्रह्मसूत्र भाष्य",
      whyItMatters: "उन्होंने सनातन धर्म को एक सुदृढ़ बौद्धिक ढाल प्रदान की, यह दर्शाते हुए कि परम सत्य एक ही है।",
      legacy: "अद्वैत वेदांत की बौद्धिक सर्वोच्चता को पुनः स्थापित किया और चार मठों के माध्यम से भारत को एकीकृत किया।"
    },
    12: {
      title: "भक्ति आंदोलन",
      headline: "दिव्य प्रेम का परमानंद",
      storySummary: "भक्ति और कीर्तन की एक लहर पूरे भारत में फैल गई, जिसने सामाजिक भेदों को मिटा दिया। संत-कवियों ने जनभाषा में गीतों की रचना की। उन्होंने सिखाया कि ईश्वर शुष्क पुस्तकालयों या कठोर नियमों में नहीं, बल्कि प्रेम करने वाले के हृदय में बसता है। मीरा ने कृष्ण के लिए गाया, कबीर ने एकता के ताने-बाने बुने, और चैतन्य महाप्रभु कीर्तन में नृत्य करने लगे।",
      keyFigures: "मीराबाई, संत कबीर, चैतन्य महाप्रभु, संत तुकाराम",
      keyScripture: "रामचरितमानस, सूर सागर, कबीर बीजक",
      whyItMatters: "इसने आध्यात्मिक जीवन का लोकतंत्रीकरण किया, जिससे सरल, निष्कपट प्रेम के माध्यम से सभी के लिए मुक्ति सुलभ हो गई।",
      legacy: "अध्यात्म का लोकतंत्रीकरण किया, जिससे विभिन्न पृष्ठभूमि के कवियों को जनभाषा में अपनी भक्ति व्यक्त करने की शक्ति मिली।"
    },
    13: {
      title: "सिख गुरु परंपरा",
      headline: "सत्य और बलिदान का मार्ग",
      storySummary: "गुरु नानक देव जी से शुरू होकर, दस गुरुओं ने पूर्ण समर्पण, समानता और सामाजिक न्याय का मार्ग स्थापित किया। अत्याचारों का सामना करते हुए, गुरु धर्म और विश्वास की स्वतंत्रता की रक्षा के लिए ढाल बनकर खड़े रहे। गुरु गोविंद सिंह जी ने 'खालसा' की स्थापना की - संत-सिपाही जो निर्दोषों की रक्षा और सत्य के लिए समर्पित हैं।",
      keyFigures: "गुरु नानक देव, गुरु तेग बहादुर, गुरु गोविंद सिंह",
      keyScripture: "गुरु ग्रंथ साहिब",
      whyItMatters: "इसने गहन रहस्यमयी भक्ति को मानवाधिकारों और धार्मिक स्वतंत्रता की निडर रक्षा के साथ जोड़ा।",
      legacy: "निस्वार्थ सेवा (लंगर) और मानवाधिकारों की निडर रक्षा की भावना को वैश्विक चेतना में समाहित किया।"
    },
    14: {
      title: "औपनिवेशिक पुनर्जागरण",
      headline: "वैश्विक वेदांत का जागरण",
      storySummary: "ब्रिटिश औपनिवेशिक शासन और सांस्कृतिक आलोचना के दौर में, भारत की आध्यात्मिक शक्ति फिर से जागी। समाज सुधारकों ने प्रथाओं को शुद्ध किया, और १८९३ में स्वामी विवेकानंद शिकागो में धर्म संसद के सामने खड़े हुए। 'अमरीका के भाइयों और बहनों' कहकर उन्होंने वेदांत और योग की शाश्वत बुद्धिमत्ता से पूरी दुनिया को परिचित कराया।",
      keyFigures: "स्वामी विवेकानंद, रामकृष्ण परमहंस, स्वामी दयानन्द सरस्वती, श्री अरविन्द",
      keyScripture: "स्वामी विवेकानंद के संपूर्ण ग्रंथ, द लाइफ डिवाइन",
      whyItMatters: "यह राष्ट्रीय स्वाभिमान को बहाल करने और पश्चिमी देशों में भारतीय दर्शन के वैश्विक प्रसार की शुरुआत करने का कारण बना।",
      legacy: "स्वामी विवेकानंद के माध्यम से वेदांत को वैश्विक मंच पर पेश किया, जिसने आधुनिक आध्यात्मिक आंदोलनों को प्रेरित किया।"
    },
    15: {
      title: "स्वतंत्रता संग्राम युग",
      headline: "सत्य की नैतिक शक्ति",
      storySummary: "स्वतंत्रता का संघर्ष धर्म की आधुनिक अभिव्यक्ति बन गया। भगवद्गीता से प्रेरणा लेकर नेताओं ने सत्याग्रह (सत्य का आग्रह) और अहिंसा पर आधारित आंदोलन शुरू किए। प्राचीन शिक्षाओं के नैतिक बल ने औपनिवेशिक साम्राज्यों से भी अधिक शक्ति दिखाई, जिससे एक स्वतंत्र लोकतांत्रिक गणराज्य का उदय हुआ।",
      keyFigures: "महात्मा गांधी, सरदार पटेल, नेताजी सुभाष चंद्र बोस",
      keyScripture: "भगवद्गीता (कर्म की मार्गदर्शिका के रूप में)",
      whyItMatters: "यह सिद्ध करता है कि प्राचीन आध्यात्मिक मूल्यों को राजनीतिक मुक्ति और सामाजिक सुधार के व्यावहारिक उपकरणों के रूप में उपयोग किया जा सकता है।",
      legacy: "यह साबित किया कि अहिंसात्मक प्रतिरोध (सत्याग्रह) और नैतिक बल बड़े से बड़े साम्राज्यों को भी झुका सकते हैं।"
    },
    16: {
      title: "आधुनिक वैश्विक धर्म",
      headline: "आज बहती शाश्वत ज्ञान धारा",
      storySummary: "डिजिटल युग में, सनातन धर्म सात समंदर पार पहुँच चुका है। करोड़ों लोग स्वास्थ्य और मानसिक शांति के लिए योग-ध्यान करते हैं। आधुनिक भौतिकी के सिद्धांत उपनिषदों की ब्रह्मांडीय अवधारणाओं से मेल खाते हैं। प्राचीन ग्रंथ क्लाउड अभिलेखागार में सुरक्षित हैं और विश्व भर में भव्य मंदिर उठ रहे हैं, जिससे यह शाश्वत धारा मानव मार्गदर्शन करती आ रही है।",
      keyFigures: "वैश्विक योग शिक्षक, संस्कृत विद्वान, डिजिटल संग्रहकर्ता",
      keyScripture: "वेदों और गीता के डिजिटल अभिलेखागार",
      whyItMatters: "यह दर्शाता है कि सनातन धर्म के शांति, सद्भाव और ब्रह्मांडीय एकता के सिद्धांत वैश्विक भविष्य के लिए अत्यंत महत्वपूर्ण मार्गदर्शक हैं।",
      legacy: "प्राचीन ज्ञान को डिजिटल स्पेस में प्रवाहित किया, जहां आधुनिक क्वांटम भौतिकी और अद्वैत चेतना का मिलन हो रहा है।"
    }
  },
  SA: {
    1: {
      title: "सनातनधर्मोत्पत्तिः",
      headline: "ब्रह्माण्डव्यवस्थायाः उदयः",
      storySummary: "प्राचीनभारतस्य हिमवन्नदीनां तटेषु, मानवजातिः सर्वप्रथमं प्रकृतेः ब्रह्माण्डलयं प्रति जागरिता अभवत्। अरण्यानां मौनचिन्तने ऋषयः ऋतं प्रत्यक्षं कृतवन्तः - या ब्रह्माण्डस्य शाश्वती स्वनियमनव्यवस्था। आरम्भिकसमुदायाः पवित्रयज्ञाग्निं परितः एकत्रिताः अभवन्, पवित्रतायाः सामञ्जस्यस्य च विधिभिः सनातनधर्मस्य आधाराशिलां स्थापितवन्तः।",
      keyFigures: "आदिऋषयः",
      keyScripture: "ऋतसूक्तानि (ऋगवेदः)",
      whyItMatters: "अनेन ज्ञायते यत् आध्यात्मिकचेतना पर्यावरणचेतना च आधुनिककल्पनं नास्ति, अपितु मानवेतिहाससहजा वर्तते।",
      legacy: "प्राकृतिकसामञ्जस्यस्य ऋतस्य च सिद्धान्तः स्थापितः, यः अद्यापि प्रकृत्यादरं शिक्षयति।"
    },
    2: {
      title: "वेदप्रकटनम्",
      headline: "शब्दस्य शाश्वतः श्वासः",
      storySummary: "हिमालयस्य पावनकन्दरासु सप्तर्षयः ध्यानमग्नाः अभवन्। स्वकीयस्य अन्तराकाशस्य प्रशान्ततायां ते श्रुतिं साक्षात्कृतवन्तः - या जगतः अनादिकालाद् विद्यमाना स्पन्दनध्वनिः। मन्त्राः एते न केनापि रचिताः, अपितु ध्यानदशायां 'श्रुताः'। सहस्रशः वर्षेभ्यः शुद्धोच्चारणेन मौखिकपरम्परया इमे सुरक्षिताः सन्ति।",
      keyFigures: "सप्तर्षयः (वसिष्ठः, विश्वामित्रः, भरद्वाजः)",
      keyScripture: "चत्वारः वेदाः (ऋक्-साम-यजुः-अथर्वाः)",
      whyItMatters: "इयं मानवेतिहासस्य सर्वोत्तमा मौखिकसंरक्षणव्यवस्था, या पुरातनज्ञानं पूर्णतया रक्षति।",
      legacy: "यूनेस्को द्वारा विश्वविरासतत्वेन स्वीकृतां स्वर-वर्णोच्चारणयुक्तां मौखिकगानपद्धतिं जनितवन्तः।"
    },
    3: {
      title: "रामायणकालः",
      headline: "आदर्शमानवस्य मार्गः",
      storySummary: "मर्यादापुरुषोत्तमः राजकुमारः श्री रामः पितुः वचनपालनाय चतुर्दशवर्षाणां वनवासं स्वीकृतवान्। अयोध्यातः दण्डकारण्यं यावत्, ततः लङ्कां यावत् सेतुबन्धनेन तस्य यात्रा नैतिकसीमाचारस्य, कर्तव्यपालनस्य, दृढभक्तेश्च अनुपमं निदर्शनं प्रस्तौति।",
      keyFigures: "श्री रामः, सीता देवी, लक्ष्मणः, हनुमान्",
      keyScripture: "वाल्मीकिरामायणम् (आदिकाव्यम्)",
      whyItMatters: "इदं कौटुम्बिकसम्बन्धानां, कुशलशासनस्य (रामराज्यस्य), नीतिसम्मतसमाजस्य च शाश्वतं मार्गदर्शकम्।",
      legacy: "सम्पूर्णे आशियामहाद्वीपे सामाजिककर्तव्यानां, सुशासनस्य, पारिवारीकमूल्यानां च सुदृढः आधारः निर्मितः।"
    },
    4: {
      title: "महाभारतकालः",
      headline: "सङ्कटमर्ध्य कर्तव्यपालनम्",
      storySummary: "कुरुक्षेत्रस्य युद्धभूमौ कर्तव्यस्य धर्मस्य च महान् ब्रह्माण्डसङ्घर्षः जातः। यदा धनुर्धरः अर्जुनः वषादग्रस्तः अभवत्, तदा भगवान् श्रीकृष्णः उभयोः सेनयोः मध्ये समयं स्तम्भयित्वा भगवद्गीताम् उपदिष्टवान्। तेन आत्मनः अमरत्वं, निष्कामकर्मयोगः, स्वकीयविराटस्वरूपं च प्रकटितम्।",
      keyFigures: "श्रीकृष्णः, अर्जुनः, भीष्मः, व्यासः",
      keyScripture: "श्रीमद्भगवद्गीता / महाभारतम्",
      whyItMatters: "इयं शिक्षा ददाति यत् आध्यात्मिकज्ञानं केवलं शांन्तकन्दराणां कृते नास्ति, अपितु जीवनस्य कठिनतमेषु युद्धेषु अपि व्यवहार्यम्।",
      legacy: "भगवद्गीतायाः प्रकटनं जातं, या सङ्कटनिवारणाय निष्कामकर्मणे च जगत्प्रसिद्धा।"
    },
    5: {
      title: "उपनिषद्ज्ञानम्",
      headline: "परमाद्वैतसंवादः",
      storySummary: "बाह्यकर्मकाण्डेभ्यः निवृत्ताः जिज्ञासाः अरण्यकुटीरेषु आत्मज्ञानीनां गुरुणां समीपं गताः। गभीरशास्त्रार्थैः प्रश्नोत्तरैश्च ते अस्तित्वस्य मूलतत्त्वं गवेषयितवन्तः। अन्ते च परमज्ञानं लब्धवन्तः यत् - व्यष्टिगता आत्मा समष्टिगतेन ब्रह्मणा सह एकात्मिका वर्तते।",
      keyFigures: "याज्ञवल्क्यः, गार्गी वाचक्नवी, राजा जनकः",
      keyScripture: "मुख्याः उपनिषदः (बृहदारण्यक-छान्दोग्य-कठाद्याः)",
      whyItMatters: "अनेन मानवाणां ध्यानं बाह्यकर्मकाण्डेभ्यः आन्तरिकध्यानं दार्शनिकगवेषणं च प्रति आकृष्टम्।",
      legacy: "वैश्विकमद्वैतदर्शनं स्थापितं, येन शोपेनहावर-एमर्सनादयः पाश्चात्यविद्वांसः प्रभाविताः।"
    },
    6: {
      title: "सुवर्णयुगः",
      headline: "विज्ञानस्य अध्यात्मस्य च सामञ्जस्यम्",
      storySummary: "भारतवर्षं ज्ञानस्य जगत्प्रकाशस्तम्भः अभवत्। तक्षशिला-नालन्दासदृशाः विश्वविद्यालयः सहस्रशः वैदेशिकान् छात्रान् आकर्षयन्ति स्म। अस्मिन् युगे व्याकरणशास्त्रे (पाणिनी), गणिते (शून्यशोधः), शल्यक्रियायां (सुश्रुतः), खगोलविज्ञाने, नीतिशास्त्रे च महत्यः उपलब्धयः प्राप्ताः।",
      keyFigures: "पाणिनी, सुश्रुतः, आर्यभटः, चाणक्यः",
      keyScripture: "अष्टाध्यायी, सुश्रुतसंहिता, अर्थशास्त्रम्",
      whyItMatters: "अनेन सिद्धं यत् तर्कशुद्धं विज्ञानं गभीरमध्यात्मं च न परस्परं विरुद्धौ, अपितु एकस्यैव सत्यस्य द्वे रूपे।",
      legacy: "शून्य-गणित-शल्यचिकितषा-व्याकरणादीनां वैज्ञानिकानामवधारणानां जगति मार्गः प्रशस्तः कृतः।"
    },
    7: {
      title: "योगपरम्परा",
      headline: "चित्तवृत्तिनिरोधस्य विज्ञानम्",
      storySummary: "अशान्तं चित्तमेव मानवदुःखस्य मूलकारणम् इति मत्वा पतञ्जलिमहर्षिः योगसूत्राणां व्यवस्थितं सङ्कलनं चकार। सः अष्टाङ्गयोगस्य (यम-नियमादीनां) रचनां कृतवान्, येन आध्यात्मिकता व्यावहारिकं मनोविज्ञानं जातम्।",
      keyFigures: "महर्षिः पतञ्जलिः, नाथयोगिनः",
      keyScripture: "पातञ्जलयोगसूत्राणि",
      whyItMatters: "इदं शास्त्रं मानवमनसः शान्तये आत्मसंयमाय च एकं सार्वभौमं पद्धतिं प्रदाति।",
      legacy: "विश्वस्य प्रमुखा कल्याणपद्धतिः विकसिता, या अद्य कोटिशः जनानां स्वास्थ्यं रक्षति।"
    },
    8: {
      title: "जैनधर्मः",
      headline: "परमाहिंसायाः विजयः",
      storySummary: "जैनधर्मस्य २४ तीर्थङ्कराः वर्धमानमहावीराः मुक्तिमार्गं दर्शितवन्तः। अहिंसा, अनेकान्तवादः, अपरिग्रहः इति त्रयः प्रमुखाः सिद्धान्ताः जैनधर्मस्य आधाराः सन्ति।",
      keyFigures: "भगवान् महावीरः, पार्श्वनाथः",
      keyScripture: "तत्त्वार्थसूत्रम्, कल्पसूत्रम्",
      whyItMatters: "अनेन 'अहिंसा परमो धर्मः' इति सिद्धान्तः प्रतिष्ठितः, येन भारतस्य नैतिकचरित्रं सुदृढम् अभवत्।",
      legacy: "भारतीय लोकाचारे पूर्णा अहिंसा अनेकान्तवादस्य च महत्त्वं सदाचाररूपेण स्थापितम्।"
    },
    9: {
      title: "बौद्धपरम्परा",
      headline: "शान्तेः मध्यममार्गः",
      storySummary: "सिद्धार्थगौतमः राजकुमारः सांसारिकदुःखस्य कारणं बोद्धुं गृहत्यागं कृतवान्। गयायां बोधिवृक्षस्य अधः सः बुद्धत्वं प्राप्तवान्। सः चत्वारि आर्यसत्याणि अष्टाङ्गिकमार्गं च उपदिष्टवान्, यः तृष्माविमुक्तेः निर्वाणस्य च सरलः मार्गः।",
      keyFigures: "गौतमबुद्धः, सम्राट् अशोकः",
      keyScripture: "धम्मपदम्, त्रिपिटकम्",
      whyItMatters: "अनेन सम्पूर्णे आशियाखण्डे करुणायाः सचेतनतायाश्च प्रकाशः प्रसृतः, मैत्रीसेतुश्च निर्मितः।",
      legacy: "जगत्सु करुणा-ध्यान-सचेतनताः प्रसारिताः, पूर्व-दक्षिण-एशियाखण्डेषु शान्तिमार्गाः निर्मिताः।"
    },
    10: {
      title: "पौराणिकयुगः",
      headline: "दैवीकथानां तानाबाना",
      storySummary: "सामान्यजनेभ्यः गभीरं दार्शनिकसत्यं बोधयितुं ऋषिभिः पुराणानि रचितानि। सृष्टि-युग-देव-राजानां कथाभिः ते कर्मणः भक्तेश्च नियमान् स्पष्टीकृतवन्तः। अस्मिन् युगे विशालमन्दिराणां निर्माणं, उत्सवाः, शिव-विष्णु-देवीनां पूजा च प्रचलिता अभवन्।",
      keyFigures: "वेदव्यासः, गुप्तराजानः, मन्दिरशिल्पिनः",
      keyScripture: "श्रीमद्भागवतपुराणम्, विष्णुपुराणम्, शिवपुराणम्",
      whyItMatters: "अनेन अमूर्तं दर्शनं कथाकथन-कला-उत्सवानां सरले जीवन्तपरम्परास्वरूपे परिवर्तितम्।",
      legacy: "अद्यतनं मन्दिरार्चनं, उत्सवप्रियतां, दैनिकपूजापद्धतिं च पुनर्जीव्य सुदृढतां नीतवन्तः।"
    },
    11: {
      title: "आदिशङ्कराचार्यः",
      headline: "चतुर्दिङ्निर्माता",
      storySummary: "द्वात्रिंशद्वर्षमात्रे अल्पायुषि एकः युवा संन्यासी पदचारेण समग्रभारतस्य भ्रमणं कृतवान्। तीक्ष्णतर्केण सः शास्त्रार्थान् जित्वा अद्वैतवेदान्तं पुनरुद्धृतवान्, चतुर्षु कोणेसु चतुर्मठानां स्थापनां कृत्वा देशस्य आध्यात्मिकैक्यं रक्षितवान्।",
      keyFigures: "आदिशङ्कराचार्यः, पदमपादः, तोटकाचार्यः",
      keyScripture: "विवेकचूडामणिः, ब्रह्मसूत्रभाष्यम्",
      whyItMatters: "सः सनातनधर्मस्य कृते एकं तर्कशुद्धं बौद्धिककवचं दत्तवान्, यत् परमात्मैकत्वं साधयति।",
      legacy: "अद्वैतसिद्धान्तस्य बौद्धिकं वर्चस्वं पुनर्प्रतिष्ठितं, चतुर्मठाैश्च राष्ट्रस्यैक्यं साधितम्।"
    },
    12: {
      title: "भक्तिआन्दोलनम्",
      headline: "भगवत्प्रेमपरमानन्दः",
      storySummary: "भक्तेः कीर्तनस्य च एका तरङ्गा समग्रभारतं प्लावितवती, सामाजिकभेदाः च नष्टाः। भक्तकवयः लोकभाषासु गीतानि रचितवन्तः। ते उक्तवन्तः यत् ईश्वरः शुष्कग्रन्थालयेषु नास्ति, अपितु भक्तस्य शुद्धहृदये वसति। मीरा कृष्णे लीना, कबीरः समतायाः काव्यं वयति स्म, चैतन्यश्च कीर्तने ननर्त।",
      keyFigures: "मीराबाई, कबीरः, चैतन्यमहाप्रभुः, तुकारामः",
      keyScripture: "रामचरितमानसम्, सूरसागरः, कबीरबीजकः",
      whyItMatters: "अनेन भक्तिमार्गेण सर्वेभ्यः मोक्षः सुलभः जातः, सामाजिकसामञ्जस्यं च दृढीकृतम्।",
      legacy: "अध्यात्मस्य लोकतंत्रीकरणं कृतं, येन सामान्यजनाः स्वकीयमातृभाषायां भक्तिं प्रकटयितुं समर्थाः जाताः।"
    },
    13: {
      title: "सिखगुरुपरम्परा",
      headline: "सत्यस्य बलिदानस्य च मार्गः",
      storySummary: "गुरुनानकदेवेन आरभ्य दशभिः गुरुभिः समर्पणस्य, समतायाः, सामाजिकन्यायस्य च नूतनः मार्गः दर्शितः। अत्याचाराणां सम्मुखे गुरुजनाः श्रद्धास्वतन्त्रतायाः रक्षायै ढालवत् अतिष्ठन्। गुरुगोविन्दसिंहेन 'खालसा'दलं रचितं - ये सत्यरक्षणाय संत-सैनिकाः सन्ति।",
      keyFigures: "गुरुनानकदेवः, गुरुतेगबहादुरः, गुरुगोविन्दसिंहः",
      keyScripture: "गुरुग्रन्थसाहिबः",
      whyItMatters: "अनेन मानवाधिकाररक्षणाय धर्मरक्षणाय च निडरबलिदानस्य अध्यात्मस्य च अद्भुतं मेलनं कृतम्।",
      legacy: "निस्वार्थलोकसेवा मानवाधिकाररक्षणाय निर्भयता च वैश्विकचेतनायां प्रतिष्ठापिता।"
    },
    14: {
      title: "नवजागरणकालः",
      headline: "वैश्विकवेदान्तस्य जागरणम्",
      storySummary: "आङ्ग्लोपनिवेशकाले सनातनधर्मः स्वकीयशुद्धीकरणाय जाग्रतः अभवत्। १८९३ तमे वर्षे स्वामी विवेकानन्दः शिकागोविश्वधर्मसभायां 'अमरीकादेशस्य भगिन्यः भ्रातरश्च' इति सम्बोधनेन वेदान्तयोगयोः शाश्वतं ज्ञानं विदेशेषु प्रसारितवान्।",
      keyFigures: "स्वामी विवेकानन्दः, रामकृष्णपरमहंसः, स्वामी दयानन्दः, श्रीअरविन्दः",
      keyScripture: "विवेकानन्दग्रन्थावली, दिव्यजीवनम्",
      whyItMatters: "अनेन राष्ट्रियाभिमानः पुनः प्राप्तः, पाश्चात्यजगति भारतीयदर्शनस्य दिग्विजययात्रा च आरब्धा।",
      legacy: "पाश्चात्यजगति वेदान्तदर्शनस्य महत्त्वं संस्थाप्य आधुनिकचिन्तकाः प्रेरिताः।"
    },
    15: {
      title: "स्वतन्त्रतासङ्ग्रामः",
      headline: "स्वतन्त्रतासङ्ग्रामः",
      storySummary: "भारते स्वतन्त्रतासङ्ग्रामः धर्मस्यैव नूतनरूपं जातः। भगवद्गीतायाः कर्मयोगाद् प्रेरणां स्वीकृत्य सत्यस्य अहिंसायाश्च आंदोलनानि प्रचालितानि। अस्मिन् आन्दोलने नैतिकबलस्य विजयः अभवत्, स्वतन्त्रगणतन्त्रस्य च जन्म जातम्।",
      keyFigures: "महात्मा गान्धी, सरदार पटेलः, सुभाषचन्द्रबोसः",
      keyScripture: "श्रीमद्भगवद्गीता",
      whyItMatters: "अनेन दर्शितं यत् पुरातनमौल्यानि राजकीयस्वतन्त्रतायै सामाजिकसुधाराय च व्यावहारिकशस्त्ररूपेण प्रयोक्तुं शक्यन्ते।",
      legacy: "अहिंसात्मकप्रतिरोधस्य सत्याग्रहस्य च नैतिकबलस्य विजयः जातः।"
    },
    16: {
      title: "वैश्विकसनातनधर्मः",
      headline: "वैश्विकसनातनधर्मः",
      storySummary: "अङ्कीययुगे सनातनधर्मः सर्वान् महासागरान् तीर्त्वा वैश्विकः जातः। योगाभ्यासं कुर्वन्ति कोटिशः जनाः। आधुनिकभौतिकशास्त्रं उपनिषदां सिद्धान्तैः सह संवदति। ग्रन्थाः मेघसञ्चये सुरक्षिताः सन्ति।",
      keyFigures: "वैश्विकयोगशिक्षकाः, संस्कृतज्ञाः, अङ्कीयसङ्ग्रहकर्तारः",
      keyScripture: "अङ्कीयमेघस्थाः वेदाः गीता च",
      whyItMatters: "अनेन ज्ञायते यत् जगतः शान्तये भ्रातृत्वाय च सनातनमूल्यानि महत्तमाः मार्गदर्शकाः सन्ति।",
      legacy: "प्राचीनज्ञानस्य अङ्कीकरणं जातं, यत्र आधुनिकक्वांटमविज्ञानमद्वैतचेतना च परस्परं मिलतः।"
    }
  }
};
const TornEdgeTop = () => (
  <svg 
    viewBox="0 0 1440 40" 
    className="absolute top-0 left-0 w-full z-10 fill-current pointer-events-none text-[var(--bg-primary)]" 
    preserveAspectRatio="none"
  >
    <path d="M0,0 L1440,0 L1440,18 Q1380,27 1320,15 T1200,31 T1080,17 T960,25 T840,18 T720,32 T600,19 T480,26 T360,17 T240,31 T120,19 L0,28 Z" />
  </svg>
);
const TornEdgeBottom = () => (
  <svg 
    viewBox="0 0 1440 40" 
    className="absolute bottom-0 left-0 w-full z-10 fill-current pointer-events-none rotate-180 text-[var(--bg-primary)]" 
    preserveAspectRatio="none"
  >
    <path d="M0,0 L1440,0 L1440,18 Q1380,27 1320,15 T1200,31 T1080,17 T960,25 T840,18 T720,32 T600,19 T480,26 T360,17 T240,31 T120,19 L0,28 Z" />
  </svg>
);

const TornEdgeRight = () => (
  <svg 
    viewBox="0 0 40 1440" 
    className="absolute top-0 right-0 h-full w-10 z-10 fill-current pointer-events-none text-[var(--bg-primary)]" 
    preserveAspectRatio="none"
  >
    <path d="M40,0 L0,0 Q8,120 4,240 T12,480 T3,720 T15,960 T6,1200 T0,1440 L40,1440 Z" />
  </svg>
);

const TornEdgeLeft = () => (
  <svg 
    viewBox="0 0 40 1440" 
    className="absolute top-0 left-0 h-full w-10 z-10 fill-current pointer-events-none rotate-180 text-[var(--bg-primary)]" 
    preserveAspectRatio="none"
  >
    <path d="M40,0 L0,0 Q8,120 4,240 T12,480 T3,720 T15,960 T6,1200 T0,1440 L40,1440 Z" />
  </svg>
);

const getScriptureLink = (keyScriptureText: string) => {
  const lower = keyScriptureText.toLowerCase();
  if (lower.includes("gita")) return "/library/gita";
  if (lower.includes("rigveda") || lower.includes("rigvedic")) return "/library/rigveda";
  if (lower.includes("ramayana")) return "/library/ramayana";
  if (lower.includes("mahabharata") || lower.includes("mahabharat")) return "/library/mahabharata";
  if (lower.includes("sutras") && lower.includes("yoga")) return "/library/yoga-sutras";
  if (lower.includes("shiva purana")) return "/library/shiva-purana";
  if (lower.includes("arthashastra")) return "/library/arthashastra";
  if (lower.includes("upanishad")) return "/library?tab=upanishads";
  if (lower.includes("veda")) return "/library?tab=vedas";
  return "/library";
};

export default function HistoryClient() {
  const { language } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const [activeEra, setActiveEra] = useState<number>(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  // Monitor scroll to update dropdown active indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;
      
      for (const chapter of CHAPTERS) {
        const el = document.getElementById(`chapter-section-${chapter.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveEra(chapter.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLang = mounted ? language : "EN";
  const labels = TRANSLATIONS[currentLang] || TRANSLATIONS.EN;

  const scrollToSection = (id: number) => {
    const el = document.getElementById(`chapter-section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setDropdownOpen(false);
  };

  const parchmentBg = {
    backgroundColor: "var(--bg-primary)",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Cpath d='M0 0h150v150H0z' fill='%23faf7f0' fill-opacity='.04'/%3E%3Cpath d='M15 15c20 0 20 40 40 40s20-40 40-40 20 40 40 40 20-40 40-40M15 90c20 0 20 40 40 40s20-40 40-40 20 40 40 40 20-40 40-40' stroke='%23e6dfc8' stroke-width='0.5' fill='none' opacity='0.15'/%3E%3C/svg%3E")`,
  };

  return (
    <div 
      style={parchmentBg} 
      className="relative w-full min-h-screen text-[var(--text-primary)] overflow-x-hidden flex flex-col items-center pb-24"
    >
      {/* Background traditional Watermark Mandalas */}
      <div className="absolute top-[8%] left-[-150px] w-[500px] h-[500px] opacity-[0.03] text-[var(--accent-gold)] pointer-events-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[0.3]">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="38" strokeDasharray="3 2" />
          {Array.from({ length: 24 }).map((_, i) => (
            <path key={i} d="M50,5 L50,15" transform={`rotate(${i * 15} 50 50)`} />
          ))}
          <path d="M50,10 C40,30 30,40 50,90 C70,40 60,30 50,10 Z" />
        </svg>
      </div>

      <div className="absolute bottom-[20%] right-[-150px] w-[600px] h-[600px] opacity-[0.03] text-[var(--accent-gold)] pointer-events-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[0.3] rotate-45">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="35" />
          {Array.from({ length: 36 }).map((_, i) => (
            <circle key={i} cx="50" cy="15" r="1.5" transform={`rotate(${i * 10} 50 50)`} fill="currentColor" />
          ))}
        </svg>
      </div>

      {/* Elegant Side manuscript roll borders */}
      <div className="hidden lg:block absolute inset-y-0 left-[2%] right-[2%] border-l border-r border-[var(--border-gold)]/10 pointer-events-none z-10" />

      {/* Main Header */}
      <header className="relative z-10 max-w-4xl w-full text-center px-6 pt-20 pb-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 border-b border-t border-[var(--border-gold)]/40 py-1.5 px-5 my-2">
          <Compass className="w-4 h-4 text-[var(--accent-gold)] animate-spin-slow" />
          <span className="text-[10px] md:text-xs text-[var(--text-secondary)] uppercase tracking-[0.25em] font-serif font-bold">
            {labels.pilgrimageSubtitle}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-sanskrit)] to-[var(--text-primary)] leading-tight drop-shadow-sm select-text">
          {labels.pilgrimageTitle}
        </h1>
        
        <p className="text-base md:text-xl text-[var(--text-secondary)] font-serif italic max-w-3xl select-text leading-relaxed">
          {labels.pilgrimageDesc}
        </p>

        <div className="w-64 h-5 flex items-center justify-center gap-1.5 opacity-65 my-3">
          <div className="h-px w-28 bg-[var(--accent-gold)]/50" />
          <span className="text-xs text-[var(--accent-gold)]">ॐ</span>
          <div className="h-px w-28 bg-[var(--accent-gold)]/50" />
        </div>
      </header>

      {/* Floating Sandalwood Journey Quick-Filter Select Menu */}
      <div className="sticky top-6 z-30 max-w-xs w-full px-4 mb-20">
        <div className="bg-[var(--bg-card)] backdrop-blur-sm border border-[var(--border-gold)]/40 p-1 shadow-xl rounded">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full py-2.5 px-3 flex items-center justify-between text-xs font-serif font-bold text-[var(--text-sanskrit)] tracking-wide"
          >
            <span className="flex items-center gap-2">
              <History className="w-3.5 h-3.5" />
              <span>{labels.jumpToMilestone}: Chapter {ROMAN_NUMERALS[activeEra]}</span>
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"}`} />
          </button>
          
          {dropdownOpen && (
            <div className="max-h-[300px] overflow-y-auto border-t border-[var(--border-gold)]/25 mt-1 divide-y divide-[var(--border-gold)]/40 bg-[var(--bg-secondary)]">
              {CHAPTERS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => scrollToSection(c.id)}
                  className={`w-full text-left py-2 px-3 text-[11px] font-serif transition-colors hover:bg-[var(--border-gold)]/20 flex items-center justify-between
                    ${activeEra === c.id ? "text-[var(--text-sanskrit)] font-bold bg-[var(--border-gold)]/30" : "text-[var(--text-primary)]/80"}`}
                >
                  <span>{ROMAN_NUMERALS[c.id]}. {c.title}</span>
                  <span className="text-[9px] text-[var(--text-secondary)] italic">{c.date}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Highly Faded, Hand-Drawn Manuscript Pilgrimage line (occupies less than 5% visual attention) */}
      <div className="absolute top-[500px] bottom-[900px] left-1/2 -translate-x-1/2 w-0.5 border-l border-dashed border-[var(--border-gold)]/30 hidden md:block z-0 pointer-events-none" />

      {/* Narrative Chapter Sections (Graphic Novel format: 700px - 1200px heights) */}
      <div className="relative w-full flex flex-col gap-24 md:gap-36 z-10">
        
        {CHAPTERS.map((c, index) => {
          const isOdd = c.id % 2 !== 0;
          const romanNum = ROMAN_NUMERALS[c.id];
          const isCurrent = activeEra === c.id;

          const translations = CHAPTER_TRANSLATIONS as unknown as Record<string, Record<number, Record<string, string>>>;
          const chapterInfo = translations[currentLang]?.[c.id] || translations.EN[c.id];
          const title = chapterInfo?.title || c.title;
          const headline = chapterInfo?.headline || c.headline;
          const storySummary = chapterInfo?.storySummary || c.storySummary;
          const keyFigures = chapterInfo?.keyFigures || c.keyFigures;
          const keyScripture = chapterInfo?.keyScripture || c.keyScripture;
          const whyItMatters = chapterInfo?.whyItMatters || c.whyItMatters;
          const legacy = chapterInfo?.legacy || "";

          return (
            <section
              key={c.id}
              id={`chapter-section-${c.id}`}
              className="relative w-full min-h-[700px] md:min-h-[800px] lg:min-h-[900px] flex items-center py-12 border-b border-[var(--border-gold)]/10 last:border-b-0"
            >
              {/* Subtle visual dot connector at center of screen (Desktop) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block z-10 pointer-events-none">
                <div className={`w-2.5 h-2.5 rounded-full border border-[var(--border-gold)]/40 transition-all duration-700
                  ${isCurrent ? "bg-[var(--text-sanskrit)] scale-110" : "bg-[var(--bg-secondary)] scale-75"}`} 
                />
              </div>

              {/* Flex columns: split 60/40 and attach flush to screen borders */}
              <div className={`w-full flex flex-col items-stretch 
                ${isOdd ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                
                {/* Massive painted illustration (borderless, crop style, side-flushed to screen edge) */}
                <div className={`w-full md:w-[60%] shrink-0 flex self-stretch overflow-hidden
                  ${isOdd ? "justify-start" : "justify-end"}`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98, x: isOdd ? -50 : 50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="w-full h-[350px] md:h-auto md:min-h-[600px] lg:min-h-[700px] relative overflow-hidden group"
                  >
                    <TornEdgeTop />
                    <TornEdgeBottom />
                    {isOdd ? <TornEdgeRight /> : <TornEdgeLeft />}
                    {/* Watercolor vignette overlay */}
                    <div className="absolute inset-0 z-[5] pointer-events-none" style={{
                      background: `radial-gradient(ellipse 85% 85% at ${isOdd ? '40%' : '60%'} 50%, transparent 45%, var(--bg-primary) 100%)`
                    }} />
                    {/* Warm golden depth shadow */}
                    <div className="absolute inset-0 z-[4] pointer-events-none shadow-[inset_0_0_80px_rgba(139,90,43,0.15)]" />
                    {(() => {
                      const isIllustration = c.imagePath.endsWith(".png") && !c.imagePath.includes("/deities/");
                      return (
                        <img 
                          src={c.imagePath} 
                          alt={title} 
                          className={`w-full h-full object-cover select-none filter sepia-[0.08] contrast-[1.05] saturate-[1.1] brightness-[1.02] group-hover:sepia-0 group-hover:saturate-[1.2] transition-all duration-[1200ms] ${
                            isIllustration 
                              ? "mix-blend-multiply dark:mix-blend-screen dark:opacity-85" 
                              : "mix-blend-normal dark:opacity-85"
                          }`} 
                          style={{
                            maskImage: `linear-gradient(to ${isOdd ? 'right' : 'left'}, black 30%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.4) 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)`,
                            WebkitMaskImage: `linear-gradient(to ${isOdd ? 'right' : 'left'}, black 30%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.4) 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)`,
                            maskComposite: 'intersect',
                            WebkitMaskComposite: 'source-in'
                          }}
                        />
                      );
                    })()}
                  </motion.div>
                </div>

                {/* Narrative Text Column (padded relative to screen half) */}
                <div className={`w-full md:w-[40%] flex flex-col justify-center gap-6 py-12 px-6 select-text
                  ${isOdd 
                    ? "md:text-left md:items-start md:pl-8 md:pr-12 lg:pl-12 lg:pr-16 xl:pl-16 xl:pr-20" 
                    : "md:text-right md:items-end md:pr-8 md:pl-12 lg:pr-12 lg:pl-16 xl:pr-16 xl:pl-20"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.8 }}
                    className={`relative w-full flex flex-col gap-2 ${isOdd ? "items-start" : "items-end"}`}
                  >
                    {/* Massive Calligraphic Roman Numeral (120px - 220px range) */}
                    <div className={`absolute -top-16 font-serif italic text-[#E4D5B7]/40 text-[100px] md:text-[160px] lg:text-[200px] leading-none select-none pointer-events-none z-0
                      ${isOdd ? "-left-4 md:-left-8" : "-right-4 md:-right-8"}`}
                    >
                      {romanNum}
                    </div>

                    {/* Date and details */}
                    <div className={`relative z-10 flex items-center gap-2 text-sm md:text-base font-serif font-bold text-[var(--text-secondary)] uppercase tracking-widest mt-8 md:mt-12 px-3 py-1 border border-[var(--border-gold)]/40 bg-[#EAE2CF]/10 rounded-sm
                      ${isOdd ? "flex-row" : "flex-row-reverse"}`}
                    >
                      <span>{c.date}</span>
                    </div>

                    {/* Chapter Title (48px - 72px range) */}
                    <h2 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-sanskrit)] leading-tight select-text">
                      {title}
                    </h2>
                    
                    {/* Sanskrit translation */}
                    <span className="relative z-10 text-base md:text-lg font-sanskrit text-[var(--accent-gold)] italic font-bold select-text mt-0.5">
                      {c.sanskritTitle}
                    </span>

                    {/* Sub-headline */}
                    <h4 className="relative z-10 text-xs md:text-sm font-serif font-bold text-[var(--text-primary)] uppercase tracking-widest mt-1">
                      &mdash; {headline} &mdash;
                    </h4>
                  </motion.div>

                  {/* Poetic story paragraph (20px - 24px range) */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-lg md:text-xl leading-relaxed text-[var(--text-primary)]/95 font-serif select-text max-w-2xl font-light"
                  >
                    {storySummary}
                  </motion.p>

                  {/* Key historical details in premium museum-grade layout */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`w-full pt-8 border-t border-[var(--border-gold)]/25 flex flex-col gap-5 ${isOdd ? "text-left items-start" : "md:text-right md:items-end text-left items-start"}`}
                  >
                    {/* Top Row: Key Figures & Key Scripture */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                      {/* Key Figures */}
                      <div className="p-3.5 bg-[var(--bg-card)] border border-[var(--border-gold)]/60 rounded shadow-sm hover:border-[var(--accent-saffron)] transition-all">
                        <h5 className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-sanskrit)] font-serif mb-2 flex items-center gap-1.5 select-text">
                          <Users className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                          <span>{labels.keyFigures}</span>
                        </h5>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {keyFigures.split(',').map((fig, fIdx) => (
                            <span 
                              key={fIdx} 
                              className="px-2 py-0.5 rounded-sm bg-[var(--border-gold)]/20 border border-[var(--border-gold)] text-[11px] font-serif text-[var(--text-primary)] select-text font-medium"
                            >
                              {fig.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Scripture */}
                      <div className="p-3.5 bg-[var(--bg-card)] border border-[var(--border-gold)]/60 rounded shadow-sm hover:border-[var(--accent-saffron)] transition-all">
                        <h5 className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-sanskrit)] font-serif mb-2 flex items-center gap-1.5 select-text">
                          <BookOpen className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                          <span>{labels.keyScripture}</span>
                        </h5>
                        <div className="text-xs text-[var(--text-secondary)] font-serif leading-relaxed select-text font-medium mt-1">
                          {keyScripture.includes(",") || keyScripture.includes("/") ? (
                            <div className="flex flex-wrap gap-1.5">
                              {keyScripture.split(/[,/]/).map((scr, sIdx) => {
                                const cleanScr = scr.trim();
                                return (
                                  <Link
                                    key={sIdx}
                                    href={getScriptureLink(cleanScr)}
                                    className="px-2 py-0.5 rounded-sm bg-[var(--text-sanskrit)]/5 hover:bg-[var(--text-sanskrit)]/10 border border-[var(--text-sanskrit)]/30 text-[11px] font-serif text-[var(--text-sanskrit)] hover:text-[var(--text-primary)] transition-colors no-underline font-bold inline-block"
                                  >
                                    {cleanScr}
                                  </Link>
                                );
                              })}
                            </div>
                          ) : (
                            <Link 
                              href={getScriptureLink(keyScripture)}
                              className="inline-flex items-center gap-1 text-[var(--text-sanskrit)] hover:text-[var(--text-primary)] border-b border-[var(--text-sanskrit)]/35 hover:border-[var(--text-primary)] pb-0.5 transition-colors no-underline font-bold"
                            >
                              {keyScripture}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Why It Matters Callout Box */}
                    <div className="p-3.5 border-l-2 border-[#D4AF37] bg-[#D4AF37]/5 rounded-r shadow-sm w-full text-left">
                      <h5 className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-sanskrit)] font-serif mb-1 flex items-center gap-1.5 select-text">
                        <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                        <span>{labels.whyItMatters}</span>
                      </h5>
                      <p className="text-xs md:text-sm text-[var(--text-primary)]/90 font-serif italic leading-relaxed select-text font-medium">
                        &ldquo;{whyItMatters}&rdquo;
                      </p>
                    </div>

                    {/* Historical Legacy Callout Box */}
                    {legacy && (
                      <div className="p-3.5 border-l-2 border-[#8C2D19] bg-[var(--text-sanskrit)]/5 rounded-r shadow-sm w-full text-left">
                        <h5 className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-sanskrit)] font-serif mb-1 flex items-center gap-1.5 select-text">
                          <Award className="w-3.5 h-3.5 text-[var(--text-sanskrit)]" />
                          <span>{labels.legacy}</span>
                        </h5>
                        <p className="text-xs md:text-sm text-[var(--text-primary)]/90 font-serif leading-relaxed select-text font-medium">
                          {legacy}
                        </p>
                      </div>
                    )}
                  </motion.div>

                  {/* Continue Journey Button */}
                  <div className={`w-full pt-6 flex items-center mt-2 ${isOdd ? "justify-start" : "md:justify-end justify-start"}`}>
                    {c.id < 16 ? (
                      <button
                        onClick={() => scrollToSection(c.id + 1)}
                        className="inline-flex items-center gap-2 text-xs font-serif font-bold text-[var(--text-sanskrit)] hover:text-[var(--text-primary)] transition-colors border-b border-[var(--border-gold)]/40 hover:border-[var(--text-primary)] pb-1 cursor-pointer"
                      >
                        <span>{labels.continueJourney} {ROMAN_NUMERALS[c.id + 1]}</span>
                        <span className="text-base">&rarr;</span>
                      </button>
                    ) : (
                      <Link
                        href="/library"
                        className="inline-flex items-center gap-2 text-xs font-serif font-bold text-[var(--text-sanskrit)] hover:text-[var(--text-primary)] transition-colors border-b border-[var(--border-gold)]/40 hover:border-[var(--text-primary)] pb-1 cursor-pointer"
                      >
                        <span>{currentLang === "HI" ? "पुस्तकालय पर वापस जाएँ" : currentLang === "SA" ? "पुस्तकालयं प्रति निवर्तताम्" : "Return to Sacred Museum"}</span>
                        <span className="text-base">&rarr;</span>
                      </Link>
                    )}
                  </div>
                </div>

              </div>
            </section>
          );
        })}

      </div>

      {/* Epilogue: Sanatan Dharma Today */}
      <section className="relative z-10 max-w-5xl w-full px-6 md:px-12 mt-40 select-text">
        <div className="p-8 md:p-16 bg-[var(--bg-secondary)] border-4 border-double border-[#D4AF37]/45 rounded-sm shadow-2xl flex flex-col items-center">
          
          <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center text-[var(--accent-gold)] mb-5 bg-[var(--bg-secondary)] shadow-sm animate-pulse">
            <Globe className="w-6 h-6" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-sanskrit)] text-center select-text">
            {labels.presentDayTitle}
          </h2>
          <p className="text-base md:text-lg font-serif text-[var(--text-secondary)] italic text-center mt-2 select-text">
            {labels.presentDaySubtitle}
          </p>

          <div className="w-48 h-px bg-[#D4AF37]/35 my-10" />

          {/* Clean narrative scroll format for the 5 facets */}
          <div className="flex flex-col gap-12 w-full max-w-3xl">
            
            {/* 1. Global Yoga */}
            <div className="flex flex-col md:flex-row gap-5 items-start text-left">
              <span className="p-2.5 bg-[var(--border-gold)]/10 border border-[var(--border-gold)] rounded-full text-[var(--text-sanskrit)] shadow-inner shrink-0 mt-1">
                <CheckCircle className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xl font-serif font-bold text-[var(--text-primary)] select-text">
                  {labels.globalYoga}
                </h4>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-[var(--text-secondary)] font-serif select-text mt-1.5">
                  {labels.globalYogaDesc}
                </p>
              </div>
            </div>

            {/* 2. Vedanta */}
            <div className="flex flex-col md:flex-row gap-5 items-start text-left">
              <span className="p-2.5 bg-[var(--border-gold)]/10 border border-[var(--border-gold)] rounded-full text-[var(--text-sanskrit)] shadow-inner shrink-0 mt-1">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xl font-serif font-bold text-[var(--text-primary)] select-text">
                  {labels.vedanta}
                </h4>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-[var(--text-secondary)] font-serif select-text mt-1.5">
                  {labels.vedantaDesc}
                </p>
              </div>
            </div>

            {/* 3. Ayurveda */}
            <div className="flex flex-col md:flex-row gap-5 items-start text-left">
              <span className="p-2.5 bg-[var(--border-gold)]/10 border border-[var(--border-gold)] rounded-full text-[var(--text-sanskrit)] shadow-inner shrink-0 mt-1">
                <Leaf className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xl font-serif font-bold text-[var(--text-primary)] select-text">
                  {labels.ayurveda}
                </h4>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-[var(--text-secondary)] font-serif select-text mt-1.5">
                  {labels.ayurvedaDesc}
                </p>
              </div>
            </div>

            {/* 4. Digital Preservation */}
            <div className="flex flex-col md:flex-row gap-5 items-start text-left">
              <span className="p-2.5 bg-[var(--border-gold)]/10 border border-[var(--border-gold)] rounded-full text-[var(--text-sanskrit)] shadow-inner shrink-0 mt-1">
                <ScrollIcon className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xl font-serif font-bold text-[var(--text-primary)] select-text">
                  {labels.digitalPreservation}
                </h4>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-[var(--text-secondary)] font-serif select-text mt-1.5">
                  {labels.digitalPreservationDesc}
                </p>
              </div>
            </div>

            {/* 5. Future of Dharma */}
            <div className="flex flex-col md:flex-row gap-5 items-start text-left">
              <span className="p-2.5 bg-[var(--border-gold)]/10 border border-[var(--border-gold)] rounded-full text-[var(--text-sanskrit)] shadow-inner shrink-0 mt-1">
                <Feather className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xl font-serif font-bold text-[var(--text-primary)] select-text">
                  {labels.futureDharma}
                </h4>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-[var(--text-secondary)] font-serif select-text mt-1.5">
                  {labels.futureDharmaDesc}
                </p>
              </div>
            </div>

          </div>

          <div className="w-72 h-px bg-[#D4AF37]/35 my-12" />
          
          <span className="text-xs md:text-sm font-sanskrit text-[var(--text-sanskrit)] font-bold tracking-widest text-center select-text">
            धर्मो रक्षति रक्षितः | यतो धर्मस्ततो जयः
          </span>

        </div>
      </section>
    </div>
  );
}
