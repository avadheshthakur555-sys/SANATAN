export interface GitaChapter {
  chapterNumber: number;
  nameSanskrit: string;
  nameEnglish: string;
  verseCount: number;
  summary: string;
}

export interface GitaVerse {
  verseNumber: string; // e.g. "1.1", "2.47"
  sanskrit: string;
  transliteration: string;
  hindi: string;
  english: string;
  wordMeanings?: string; // Optional JSON string
  commentary?: string; // Optional JSON string
}

export interface VedaData {
  name: string;
  sanskritName: string;
  description: string;
  verseCount: number | string;
  keyTeachings: string[];
}

export interface UpanishadData {
  name: string;
  sanskritName?: string;
  vedaAssociation: string;
  keyTeaching: string;
  famousQuote: string;
}

export interface PuranaData {
  name: string;
  sanskritName?: string;
  deityFocus: string;
  verseCount: number | string;
  keyStories: string[];
}

export interface DeityData {
  name: string;
  sanskrit: string;
  epithets: string[];
  description: string;
  associatedTexts: string[];
  emoji?: string;
  avatarUrl?: string; // Optional: fallback to SVG or emoji
}

export interface TimelineDataPoint {
  era: string;
  title: string;
  description: string;
  approximateDate: string;
}

export interface DailyShlokaData {
  sanskrit: string;
  transliteration: string;
  hindi: string;
  english: string;
  source: string;
}
