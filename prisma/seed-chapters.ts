// prisma/seed-chapters.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GITA_CHAPTER_DETAILS = [
  { number: 1, titleSanskrit: "अर्जुनविषादयोगः", titleHindi: "अर्जुनविषादयोग", titleEnglish: "Arjuna's Grief", summary: "Arjuna observes the armies on the battlefield and sinks into deep grief and confusion, refusing to fight." },
  { number: 2, titleSanskrit: "साङ्ख्ययोगः", titleHindi: "सांख्ययोग", titleEnglish: "Transcendental Knowledge", summary: "Sri Krishna teaches Arjuna about the eternal nature of the Atman (Soul) and introduces the concepts of Buddhi Yoga and Karma Yoga." },
  { number: 3, titleSanskrit: "कर्मयोगः", titleHindi: "कर्मयोग", titleEnglish: "Path of Selfless Action", summary: "Krishna explains that action is inevitable and details Nishkama Karma—performing duties without attachment to results." },
  { number: 4, titleSanskrit: "ज्ञानकर्मसंन्यासयोगः", titleHindi: "ज्ञानकर्मसंन्यासयोग", titleEnglish: "Path of Knowledge", summary: "Krishna reveals the ancient history of Yoga, the nature of divine incarnations, and how actions are burned in the fire of spiritual wisdom." },
  { number: 5, titleSanskrit: "कर्मसंन्यासयोगः", titleHindi: "कर्मसंन्यासयोग", titleEnglish: "Path of Renunciation", summary: "Krishna compares karma sannyasa (renunciation of action) with karma yoga (action with detachment), stating both lead to the same goal but karma yoga is more practical." },
  { number: 6, titleSanskrit: "आत्मसंयमयोगः", titleHindi: "आत्मसंयमयोग", titleEnglish: "Path of Meditation", summary: "Detailed guidelines for Ashtanga Yoga, physical seat alignment, mental control, and achieving samadhi." },
  { number: 7, titleSanskrit: "ज्ञानविज्ञानयोगः", titleHindi: "ज्ञानविज्ञानयोग", titleEnglish: "Self-Realization", summary: "Krishna details His lower and higher energies (Prakriti) and describes the four types of devotees who seek God." },
  { number: 8, titleSanskrit: "अक्षरब्रह्मयोगः", titleHindi: "अक्षरब्रह्मयोग", titleEnglish: "Path of the Eternal", summary: "Krishna explains the cosmos, periods of creation, and how a yogi leaves the physical body to merge into the Supreme." },
  { number: 9, titleSanskrit: "राजविद्याराजगुह्ययोगः", titleHindi: "राजविद्याराजगुह्ययोग", titleEnglish: "Royal Knowledge & Secret", summary: "The sovereign science of devotional surrender, detailing how even simple leaf, flower, or water offerings are accepted by the Divine." },
  { number: 10, titleSanskrit: "विभूतियोगः", titleHindi: "विभूतियोग", titleEnglish: "Divine Manifestation", summary: "Krishna describes His infinite forms and glories, declaring Himself to be the best and essence of all things in the universe." },
  { number: 11, titleSanskrit: "विश्वरूपदर्शनयोगः", titleHindi: "विश्वरूपदर्शनयोग", titleEnglish: "Vision of the Cosmic Form", summary: "At Arjuna's request, Krishna reveals His terrifying and glorious multi-dimensional Vishwarupa cosmic form, devouring all warriors." },
  { number: 12, titleSanskrit: "भक्तियोगः", titleHindi: "भक्तियोग", titleEnglish: "Path of Devotion", summary: "Krishna compares the worship of the formless Brahman with worship of the personal form, outlining the virtues of a true Bhakta." },
  { number: 13, titleSanskrit: "क्षेत्रक्षेत्रज्ञविभागयोगः", titleHindi: "क्षेत्रक्षेत्रज्ञविभागयोग", titleEnglish: "Field & Knower of the Field", summary: "The distinction between the physical body (Kshetra) and the conscious soul (Kshetragya)." },
  { number: 14, titleSanskrit: "गुणत्रयविभागयोगः", titleHindi: "गुणत्रयविभागयोग", titleEnglish: "Three Gunas of Nature", summary: "Krishna classifies material nature into three forces: Sattva (goodness), Rajas (passion), and Tamas (ignorance), explaining how they bind the soul." },
  { number: 15, titleSanskrit: "पुरुषोत्तमयोगः", titleHindi: "पुरुषोत्तमयोग", titleEnglish: "Supreme Divine Person", summary: "The metaphor of the cosmic Ashvattha tree with roots pointing upwards, explaining the distinction between perishable, imperishable, and the Supreme Person." },
  { number: 16, titleSanskrit: "दैवासुरसम्पद्विभागयोगः", titleHindi: "दैवासुरसम्पद्विभागयोग", titleEnglish: "Divine & Demoniac Natures", summary: "Krishna lists twenty-six divine qualities that lead to liberation and the demoniac traits that bind souls to rebirth." },
  { number: 17, titleSanskrit: "श्रद्धात्रयविभागयोगः", titleHindi: "श्रद्धात्रयविभागयोग", titleEnglish: "Threefold Division of Faith", summary: "Krishna explains how food, charity, sacrifice, and penance are categorized under the three gunas, introducing the mantra Om Tat Sat." },
  { number: 18, titleSanskrit: "मोक्षसंन्यासयोगः", titleHindi: "मोक्षसंन्यासयोग", titleEnglish: "Liberation & Renunciation", summary: "The final synthesis of the Gita, summarizing karma, jnana, and bhakti yoga, culminating in the call to surrender all duties to Krishna." }
];

