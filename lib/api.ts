import { SurahSummary, SurahDetail, Ayah } from '@/types/quran';
import { SURAH_LIST_ID, getSurahMeta, cleanAyahText } from './surahData';

const BASE_URL = 'https://api.alquran.cloud/v1';

interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

interface RawSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

interface RawAyah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
  audio?: string;
}

interface RawEditionData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: RawAyah[];
  edition: {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
  };
}

/**
 * Mengambil daftar 114 Surah dari AlQuran Cloud API
 * Digabungkan dengan data terjemahan bahasa Indonesia
 */
export async function getSurahList(): Promise<SurahSummary[]> {
  try {
    const res = await fetch(`${BASE_URL}/surah`, {
      next: { revalidate: 86400 } // Cache 24 jam
    });

    if (!res.ok) {
      throw new Error(`Gagal mengambil data surah: ${res.status}`);
    }

    const json: ApiResponse<RawSurah[]> = await res.json();
    if (json.code !== 200 || !json.data) {
      throw new Error('Format response API surah tidak valid');
    }

    return json.data.map((surah) => {
      const meta = getSurahMeta(surah.number);
      return {
        number: surah.number,
        name: surah.name,
        englishName: surah.englishName,
        englishNameTranslation: surah.englishNameTranslation,
        numberOfAyahs: surah.numberOfAyahs,
        revelationType: surah.revelationType,
        nameId: meta?.nameId || surah.englishName,
        translationId: meta?.translationId || surah.englishNameTranslation,
        revelationTypeId: meta?.revelationTypeId || (surah.revelationType === 'Meccan' ? 'Makkiyyah' : 'Madaniyyah')
      };
    });
  } catch (err) {
    console.error('Error fetching surah list from API, fallback to local meta:', err);
    // Fallback darurat jika koneksi internet atau API lambat/terkendala
    return SURAH_LIST_ID.map((s) => ({
      number: s.number,
      name: `سورة ${s.nameId}`,
      englishName: s.nameId,
      englishNameTranslation: s.translationId,
      numberOfAyahs: s.numberOfAyahs,
      revelationType: s.revelationTypeId === 'Makkiyyah' ? 'Meccan' : 'Medinan',
      nameId: s.nameId,
      translationId: s.translationId,
      revelationTypeId: s.revelationTypeId
    }));
  }
}

async function fetchWithRetry(url: string, retries = 2, delay = 800): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { next: { revalidate: 86400 } });
      if (res.status === 429 && attempt < retries) {
        await new Promise((r) => setTimeout(r, delay * (attempt + 1)));
        continue;
      }
      return res;
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error('Gagal fetch setelah percobaan');
}

/**
 * Mengambil detail satu surah beserta ayat, teks Arab Uthmani,
 * terjemahan bahasa Indonesia, transliterasi latin, dan audio murottal
 */
export async function getSurahDetail(surahNumber: number): Promise<SurahDetail> {
  const editions = 'quran-uthmani,id.indonesian,en.transliteration,ar.alafasy';
  const url = `${BASE_URL}/surah/${surahNumber}/editions/${editions}`;

  const res = await fetchWithRetry(url);

  if (!res.ok) {
    throw new Error(`Gagal mengambil data surah nomor ${surahNumber}: ${res.status}`);
  }

  const json: ApiResponse<RawEditionData[]> = await res.json();
  if (json.code !== 200 || !json.data || json.data.length === 0) {
    throw new Error(`Data surah nomor ${surahNumber} tidak ditemukan`);
  }

  // Cari edition yang sesuai
  const uthmaniEdition = json.data.find((e) => e.edition.identifier === 'quran-uthmani') || json.data[0];
  const indoEdition = json.data.find((e) => e.edition.identifier === 'id.indonesian') || json.data[1];
  const translitEdition = json.data.find((e) => e.edition.identifier === 'en.transliteration') || json.data[2];
  const audioEdition = json.data.find((e) => e.edition.identifier === 'ar.alafasy') || json.data[3];

  const meta = getSurahMeta(surahNumber);

  const ayahs: Ayah[] = uthmaniEdition.ayahs.map((arabicAyah, index) => {
    const indoAyah = indoEdition?.ayahs?.[index];
    const translitAyah = translitEdition?.ayahs?.[index];
    const audioAyah = audioEdition?.ayahs?.[index];

    // Bersihkan bismillah di ayat 1 jika bukan surah 1 dan 9
    const cleanedText = cleanAyahText(surahNumber, arabicAyah.numberInSurah, arabicAyah.text);

    // Audio fallback URL
    const audioUrl = audioAyah?.audio || `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${arabicAyah.number}.mp3`;

    return {
      number: arabicAyah.number,
      numberInSurah: arabicAyah.numberInSurah,
      text: cleanedText,
      juz: arabicAyah.juz,
      manzil: arabicAyah.manzil,
      page: arabicAyah.page,
      ruku: arabicAyah.ruku,
      hizbQuarter: arabicAyah.hizbQuarter,
      sajda: arabicAyah.sajda,
      translation: indoAyah?.text || '',
      transliteration: translitAyah?.text || '',
      audio: audioUrl
    };
  });

  return {
    number: uthmaniEdition.number,
    name: uthmaniEdition.name,
    englishName: uthmaniEdition.englishName,
    englishNameTranslation: uthmaniEdition.englishNameTranslation,
    revelationType: uthmaniEdition.revelationType,
    numberOfAyahs: uthmaniEdition.numberOfAyahs,
    nameId: meta?.nameId || uthmaniEdition.englishName,
    translationId: meta?.translationId || uthmaniEdition.englishNameTranslation,
    revelationTypeId: meta?.revelationTypeId || (uthmaniEdition.revelationType === 'Meccan' ? 'Makkiyyah' : 'Madaniyyah'),
    ayahs
  };
}
