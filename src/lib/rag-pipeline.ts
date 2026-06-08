import { prisma } from "@/lib/db";

export interface WordMeaning {
  word: string;
  meaning_en?: string;
  meaning_hi?: string;
}

export interface Commentary {
  author?: string;
  text_en?: string;
  text_hi?: string;
}

export interface Citation {
  book: string;
  chapter: number;
  verse: string;
  textSanskrit: string;
  textTransliteration: string;
  textEnglish: string;
  textHindi: string;
  wordMeanings: WordMeaning[];
  commentaries: Commentary[];
}

export interface GuruResponse {
  answer: string;
  citations: Citation[];
  relatedConcepts: string[];
}

export async function generateGuruResponse(query: string, mode: string = "Scholar"): Promise<GuruResponse> {
  if (!query || query.trim().length === 0) {
    return {
      answer: "Please ask a question, seeker of truth, so that the scriptures may guide you.",
      citations: [],
      relatedConcepts: [],
    };
  }

  // 1. Fetch all verses with scripture and chapter details
  const verses = await prisma.verse.findMany({
    include: {
      scripture: true,
      chapter: true,
    },
  });

  if (verses.length === 0) {
    return {
      answer: "### Direct Answer\nMy apologies, seeker of truth. The library is empty. Please seed the database.",
      citations: [],
      relatedConcepts: [],
    };
  }

  // 2. Score verses based on query keyword matching
  const cleanQuery = query.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").trim();
  const keywords = cleanQuery.split(/\s+/).filter(word => word.length > 2);

  const scoredVerses = verses.map(verse => {
    let score = 0;
    
    // Parse JSON lists safely
    let concepts: string[] = [];
    try {
      concepts = JSON.parse(verse.relatedConcepts);
    } catch (_) {}

    let wordMeaningsList: WordMeaning[] = [];
    try {
      wordMeaningsList = JSON.parse(verse.wordMeanings);
    } catch (_) {}

    let commentariesList: Commentary[] = [];
    try {
      commentariesList = JSON.parse(verse.commentaries);
    } catch (_) {}

    for (const keyword of keywords) {
      // Check exact concept match (highest weight)
      if (concepts.some(c => c.toLowerCase() === keyword)) {
        score += 20;
      } else if (concepts.some(c => c.toLowerCase().includes(keyword))) {
        score += 10;
      }

      // Check title or chapter summary
      if (verse.scripture.titleEnglish.toLowerCase().includes(keyword)) score += 3;
      if (verse.chapter.titleEnglish.toLowerCase().includes(keyword)) score += 2;

      // Check translations
      if (verse.translationEnglish.toLowerCase().includes(keyword)) score += 8;
      if (verse.translationHindi.toLowerCase().includes(keyword)) score += 8;

      // Check Sanskrit text or transliteration
      if (verse.textSanskrit.includes(keyword)) score += 4;
      if (verse.textTransliteration.toLowerCase().includes(keyword)) score += 4;

      // Check word meanings
      if (wordMeaningsList.some((m: WordMeaning) => 
        (m.meaning_en && m.meaning_en.toLowerCase().includes(keyword)) ||
        (m.meaning_hi && m.meaning_hi.toLowerCase().includes(keyword)) ||
        (m.word && m.word.includes(keyword))
      )) {
        score += 5;
      }

      // Check commentaries
      if (commentariesList.some((c: Commentary) => 
        (c.text_en && c.text_en.toLowerCase().includes(keyword)) ||
        (c.text_hi && c.text_hi.toLowerCase().includes(keyword))
      )) {
        score += 3;
      }
    }

    return { verse, score, concepts, wordMeaningsList, commentariesList };
  });

  // Sort and filter top results
  const matching = scoredVerses
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (matching.length === 0) {
    return {
      answer: `### Direct Answer\nMy apologies, seeker of truth. The specific scriptural core does not currently index direct records matching your query. Try asking about 'anger', 'duty', 'dharma', 'grief', 'atman', or 'kurukshetra'.\n\n### Scriptural Insight\nWithout direct verses matching this inquiry, look to general dharmic guidelines on balance and mindfulness.\n\n### Historical Context\nIn historical tradition, whenever a seeker asked a question not answered in standard texts, the sages pointed to contemplation of the absolute.\n\n### Related Scriptures\nThis principle is covered in the generic concepts of Vedas and Upanishads.\n\n### Further Exploration\nContemplate: "Who is the one who asks?" Turn your vision inward to find the silent witness.`,
      citations: [],
      relatedConcepts: [],
    };
  }

  const topMatches = matching.slice(0, 3);

  // Construct Citations list
  const citations: Citation[] = topMatches.map(item => ({
    book: item.verse.scripture.titleEnglish,
    chapter: item.verse.chapter.chapterNumber,
    verse: item.verse.verseNumber,
    textSanskrit: item.verse.textSanskrit,
    textTransliteration: item.verse.textTransliteration,
    textEnglish: item.verse.translationEnglish,
    textHindi: item.verse.translationHindi,
    wordMeanings: item.wordMeaningsList,
    commentaries: item.commentariesList,
  }));

  // Collect unique related concepts
  const allConcepts = Array.from(new Set(topMatches.flatMap(item => item.concepts)));

  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    // 3. OpenAI RAG Integration
    try {
      const context = topMatches.map((item, index) => {
        return `Citation ${index + 1}: [Book: ${item.verse.scripture.titleEnglish}, Chapter ${item.verse.chapter.chapterNumber}, Verse ${item.verse.verseNumber}]
Sanskrit: ${item.verse.textSanskrit}
Transliteration: ${item.verse.textTransliteration}
English Translation: ${item.verse.translationEnglish}
Hindi Translation: ${item.verse.translationHindi}
Commentaries: ${JSON.stringify(item.commentariesList)}`;
      }).join("\n\n");

      let modeInstruction = "";
      switch (mode.toLowerCase()) {
        case "story":
          modeInstruction = "Tone: Narrative and illustrative. Weave the teaching into a beautiful story, parable, or epic analogy from the Ramayana, Mahabharata, or Puranas to make the concept vivid.";
          break;
        case "scholar":
          modeInstruction = "Tone: Highly intellectual, detailed, and analytical. Focus on deep scriptural analysis, philosophical concepts (Vedanta, Samkhya, Purusha), dissect Sanskrit terms, and quote commentaries from classical acharyas.";
          break;
        case "simple":
          modeInstruction = "Tone: Accessible and straightforward. Avoid complex philosophical jargon. Explain the core teaching using clear, modern, practical language.";
          break;
        case "child":
          modeInstruction = "Tone: Warm, gentle, and encouraging, like a grandparent telling a bedtime story. Use simple parables, nature metaphors, and focus on basic values (honesty, patience, love).";
          break;
        case "meditation":
          modeInstruction = "Tone: Contemplative, poetic, and serene. Structure the response to serve as a guided inquiry or breath contemplation. Use short, spaced lines that invite inner quietude and self-reflection.";
          break;
        default:
          modeInstruction = "Tone: Wise, authoritative, and balanced Vedic guide.";
      }

      const systemPrompt = `You are the AI Guru, a revered, wise, and compassionate spiritual guide of Sanatan Dharma. 
Your tone must be peaceful, reflective, authoritative, and compassionate, using language that inspires spiritual clarity (Vedas, Upanishads, Gita-centered).

${modeInstruction}

Your answers must be derived STRICTLY from the provided context citations. 
If the context does not contain relevant scriptural guidance to answer the question, politely decline to answer, stating that the currently indexed texts do not contain this information.

Rules:
- Cite source scripture, chapter, and verse numbers explicitly (e.g., Bhagavad Gita 2.47).
- Prevent any hallucinations or external speculations.
- Speak in first person as a sage.

Your responses MUST ALWAYS follow this exact structure using markdown headings:

### Direct Answer
[Provide a direct, wise, and spiritual answer to the user's question in the style of the active mode]

### Scriptural Insight
[Elaborate on the specific scriptural verses provided in the context, explaining their deep inner meaning]

### Historical Context
[Explain the setting, who is speaking to whom, and why (e.g. Krishna to Arjuna in Kurukshetra, Yajnavalkya to Maitreyi, etc.)]

### Related Scriptures
[Briefly mention how other sections of Sanatan literature (Vedas, Upanishads, Puranas) connect to this principle]

### Further Exploration
[Provide a practical contemplative exercise or a deep question for the seeker to reflect on]

Context from Scriptures:
${context}`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query }
          ],
          temperature: 0.3,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const answer = data.choices?.[0]?.message?.content?.trim();
        if (answer) {
          return {
            answer,
            citations,
            relatedConcepts: allConcepts,
          };
        }
      }
    } catch (e) {
      console.error("OpenAI API call failed, falling back to deterministic synthesizer:", e);
    }
  }

  // 4. Deterministic fall-back synthesis (if API key absent or fails)
  const mainMatch = topMatches[0];
  const book = mainMatch.verse.scripture.titleEnglish;
  const chapNum = mainMatch.verse.chapter.chapterNumber;
  const verseNum = mainMatch.verse.verseNumber;

  let synthesis = `### Direct Answer\nSeeker, your inquiry about "${query}" in ${mode} Mode leads to sacred insights within the ${book}.\n\n`;
  
  synthesis += `### Scriptural Insight\nIn Chapter ${chapNum}, Verse ${verseNum}, the scripture declares:\n`;
  synthesis += `> *"${mainMatch.verse.translationEnglish}"*\n\n`;
  
  if (mainMatch.commentariesList.length > 0) {
    const primaryComm = mainMatch.commentariesList[0];
    synthesis += `The sage **${primaryComm.author}** expounds upon this teaching, clarifying that:\n`;
    synthesis += `*"${primaryComm.text_en || primaryComm.text_hi}"*\n\n`;
  }
  
  synthesis += `### Historical Context\nThis verse is located in the **${book}**, specifically Chapter ${chapNum}. It represents an essential point in the dialogue where the timeless principles of life, duty, and consciousness are revealed to the seeker.\n\n`;
  
  if (topMatches.length > 1) {
    const secMatch = topMatches[1];
    synthesis += `### Related Scriptures\nFurther guidance is found in **${secMatch.verse.scripture.titleEnglish}** (Chapter ${secMatch.verse.chapter.chapterNumber}, Verse ${secMatch.verse.verseNumber}):\n`;
    synthesis += `> *"${secMatch.verse.translationEnglish}"*\n\n`;
  } else {
    synthesis += `### Related Scriptures\nThis truth mirrors the central message of the Upanishads: that the individual self (Atman) is ultimately one with the supreme consciousness (Brahman).\n\n`;
  }

  synthesis += `### Further Exploration\nReflect on this question today: *In what areas of your life can you perform your action without attachment to the results?* Strive to act as an instrument of Dharma.`;

  return {
    answer: synthesis,
    citations,
    relatedConcepts: allConcepts,
  };
}