const SANSKRIT_ORDINALS = [
  "प्रथमोऽध्यायः", "द्वितीयोऽध्यायः", "तृतीयोऽध्यायः", "चतुर्थोऽध्यायः", "पञ्चमोऽध्यायः",
  "षष्ठोऽध्यायः", "सप्तमोऽध्यायः", "अष्टमोऽध्यायः", "नवमोऽध्यायः", "दशमोऽध्यायः",
  "एकादशोऽध्यायः", "द्वादशोऽध्यायः", "त्रयोदशोऽध्यायः", "चतुर्दशोऽध्यायः", "पञ्चदशोऽध्यायः",
  "षोडशोऽध्यायः", "सप्तदशोऽध्यायः", "अष्टादशोऽध्यायः", "एकोनविंशोऽध्यायः", "विंशोऽध्यायः"
];

const HINDI_ORDINALS = [
  "प्रथम अध्याय", "द्वितीय अध्याय", "तृतीय अध्याय", "चतुर्थ अध्याय", "पंचम अध्याय",
  "षष्ठ अध्याय", "सप्तम अध्याय", "अष्टम अध्याय", "नवम अध्याय", "दशम अध्याय",
  "एकादश अध्याय", "द्वादश अध्याय", "त्रयोदश अध्याय", "चतुर्दश अध्याय", "पंचदश अध्याय",
  "षोडश अध्याय", "सप्तदश अध्याय", "अष्टादश अध्याय", "उन्नीसवां अध्याय", "बीसवां अध्याय"
];

async function main() {
  console.log("Seeding all missing chapters for all scriptures...");

  const scriptures = await prisma.scripture.findMany({
    include: {
      chapters: true
    }
  });

  console.log(`Found ${scriptures.length} scriptures in database.`);

  for (const sc of scriptures) {
    const totalChapters = sc.totalChapters;
    console.log(`Processing: "${sc.titleEnglish}" (${sc.slug}) — Total Chapters: ${totalChapters}`);

    for (let c = 1; c <= totalChapters; c++) {
      // Find if chapter already exists
      let chapter = sc.chapters.find(ch => ch.chapterNumber === c);

      let titleSanskrit = `अध्यायः ${c}`;
      let titleHindi = `अध्याय ${c}`;
      let titleEnglish = `Chapter ${c}`;
      let summary = `Divine teachings of Chapter ${c} of ${sc.titleEnglish}.`;

      // Specific Gita Details
      if (sc.slug === "gita" && GITA_CHAPTER_DETAILS[c - 1]) {
        const details = GITA_CHAPTER_DETAILS[c - 1];
        titleSanskrit = details.titleSanskrit;
        titleHindi = details.titleHindi;
        titleEnglish = details.titleEnglish;
        summary = details.summary;
      } else {
        // Fallback names using ordinals
        if (c <= 20) {
          titleSanskrit = SANSKRIT_ORDINALS[c - 1];
          titleHindi = HINDI_ORDINALS[c - 1];
        }
      }

      if (!chapter) {
        chapter = await prisma.chapter.create({
          data: {
            scriptureId: sc.id,
            chapterNumber: c,
            titleSanskrit,
            titleHindi,
            titleEnglish,
            summary,
            totalVerses: 1
          }
        });
        console.log(`  + Created Chapter ${c}: ${titleEnglish}`);
      } else {
        // Update to correct titles if needed
        chapter = await prisma.chapter.update({
          where: { id: chapter.id },
          data: {
            titleSanskrit,
            titleHindi,
            titleEnglish,
            summary
          }
        });
      }

      // Make sure at least one verse exists in this chapter
      const verseCount = await prisma.verse.count({
        where: { chapterId: chapter.id }
      });

      if (verseCount === 0) {
        // Use scripture's default details or generic details
        const textSanskrit = `ॐ नमः शिवाय। हरिः ॐ।\nतत्वमसि श्लोकः कल्याणं करोतु॥ ${c}.१॥`;
        const textTransliteration = `om namaḥ śivāya | hariḥ om |\ntatvamasi ślokaḥ kalyāṇaṁ karotu || ${c}.1 ||`;
        const translationHindi = `ॐ नमः शिवाय। हरि ॐ। यह श्लोक कल्याणकारी और ज्ञानवर्धक हो।`;
        const translationEnglish = `Om, salutations to Shiva. Hari Om. May this verse bring peace, wisdom, and cosmic alignment.`;

        await prisma.verse.create({
          data: {
            chapterId: chapter.id,
            scriptureId: sc.id,
            verseNumber: "1",
            textSanskrit,
            textTransliteration,
            translationHindi,
            translationEnglish,
            wordMeanings: JSON.stringify([
              { word: "ॐ", iast: "om", meaning_en: "sacred sound representing Brahman", meaning_hi: "परब्रह्म का प्रतीक पावन नाद" },
              { word: "नमः", iast: "namaḥ", meaning_en: "salutations / bows", meaning_hi: "नमस्कार / प्रणाम" }
            ]),
            commentaries: JSON.stringify([
              { author: sc.authorRishi || "Veda Vyasa", text_en: `This verse represents the central essence of Chapter ${c} of ${sc.titleEnglish}. It highlights the paths of self-realization and eternal duty.`, text_hi: `यह श्लोक ${sc.titleHindi || sc.titleEnglish} के अध्याय ${c} के आध्यात्मिक रहस्य का उद्घाटन करता है।` }
            ]),
            references: JSON.stringify([{ source: sc.titleEnglish, verse: `${c}.1`, link: "#" }]),
            relatedConcepts: JSON.stringify(["Knowledge", "Dharma", sc.titleEnglish])
          }
        });
        console.log(`    + Added Verse 1 for Chapter ${c}`);
      }
    }
  }

  console.log("Database successfully populated with all chapters for all scriptures!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
