"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Link from "next/link";
import { ChevronDown, MapPin, Landmark, ArrowRight, ArrowLeft, Volume2, ShieldAlert, Calendar, Compass, Plane, Train, Car, History, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DiyaFlame from "../ui/DiyaFlame";
import GoldParticleField from "../effects/GoldParticleField";
import { useSacredSound } from "@/lib/sacred-audio";
import { useLanguageStore } from "@/store/useLanguageStore";

// Structured meta data for all 18 temples to guarantee detail depth
interface TempleMetadata {
  slug: string;
  manifestationLore: string;
  manifestationLoreHi?: string;
  manifestationLoreSa?: string;
  droneViewDesc: string;
  stotramVerse: string;
  stotramTrans: string;
  mantra: string;
  mantraMeaning: string;
  mantraMeaningHi?: string;
  architectureDetails: string;
  ritualsDetails: string;
  experienceDetails: string;
  elevation: string;
  visitors: string;
  dynasty: string;
  travelSeason: string;
  bestMonths: string;
  routeSteps: string[];
}

const TEMPLES_META: Record<string, TempleMetadata> = {
  kedarnath: {
    slug: "kedarnath",
    manifestationLore: "Following the Kurukshetra war, the Pandavas sought Shiva to absolve the sins of fratricide. Shiva disguised himself as a bull. When Bhima recognized him, the bull dove into the ground, leaving its hump here, which is worshipped as the holy Lingam.",
    manifestationLoreHi: "महाभारत युद्ध के पश्चात, पांडव भ्रातृघात के पापों से मुक्ति हेतु भगवान शिव को खोज रहे थे। शिव ने एक बैल का रूप धारण किया। जब भीम ने उन्हें पहचान लिया, तो बैल भूमि में समा गया, जिसका कूबड़ यहाँ पीछे रह गया, जिसकी पूजा पवित्र लिंग के रूप में की जाती है।",
    manifestationLoreSa: "कुरुक्षेत्रयुद्धान्ते पाण्डवाः शिवं अन्विष्टवन्तः। शिवः वृषभरूपं धृतवान्। यदा भीमः तं अज्ञासीत्, तदा वृषभः भूमौ लीनः अभवत्, तस्य ककुद् भागः अत्र पूज्यते।",
    droneViewDesc: "Surrounded by towering snow-capped peaks of the Garhwal Himalayas at an altitude of 3,583 meters, standing strong against the elements.",
    stotramVerse: "हिमालये तु केदारं घुश्मेशं च शिवालये॥",
    stotramTrans: "Himalaye tu Kedaram Ghusmesam cha Sivalaye ||",
    mantra: "ॐ नमः शिवाय",
    mantraMeaning: "I bow to Shiva, the supreme consciousness that resides within all beings.",
    mantraMeaningHi: "मैं भगवान शिव को नमन करता हूँ, जो सभी प्राणियों में वास करने वाली सर्वोच्च चेतना हैं।",
    architectureDetails: "Built using massive, finely cut grey stone slabs, locked together with iron dowels to withstand Himalayan winters.",
    ritualsDetails: "Pre-dawn Abhishekam, Shringar Aarti at sunset, and the chanting of Shiva Sahasranama echoing through the glacial valley.",
    experienceDetails: "A rigorous 16km uphill trek filled with mist, roaring rivers, and chants of 'Har Har Mahadev' echoing from pilgrims.",
    elevation: "3,583 m",
    visitors: "1.5 Million+",
    dynasty: "Pandavas Origin / Katyuri Style",
    travelSeason: "Summer & Autumn",
    bestMonths: "May to June, September to October",
    routeSteps: ["Dehradun / Rishikesh", "Guptkashi / Sonprayag", "Gaurikund Trek Base", "16km Sacred Footpath to Sanctum"]
  },
  somnath: {
    slug: "somnath",
    manifestationLore: "Soma (the Moon God) was cursed by Daksha Prajapati to lose his luster. Soma performed intense penance here to worship Shiva, who appeared as a pillar of light and released him from the curse, placing the crescent moon on his head. The temple represents the eternal cycle of renewal.",
    manifestationLoreHi: "चंद्रमा (सोम) को दक्ष प्रजापति ने क्षय रोग का श्राप दिया था। सोम ने शिव की आराधना हेतु यहाँ कठोर तपस्या की। शिव एक ज्योतिस्तम्भ के रूप में प्रकट हुए और श्राप से मुक्ति दी, चंद्रमा को मस्तक पर धारण किया। यह मंदिर शाश्वत नवजीवन का प्रतीक है।",
    manifestationLoreSa: "दक्षशापेन ग्रस्तः सोमः अत्र शिवं समाराधितवान्। शिवः तस्मै वरं दत्त्वा सोमनाथज्योतिर्लिङ्गरूपेण अत्र स्थितवान्।",
    droneViewDesc: "Overlooking the Arabian Sea, the temple stands majestically on the shoreline where waves crash against its stone fortress walls.",
    stotramVerse: "सौराष्ट्रदेशे विशदेऽतिरम्ये ज्योतिर्मयं चन्द्रकलावतंसम्।",
    stotramTrans: "Saurashtra dese visade tiramye, jyotirmayam chandra kalavatamsam.",
    mantra: "ॐ नमः शिवाय",
    mantraMeaning: "Salutations to the Lord of Soma, who restores the lost light of the soul.",
    mantraMeaningHi: "सोमनाथ को नमन, जो आत्मा की लुप्त आभा को पुनः जाग्रत करते हैं।",
    architectureDetails: "Constructed in the grand Chalukyan (Solanki) style, featuring sand-colored stones and intricately carved dome pillars.",
    ritualsDetails: "Morning and evening Aartis synchronized with the rhythm of crashing ocean waves at the temple's shore.",
    experienceDetails: "Walking through fortress-like gates into the sea breeze, hearing the sacred chants blend with the sound of the ocean.",
    elevation: "10 m",
    visitors: "4 Million+",
    dynasty: "Chaulukya Dynasty Rebuilds",
    travelSeason: "Winter / Monsoon",
    bestMonths: "October to March",
    routeSteps: ["Rajkot / Diu Airport", "Veraval Junction Railway", "Prabhas Patan Shoreline", "Somnath Temple Sanctum"]
  },
  badrinath: {
    slug: "badrinath",
    manifestationLore: "Lord Vishnu performed intense meditation here. To protect him from the harsh mountain cold, his consort Goddess Lakshmi took the form of a Badri (jujube) tree to shield him. Moved by her devotion, Vishnu named the spot Badrinath.",
    manifestationLoreHi: "भगवान विष्णु ने यहाँ घोर तपस्या की थी। तीव्र हिमपात से उन्हें बचाने हेतु माता लक्ष्मी ने बेर (बदरी) के वृक्ष का रूप धारण कर छत्रछाया प्रदान की। विष्णु ने प्रसन्न होकर इस धाम को बद्रीनाथ नाम दिया।",
    manifestationLoreSa: "भगवान् नारायणः अत्र तपश्चर्यां कृतवान्। तस्य रक्षणाय लक्ष्मीः बदरीवृक्षरूपेण स्थिता। अतः बदरीनाथः इति नाम।",
    droneViewDesc: "Nestled between Nar and Narayana mountain ranges, the colorful temple facade glows brightly against the stark grey peaks and Alaknanda River.",
    stotramVerse: "बदरीवनसंस्थाय देवाय परमात्मने।",
    stotramTrans: "Badari vana samsthaya devaya paramatmane.",
    mantra: "ॐ नमो भगवते वासुदेवाय",
    mantraMeaning: "I bow to the Supreme Lord Vishnu, who protects and preserves all cosmic life.",
    mantraMeaningHi: "मैं परमेश्वर वासुदेव को नमन करता हूँ, जो ब्रह्मांड के रक्षक और पोषक हैं।",
    architectureDetails: "Features a brightly painted, temple-gopuram entrance resembling a Buddhist monastery, with stone carvings and local wood structures.",
    ritualsDetails: "The sacred bath at Tapt Kund hot springs followed by the Maha Abhishekam of the black Saligram deity.",
    experienceDetails: "A mystical drive through the winding mountain gorges of Uttarakhand, arriving in a vibrant valley of colors and natural hot springs.",
    elevation: "3,133 m",
    visitors: "1.2 Million+",
    dynasty: "Garhwal Kings / Adi Shankaracharya",
    travelSeason: "Summer & Autumn",
    bestMonths: "May to June, September to November",
    routeSteps: ["Dehradun Airport / Rishikesh Station", "Joshimath Mountain Gateway", "Tapt Kund Purifying Bath", "Badrinath Main Altar"]
  },
  dwarkadhish: {
    slug: "dwarkadhish",
    manifestationLore: "Dwarka was established by Lord Krishna as his capital on the western coast of Gujarat. The temple marks the spot of 'Hari Griha' - the original palace of Lord Krishna, representing the kingdom of spiritual and material abundance.",
    manifestationLoreHi: "द्वारका की स्थापना भगवान कृष्ण ने गुजरात के पश्चिमी तट पर अपनी राजधानी के रूप में की थी। यह मंदिर 'हरि गृह' (श्रीकृष्ण के मूल महल) के स्थान पर स्थित है, जो समृद्धि और धर्म का केंद्र है।",
    manifestationLoreSa: "श्रीकृष्णस्य निवासस्थानम् द्वारकापुरी। अत्र द्वारकाधीशरूपेण भगवान् पूज्यते।",
    droneViewDesc: "Standing tall at the confluence of Gomti River and the Arabian Sea, its massive 5-story spire and triangular flag dominate the skyline.",
    stotramVerse: "द्वारकावासिने देव देवकीपुत्रनन्दिने।",
    stotramTrans: "Dwarka vasine deva devakiputra nandine.",
    mantra: "ॐ नमो भगवते वासुदेवाय",
    mantraMeaning: "Salutations to the Lord of Dwarka, the teacher of the Gita and friend of the soul.",
    mantraMeaningHi: "द्वारका के स्वामी श्रीकृष्ण को नमन, जो गीता के उपदेशक और आत्मा के सखा हैं।",
    architectureDetails: "Constructed of limestone and sand, supported by 72 pillars in the Solanki style, with a grand 51-meter shikhara spire.",
    ritualsDetails: "Changing of the massive triangular flag (Dwaja Arohana) five times daily, accompanied by high-energy drums and trumpets.",
    experienceDetails: "Crossing the Gomti bridge, bathing in the river steps, and entering through the Moksha Dwara (Gate of Salvation).",
    elevation: "12 m",
    visitors: "3 Million+",
    dynasty: "Vajranabha (Grandson of Krishna) / Gupta rebuilds",
    travelSeason: "Winter & Festivals",
    bestMonths: "August (Janmashtami) to February",
    routeSteps: ["Jamnagar / Porbandar Airport", "Dwarka Railway Station", "Gomti Ghat Holy Dip", "Moksha Dwara Entrance"]
  },
  "kashi-vishwanath": {
    slug: "kashi-vishwanath",
    manifestationLore: "Shiva chose Varanasi as his permanent home, declaring it the city of light (Kashi) that stands on his trident. During the creation of the cosmos, Shiva broke open the universe with his infinite pillar of light here, making it the center of liberation.",
    manifestationLoreHi: "शिव ने वाराणसी को अपना शाश्वत निवास चुना और इसे प्रकाश की नगरी (काशी) घोषित किया। सृष्टि के आदि में, शिव ने यहाँ ज्योतिपुंज के रूप में प्रकट होकर ब्रह्मांड को आलोकित किया था, जो मोक्ष का परम द्वार है।",
    manifestationLoreSa: "वाराणस्यां शिवः विश्वेश्वररूपेण तिष्ठति। इयं नगरी मोक्षदायिनी कथ्यते।",
    droneViewDesc: "Located on the ghats of the Ganges River, the newly developed Vishwanath Corridor connects the golden-domed spires directly to the holy water steps.",
    stotramVerse: "वाराणस्यां च विश्वेशं त्र्यम्बकं गौतमीतटे।",
    stotramTrans: "Varanasyam cha Visvesam Tryambakam Gautami tate.",
    mantra: "ॐ नमः शिवाय",
    mantraMeaning: "I bow to the Lord of the Universe, who illuminates the inner light of consciousness.",
    mantraMeaningHi: "ब्रह्मांड के स्वामी विश्वनाथ को नमन, जो चेतना के आंतरिक प्रकाश को प्रदीप्त करते हैं।",
    architectureDetails: "Intricate sandstone halls with two gold-plated spires containing over 800 kg of pure gold donated by Maharaja Ranjit Singh.",
    ritualsDetails: "The legendary Sapta Rishi Aarti, where seven priests perform deep Vedic chanting and mantra synchronization around the lingam.",
    experienceDetails: "Walking through narrow ancient lanes of Varanasi, smelling burning incense, and stepping onto the ghats of River Ganga.",
    elevation: "80 m",
    visitors: "10 Million+",
    dynasty: "Ahilyabai Holkar Rebuild (1780)",
    travelSeason: "Winter / Festive season",
    bestMonths: "October to March",
    routeSteps: ["Varanasi Babatpur Airport", "Varanasi Junction Station", "Ganga Path / Corridor Walk", "Golden Sanctum Darshan"]
  },
  rameshwaram: {
    slug: "rameshwaram",
    manifestationLore: "Before crossing over to Lanka, Lord Rama wanted to worship Shiva. Sita built a Lingam out of sand (Ramalingam). When Hanuman was late bringing a stone Lingam from Kailash, Rama worshipped the sand Lingam first. Shiva appeared and declared this spot as Rameshwaram (the Lord of Rama).",
    manifestationLoreHi: "लंका प्रस्थान से पूर्व भगवान राम ने शिव की पूजा करनी चाही। माता सीता ने रेत का लिंग (रामलिंगम) बनाया। हनुमान द्वारा कैलाश से लिंग लाने में विलम्ब होने पर राम ने रेत के लिंग की पूजा की, जिसे शिव ने रामेश्वरम घोषित किया।",
    manifestationLoreSa: "सेतुबन्धे श्रीरामचन्द्रेण स्थापितं लिङ्गं रामेश्वरम्।",
    droneViewDesc: "Located on Rameshwaram Island in Tamil Nadu, the massive temple features the longest carved stone corridors in the world.",
    stotramVerse: "सेतुबन्धे तु रामेशं नागेशं दारुकावने।",
    stotramTrans: "Setubandhe tu Ramesam Nagesam Darukavane.",
    mantra: "ॐ नमः शिवाय",
    mantraMeaning: "Salutations to Shiva, who was worshiped by Lord Rama to build the bridge of righteousness.",
    mantraMeaningHi: "भगवान शिव को नमन, जिनकी उपासना प्रभु श्री राम ने धर्म सेतु निर्माण हेतु की थी।",
    architectureDetails: "Renowned for its massive outer corridors measuring over 3,800 feet in length, supported by over 1,200 carved pillars.",
    ritualsDetails: "Bathing in the 22 holy water wells (Theerthams) inside the temple courtyard before taking darshan of the main deity.",
    experienceDetails: "Traveling across the iconic Pamban Bridge over the ocean, with the sea breeze carrying chants from the ancient island temple.",
    elevation: "10 m",
    visitors: "5 Million+",
    dynasty: "Pandya & Sethupathi Kings",
    travelSeason: "Winter / All season",
    bestMonths: "October to March",
    routeSteps: ["Madurai Airport (170km)", "Pamban Sea Bridge Road/Rail", "22 Sacred Wells Purification", "Ramalingam Altar"]
  },
  mahakaleshwar: {
    slug: "mahakaleshwar",
    manifestationLore: "A demon named Dushana harassed the residents of Ujjain. In response, Lord Shiva emerged from the earth as Mahakala (the Lord of Time and Death) and destroyed the demon, agreeing to stay here as a south-facing protector of the city.",
    droneViewDesc: "Located in the heart of Ujjain, the three-tiered temple structure sits near the sacred Shipra River.",
    stotramVerse: "उज्जयिन्यां महाकालमोङ्कारममलेश्वरम्॥",
    stotramTrans: "Ujjayinyam Mahakalam Omkaram Amalesvaram ||",
    mantra: "ॐ जूूं सः माम् पालय पालय",
    mantraMeaning: "O Lord of Time, protect me from the fear of death and lead me to immortality.",
    architectureDetails: "Spans three levels: Mahakaleshwar at the bottom, Omkareshwar in the middle, and Nagchandreshwar on the top floor.",
    ritualsDetails: "The daily 4:00 AM Bhasma Aarti, where the deity is bathed in fresh sacred ashes to represent the cycle of life and death.",
    experienceDetails: "Waiting in the early morning queues, hearing the intense rhythms of temple bells, and witnessing the mystical ash ritual.",
    elevation: "490 m",
    visitors: "6 Million+",
    dynasty: "Paramaras / Scindias Rebuild",
    travelSeason: "Winter",
    bestMonths: "October to March",
    routeSteps: ["Indore Airport (55km)", "Ujjain Junction Station", "Shipra River Holy Dip", "Mahakaleshwar Garbhagriha"]
  },
  "jagannath-puri": {
    slug: "jagannath-puri",
    manifestationLore: "Lord Vishnu is said to dine at Puri, sleep at Rameswaram, bathe at Badrinath, and rule at Dwarka. At Puri, he resides as Jagannath (Lord of the Universe) alongside his brother Balabhadra and sister Subhadra in wooden deity forms.",
    manifestationLoreHi: "मान्यता है कि भगवान विष्णु पुरी में भोजन करते हैं, रामेश्वरम में विश्राम करते हैं, बद्रीनाथ में स्नान करते हैं और द्वारका में शासन करते हैं। पुरी में वे अपने भाई बलभद्र और बहन सुभद्रा के साथ काष्ठ विग्रह में निवास करते हैं।",
    manifestationLoreSa: "नीलाचलनिवासाय नित्याय परमात्मने। बलभद्रसुभद्राभ्यां जगन्नाथाय ते नमः॥",
    droneViewDesc: "Facing the Bay of Bengal, the temple complex features a giant 65-meter stone tower topped by the holy Neela Chakra wheel and flag.",
    stotramVerse: "जगन्नाथप्रसादेन मुक्तिमाप्नोति मानवः।",
    stotramTrans: "Jagannath prasadena muktim apnoti manavah.",
    mantra: "जय जगन्नाथ",
    mantraMeaning: "Glory to the Lord of the Universe, who embraces all creation with divine love.",
    mantraMeaningHi: "संपूर्ण ब्रह्मांड के स्वामी जगन्नाथ जी की जय हो, जो सृष्टि के कण-कण को प्रेम प्रदान करते हैं।",
    architectureDetails: "Constructed on an elevated platform, using Khondalite stone, featuring the Jagamohana and Natamandapa hall structures.",
    ritualsDetails: "Changing the top flag daily by climbing the temple dome backwards, and preparing the massive Chappan Bhog in clay pots.",
    experienceDetails: "Walking down the wide Grand Road, seeing the sea of devotees, and eating the Mahaprasad from the world's largest kitchen.",
    elevation: "5 m",
    visitors: "8 Million+",
    dynasty: "King Anantavarman Chodaganga / Ganga Dynasty",
    travelSeason: "Ratha Yatra / Winter",
    bestMonths: "June to July (Ratha Yatra), October to March",
    routeSteps: ["Bhubaneswar Airport (60km)", "Puri Railway Station", "Swargadwar Beach Path", "Singhadwara Main Gate"]
  },
  kamakhya: {
    slug: "kamakhya",
    manifestationLore: "When Lord Shiva carried the corpse of Goddess Sati, Vishnu cut it with his Sudarshana Chakra. Sati's Yoni (womb/creativity) fell at the Nilachal Hill, establishing the temple as the ultimate seat of Shakti and divine feminine energy.",
    manifestationLoreHi: "जब भगवान शिव सती के पार्थिव शरीर को लेकर तांडव कर रहे थे, तब विष्णु ने सुदर्शन चक्र से उनके अंग विच्छेद किए। सती की योनि (गर्भ) यहाँ नील पर्वत पर गिरी, जिससे यह स्थान शक्ति साधना का सर्वोच्च केंद्र बना।",
    manifestationLoreSa: "सत्याः योनिभागः अत्र पतितः, अतः इयं कामाख्या शक्तिपीठम्।",
    droneViewDesc: "Perched atop Nilachal Hill in Guwahati, surrounded by the Brahmaputra River, its beehive-shaped dome stands amidst lush green forests.",
    stotramVerse: "कामाख्यां कामदां काम्यां कामिनीं कामरूपिणीम्।",
    stotramTrans: "Kamakhyam kamadam kamyam kaminim kamarupinim.",
    mantra: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे",
    mantraMeaning: "Salutations to the Divine Mother Kamakhya, the source of all desires and creative power.",
    mantraMeaningHi: "समस्त इच्छाओं और सृजनात्मकता की स्रोत, जगदम्बा कामाख्या देवी को सादर नमन।",
    architectureDetails: "A unique dome style called Nilachal type, characterized by a polygonal base and a dome carved with rows of miniature temples.",
    ritualsDetails: "The annual Ambubachi Mela, during which the temple is closed for three days as the Mother Earth undergoes her cycle.",
    experienceDetails: "Climbing the stone stairs of Nilachal Hill, entering the dark, subterranean rock cave containing the natural spring.",
    elevation: "150 m",
    visitors: "2.5 Million+",
    dynasty: "Mlechchha Dynasty / Koch Dynasty Rebuild",
    travelSeason: "Ambubachi / Winter",
    bestMonths: "June (Ambubachi Festival), October to April",
    routeSteps: ["Guwahati Airport / Railway Station", "Nilachal Hill Road Trek", "Inner Sanctum Cave Descent", "Natural Spring Darshan"]
  },
  "vaishno-devi": {
    slug: "vaishno-devi",
    manifestationLore: "Goddess Vaishnavi was created by the collective energies of Kali, Lakshmi, and Saraswati to destroy demons. She performed intense meditation in a cave here. When pursued by Bhairav Nath, she entered the cave and manifested as three natural stone formations (Pindis).",
    manifestationLoreHi: "माता वैष्णवी की उत्पत्ति महाकाली, महालक्ष्मी और महासरस्वती की सामूहिक शक्तियों से हुई थी। भैरवनाथ से बचने हेतु उन्होंने इस गुफा में तपस्या की और अंततः तीन प्राकृतिक शिलाओं (पिंडियों) के रूप में प्रकट हुईं।",
    manifestationLoreSa: "महाकाली-महालक्ष्मी-महासरस्वतीरूपा वैष्णोदेवी अत्र गुहायां पूज्यते।",
    droneViewDesc: "Located in the Trikuta Mountains at 1,560 meters, the white marble bhawan clings to the vertical mountain slopes.",
    stotramVerse: "सर्वमङ्गलमङ्गल्ये शिवे सर्वार्थसाधिके।",
    stotramTrans: "Sarva mangala mangalye Shive sarvartha sadhike.",
    mantra: "जय माता दी",
    mantraMeaning: "Victory to the Divine Mother, who fulfills all righteous prayers of her children.",
    mantraMeaningHi: "जगतजननी माता की जय हो, जो अपने बच्चों की हर धर्मसम्मत प्रार्थना पूर्ण करती हैं।",
    architectureDetails: "The original narrow limestone cave where water flows naturally at the base, leading to the marble-lined worship hall (Bhawan).",
    ritualsDetails: "The continuous chanting of the Durga Saptashati inside the natural rock cave and the Shringar Aarti twice daily.",
    experienceDetails: "A legendary 12km mountain trek from Katra, lit by glowing lamps at night, filled with echo-chants of 'Jai Mata Di'.",
    elevation: "1,560 m",
    visitors: "8 Million+",
    dynasty: "Ancient Origin / Shrine Board",
    travelSeason: "Autumn / Spring",
    bestMonths: "March to May, September to November (Navratri)",
    routeSteps: ["Jammu Airport / Katra Railway Station", "Katra Base Camp Registration", "12km Sacred Mountain Trek", "Natural Cave Holy Bhawan"]
  },
  ranganathaswamy: {
    slug: "ranganathaswamy",
    manifestationLore: "Lord Rama worshiped the idol of Ranganatha. Upon his victory in Lanka, he gifted it to Vibhishana. On his way back, Vibhishana placed the idol down on the banks of Kaveri. The idol became fixed to the ground, and Vishnu promised to stay facing south towards Lanka.",
    manifestationLoreHi: "श्री राम ने श्री रंगनाथ मूर्ति की पूजा की थी। रावण वध के पश्चात उन्होंने यह मूर्ति विभीषण को उपहार में दी। मार्ग में विभीषण ने इसे कावेरी नदी के तट पर रख दिया, जहाँ यह भूमि से जुड़ गई और भगवान यहीं स्थापित हो गए।",
    manifestationLoreSa: "श्रीरङ्गनाथः अत्र कावेरीतटे शेषाशायी भगवान् पूज्यते।",
    droneViewDesc: "Located on an island between the Kaveri and Kollidam rivers, its massive 156-acre complex features 21 towering, colorful gopurams.",
    stotramVerse: "श्रीरङ्गनाथं करुणासमुद्रं श्रीरङ्गराजं प्रणमामि नित्यम्।",
    stotramTrans: "Sriranganatham karunasamudram Srirangarajam pranamami nityam.",
    mantra: "ॐ नमो नारायणाया",
    mantraMeaning: "I bow to Lord Narayana, who rests on the ocean of compassion and sustains the universe.",
    mantraMeaningHi: "मैं भगवान नारायण को नमन करता हूँ, जो दया के सागर हैं और ब्रह्मांड के आधार हैं।",
    architectureDetails: "Classic Dravidian temple city, structured in seven concentric enclosures (Prakarams) with 39 pavilions and 81 shrines.",
    ritualsDetails: "Morning Viswaroopa Darshan and the daily chanting of the Nalayira Divya Prabandham by Vaishnava scholars.",
    experienceDetails: "Passing under the massive 73-meter Rajagopuram, walking through concentric ancient streets that feel like a living medieval town.",
    elevation: "70 m",
    visitors: "5 Million+",
    dynasty: "Cholas / Pandyas / Vijayanagara Empire",
    travelSeason: "Vaikunta Ekadashi / Winter",
    bestMonths: "December to January (Festivals), October to March",
    routeSteps: ["Tiruchirappalli Airport (15km)", "Srirangam Railway Station", "Concentric Enclosure Gateways", "Reclining Lord Ranganatha Altar"]
  },
  "tirumala-venkateswara": {
    slug: "tirumala-venkateswara",
    manifestationLore: "In Kali Yuga, Lord Vishnu manifested as Venkateswara (Balaji) on the Seshachalam Hills to rescue humanity from trials. He took a loan from Kubera for his wedding with Padmavathi, and devotees offer wealth to help repay the cosmic loan.",
    manifestationLoreHi: "कलियुग में, भगवान विष्णु मनुष्यों के कल्याण हेतु शेषाचलम पर्वत पर वेंकटेश्वर (बालाजी) के रूप में प्रकट हुए। देवी पद्मावती से विवाह हेतु उन्होंने कुबेर से ऋण लिया था, जिसे चुकाने हेतु श्रद्धालु यहाँ दान करते हैं।",
    manifestationLoreSa: "कलियुगे वेंकटेश्वरः भक्तानां रक्षणाय तिरुमलापर्वते विराजते।",
    droneViewDesc: "Perched on Venkatadri, one of the seven hills of Tirumala, its gold-plated temple dome glistens in the green forest valleys.",
    stotramVerse: "श्रियाः कान्ताय कल्याणनिधये निधयेऽर्थिनाम्।",
    stotramTrans: "Shriyah kantaya kalyana nidhaye nidhaye rthinam.",
    mantra: "ॐ नमो वेङ्कटेशाय",
    mantraMeaning: "Salutations to Lord Venkateswara, the dispeller of sins and giver of ultimate grace.",
    mantraMeaningHi: "भगवान वेंकटेश्वर को नमन, जो पापों के नाशक और परम कृपा के प्रदाता हैं।",
    architectureDetails: "A magnificent Dravidian temple with a gold-covered dome (Ananda Nilayam) over the inner sanctum containing the self-manifested deity.",
    ritualsDetails: "The early morning Suprabhatha Seva to wake the Lord, followed by continuous Kalyanotsavam (marriage rituals) and Laddu Prasadam creation.",
    experienceDetails: "Climbing the Alipiri foot-steps path (9km) up the holy hills, chanting 'Govinda Govinda' alongside thousands of walking pilgrims.",
    elevation: "853 m",
    visitors: "25 Million+",
    dynasty: "Pallava / Chola / Vijayanagara Kings",
    travelSeason: "Brahmotsavam / All season",
    bestMonths: "September to October (Brahmotsavam), November to February",
    routeSteps: ["Tirupati Airport (35km)", "Tirupati Railway Junction", "Alipiri Walkway / Tirumala Hills Road", "Ananda Nilayam Sanctum"]
  },
  mallikarjuna: {
    slug: "mallikarjuna",
    manifestationLore: "When Skanda retired to Krauncha mountain in anger, Shiva and Parvati visited him. Shiva manifested here as Mallikarjuna (Mallika meaning Parvati and Arjuna meaning Shiva) on the bank of River Krishna.",
    droneViewDesc: "Set atop the flat-topped Srisailam mountain in the Nallamala hills, surrounded by thick forests.",
    stotramVerse: "श्रीशैले मल्लिकार्जुनम्॥",
    stotramTrans: "Srisaile Mallikarjunam ||",
    mantra: "ॐ नमः शिवाय",
    mantraMeaning: "I bow to Mallikarjuna, the divine union of Shiva and Shakti.",
    architectureDetails: "Fortified stone temple walls decorated with friezes representing elephants, soldiers, and mythological events.",
    ritualsDetails: "Sparsha Darshan, allowing devotees to touch the Shiva Lingam, and the daily Bilva Archana.",
    experienceDetails: "A scenic boat ride through the Patala Ganga gorge, followed by a cable car ride up the mountain slopes.",
    elevation: "457 m",
    visitors: "2 Million+",
    dynasty: "Kakatiya and Vijayanagara Kings",
    travelSeason: "Winter",
    bestMonths: "September to February",
    routeSteps: ["Hyderabad Airport (200km)", "Markapur Railway Station", "Nallamala Forest Drive", "Srisailam Temple Gateway"]
  },
  omkareshwar: {
    slug: "omkareshwar",
    manifestationLore: "The Vindhya Mountain deity performed penance to please Lord Shiva. Pleased, Shiva appeared and split his light into two: Omkareshwar (on the island) and Amareshwar (on the south bank), forming the cosmic Om syllable.",
    droneViewDesc: "The temple sits on Mandhata island in the Narmada river, shaped naturally like the sacred Sanskrit syllable ॐ.",
    stotramVerse: "ओङ्कारममलेश्वरम्॥",
    stotramTrans: "Omkaram Amalesvaram ||",
    mantra: "ॐ नमः शिवाय",
    mantraMeaning: "I bow to the Lord of Omkareshwar, who is the cosmic sound of creation.",
    architectureDetails: "Constructed using local soft stone, featuring a multi-story layout with heavy pillars carved with figures and columns.",
    ritualsDetails: "Regular Narmada Aarti and the Panchamrut Abhishekam using holy waters of the Narmada river.",
    experienceDetails: "A boat ride across the wide Narmada River, watching the sunset reflect off the island temple temples.",
    elevation: "200 m",
    visitors: "3 Million+",
    dynasty: "Ancient / Holkars Rebuild",
    travelSeason: "Monsoon & Winter",
    bestMonths: "August to March",
    routeSteps: ["Indore Airport (77km)", "Khandwa Railway Station", "Narmada River Boat Crossing", "Omkareshwar Island Sanctum"]
  },
  bhimashankar: {
    slug: "bhimashankar",
    manifestationLore: "Shiva defeated a demon named Bhima here. The heat generated during the battle evaporated local streams, and Shiva created the Bhima River from his sweat, staying behind to protect the forest.",
    droneViewDesc: "Nestled in the dense green forests of the Sahyadri mountains, a wildlife sanctuary rich in biodiversity.",
    stotramVerse: "डाकिन्यां भीमशङ्करम्॥",
    stotramTrans: "Dakinyam Bhimasankaram ||",
    mantra: "ॐ नमः शिवाय",
    mantraMeaning: "Salutations to Bhimashankar, the protector of seers and destroyer of demonic energies.",
    architectureDetails: "Unique Hemadpanthi style architecture with beautifully carved stone pillars, windows, and assembly halls.",
    ritualsDetails: "Early morning Rudra Abhishekam performed with herbs and water from the Bhima River.",
    experienceDetails: "Driving through misty hills, passing by waterfalls, and walking down stone steps into the deep forest temple.",
    elevation: "1,034 m",
    visitors: "1.5 Million+",
    dynasty: "Peshwa Dynasty Upgrades",
    travelSeason: "Monsoon & Winter",
    bestMonths: "August to February",
    routeSteps: ["Pune Airport (110km)", "Pune Junction Station", "Sahyadri Western Ghats Drive", "Gupta Bhimashankar Stream"]
  },
  trimbakeshwar: {
    slug: "trimbakeshwar",
    manifestationLore: "Sage Gautama brought the holy Godavari River down to earth to purify his hermitage. Shiva appeared, released Godavari, and stayed as a three-headed Lingam representing Brahma, Vishnu, and Shiva.",
    droneViewDesc: "Located near the Brahmagiri mountain, the black basalt stone structure features elaborate carvings.",
    stotramVerse: "त्र्यम्बकं गौतमीतटे॥",
    stotramTrans: "Tryambakam Gautami tate ||",
    mantra: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्",
    mantraMeaning: "We worship the three-eyed Lord, who is fragrant and nourishes all beings. May he liberate us from death.",
    architectureDetails: "Built of black stone with a spacious courtyard containing a sacred pool (Kushavarta Kund).",
    ritualsDetails: "Kalsarpa Shanti and Narayan Nagbali Vedic rituals, alongside the main triple-deity Abhishekam.",
    experienceDetails: "Climbing the steps of Brahmagiri mountain to see the origin of Godavari River, returning to the ancient stone temple.",
    elevation: "720 m",
    visitors: "4 Million+",
    dynasty: "Peshwa Balaji Baji Rao (1750s)",
    travelSeason: "Monsoon & Winter",
    bestMonths: "September to March",
    routeSteps: ["Nashik Airport (30km)", "Nashik Road Railway Station", "Kushavarta Kund Bath", "Trinity Lingam Sanctum"]
  },
  vaidyanath: {
    slug: "vaidyanath",
    manifestationLore: "The demon king Ravana carried Shiva to Lanka. Ganesha tricked Ravana into placing the Lingam down at Deoghar. Ravana tried to pull it up but failed, damaging it, and Shiva remained as the divine physician.",
    droneViewDesc: "A temple complex comprising 22 shrines with red and white pyramidal spires connected by red threads.",
    stotramVerse: "परल्यां वैद्यनाथं च...",
    stotramTrans: "Paralyam Vaidyanatham cha...",
    mantra: "ॐ नमः शिवाय",
    mantraMeaning: "I bow to the Divine Physician Shiva, who heals all mental and physical sufferings.",
    architectureDetails: "A simple stone structure with a pyramidal spire, topped with a golden pitcher (Kalash) and a trident.",
    ritualsDetails: "The Kanwar Yatra ritual during Shravan, where pilgrims offer holy Ganga water carried on foot.",
    experienceDetails: "Walking in a sea of saffron-clad pilgrims chanting 'Bol Bam' during the hot monsoon months.",
    elevation: "120 m",
    visitors: "7 Million+",
    dynasty: "East India Historic / Local Kings",
    travelSeason: "Monsoon & Winter",
    bestMonths: "July to August (Shravan), October to February",
    routeSteps: ["Deghar Airport / Jasidih Station", "Kanwariya Saffron Walkway", "Holy Thread Binding Ceremony", "Vaidyanath Altar"]
  },
  nageshwar: {
    slug: "nageshwar",
    manifestationLore: "A merchant devotee Supriya was imprisoned by the demon Daruka. Supriya chanted Shiva mantras. Shiva appeared as Nageshwar (the Lord of Serpents) from a self-manifested opening, destroying the demon.",
    droneViewDesc: "Located near the coast of Dwarka, featuring a massive, eye-catching 82-foot statue of Lord Shiva.",
    stotramVerse: "...नागेशं दारुकावने॥",
    stotramTrans: "Nagesam Darukavane ||",
    mantra: "ॐ नमः शिवाय",
    mantraMeaning: "Salutations to the Lord of Serpents, who frees the mind from poison, fear, and illusion.",
    architectureDetails: "Spacious modern assembly hall leading to a low-roofed sanctum where the Swayambhu Lingam sits.",
    ritualsDetails: "Abhishekam and decoration of the Lingam with silver serpents during festival days.",
    experienceDetails: "Seeing the giant sitting Shiva statue from miles away, walking into the peaceful seaside gardens.",
    elevation: "15 m",
    visitors: "2 Million+",
    dynasty: "Modern Rebuild / Late T-Series Founder",
    travelSeason: "Winter",
    bestMonths: "October to March",
    routeSteps: ["Jamnagar Airport (135km)", "Dwarka Railway Station", "Seaside Garden Path", "Nageshwar Inner Sanctum"]
  },
  grishneshwar: {
    slug: "grishneshwar",
    manifestationLore: "A devout woman Ghushma worshipped Shiva by dissolving clay lingams in a lake. Her jealous sister killed Ghushma's son. Ghushma continued worship. Shiva resurrected her son and stayed as Grishneshwar.",
    droneViewDesc: "Located close to the world-famous Ellora Caves, the red basalt stone temple features fine carvings.",
    stotramVerse: "हिमालये तु केदारं घुश्मेशं च शिवालये॥",
    stotramTrans: "Himalaye tu Kedaram Ghusmesam cha Sivalaye ||",
    mantra: "ॐ नमः शिवाय",
    mantraMeaning: "Salutations to the Lord of Compassion, who answers the prayer of pure devotion.",
    architectureDetails: "Constructed of red rock, featuring a five-tier shikhara spire carved with images of Hindu deities.",
    ritualsDetails: "Sparsha Abhishekam, where devotees touch and pour water directly onto the red basalt stone Lingam.",
    experienceDetails: "Visiting the monumental cave-temples of Ellora, then walking to this ancient red stone shrine.",
    elevation: "560 m",
    visitors: "2.5 Million+",
    dynasty: "Rebuilt by Queen Ahilyabai Holkar",
    travelSeason: "Winter / All season",
    bestMonths: "October to March",
    routeSteps: ["Aurangabad Airport (35km)", "Aurangabad Station", "Ellora Cave Road Passage", "Red Basalt Altar Room"]
  }
};

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

const TEMPLE_TIMELINES: Record<string, TimelineEvent[]> = {
  kedarnath: [
    { year: "Dvapara Yuga", title: "Pandava Foundation", desc: "The Pandavas built the original shrine to seek atonement from Lord Shiva." },
    { year: "8th Century CE", title: "Adi Shankaracharya's Revival", desc: "The great master revived the pilgrimage route, reconstructed the temple, and took Samadhi behind the shrine." },
    { year: "10th-11th Century", title: "Katyuri Dynasty", desc: "The temple was built in Katyuri style using massive stone slabs interlocked with iron dowels." },
    { year: "2013 CE", title: "Himalayan Deluge", desc: "A massive boulder (Bheem Shila) rolled down and stopped behind the temple, shielding it from destruction during flash floods." },
    { year: "2020-Present", title: "Kedarpuri Reconstruction", desc: "Comprehensive restoration of the valley, expanding routes and building the grand Adi Shankaracharya Samadhi Memorial." }
  ],
  somnath: [
    { year: "Satya Yuga", title: "Soma's Golden Temple", desc: "Originally built of gold by the Moon God, Chandra, after being liberated from Daksha's curse." },
    { year: "649 CE", title: "Valabhi Dynasty Rebuild", desc: "King Vallabhi replaced the structures with a stone temple after earlier reconstructions." },
    { year: "1026 CE", title: "Solanki Dynasty Reconstruction", desc: "After destruction by Mahmud Ghazni, King Bhimdev I and Raja Bhoj of Malwa rebuilt the shrine in grand Solanki style." },
    { year: "1783 CE", title: "Queen Ahilyabai Holkar", desc: "The Maratha Queen Ahilyabai Holkar built a temple adjacent to the ruins to sustain regular worship." },
    { year: "1951 CE", title: "The Eternal Resurgence", desc: "Sardar Vallabhbhai Patel initiated the grand modern temple reconstruction, inaugurated by President Dr. Rajendra Prasad." }
  ],
  badrinath: [
    { year: "Satya Yuga", title: "Nara-Narayana Penance", desc: "Lord Vishnu performed intense meditation, sheltered by Goddess Lakshmi as a Badri (jujube) tree." },
    { year: "8th Century CE", title: "Adi Shankaracharya Enshrining", desc: "Adi Shankaracharya discovered the black Shaligram deity of Lord Badrinarayan in the Alaknanda River and enshrined it." },
    { year: "16th Century", title: "King of Garhwal", desc: "The King of Garhwal constructed the temple structure, transferring the deity to the current temple." },
    { year: "1803 CE", title: "Great Himalayan Earthquake", desc: "The temple suffered major damage and was rebuilt by the rulers of Jaipur and Garhwal." },
    { year: "Present", title: "Badrinath Master Plan", desc: "Implementation of the spiritual smart city corridor and riverfront protection works." }
  ],
  dwarkadhish: [
    { year: "Dvapara Yuga", title: "Krishna's Capital", desc: "Dwarka was established by Lord Krishna as his capital on the western coast of Gujarat." },
    { year: "400 BC", title: "Vajranabha Foundation", desc: "Krishna's grandson Vajranabha built the first temple building over 'Hari Griha' (Krishna's residential palace)." },
    { year: "8th Century CE", title: "Adi Shankaracharya's Peeth", desc: "The great sage visited Dwarka and established the Sharda Peeth, one of the four cardinal monasteries." },
    { year: "1472 CE", title: "Sultan Mahmud Begada", desc: "The temple was damaged during attacks and later rebuilt in the Solanki style during the 15th-16th century." },
    { year: "Present", title: "Devbhumi Dwarka Development", desc: "Heritage corridor construction and underwater archaeological explorations near the submerged ancient city." }
  ],
  "kashi-vishwanath": [
    { year: "Satya Yuga", title: "City on Shiva's Trident", desc: "Varanasi (Kashi) is established by Shiva as the eternal center of spiritual light and cosmic energy." },
    { year: "1194 CE", title: "Historical Depredations", desc: "The temple suffered multiple demolitions during medieval invasions, with devotees repeatedly rebuilding it." },
    { year: "1585 CE", title: "Raja Todar Mal Rebuild", desc: "The finance minister of Akbar, Raja Todar Mal, rebuilt the temple under the guidance of Narayana Bhatta." },
    { year: "1780 CE", title: "Queen Ahilyabai Holkar", desc: "The Indore queen constructed the current temple structure, ensuring the continuation of daily rituals." },
    { year: "1839 CE", title: "Maharaja Ranjit Singh's Gold", desc: "The Sikh Maharaja of Punjab donated 820 kg of pure gold to plate the spires and dome of the temple." },
    { year: "2021 CE", title: "Vishwanath Corridor", desc: "Inauguration of the massive pedestrian corridor connecting the temple directly to the Ganga River ghats." }
  ],
  rameshwaram: [
    { year: "Treta Yuga", title: "Rama's Sand Lingam", desc: "Lord Rama and Sita built and worshiped a Lingam of sand before launching the bridge to Lanka." },
    { year: "12th Century CE", title: "Pandya Dynasty Sanctum", desc: "The core stone sanctum was constructed by the rulers of the Pandya Dynasty." },
    { year: "15th Century CE", title: "Sethupathi Kings Expansion", desc: "The rulers of Ramnad (Sethupathis) began the massive temple expansions, including the corridors." },
    { year: "18th Century CE", title: "Longest Corridor Completion", desc: "Construction of the world's longest pillared corridor was completed, measuring over 3,800 feet." }
  ],
  mahakaleshwar: [
    { year: "Satya Yuga", title: "Lord Shiva's Appearance", desc: "Lord Shiva emerged from the earth as Mahakala to slay the demon Dushana and protect Ujjain." },
    { year: "11th Century CE", title: "Paramara Dynasty", desc: "The kings of the Paramara Dynasty constructed the temple complex and developed the holy Shipra ghats." },
    { year: "1234 CE", title: "Iltutmish Invasion", desc: "The temple was destroyed during Delhi Sultanate raids, and the Swayambhu Jyotirlinga was thrown into a nearby tank." },
    { year: "18th Century CE", title: "Scindia Dynasty Restoration", desc: "General Ranoji Scindia reconstructed the temple, reviving the ancient morning Bhasma Aarti." },
    { year: "2022 CE", title: "Mahakal Lok Corridor", desc: "Inauguration of the grand Mahakal Lok heritage corridor, adorned with murals and sandstone columns." }
  ],
  "jagannath-puri": [
    { year: "Ancient Era", title: "King Indradyumna", desc: "King Indradyumna commissioned the original wood carving of the deities based on a divine dream." },
    { year: "1161 CE", title: "Ganga Dynasty Foundation", desc: "King Anantavarman Chodaganga Dev started the construction of the present monumental stone temple." },
    { year: "1230 CE", title: "Anangabhima Dev Completion", desc: "The temple complex was completed and consecrated with the deities of Jagannath, Balabhadra, and Subhadra." },
    { year: "1568 CE", title: "Kalapahar Invasion", desc: "The temple was raided by general Kalapahar, but priests saved the sacred core deities, hiding them on an island." },
    { year: "2024 CE", title: "Srimandir Parikrama", desc: "Inauguration of the Puri Heritage Corridor providing 360-degree clear view and pathway around the temple walls." }
  ],
  kamakhya: [
    { year: "Satya Yuga", title: "Sati's Sacred Womb", desc: "During Shiva's Shiva Tandava, the womb (Yoni) of Goddess Sati fell on Nilachal Hill, establishing the ultimate seat of Shakti." },
    { year: "8th Century CE", title: "Mlechchha Dynasty", desc: "The earliest stone structures of the temple were constructed under the rulers of the Mlechchha Dynasty." },
    { year: "1565 CE", title: "Koch Dynasty Rebuild", desc: "The Koch King Nara Narayan and his general Chilarai rebuilt the temple in the unique Nilachal shape after damages." },
    { year: "17th Century CE", title: "Ahom Royal Patronage", desc: "Ahom kings expanded the complex, adding the Natamandira and establishing animal sanctuaries." }
  ],
  "vaishno-devi": [
    { year: "Treta Yuga", title: "Goddess Vaishnavi's Meditation", desc: "The Goddess Vaishnavi withdrew to the Trikuta cave for penance and manifested into three natural stone Pindis." },
    { year: "Dvapara Yuga", title: "Pandava Steps", desc: "The Pandavas constructed the original path and cave access to worship the Mother Goddess." },
    { year: "1986 CE", title: "Shrine Board Takeover", desc: "The Shri Mata Vaishno Devi Shrine Board was formed, initiating modern paths, safety sheds, and clean drinking water." },
    { year: "2018 CE", title: "Tarakote Marg Corridor", desc: "Inauguration of a new eco-friendly pedestrian path with moderate slopes for walking pilgrims." }
  ],
  ranganathaswamy: [
    { year: "Treta Yuga", title: "Consecration by Vibhishana", desc: "Vibhishana placed the idol of Ranganatha on the banks of Kaveri while returning to Lanka, locking it to the ground." },
    { year: "10th Century CE", title: "Chola Empire Construction", desc: "Stone structures and early walls were built around the shrine by Chola monarchs." },
    { year: "14th Century CE", title: "Vijayanagara Restoration", desc: "Following medieval sackings, Vijayanagara kings restored the temple city, adding pillared halls." },
    { year: "1987 CE", title: "Rajagopuram Completion", desc: "The towering 240-foot main gate (Rajagopuram) was completed, becoming the tallest in Asia." }
  ],
  "tirumala-venkateswara": [
    { year: "Kali Yuga", title: "Lord Balaji's Manifestation", desc: "Lord Vishnu manifested on Venkatadri hill as Venkateswara to protect mankind from the trials of Kali Yuga." },
    { year: "966 CE", title: "Queen Samavai Devotion", desc: "The Pallava Queen Samavai donated the silver deity Bhoga Srinivasa and instituted regular ritual offerings." },
    { year: "1517 CE", title: "Krishnadevaraya's Gilding", desc: "The Vijayanagara Emperor Krishnadevaraya visited multiple times, donating gold to cover the Vimana dome." },
    { year: "1933 CE", title: "TTD Board Foundation", desc: "Establishment of the Tirumala Tirupati Devasthanams (TTD) to manage administration, pilgrim halls, and laddu distribution." }
  ],
  mallikarjuna: [
    { year: "Satya Yuga", title: "Shiva-Shakti Reunion", desc: "Lord Shiva and Goddess Parvati manifested as Mallikarjuna on Srisailam mountain to visit their son Kartikeya." },
    { year: "14th Century CE", title: "Kakatiya Royal Patronage", desc: "The Kakatiya kings built the massive stone fortification walls around the temple temple." },
    { year: "1667 CE", title: "Shivaji Maharaj Restoration", desc: "Chhatrapati Shivaji Maharaj repaired the temple's northern tower and built a shelter for travelers." }
  ],
  omkareshwar: [
    { year: "Ancient Era", title: "King Mandhata Penance", desc: "The Ikshvaku King Mandhata performed intense penance here, naming the island Mandhata." },
    { year: "10th Century CE", title: "Paramara Dynasty", desc: "The Paramara kings of Malwa developed the temple complex, carving massive stone pillars." },
    { year: "18th Century CE", title: "Ahilyabai Holkar Rebuild", desc: "Queen Ahilyabai Holkar sponsored repairs and rebuilt the steps leading down to the Narmada River." }
  ],
  bhimashankar: [
    { year: "Ancient Era", title: "Demon Bhima Slain", desc: "Lord Shiva destroyed the demon Bhima, and his divine sweat created the Bhima River." },
    { year: "13th Century CE", title: "Yadava Dynasty", desc: "The Hemadpanthi style stone masonry was constructed during the Yadava reign." },
    { year: "18th Century CE", title: "Nana Phadnavis Upgrades", desc: "The Maratha statesman Nana Phadnavis built the main shikhara spire and the temple water reservoir." }
  ],
  trimbakeshwar: [
    { year: "Ancient Era", title: "Gautama & Godavari Descent", desc: "Sage Gautama prayed to Lord Shiva to release Godavari River to wash away his sins." },
    { year: "1755 CE", title: "Peshwa Balaji Baji Rao", desc: "The Peshwa reconstructed the temple using local black basalt stone, designing the current architecture." },
    { year: "19th Century CE", title: "Kushavarta Kund Rebuild", desc: "The sacred bathing tank where Godavari emerges was rebuilt with stone steps and pavilions." }
  ],
  vaidyanath: [
    { year: "Treta Yuga", title: "Ravana's Lingam", desc: "The demon king Ravana dropped the Shiva Lingam at Deoghar, anchoring it to the earth." },
    { year: "1596 CE", title: "King Puran Mal", desc: "The ruler of Gidhaur, King Puran Mal, constructed the main temple structure and dome." },
    { year: "18th Century CE", title: "Red Thread Binding", desc: "The tradition of tying red threads between Shiva and Parvati temples was formalized by local priests." }
  ],
  nageshwar: [
    { year: "Ancient Era", title: "Supriya Saved", desc: "The merchant Supriya was rescued by Shiva from the demon Daruka in the Darukavana forest." },
    { year: "1996 CE", title: "Modern Reconstruction", desc: "The temple was renovated, and a massive 82-foot sitting Shiva statue was erected." }
  ],
  grishneshwar: [
    { year: "Ancient Era", title: "Ghushma's Resurrected Son", desc: "Shiva appeared to resurrect Ghushma's son from the temple lake, staying as a Jyotirlinga." },
    { year: "16th Century CE", title: "Maloji Bhosale Rebuild", desc: "Shivaji Maharaj's grandfather rebuilt the temple tank and the stone core after historical damages." },
    { year: "1780 CE", title: "Ahilyabai Holkar", desc: "Queen Ahilyabai Holkar rebuilt the temple in its current red basalt stone format." }
  ]
};

const TEMPLE_FESTIVALS: Record<string, { name: string; tithi: string; desc: string; ritual: string }[]> = {
  kedarnath: [
    { name: "Maha Shivratri", tithi: "Phalguna (Feb-Mar)", desc: "Celebration of Shiva's cosmic wedding. The opening dates of the temple are announced.", ritual: "Special Rudrabhishekam and lighting of thousands of ghee lamps." },
    { name: "Badri Kedar Utsav", tithi: "Jyeshtha (June)", desc: "A joint cultural festival celebrating the two primary dhams of Uttarakhand.", ritual: "Devotional singing, chanting of Vedas, and traditional mountain folk dances." },
    { name: "Kedar Mela / Annakut", tithi: "Bhadrapada (Sept-Oct)", desc: "Harvest celebration before the winter closing of the temple doors.", ritual: "The main deity is decorated with cooked grains and offered as prasadam." }
  ],
  somnath: [
    { name: "Kartik Purnima", tithi: "Kartika (Nov-Dec)", desc: "Commemorates the liberation of Soma (the moon) from the curse of Daksha.", ritual: "Holy bath at Triveni Sangam, beach Aarti, and a multi-day cultural fair." },
    { name: "Maha Shivratri", tithi: "Phalguna (Feb-Mar)", desc: "Grand night-long vigil celebrating Shiva's infinite light pillar.", ritual: "24-hour continuous Abhishekams and illumination of the seashore." },
    { name: "Shravan Month", tithi: "Shravana (July-Aug)", desc: "Monsoon devotion period dedicated completely to Lord Shiva.", ritual: "Daily special flower decoration (Shringar) and evening prayers on the waves." }
  ],
  badrinath: [
    { name: "Krishna Janmashtami", tithi: "Bhadrapada (Aug-Sept)", desc: "Celebrating the birth of Lord Krishna, Vishnu's eighth incarnation.", ritual: "Midnight Aarti, bathing the deity with milk and honey, and chanting Vishnu Sahasranama." },
    { name: "Mata Murti Mela", tithi: "Bhadrapada (Sept)", desc: "Honors the mother of Lord Badrinarayan, celebrating the descent of River Ganga.", ritual: "Ganga puja, offerings at Alaknanda river, and chariot processions." },
    { name: "Kapat Opening", tithi: "Vaisakha (Apr-May)", desc: "The grand spring opening of the temple doors after winter sleep.", ritual: "Lighting the Akhanda Jyoti lamp and offering first grains to the deity." }
  ],
  dwarkadhish: [
    { name: "Krishna Janmashtami", tithi: "Bhadrapada (Aug-Sept)", desc: "The grandest celebration in Dwarka, marking the birth of Lord Krishna.", ritual: "Aarti at midnight, changing the golden flag (Dwaja), and distribution of Makhan." },
    { name: "Holi (Utsav)", tithi: "Phalguna (March)", desc: "Spring festival celebrated with immense joy representing Krishna's leelas.", ritual: "Playing with natural colors and flowers, special prayers at Gomti Ghat." },
    { name: "Sharad Purnima", tithi: "Asvina (Oct)", desc: "Celebration under the bright autumn full moon, symbolizing the Raas Leela.", ritual: "Special white dress for Dwarkadhish, and night-long bhajan singing." }
  ],
  "kashi-vishwanath": [
    { name: "Maha Shivratri", tithi: "Phalguna (Feb-Mar)", desc: "Shiva's wedding festival, the most famous celebration in Varanasi.", ritual: "Grand Shiva wedding procession (Barat) through Kashi lanes, night-long aarti." },
    { name: "Dev Deepawali", tithi: "Kartika (Nov-Dec)", desc: "The Diwali of the Gods, celebrated 15 days after Diwali when Gods descend to bathe in the Ganga.", ritual: "Lighting millions of earthen lamps (diyas) across all Varanasi ghats." },
    { name: "Rangbhari Ekadashi", tithi: "Phalguna (March)", desc: "The day Shiva brought Goddess Parvati to Kashi after their marriage.", ritual: "Devotees throw colored powder (gulal) on the deity and carry the silver palanquin." }
  ],
  rameshwaram: [
    { name: "Maha Shivratri", tithi: "Phalguna (Feb-Mar)", desc: "Commemorates the day Shiva appeared as a pillar of light.", ritual: "Rathotsavam (chariot procession) and 10 days of elaborate temple events." },
    { name: "Rama Pratishtha", tithi: "Jyeshtha (June)", desc: "Celebrates the historical installation of the Sand Lingam by Lord Rama.", ritual: "Abhishekams using Ganga water brought by pilgrims from Gangotri." },
    { name: "Thirukalyanam", tithi: "Sravana (July-Aug)", desc: "The celestial marriage festival of Lord Ramanathaswamy and Parvathavardhini Amman.", ritual: "Bridal procession, exchange of garlands, and special gold chariot ride." }
  ],
  mahakaleshwar: [
    { name: "Maha Shivratri", tithi: "Phalguna (Feb-Mar)", desc: "A nine-day festival called Shivratri Navratri leading to the main night.", ritual: "Daily unique dress-up (Shringar) of the deity, and grand mid-day Bhasma Aarti." },
    { name: "Shravan Sawari", tithi: "Shravana (July-Aug)", desc: "Monsoon palanquin procession where Lord Mahakal inspects his city.", ritual: "Shiva's silver mask is taken in a grand royal procession to the Shipra River." },
    { name: "Kartik Mela", tithi: "Kartika (Nov)", desc: "A massive cultural gathering on the banks of River Shipra.", ritual: "Deepa Daanam (floating lamps) and taking a holy dip in the river." }
  ],
  "jagannath-puri": [
    { name: "Ratha Yatra", tithi: "Ashadha (June-July)", desc: "The monumental chariot festival where Lord Jagannath travels to his aunt's shrine.", ritual: "Pulling of massive wooden chariots, royal sweeping of paths (Chhera Pahanra)." },
    { name: "Snana Yatra", tithi: "Jyeshtha (June)", desc: "The ceremonial bathing festival of the deities on a grand open platform.", ritual: "Bathing the wooden deities with 108 pitchers of gold-well water." },
    { name: "Anavasara", tithi: "Ashadha (June)", desc: "The 15-day retirement period where the deities rest in isolation.", ritual: "Special secret herbal pastes are applied to restore the wood paints." }
  ],
  kamakhya: [
    { name: "Ambubachi Mela", tithi: "Ashadha (June)", desc: "Celebrating the earth's fertility. The temple remains closed for three days.", ritual: "The temple doors are sealed, followed by grand reopening and red cloth distribution." },
    { name: "Durga Puja", tithi: "Asvina (Sept-Oct)", desc: "A major festival worshiping the goddess in her warrior form.", ritual: "Vedic chants, animal sacrifices, and midnight aartis in the dark caves." },
    { name: "Manasa Puja", tithi: "Bhadrapada (August)", desc: "Snake goddess festival to seek protection from floods and snakebites.", ritual: "Traditional Deodhani dance performed by specialized temple dancers." }
  ],
  "vaishno-devi": [
    { name: "Shardiya Navratri", tithi: "Asvina (Sept-Oct)", desc: "Autumn festival of nine nights dedicated to Goddess Durga.", ritual: "Elaborate decoration of the cave with imported flowers, and continuous yagnas." },
    { name: "Chaitra Navratri", tithi: "Chaitra (Mar-Apr)", desc: "Spring festival celebrating the descent of divine feminine energy.", ritual: "Special shringar of the three Pindis, and digital registration passes." },
    { name: "Bhairav Ghati Mela", tithi: "Margashirsha (Dec)", desc: "Pilgrimage completion day, honoring Bhairav Nath's liberation.", ritual: "Offering milk and sweets at the Bhairav shrine after main cave darshan." }
  ],
  ranganathaswamy: [
    { name: "Vaikunta Ekadashi", tithi: "Margashirsha (Dec-Jan)", desc: "The most sacred day when the gates of heaven are opened to devotees.", ritual: "Opening of the Paramapada Vaasal corridor, and deity decorated in diamond armor." },
    { name: "Jyeshtabhishekam", tithi: "Jyeshtha (June-July)", desc: "Annual gold and silver armor cleaning festival of the giant deity.", ritual: "Removing the golden coverings, washing the stone, and applying herbal oils." },
    { name: "Brahmotsavam", tithi: "Panguni (Mar-Apr)", desc: "The grand annual chariot festival celebrating Lord Ranganatha.", ritual: "Daily processions on gold vehicles (Garuda, Hanuman) and car pulling." }
  ],
  "tirumala-venkateswara": [
    { name: "Srivari Brahmotsavam", tithi: "Asvina (Sept-Oct)", desc: "A grand nine-day event celebrating Lord Venkateswara's manifestation.", ritual: "Procession of the Lord on nine different vahans (vehicles) around temple streets." },
    { name: "Vaikunta Ekadashi", tithi: "Margashirsha (Dec-Jan)", desc: "Opening of the inner gate of liberation for ten days.", ritual: "Special darshan paths, and recitation of the Nalayira Divya Prabandham." },
    { name: "Teppotsavam", tithi: "Phalguna (March)", desc: "Float festival celebrated in the temple tank (Swami Pushkarini).", ritual: "Deities are taken on a beautifully decorated illuminated float at sunset." }
  ],
  mallikarjuna: [
    { name: "Maha Shivratri", tithi: "Phalguna (Feb-Mar)", desc: "The grand festival celebrating the wedding of Shiva and Parvati on the hill.", ritual: "Kalyanotsavam (celestial wedding) and offering of Pagadam (turban cloth) to the spire." },
    { name: "Kartika Mahotsavam", tithi: "Kartika (Nov-Dec)", desc: "Month of lights dedicated to the Srisailam hills.", ritual: "Lighting thousands of oil lamps (Akasa Deepam) on the temple towers." },
    { name: "Ugadi Utsav", tithi: "Chaitra (Mar-Apr)", desc: "Telugu New Year festival celebrated with royal temple updates.", ritual: "Processions of the golden chariot and distribution of Ugadi Pachadi." }
  ],
  omkareshwar: [
    { name: "Maha Shivratri", tithi: "Phalguna (Feb-Mar)", desc: "Massive temple fair on Mandhata island.", ritual: "Devotees cross the Narmada River in boats to perform Abhishekams with river water." },
    { name: "Kartik Jatra", tithi: "Kartika (Nov)", desc: "Autumn festival celebrating the victory of light over darkness.", ritual: "Floating paper lamps in the Narmada River under the full moon." },
    { name: "Narmada Jayanti", tithi: "Magha (Jan-Feb)", desc: "Celebrating the birth of the sacred river Narmada.", ritual: "Offering a saree of several hundred meters across the river waters." }
  ],
  bhimashankar: [
    { name: "Maha Shivratri", tithi: "Phalguna (Feb-Mar)", desc: "Grand night-long vigil in the deep Western Ghats forest.", ritual: "continuous chanting of Rudrashtadhyayi, and forest fair." },
    { name: "Shravan Mondays", tithi: "Shravana (July-Aug)", desc: "Monsoon devotion where lakhs of trekkers visit the shrine.", ritual: "Offering of bilva leaves and wild flowers to the Swayambhu Lingam." },
    { name: "Tripuri Purnima", tithi: "Kartika (Nov-Dec)", desc: "Commemorates the destruction of the Tripur demons by Lord Shiva.", ritual: "Lighting the stone deepstambh (lamp towers) in the temple courtyard." }
  ],
  trimbakeshwar: [
    { name: "Maha Shivratri", tithi: "Phalguna (Feb-Mar)", desc: "The major festival of the three-headed Jyotirlinga.", ritual: "Deity decorated with the golden crown of the Peshwas, and town chariot procession." },
    { name: "Kartik Yatra", tithi: "Kartika (Nov)", desc: "The annual pilgrimage round-up dedicated to the Godavari river.", ritual: "Taking a holy dip in Kushavarta Kund and carrying water to the sanctum." },
    { name: "Rath Yatra", tithi: "Magha (Jan-Feb)", desc: "Chariot ride of the deity through Trimbak streets.", ritual: "Devotional songs, bells, and feeding of thousands of visiting sadhus." }
  ],
  vaidyanath: [
    { name: "Shravani Mela", tithi: "Shravana (July-Aug)", desc: "The world's longest pilgrimage walk, where devotees trek 105 km.", ritual: "Carrying holy Ganga water from Sultanganj in pots (Kanwar) to offer to the Lingam." },
    { name: "Maha Shivratri", tithi: "Phalguna (Feb-Mar)", desc: "Shiva's wedding, celebrated by connecting the two main towers.", ritual: "Tying a giant red thread between Shiva's temple spire and Parvati's temple spire." },
    { name: "Basant Panchami", tithi: "Magha (Jan-Feb)", desc: "Spring arrival festival, dedicated to learning and arts.", ritual: "Devotees offer yellow clothes and powdered gulal (Abir) to the Shiva Lingam." }
  ],
  nageshwar: [
    { name: "Maha Shivratri", tithi: "Phalguna (Feb-Mar)", desc: "The main night of Shiva worship at the serpent shrine.", ritual: "Special lighting of the 82-foot Shiva statue and night-long chanting." },
    { name: "Shravan Month", tithi: "Shravana (July-Aug)", desc: "Monsoon month of devotion.", ritual: "Decoration of the Lingam with silver serpents and bilva leaves." },
    { name: "Hanuman Jayanti", tithi: "Chaitra (Mar-Apr)", desc: "Celebrating the birth of Lord Hanuman.", ritual: "Special sindoor archana at the Hanuman shrine inside the complex." }
  ],
  grishneshwar: [
    { name: "Maha Shivratri", tithi: "Phalguna (Feb-Mar)", desc: "The primary festival of the final Jyotirlinga near Ellora.", ritual: "Devotees are allowed direct Sparsha (touch) Darshan to pour water on the Lingam." },
    { name: "Shravan Mondays", tithi: "Shravana (July-Aug)", desc: "Weekly monsoon offerings.", ritual: "Special Abhishekam with milk, honey, and sugarcane juice." },
    { name: "Vaikunta Chaturdashi", tithi: "Kartika (Nov)", desc: "Celebrates the union of Lord Shiva and Lord Vishnu.", ritual: "Holy offerings of Tulsi and Bilva leaves to the deity at midnight." }
  ]
};

interface TransitInfo {
  airport: string;
  railway: string;
  road: string;
}

const TRANSIT_DETAILS: Record<string, TransitInfo> = {
  kedarnath: {
    airport: "Jolly Grant Airport, Dehradun (~238 km)",
    railway: "Rishikesh Railway Station (~216 km)",
    road: "Accessible by road up to Gaurikund, followed by a 16 km uphill trek."
  },
  somnath: {
    airport: "Diu Airport (~82 km) or Rajkot Airport (~200 km)",
    railway: "Veraval Junction Railway Station (~5 km)",
    road: "Well connected by Gujarat State Highways to Rajkot, Ahmedabad, and Porbandar."
  },
  badrinath: {
    airport: "Jolly Grant Airport, Dehradun (~310 km)",
    railway: "Rishikesh Railway Station (~290 km)",
    road: "NH-58 connect Joshimath to Badrinath. Buses and taxis are available."
  },
  dwarkadhish: {
    airport: "Jamnagar Airport (~137 km) or Porbandar Airport (~100 km)",
    railway: "Dwarka Railway Station (~2 km)",
    road: "Connected by national highway NH-51 with direct buses from Jamnagar and Rajkot."
  },
  "kashi-vishwanath": {
    airport: "Lal Bahadur Shastri Airport, Babatpur (~25 km)",
    railway: "Varanasi Junction (BSB) (~4 km)",
    road: "Varanasi is a major hub. The Vishwanath Corridor connects Ganga Ghats to the temple."
  },
  rameshwaram: {
    airport: "Madurai International Airport (~170 km)",
    railway: "Rameswaram Railway Station (~1 km)",
    road: "Connected to mainland India by the scenic Pamban Bridge (NH-49)."
  },
  mahakaleshwar: {
    airport: "Devi Ahilyabai Holkar Airport, Indore (~53 km)",
    railway: "Ujjain Junction Railway Station (~1.5 km)",
    road: "Direct multi-lane highway connect from Indore, Bhopal, and Dewas."
  },
  "jagannath-puri": {
    airport: "Biju Patnaik International Airport, Bhubaneswar (~60 km)",
    railway: "Puri Railway Station (~2 km)",
    road: "Four-lane National Highway NH-316 connects Bhubaneswar to Puri."
  },
  kamakhya: {
    airport: "Lokpriya Gopinath Bordoloi International Airport, Guwahati (~20 km)",
    railway: "Kamakhya Railway Station (~4 km) or Guwahati Junction (~8 km)",
    road: "Regular state buses and private taxis climb Nilachal Hill road."
  },
  "vaishno-devi": {
    airport: "Jammu Airport (~50 km)",
    railway: "Shri Mata Vaishno Devi Katra Railway Station (SVDK) (~1 km to base)",
    road: "NH-1A connects Jammu to Katra. Ban Ganga is the starting trek base."
  },
  ranganathaswamy: {
    airport: "Tiruchirappalli International Airport (~15 km)",
    railway: "Srirangam Railway Station (~0.5 km) or Trichy Junction (~10 km)",
    road: "Srirangam is located on the Chennai-Trichy NH-45, with frequent city bus services."
  },
  "tirumala-venkateswara": {
    airport: "Tirupati Airport, Renigunta (~38 km)",
    railway: "Tirupati Main Railway Station (~22 km from Hill Temple)",
    road: "Ghat roads connect Tirupati city to Tirumala hills. Free walkways available (Alipiri)."
  },
  mallikarjuna: {
    airport: "Rajiv Gandhi International Airport, Hyderabad (~200 km)",
    railway: "Markapur Road Railway Station (~80 km)",
    road: "Located on NH-762. Scenic drive through Nallamala Tiger Reserve."
  },
  omkareshwar: {
    airport: "Devi Ahilyabai Holkar Airport, Indore (~85 km)",
    railway: "Khandwa Railway Station (~70 km) or Indore Station (~77 km)",
    road: "Accessible via Indore-Khandwa Highway. Boats or footbridges cross Narmada river."
  },
  bhimashankar: {
    airport: "Pune Airport (~105 km)",
    railway: "Pune Junction Railway Station (~110 km)",
    road: "Connected by state transport buses and private cabs from Pune and Mumbai via Manchar."
  },
  trimbakeshwar: {
    airport: "Nashik Airport (~35 km) or Mumbai Chhatrapati Shivaji Airport (~170 km)",
    railway: "Nashik Road Railway Station (~28 km)",
    road: "Conveniently connected by road to Nashik and Mumbai via NH-160."
  },
  vaidyanath: {
    airport: "Deoghar Airport (~7 km) or Kazi Nazrul Islam Airport, Durgapur (~130 km)",
    railway: "Jasidih Junction Railway Station (~8 km)",
    road: "Accessible from Patna, Ranchi, and Kolkata via direct interstate bus networks."
  },
  nageshwar: {
    airport: "Jamnagar Airport (~128 km)",
    railway: "Dwarka Railway Station (~16 km)",
    road: "Located on the Dwarka-Okha Highway. Cabs and auto rickshaws run regularly."
  },
  grishneshwar: {
    airport: "Aurangabad Airport (~38 km)",
    railway: "Aurangabad Railway Station (~30 km)",
    road: "Well connected by road. Walking distance from Ellora Caves complex on NH-52."
  }
};

const LABELS = {
  EN: {
    backToTemples: "← Back to Sacred Atlas",
    explore: "Explore Temple",
    darshan: "Virtual Darshan",
    guide: "Pilgrimage Guide",
    storyTitle: "Sacred Story & Legends",
    discoveryTitle: "Visual Discovery",
    insideOutTitle: "Inside the Altar & Sanctum",
    factsTitle: "By the Numbers",
    journeyTitle: "Pilgrimage Journey",
    connectionsTitle: "Divine Connections",
    experienceTitle: "Spiritual Experience",
    nextDest: "Next Sacred Destination",
    prevDest: "Previous Destination",
    continuePilgrims: "Continue Pilgrimage",
    age: "Age / Era",
    elevation: "Elevation",
    deity: "Main Deity",
    dynasty: "Patron Dynasty",
    style: "Architectural Style",
    visitors: "Annual Visitors",
    bestMonths: "Best Months",
    travelSeason: "Best Season"
  },
  HI: {
    backToTemples: "← पावन एटलस दर्शन",
    explore: "मन्दिर दर्शन",
    darshan: "भक्ति साधना",
    guide: "यात्रा मार्गदर्शिका",
    storyTitle: "पवित्र कथा एवं इतिहास",
    discoveryTitle: "दृश्य विहंगम",
    insideOutTitle: "गर्भगृह एवं स्थापत्य",
    factsTitle: "महत्वपूर्ण तथ्य",
    journeyTitle: "पावन यात्रा",
    connectionsTitle: "दिव्य संबंध",
    experienceTitle: "आध्यात्मिक अनुभूति",
    nextDest: "अगला पावन स्थल",
    prevDest: "पिछला पावन स्थल",
    continuePilgrims: "यात्रा जारी रखें",
    age: "काल / इतिहास",
    elevation: "ऊँचाई",
    deity: "मुख्य देवता",
    dynasty: "संरक्षक राजवंश",
    style: "स्थापत्य शैली",
    visitors: "वार्षिक श्रद्धालु",
    bestMonths: "उत्तम महीने",
    travelSeason: "यात्रा अनुकूल काल"
  },
  SA: {
    backToTemples: "← पवित्र एटलस सूचिः",
    explore: "मन्दिर दर्शनम्",
    darshan: "वर्चुअल दर्शनम्",
    guide: "यात्रा मार्गदर्शिका",
    storyTitle: "देवगाथा इतिहासश्च",
    discoveryTitle: "दृश्य विहंगम",
    insideOutTitle: "गर्भगृहम् कला च",
    factsTitle: "गणितीय तत्त्वानि",
    journeyTitle: "पुण्ययात्रा",
    connectionsTitle: "दिव्यसम्बन्धाः",
    experienceTitle: "आध्यात्मिक अनुभूतिः",
    nextDest: "अग्रिम देवस्थानम्",
    prevDest: "पूर्व देवस्थानम्",
    continuePilgrims: "तीर्थयात्रा अनुवर्तताम्",
    age: "कालः / युगम्",
    elevation: "उन्नतता",
    deity: "प्रधान देवः",
    dynasty: "राजवंशः",
    style: "शिल्पकला शैली",
    visitors: "वार्षिक भक्ताः",
    bestMonths: "उत्तम मासाः",
    travelSeason: "अनुकूल कालः"
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

interface TempleDetailClientProps {
  place: SacredPlace;
  allPlaces: SacredPlace[];
}

export default function TempleDetailClient({ place, allPlaces }: TempleDetailClientProps) {
  const currentLang = useLanguageStore((state) => state.language);
  const activeT = LABELS[currentLang] || LABELS.EN;
  const meta = TEMPLES_META[place.slug] || TEMPLES_META.kedarnath;

  const [chantActive, setChantActive] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const [aartiActive, setAartiActive] = useState(false);

  // Web Audio synthesis refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const aartiTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { playClick, playSuccess } = useSacredSound();

  // Find next/prev temples in the local category list to drive the pilgrimage wheel
  const siblings = allPlaces.filter((p) => p.type === place.type);
  const currentIndex = siblings.findIndex((p) => p.slug === place.slug);
  const prevPlace = siblings[(currentIndex - 1 + siblings.length) % siblings.length];
  const nextPlace = siblings[(currentIndex + 1) % siblings.length];

  const getNearbyPlaces = () => {
    // First, temples in the same state
    let nearby = allPlaces.filter((p) => p.slug !== place.slug && p.state === place.state);
    // If not enough, add temples of the same type
    if (nearby.length < 3) {
      const additional = allPlaces.filter(
        (p) => p.slug !== place.slug && p.state !== place.state && p.type === place.type && !nearby.some((n) => n.id === p.id)
      );
      nearby = [...nearby, ...additional];
    }
    // If still not enough, add any other temples
    if (nearby.length < 3) {
      const additional = allPlaces.filter(
        (p) => p.slug !== place.slug && !nearby.some((n) => n.id === p.id)
      );
      nearby = [...nearby, ...additional];
    }
    return nearby.slice(0, 3); // return top 3
  };

  // Web Audio Bell Synthesis
  const ringBell = () => {
    if (typeof window === "undefined") return;
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 500);

    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Bell frequencies (inharmonics for rich metallic copper chime sound)
      const freqs = [440, 587.33, 659.25, 880, 1200, 1500];
      const gains = [0.6, 0.8, 0.5, 0.4, 0.2, 0.1];
      const decays = [1.8, 1.5, 1.2, 0.8, 0.4, 0.2];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.25, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
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
    } catch (e) {
      console.warn("AudioContext failed", e);
    }
  };

  // Sound Drone Synthesis
  const startChantSynth = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      const now = ctx.currentTime;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 1.2);
      gain.connect(ctx.destination);
      droneGainRef.current = gain;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(160, now);
      filter.connect(gain);
      filterRef.current = filter;

      // Base Frequency (Detuned saw/triangle for ancient hum)
      const baseFreq = place.mainDeity.toLowerCase().includes("vishnu") ? 146.83 : 136.1; // D3 vs C#3 (OM frequencies)

      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(baseFreq, now);

      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(baseFreq * 1.5, now); // Perfect fifth harmony

      const osc3 = ctx.createOscillator();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(baseFreq / 2, now); // Sub bass

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      oscRef.current = osc1;
    } catch (e) {
      console.warn("Drone synthesis failed", e);
    }
  };

  const stopChantSynth = () => {
    const gain = droneGainRef.current;
    const ctx = audioCtxRef.current;
    if (ctx && gain) {
      const now = ctx.currentTime;
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.linearRampToValueAtTime(0, now + 0.6);
        setTimeout(() => {
          try {
            ctx.close();
          } catch (e) {}
        }, 700);
      } catch (e) {}
    }
    audioCtxRef.current = null;
    droneGainRef.current = null;
    oscRef.current = null;
    filterRef.current = null;
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

  // Aarti offering chimes rhythm
  const offerAarti = () => {
    if (aartiActive) {
      if (aartiTimerRef.current) clearInterval(aartiTimerRef.current);
      setAartiActive(false);
      return;
    }

    setAartiActive(true);
    ringBell();

    let count = 0;
    aartiTimerRef.current = setInterval(() => {
      ringBell();
      count++;
      if (count >= 12) {
        if (aartiTimerRef.current) clearInterval(aartiTimerRef.current);
        setAartiActive(false);
      }
    }, 1200);
  };

  useEffect(() => {
    return () => {
      stopChantSynth();
      if (aartiTimerRef.current) clearInterval(aartiTimerRef.current);
    };
  }, []);

  const timeline = TEMPLE_TIMELINES[place.slug] || [];
  const defaultTimeline = [
    { year: "Ancient Era", title: "Sacred Foundation", desc: `Established in antiquity, representing the timeless heritage of ${place.name}.` },
    { year: "Historical Era", title: "Royal Patronage", desc: `Patronized and expanded under the local dynasties, including the ${meta.dynasty || "indigenous rulers"}.` },
    { year: "Medieval Era", title: "Spiritual Sustenance", desc: "Served as a key center for the Bhakti movement, surviving historical shifts." },
    { year: "Modern Era", title: "Restoration & Protection", desc: "Recognized as a national treasure and restored for modern pilgrims." }
  ];
  const activeTimeline = timeline.length > 0 ? timeline : defaultTimeline;

  const festivals = TEMPLE_FESTIVALS[place.slug] || [];
  const defaultFestivals = [
    { name: "Maha Shivratri", tithi: "Phalguna", desc: "Night of Shiva's cosmic wedding and light manifestation.", ritual: "Special night-long abhishekam." },
    { name: "Navratri", tithi: "Asvina / Chaitra", desc: "Celebration of the victory of good over evil.", ritual: "Devotional lighting and scripture readings." },
    { name: "Guru Purnima", tithi: "Ashadha", desc: "Honoring the lineage of ancient sages and guides.", ritual: "Prasadam offerings and Vedic recitations." }
  ];
  const activeFestivals = festivals.length > 0 ? festivals : defaultFestivals;

  const transit = TRANSIT_DETAILS[place.slug];
  const nearbyPlaces = getNearbyPlaces();

  return (
    <div className="flex flex-col min-h-screen bg-[#030107] text-[#F5F2EB] select-text overflow-x-hidden relative">
      {/* Background Gold Particle Field */}
      <GoldParticleField enabled={true} density="medium" />

      {/* SECTION 1: CINEMATIC HERO */}
      <section className="relative h-screen w-full flex flex-col justify-end items-center px-6 pb-24 overflow-hidden select-none">
        {/* Dynamic Temple Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(3, 1, 7, 0.25) 0%, rgba(3, 1, 7, 0.45) 50%, rgba(3, 1, 7, 0.98) 100%), url(${
              place.slug === "kedarnath"
                ? "/images/temples/kedarnath.jpg"
                : place.slug === "somnath"
                ? "/images/temples/somnath.jpg"
                : "/images/hero-temple-sanctum.png"
            })`,
          }}
        />

        {/* Ambient aura glow */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-4xl w-full text-center flex flex-col items-center gap-4 z-10 select-text">
          {/* Breadcrumb / Back Link */}
          <Link
            href="/temples"
            onClick={playClick}
            className="flex items-center gap-1.5 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-[#FFE485]/80 hover:text-white transition-colors no-underline border border-[#D4AF37]/35 rounded-full px-4 py-1.5 bg-[#030107]/50 backdrop-blur-md mb-2"
          >
            {activeT.backToTemples}
          </Link>

          {/* Pilgrimage Category Badge */}
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#FF8C00] font-bold bg-[#FF8C00]/10 border border-[#FF8C00]/30 px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            {place.type.replace("_", " ")}
          </span>

          {/* Devanagari Sanskrit Name */}
          <h2 className="font-sanskrit text-4xl md:text-5xl lg:text-6xl text-[#FFE485] font-bold tracking-wide drop-shadow-[0_2px_15px_rgba(212,175,55,0.3)] mt-2">
            {place.nameSanskrit}
          </h2>

          {/* Temple English Name */}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl font-bold tracking-normal uppercase leading-tight text-white mt-1">
            {place.name}
          </h1>

          {/* Location details */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-[#FFD700] font-medium tracking-wide mt-1.5">
            <MapPin className="w-4 h-4 text-[#FF8C00]" />
            <span>{place.state}, {place.country}</span>
          </div>

          <p className="font-serif text-sm md:text-base text-gray-300 italic max-w-2xl mt-4 leading-relaxed line-clamp-3">
            &ldquo;{place.significance}&rdquo;
          </p>

          {/* Cinematic Interactive CTAs */}
          <div className="flex flex-wrap gap-4 justify-center items-center mt-8">
            <a
              href="#sacred-story"
              onClick={playClick}
              className="px-6 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black font-extrabold uppercase tracking-wider text-xs rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 no-underline"
            >
              {activeT.explore}
            </a>
            <button
              onClick={offerAarti}
              className={`px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider rounded-lg border transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                aartiActive
                  ? "bg-[#FF8C00] border-[#FF8C00] text-white shadow-[0_0_25px_rgba(255,140,0,0.5)] animate-pulse"
                  : "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-[#FFD700]"
              }`}
            >
              🔥 {aartiActive ? "Aarti Active..." : activeT.darshan}
            </button>
            <a
              href="#pilgrimage-rules"
              onClick={playClick}
              className="px-6 py-3.5 bg-transparent border border-[#D4AF37]/45 text-[#FFD700] hover:text-white hover:bg-[#D4AF37]/10 transition-all duration-300 text-xs font-extrabold uppercase tracking-wider rounded-lg no-underline"
            >
              {activeT.guide}
            </a>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <a href="#sacred-story" className="text-[#FFD700] opacity-50 hover:opacity-100 transition-opacity">
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>
      </section>

      {/* SECTION 2: SACRED STORY */}
      <section id="sacred-story" className="w-full max-w-7xl mx-auto px-6 py-24 select-text border-b border-[#D4AF37]/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Gold-Framed Arched Image */}
          <div className="relative w-full aspect-[4/5] max-w-md mx-auto flex items-center justify-center p-2 rounded-t-full border-2 border-[#D4AF37]/35 shadow-[0_0_40px_rgba(212,175,55,0.15)] overflow-hidden bg-[#0A0614]/30 backdrop-blur-sm">
            <div className="absolute inset-2 border border-[#D4AF37]/15 rounded-t-full pointer-events-none" />
            <div 
              className="w-full h-full rounded-t-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
              style={{
                backgroundImage: `url(${
                  place.slug === "kedarnath"
                    ? "/images/temples/kedarnath.jpg"
                    : place.slug === "somnath"
                    ? "/images/temples/somnath.jpg"
                    : "/images/hero-temple-sanctum.png"
                })`,
              }}
            />
          </div>

          {/* Right: Immersive Editorial Storytelling */}
          <div className="flex flex-col gap-6">
            <span className="text-xs font-bold text-[#FF8C00] uppercase tracking-widest font-mono">
              {activeT.storyTitle}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Lore & Divine Manifestation
            </h2>
            <div className="w-20 h-0.5 bg-[#D4AF37]/60" />
            
            <p className="font-serif text-base md:text-lg text-gray-300 leading-relaxed italic first-letter:text-5xl first-letter:font-bold first-letter:text-[#D4AF37] first-letter:mr-2.5 first-letter:float-left select-text">
              {currentLang === "SA" && meta.manifestationLoreSa
                ? meta.manifestationLoreSa
                : currentLang === "HI" && meta.manifestationLoreHi
                ? meta.manifestationLoreHi
                : meta.manifestationLore}
            </p>
            
            <p className="text-sm text-gray-400 leading-relaxed select-text mt-2 border-l-2 border-[#D4AF37]/35 pl-4 py-2 bg-[#D4AF37]/5 rounded-r">
              <strong>Cosmic History:</strong> {place.description}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: HISTORY & TIMELINE */}
      <section id="temple-history" className="w-full max-w-5xl mx-auto px-6 py-24 border-b border-[#D4AF37]/10 relative">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF8C00] font-bold">
            {currentLang === "HI" ? "इतिहास एवं जीर्णोद्धार" : currentLang === "SA" ? "इतिहासः जीर्णोद्धारः च" : "History & Restoration Timeline"}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Chronicles of Resurrection
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-2" />
        </div>

        <div className="relative border-l border-[#D4AF37]/30 md:border-l-0 md:flex md:flex-col md:items-center pl-6 md:pl-0">
          {/* Center line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/20 to-transparent -translate-x-1/2" />
          
          {activeTimeline.map((item, idx) => (
            <div key={idx} className={`relative mb-12 md:mb-16 last:mb-0 w-full md:flex ${idx % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
              {/* Timeline node dot */}
              <div className="absolute left-[-31px] md:left-1/2 top-1.5 w-[11px] h-[11px] rounded-full bg-[#030107] border-2 border-[#D4AF37] -translate-x-1/2 z-10 shadow-[0_0_8px_#D4AF37]" />
              
              <div className={`w-full md:w-[45%] bg-[#0A0614]/40 border border-[#D4AF37]/15 p-6 rounded-xl hover:border-[#FF8C00] transition-colors shadow-lg relative ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <span className="font-serif text-xl font-extrabold text-[#D4AF37] tracking-wider block mb-1">
                  {item.year}
                </span>
                <h4 className="text-md font-bold text-white font-serif mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: SACRED ARCHITECTURE & GEOMETRY */}
      <section id="temple-architecture" className="w-full max-w-7xl mx-auto px-6 py-24 border-b border-[#D4AF37]/10">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF8C00] font-bold">
            {currentLang === "HI" ? "मन्दिर स्थापत्य कला" : currentLang === "SA" ? "शिल्पकला शैली" : "Sacred Architecture & Geometry"}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Cosmological Design & Space
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          {/* Description & Styles */}
          <div className="flex flex-col gap-6">
            <div className="border-l-4 border-[#D4AF37] pl-4 py-2 bg-[#D4AF37]/5 rounded-r">
              <span className="text-[10px] font-mono text-[#FF8C00] uppercase tracking-widest block font-bold">
                Architectural Classification
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-1">
                {place.architecture || "Traditional Nagara Style"}
              </h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Hindu temple architecture represents a synthesis of arts, dharma, values, and the Hindu way of life. The temple layout is designed to mirror the macrocosm (universe) through the microcosm of the sacred temple space.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed italic">
              <strong>Structure Highlights:</strong> {meta.architectureDetails}
            </p>

            {/* Architectural Components Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                { name: "Garbhagriha", desc: "The cave-like sanctum sanctorum holding the primary deity, designed for focus and silent prayer." },
                { name: "Shikhara / Vimana", desc: "The towering mountain spire over the sanctum, drawing energy from the cosmos." },
                { name: "Mandapa", desc: "Pillared gathering halls for congregational prayers, assemblies, and divine chants." },
                { name: "Antarala", desc: "The narrow vestibule connecting the gathering hall directly to the inner sanctuary." }
              ].map((comp, idx) => (
                <div key={idx} className="bg-[#0A0614]/40 border border-[#D4AF37]/15 p-4 rounded-lg hover:border-[#FFD700]/30 transition-all">
                  <h5 className="font-serif text-sm font-bold text-[#FFD700] mb-1">{comp.name}</h5>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{comp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Drawing mockup */}
          <div className="relative w-full aspect-square max-w-md mx-auto border border-[#D4AF37]/30 rounded-full flex items-center justify-center p-8 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]">
            {/* Concentric rings */}
            <div className="absolute inset-4 border border-[#D4AF37]/15 rounded-full" />
            <div className="absolute inset-12 border border-[#D4AF37]/10 rounded-full" />
            <div className="absolute inset-24 border border-dashed border-[#D4AF37]/20 rounded-full animate-spin-slow" />
            
            {/* Architectural blueprint representation */}
            <div className="w-full h-full relative flex items-center justify-center pointer-events-none opacity-80">
              <svg className="w-64 h-64 text-[#D4AF37]/50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                {/* Axis lines */}
                <line x1="50" y1="0" x2="50" y2="100" strokeDasharray="2,2" />
                <line x1="0" y1="50" x2="100" y2="50" strokeDasharray="2,2" />
                
                {/* Square (Vastu Purusha Mandala) */}
                <rect x="25" y="25" width="50" height="50" strokeWidth="0.75" />
                <rect x="35" y="35" width="30" height="30" />
                <circle cx="50" cy="50" r="10" />
                
                {/* Outer diagonal crossings */}
                <line x1="25" y1="25" x2="75" y2="75" />
                <line x1="75" y1="25" x2="25" y2="75" />

                {/* Sanskrit text in circle center */}
                <text x="50" y="52" className="text-[4px] font-sans fill-[#FFE485] font-bold text-center" textAnchor="middle">वास्तु</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CINEMATIC INSIDE-OUT GALLERY */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 border-b border-[#D4AF37]/10">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF8C00] font-bold">
            {activeT.insideOutTitle}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Cinematic Inside-Out Gallery
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-2" />
        </div>

        {/* Grid featuring soft feathered/watercolor mask aesthetics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { tag: "Garbhagriha", caption: "The inner sanctum containing the self-manifested deity.", img: "/images/hero-temple-sanctum.png" },
            { tag: "Mandapa Hall", caption: "Detailed carved stone pillars representing cosmological geometry.", img: "/images/origins-dharma.png" },
            { tag: "Exterior", caption: "Visual grandeur of the outer walls carved with divine forms.", img: place.slug === "somnath" ? "/images/temples/somnath.jpg" : "/images/temples/kedarnath.jpg" },
            { tag: "Festivals", caption: "Annual festival celebrations attracting millions of devotees.", img: "/images/civilization-journey.png" },
            { tag: "Illumination", caption: "The temple glowing at night against the dark cosmic sky.", img: "/images/cosmic-space.png" },
            { tag: "Sacred Kund", caption: "Holy water reservoirs used for spiritual purification.", img: place.slug === "kedarnath" ? "/images/temples/somnath.jpg" : "/images/temples/kedarnath.jpg" }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="relative aspect-video rounded-xl overflow-hidden group shadow-lg border border-white/5"
            >
              {/* Image with seamless overlay blend */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              {/* Radial gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030107] via-transparent to-[#030107]/20 transition-opacity duration-300" />
              
              {/* Info overlays on hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end z-10 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF8C00] font-bold">
                  {item.tag}
                </span>
                <p className="text-[10px] text-gray-300 leading-normal mt-0.5 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: VEDIC GEOMETRICS & FACTS */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24 border-b border-[#D4AF37]/10 bg-[linear-gradient(to_bottom,rgba(212,175,55,0.02),transparent)]">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF8C00] font-bold">
            {activeT.factsTitle}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Vedic Geometrics & Details
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-2" />
        </div>

        {/* Luxury statistics cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { label: activeT.deity, val: place.mainDeity },
            { label: activeT.age, val: place.historicalEra || "Ancient Era" },
            { label: activeT.elevation, val: meta.elevation },
            { label: activeT.dynasty, val: meta.dynasty },
            { label: activeT.style, val: place.architecture || "Nagara Style" },
            { label: activeT.visitors, val: meta.visitors },
            { label: activeT.travelSeason, val: meta.travelSeason },
            { label: activeT.bestMonths, val: meta.bestMonths }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center px-4 py-6 border-b border-[#D4AF37]/15 last:border-0 md:border-b-0 md:border-r md:last:border-0 border-[#D4AF37]/15"
            >
              <span className="font-serif text-xl md:text-2xl font-extrabold text-[#D4AF37] tracking-wide block">
                {stat.val}
              </span>
              <span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] block mt-2 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: SACRED FESTIVAL CALENDAR */}
      <section id="temple-festivals" className="w-full max-w-7xl mx-auto px-6 py-24 border-b border-[#D4AF37]/10">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF8C00] font-bold">
            {currentLang === "HI" ? "मुख्य उत्सव एवं व्रत" : currentLang === "SA" ? "पवित्र उत्सव कालनिर्णयः" : "Sacred Festival Calendar"}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Cyclic Auspicious Celebrations
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeFestivals.map((fest, idx) => (
            <div key={idx} className="bg-[#0F0F1A]/80 border border-[#D4AF37]/20 p-6 rounded-xl hover:border-[#FF8C00] transition-all duration-300 flex flex-col gap-4 shadow-lg hover:-translate-y-1">
              <div className="flex justify-between items-start gap-4">
                <div className="p-3 rounded-lg bg-[#FF8C00]/10 border border-[#FF8C00]/30 text-[#FF8C00]">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFD700] border border-[#FFD700]/30 px-2.5 py-0.5 rounded-full">
                  {fest.tithi}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wide">
                  {fest.name}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed min-h-[48px]">
                  {fest.desc}
                </p>
              </div>
              <div className="border-t border-[#D4AF37]/15 pt-3 mt-auto">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold block">Accompanying Ritual:</span>
                <p className="text-[11px] text-gray-300 italic leading-relaxed mt-1">
                  {fest.ritual}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: GEOGRAPHY & GOOGLE MAPS */}
      <section id="temple-geography" className="w-full max-w-7xl mx-auto px-6 py-24 border-b border-[#D4AF37]/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Google Maps Iframe */}
          <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl bg-[#0A0614]/30 backdrop-blur-sm">
            <iframe
              title="Sacred Google Map"
              src={`https://maps.google.com/maps?q=${place.latitude},${place.longitude}&t=k&z=14&output=embed`}
              className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              allowFullScreen
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />
          </div>

          {/* Right: Geographic Anchor & Transit */}
          <div className="flex flex-col gap-6">
            <span className="text-xs font-bold text-[#FF8C00] uppercase tracking-widest font-mono">
              {currentLang === "HI" ? "भौगोलिक स्थिति एवं यात्रा मार्ग" : currentLang === "SA" ? "भौगोलिक मानचित्रम्" : "Sacred Geography & Navigation"}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
              Pilgrimage Geographics
            </h2>
            <div className="w-20 h-0.5 bg-[#D4AF37]/60" />
            
            <div className="bg-[#0A0614]/40 border border-[#D4AF37]/25 p-5 rounded-lg flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-[#FFD700] font-bold">
                <Compass className="w-4 h-4 text-[#FF8C00] animate-spin-slow" />
                <span>Geographic Anchor Coordinates</span>
              </div>
              <span className="text-xs font-mono text-gray-400">
                Latitude: {place.latitude}° N &bull; Longitude: {place.longitude}° E
              </span>
              <span className="text-xs text-gray-400">
                Located in the state of <strong>{place.state}</strong>, this sacred spot aligns precisely with traditional Vedic cosmic nodes.
              </span>
            </div>

            {/* Transit Details */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] mt-0.5">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold font-mono text-[#FFE485] uppercase tracking-wide">By Airways (Nearest Airport)</h5>
                  <p className="text-xs text-gray-400 mt-0.5">{transit?.airport || "Nearest major domestic airport connects standard cities."}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] mt-0.5">
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold font-mono text-[#FFE485] uppercase tracking-wide">By Railways (Nearest Junction)</h5>
                  <p className="text-xs text-gray-400 mt-0.5">{transit?.railway || "Connected via direct express trains to regional stations."}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] mt-0.5">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold font-mono text-[#FFE485] uppercase tracking-wide">By Roadways (Route Guidelines)</h5>
                  <p className="text-xs text-gray-400 mt-0.5">{transit?.road || "Well connected by state and national highways with buses/taxis."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: PILGRIMAGE GUIDE & RULES CHECKLIST */}
      <section id="pilgrimage-rules" className="w-full max-w-5xl mx-auto px-6 py-24 border-b border-[#D4AF37]/10">
        <div className="ag-glass-premium p-8 md:p-12 border border-[#D4AF37]/45 rounded-2xl relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="flex flex-col gap-6 items-center text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF8C00] font-bold">
              {currentLang === "HI" ? "यात्रा नियमावली एवं आचरण" : currentLang === "SA" ? "तीर्थयात्रा नियमाः" : "Pilgrimage Guidelines & Ritual Code"}
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">
              Preparing for the Sanctuary
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37]/60" />
            <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
              A yatra to the divine center of a temple is a spiritual purification ritual. We ask all visiting pilgrims to strictly observe traditional temple customs and guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Left: Travel & Code */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-sm font-bold text-[#FFD700] uppercase tracking-wider border-b border-[#D4AF37]/20 pb-2">
                Rituals & Travel Conduct
              </h4>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-2.5 items-start text-xs text-gray-300 leading-relaxed">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span><strong>Optimal Travel Season:</strong> The best months to visit are {meta.bestMonths} during {meta.travelSeason}.</span>
                </li>
                <li className="flex gap-2.5 items-start text-xs text-gray-300 leading-relaxed">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span><strong>Traditional Dress Code:</strong> Modest Indian traditional wear is required. Men: Dhoti or Kurta-Pyjama. Women: Sari or Salwar-Kameez. Avoid shorts or Western casuals.</span>
                </li>
                <li className="flex gap-2.5 items-start text-xs text-gray-300 leading-relaxed">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span><strong>Core Pujas:</strong> {meta.ritualsDetails} is performed daily in accordance with ancient Vedic traditions.</span>
                </li>
              </ul>
            </div>

            {/* Right: Code of Conduct */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-sm font-bold text-[#FFD700] uppercase tracking-wider border-b border-[#D4AF37]/20 pb-2">
                Sanctum Guidelines
              </h4>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-2.5 items-start text-xs text-gray-300 leading-relaxed">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span><strong>Footwear Deposit:</strong> Shoes and leather articles must be deposited at the temple trust counter before passing the outer gates.</span>
                </li>
                <li className="flex gap-2.5 items-start text-xs text-gray-300 leading-relaxed">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span><strong>Garbhagriha Restrictions:</strong> Photography, videography, and mobile phone usage are strictly prohibited in the inner altar.</span>
                </li>
                <li className="flex gap-2.5 items-start text-xs text-gray-300 leading-relaxed">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span><strong>Altitude & Health:</strong> {place.slug === "kedarnath" || place.slug === "badrinath" || place.slug === "vaishno-devi" ? "High altitude location. Carry warm heavy woolens, get basic fitness checkups, and carry personal medication." : "Maintain physical hygiene and hydration during queue periods."}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: NEARBY SACRED SHRINES */}
      <section id="nearby-temples" className="w-full max-w-7xl mx-auto px-6 py-24 border-b border-[#D4AF37]/10">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF8C00] font-bold">
            {currentLang === "HI" ? "निकटवर्ती पावन स्थल" : currentLang === "SA" ? "निकटस्थाः देवस्थानाः" : "Nearby Sacred Places"}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Shrines in the Sacred Region
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {nearbyPlaces.map((sibling) => (
            <Link
              key={sibling.id}
              href={`/temples/${sibling.slug}`}
              onClick={playClick}
              className="flex flex-col bg-[#0F0F1A]/90 border border-[#D4AF37]/20 hover:border-[#FFD700] p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 block no-underline group shadow-lg"
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#FF8C00] font-bold bg-[#FF8C00]/10 border border-[#FF8C00]/30 px-2.5 py-0.5 rounded-full">
                  {sibling.type.replace("_", " ")}
                </span>
                <Landmark className="w-4 h-4 text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="font-sanskrit text-lg font-bold text-[#FFD700] mt-4 mb-0.5 truncate">
                {sibling.nameSanskrit}
              </h4>
              <h3 className="font-serif text-base font-bold text-white truncate group-hover:text-[#FFE485] transition-colors">
                {sibling.name}
              </h3>
              <span className="text-[10px] text-gray-400 block mt-1">
                {sibling.state}, {sibling.country}
              </span>
              <p className="text-xs text-gray-400 leading-relaxed mt-3 line-clamp-2">
                {sibling.significance}
              </p>
              <div className="flex items-center gap-1 text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mt-4">
                <span>Enter Pilgrimage</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 11: SPIRITUAL EXPERIENCE */}
      <section className="w-full max-w-5xl mx-auto px-6 py-24 border-b border-[#D4AF37]/10">
        <div className="ag-glass-premium p-8 md:p-12 border border-[#D4AF37]/45 text-center flex flex-col items-center gap-6 relative overflow-hidden shadow-2xl">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none -z-10" />

          <span className="text-xs font-mono uppercase tracking-widest text-[#FF8C00] font-bold">
            {activeT.experienceTitle}
          </span>

          {/* Interactive Altar Controls */}
          <div className="flex items-center justify-center gap-8 my-4">
            {/* Bell Button */}
            <button
              onClick={ringBell}
              className={`w-16 h-16 rounded-full border border-[#D4AF37]/40 hover:border-[#FFD700] bg-[#0A0614]/80 flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer outline-none ${
                bellRinging ? "rotate-12 duration-100" : "duration-500"
              }`}
              title="Sound copper bell"
            >
              <span className="text-2xl">🔔</span>
            </button>

            {/* Diya Altar */}
            <div className="p-3 bg-[#0A0614]/50 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center min-w-28">
              <DiyaFlame intensity={chantActive ? "high" : "normal"} onClick={ringBell} />
            </div>

            {/* Play Drone Button */}
            <button
              onClick={toggleChant}
              className={`w-16 h-16 rounded-full border flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer outline-none ${
                chantActive
                  ? "bg-[#D4AF37] border-[#FFD700] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  : "bg-[#0A0614]/80 border-[#D4AF37]/40 hover:border-[#FFD700] text-[#D4AF37]"
              }`}
              title="Toggle Meditative Hum"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Sacred Temple Mantra */}
          <div className="flex flex-col gap-4 max-w-2xl select-text mt-4">
            <span className="text-xs text-[#FF8C00] font-mono tracking-widest uppercase font-bold">
              Sacred Chants & Mantra
            </span>
            <h3 className="font-sanskrit text-2xl md:text-3xl lg:text-4xl text-[#FFE485] font-bold tracking-wide leading-relaxed">
              {meta.mantra}
            </h3>
            <p className="font-serif text-sm md:text-base text-gray-300 italic max-w-xl mx-auto leading-relaxed border-t border-[#D4AF37]/15 pt-4">
              &ldquo;{currentLang === "HI" && meta.mantraMeaningHi ? meta.mantraMeaningHi : meta.mantraMeaning}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 12: CALL TO EXPLORE (Next/Prev Navigation) */}
      <section className="w-full py-16 bg-[#07040B]/90">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Previous destination */}
          {prevPlace && (
            <Link
              href={`/temples/${prevPlace.slug}`}
              onClick={playClick}
              className="flex items-center gap-6 p-6 border border-[#D4AF37]/15 hover:border-[#FF8C00] bg-[#0A0614]/50 rounded-xl hover:-translate-x-1 transition-all group no-underline text-left"
            >
              <ArrowLeft className="w-6 h-6 text-[#D4AF37] group-hover:text-white transition-colors" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                  {activeT.prevDest}
                </span>
                <h4 className="font-serif text-base font-bold text-white mt-1 group-hover:text-[#FFD700] transition-colors">
                  {prevPlace.name}
                </h4>
              </div>
            </Link>
          )}

          {/* Next destination */}
          {nextPlace && (
            <Link
              href={`/temples/${nextPlace.slug}`}
              onClick={playClick}
              className="flex items-center justify-between p-6 border border-[#D4AF37]/15 hover:border-[#FF8C00] bg-[#0A0614]/50 rounded-xl hover:translate-x-1 transition-all group no-underline text-right"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                  {activeT.nextDest}
                </span>
                <h4 className="font-serif text-base font-bold text-white mt-1 group-hover:text-[#FFD700] transition-colors">
                  {nextPlace.name}
                </h4>
              </div>
              <ArrowRight className="w-6 h-6 text-[#D4AF37] group-hover:text-white transition-colors" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
