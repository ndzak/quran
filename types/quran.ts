export interface SurahSummary {
  number: number;
  name: string; // Teks kaligrafi Arab misal "سُورَةُ ٱلْفَاتِحَةِ"
  englishName: string; // Nama latin misal "Al-Faatiha"
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  // Data lokalisasi Indonesia
  nameId?: string; // misal "Al-Fatihah"
  translationId?: string; // misal "Pembukaan"
  revelationTypeId?: 'Makkiyyah' | 'Madaniyyah';
}

export interface Ayah {
  number: number; // Nomor global dalam Al-Qur'an (1 - 6236)
  numberInSurah: number; // Nomor ayat dalam surah (1 - ...)
  text: string; // Teks Arab (Uthmani)
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
  translation?: string; // Terjemahan bahasa Indonesia
  transliteration?: string; // Transliterasi latin
  audio?: string; // URL audio MP3 murottal (Alafasy)
}

export interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  nameId?: string;
  translationId?: string;
  revelationTypeId?: string;
  ayahs: Ayah[];
}

export interface LastReadItem {
  surahNumber: number;
  surahName: string;
  surahNameId: string;
  ayahNumber: number;
  timestamp: number;
}

export interface BookmarkItem {
  id: string; // `${surahNumber}:${ayahNumber}`
  surahNumber: number;
  surahNameId: string;
  ayahNumber: number;
  ayahText: string;
  translation: string;
  createdAt: number;
}
