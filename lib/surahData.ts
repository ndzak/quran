export interface SurahMeta {
  number: number;
  nameId: string;
  translationId: string;
  revelationTypeId: 'Makkiyyah' | 'Madaniyyah';
  numberOfAyahs: number;
}

export const SURAH_LIST_ID: SurahMeta[] = [
  { number: 1, nameId: 'Al-Fatihah', translationId: 'Pembukaan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 7 },
  { number: 2, nameId: 'Al-Baqarah', translationId: 'Sapi Betina', revelationTypeId: 'Madaniyyah', numberOfAyahs: 286 },
  { number: 3, nameId: 'Ali \'Imran', translationId: 'Keluarga \'Imran', revelationTypeId: 'Madaniyyah', numberOfAyahs: 200 },
  { number: 4, nameId: 'An-Nisa\'', translationId: 'Wanita', revelationTypeId: 'Madaniyyah', numberOfAyahs: 176 },
  { number: 5, nameId: 'Al-Ma\'idah', translationId: 'Jamuan Hidangan', revelationTypeId: 'Madaniyyah', numberOfAyahs: 120 },
  { number: 6, nameId: 'Al-An\'am', translationId: 'Hewan Ternak', revelationTypeId: 'Makkiyyah', numberOfAyahs: 165 },
  { number: 7, nameId: 'Al-A\'raf', translationId: 'Tempat Tertinggi', revelationTypeId: 'Makkiyyah', numberOfAyahs: 206 },
  { number: 8, nameId: 'Al-Anfal', translationId: 'Rampasan Perang', revelationTypeId: 'Madaniyyah', numberOfAyahs: 75 },
  { number: 9, nameId: 'At-Taubah', translationId: 'Pengampunan', revelationTypeId: 'Madaniyyah', numberOfAyahs: 129 },
  { number: 10, nameId: 'Yunus', translationId: 'Nabi Yunus', revelationTypeId: 'Makkiyyah', numberOfAyahs: 109 },
  { number: 11, nameId: 'Hud', translationId: 'Nabi Hud', revelationTypeId: 'Makkiyyah', numberOfAyahs: 123 },
  { number: 12, nameId: 'Yusuf', translationId: 'Nabi Yusuf', revelationTypeId: 'Makkiyyah', numberOfAyahs: 111 },
  { number: 13, nameId: 'Ar-Ra\'d', translationId: 'Guruh', revelationTypeId: 'Madaniyyah', numberOfAyahs: 43 },
  { number: 14, nameId: 'Ibrahim', translationId: 'Nabi Ibrahim', revelationTypeId: 'Makkiyyah', numberOfAyahs: 52 },
  { number: 15, nameId: 'Al-Hijr', translationId: 'Negeri Kaum Tsamud', revelationTypeId: 'Makkiyyah', numberOfAyahs: 99 },
  { number: 16, nameId: 'An-Nahl', translationId: 'Lebah', revelationTypeId: 'Makkiyyah', numberOfAyahs: 128 },
  { number: 17, nameId: 'Al-Isra\'', translationId: 'Perjalanan Malam', revelationTypeId: 'Makkiyyah', numberOfAyahs: 111 },
  { number: 18, nameId: 'Al-Kahf', translationId: 'Gua', revelationTypeId: 'Makkiyyah', numberOfAyahs: 110 },
  { number: 19, nameId: 'Maryam', translationId: 'Siti Maryam', revelationTypeId: 'Makkiyyah', numberOfAyahs: 98 },
  { number: 20, nameId: 'Taha', translationId: 'Taha', revelationTypeId: 'Makkiyyah', numberOfAyahs: 135 },
  { number: 21, nameId: 'Al-Anbiya\'', translationId: 'Para Nabi', revelationTypeId: 'Makkiyyah', numberOfAyahs: 112 },
  { number: 22, nameId: 'Al-Hajj', translationId: 'Haji', revelationTypeId: 'Madaniyyah', numberOfAyahs: 78 },
  { number: 23, nameId: 'Al-Mu\'minun', translationId: 'Orang-orang Mukmin', revelationTypeId: 'Makkiyyah', numberOfAyahs: 118 },
  { number: 24, nameId: 'An-Nur', translationId: 'Cahaya', revelationTypeId: 'Madaniyyah', numberOfAyahs: 64 },
  { number: 25, nameId: 'Al-Furqan', translationId: 'Pembeda', revelationTypeId: 'Makkiyyah', numberOfAyahs: 77 },
  { number: 26, nameId: 'Asy-Syu\'ara\'', translationId: 'Para Penyair', revelationTypeId: 'Makkiyyah', numberOfAyahs: 227 },
  { number: 27, nameId: 'An-Naml', translationId: 'Semut', revelationTypeId: 'Makkiyyah', numberOfAyahs: 93 },
  { number: 28, nameId: 'Al-Qasas', translationId: 'Kisah-kisah', revelationTypeId: 'Makkiyyah', numberOfAyahs: 88 },
  { number: 29, nameId: 'Al-\'Ankabut', translationId: 'Laba-laba', revelationTypeId: 'Makkiyyah', numberOfAyahs: 69 },
  { number: 30, nameId: 'Ar-Rum', translationId: 'Bangsa Romawi', revelationTypeId: 'Makkiyyah', numberOfAyahs: 60 },
  { number: 31, nameId: 'Luqman', translationId: 'Keluarga Luqman', revelationTypeId: 'Makkiyyah', numberOfAyahs: 34 },
  { number: 32, nameId: 'As-Sajdah', translationId: 'Sujud', revelationTypeId: 'Makkiyyah', numberOfAyahs: 30 },
  { number: 33, nameId: 'Al-Ahzab', translationId: 'Golongan Bersekutu', revelationTypeId: 'Madaniyyah', numberOfAyahs: 73 },
  { number: 34, nameId: 'Saba\'', translationId: 'Kaum Saba\'', revelationTypeId: 'Makkiyyah', numberOfAyahs: 54 },
  { number: 35, nameId: 'Fatir', translationId: 'Pencipta', revelationTypeId: 'Makkiyyah', numberOfAyahs: 45 },
  { number: 36, nameId: 'Yasin', translationId: 'Yasin', revelationTypeId: 'Makkiyyah', numberOfAyahs: 83 },
  { number: 37, nameId: 'As-Saffat', translationId: 'Barisan-barisan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 182 },
  { number: 38, nameId: 'Sad', translationId: 'Sad', revelationTypeId: 'Makkiyyah', numberOfAyahs: 88 },
  { number: 39, nameId: 'Az-Zumar', translationId: 'Rombongan-rombongan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 75 },
  { number: 40, nameId: 'Gafir', translationId: 'Maha Pengampun', revelationTypeId: 'Makkiyyah', numberOfAyahs: 85 },
  { number: 41, nameId: 'Fussilat', translationId: 'Dijelaskan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 54 },
  { number: 42, nameId: 'Asy-Syura', translationId: 'Musyawarah', revelationTypeId: 'Makkiyyah', numberOfAyahs: 53 },
  { number: 43, nameId: 'Az-Zukhruf', translationId: 'Perhiasan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 89 },
  { number: 44, nameId: 'Ad-Dukhan', translationId: 'Kabut Asap', revelationTypeId: 'Makkiyyah', numberOfAyahs: 59 },
  { number: 45, nameId: 'Al-Jasiyah', translationId: 'Berlutut', revelationTypeId: 'Makkiyyah', numberOfAyahs: 37 },
  { number: 46, nameId: 'Al-Ahqaf', translationId: 'Bukit Pasir', revelationTypeId: 'Makkiyyah', numberOfAyahs: 35 },
  { number: 47, nameId: 'Muhammad', translationId: 'Nabi Muhammad', revelationTypeId: 'Madaniyyah', numberOfAyahs: 38 },
  { number: 48, nameId: 'Al-Fath', translationId: 'Kemenangan', revelationTypeId: 'Madaniyyah', numberOfAyahs: 29 },
  { number: 49, nameId: 'Al-Hujurat', translationId: 'Kamar-kamar', revelationTypeId: 'Madaniyyah', numberOfAyahs: 18 },
  { number: 50, nameId: 'Qaf', translationId: 'Qaf', revelationTypeId: 'Makkiyyah', numberOfAyahs: 45 },
  { number: 51, nameId: 'Az-Zariyat', translationId: 'Angin Menerbangkan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 60 },
  { number: 52, nameId: 'At-Tur', translationId: 'Bukit Tursina', revelationTypeId: 'Makkiyyah', numberOfAyahs: 49 },
  { number: 53, nameId: 'An-Najm', translationId: 'Bintang', revelationTypeId: 'Makkiyyah', numberOfAyahs: 62 },
  { number: 54, nameId: 'Al-Qamar', translationId: 'Bulan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 55 },
  { number: 55, nameId: 'Ar-Rahman', translationId: 'Maha Pengasih', revelationTypeId: 'Madaniyyah', numberOfAyahs: 78 },
  { number: 56, nameId: 'Al-Waqi\'ah', translationId: 'Hari Kiamat', revelationTypeId: 'Makkiyyah', numberOfAyahs: 96 },
  { number: 57, nameId: 'Al-Hadid', translationId: 'Besi', revelationTypeId: 'Madaniyyah', numberOfAyahs: 29 },
  { number: 58, nameId: 'Al-Mujadilah', translationId: 'Gugatan', revelationTypeId: 'Madaniyyah', numberOfAyahs: 22 },
  { number: 59, nameId: 'Al-Hasyr', translationId: 'Pengusiran', revelationTypeId: 'Madaniyyah', numberOfAyahs: 24 },
  { number: 60, nameId: 'Al-Mumtahanah', translationId: 'Wanita Diuji', revelationTypeId: 'Madaniyyah', numberOfAyahs: 13 },
  { number: 61, nameId: 'As-Saff', translationId: 'Barisan', revelationTypeId: 'Madaniyyah', numberOfAyahs: 14 },
  { number: 62, nameId: 'Al-Jumu\'ah', translationId: 'Hari Jumat', revelationTypeId: 'Madaniyyah', numberOfAyahs: 11 },
  { number: 63, nameId: 'Al-Munafiqun', translationId: 'Orang Munafik', revelationTypeId: 'Madaniyyah', numberOfAyahs: 11 },
  { number: 64, nameId: 'At-Tagabun', translationId: 'Hari Dinampakkan Kerugian', revelationTypeId: 'Madaniyyah', numberOfAyahs: 18 },
  { number: 65, nameId: 'At-Talaq', translationId: 'Perceraian', revelationTypeId: 'Madaniyyah', numberOfAyahs: 12 },
  { number: 66, nameId: 'At-Tahrim', translationId: 'Pengharaman', revelationTypeId: 'Madaniyyah', numberOfAyahs: 12 },
  { number: 67, nameId: 'Al-Mulk', translationId: 'Kerajaan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 30 },
  { number: 68, nameId: 'Al-Qalam', translationId: 'Pena', revelationTypeId: 'Makkiyyah', numberOfAyahs: 52 },
  { number: 69, nameId: 'Al-Haqqah', translationId: 'Hari Kiamat Nyata', revelationTypeId: 'Makkiyyah', numberOfAyahs: 52 },
  { number: 70, nameId: 'Al-Ma\'arij', translationId: 'Tempat Naik', revelationTypeId: 'Makkiyyah', numberOfAyahs: 44 },
  { number: 71, nameId: 'Nuh', translationId: 'Nabi Nuh', revelationTypeId: 'Makkiyyah', numberOfAyahs: 28 },
  { number: 72, nameId: 'Al-Jinn', translationId: 'Jin', revelationTypeId: 'Makkiyyah', numberOfAyahs: 28 },
  { number: 73, nameId: 'Al-Muzzammil', translationId: 'Orang Berselimut', revelationTypeId: 'Makkiyyah', numberOfAyahs: 20 },
  { number: 74, nameId: 'Al-Muddassir', translationId: 'Orang Berkemul', revelationTypeId: 'Makkiyyah', numberOfAyahs: 56 },
  { number: 75, nameId: 'Al-Qiyamah', translationId: 'Hari Kiamat', revelationTypeId: 'Makkiyyah', numberOfAyahs: 40 },
  { number: 76, nameId: 'Al-Insan', translationId: 'Manusia', revelationTypeId: 'Madaniyyah', numberOfAyahs: 31 },
  { number: 77, nameId: 'Al-Mursalat', translationId: 'Malaikat Diutus', revelationTypeId: 'Makkiyyah', numberOfAyahs: 50 },
  { number: 78, nameId: 'An-Naba\'', translationId: 'Berita Besar', revelationTypeId: 'Makkiyyah', numberOfAyahs: 40 },
  { number: 79, nameId: 'An-Nazi\'at', translationId: 'Malaikat Pencabut', revelationTypeId: 'Makkiyyah', numberOfAyahs: 46 },
  { number: 80, nameId: '\'Abasa', translationId: 'Bermuka Masam', revelationTypeId: 'Makkiyyah', numberOfAyahs: 42 },
  { number: 81, nameId: 'At-Takwir', translationId: 'Menggulung', revelationTypeId: 'Makkiyyah', numberOfAyahs: 29 },
  { number: 82, nameId: 'Al-Infitar', translationId: 'Terbelah', revelationTypeId: 'Makkiyyah', numberOfAyahs: 19 },
  { number: 83, nameId: 'Al-Mutaffifin', translationId: 'Orang Curang', revelationTypeId: 'Makkiyyah', numberOfAyahs: 36 },
  { number: 84, nameId: 'Al-Insyiqaq', translationId: 'Terbelah', revelationTypeId: 'Makkiyyah', numberOfAyahs: 25 },
  { number: 85, nameId: 'Al-Buruj', translationId: 'Gugusan Bintang', revelationTypeId: 'Makkiyyah', numberOfAyahs: 22 },
  { number: 86, nameId: 'At-Tariq', translationId: 'Yang Datang di Malam Hari', revelationTypeId: 'Makkiyyah', numberOfAyahs: 17 },
  { number: 87, nameId: 'Al-A\'la', translationId: 'Maha Tinggi', revelationTypeId: 'Makkiyyah', numberOfAyahs: 19 },
  { number: 88, nameId: 'Al-Gasyiyah', translationId: 'Hari Pembalasan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 26 },
  { number: 89, nameId: 'Al-Fajr', translationId: 'Fajar', revelationTypeId: 'Makkiyyah', numberOfAyahs: 30 },
  { number: 90, nameId: 'Al-Balad', translationId: 'Negeri', revelationTypeId: 'Makkiyyah', numberOfAyahs: 20 },
  { number: 91, nameId: 'Asy-Syams', translationId: 'Matahari', revelationTypeId: 'Makkiyyah', numberOfAyahs: 15 },
  { number: 92, nameId: 'Al-Lail', translationId: 'Malam', revelationTypeId: 'Makkiyyah', numberOfAyahs: 21 },
  { number: 93, nameId: 'Ad-Duha', translationId: 'Waktu Dhuha', revelationTypeId: 'Makkiyyah', numberOfAyahs: 11 },
  { number: 94, nameId: 'Asy-Syarh', translationId: 'Kelapangan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 8 },
  { number: 95, nameId: 'At-Tin', translationId: 'Buah Tin', revelationTypeId: 'Makkiyyah', numberOfAyahs: 8 },
  { number: 96, nameId: 'Al-\'Alaq', translationId: 'Segumpal Darah', revelationTypeId: 'Makkiyyah', numberOfAyahs: 19 },
  { number: 97, nameId: 'Al-Qadr', translationId: 'Kemuliaan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 5 },
  { number: 98, nameId: 'Al-Bayyinah', translationId: 'Bukti Nyata', revelationTypeId: 'Madaniyyah', numberOfAyahs: 8 },
  { number: 99, nameId: 'Az-Zalzalah', translationId: 'Keguncangan', revelationTypeId: 'Madaniyyah', numberOfAyahs: 8 },
  { number: 100, nameId: 'Al-\'Adiyat', translationId: 'Kuda Perang', revelationTypeId: 'Makkiyyah', numberOfAyahs: 11 },
  { number: 101, nameId: 'Al-Qari\'ah', translationId: 'Hari Kiamat Mengetuk', revelationTypeId: 'Makkiyyah', numberOfAyahs: 11 },
  { number: 102, nameId: 'At-Takasur', translationId: 'Bermegah-megahan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 8 },
  { number: 103, nameId: 'Al-\'Asr', translationId: 'Masa / Waktu', revelationTypeId: 'Makkiyyah', numberOfAyahs: 3 },
  { number: 104, nameId: 'Al-Humazah', translationId: 'Pengumpat', revelationTypeId: 'Makkiyyah', numberOfAyahs: 9 },
  { number: 105, nameId: 'Al-Fil', translationId: 'Gajah', revelationTypeId: 'Makkiyyah', numberOfAyahs: 5 },
  { number: 106, nameId: 'Quraisy', translationId: 'Suku Quraisy', revelationTypeId: 'Makkiyyah', numberOfAyahs: 4 },
  { number: 107, nameId: 'Al-Ma\'un', translationId: 'Barang Berguna', revelationTypeId: 'Makkiyyah', numberOfAyahs: 7 },
  { number: 108, nameId: 'Al-Kausar', translationId: 'Nikmat Berlimpah', revelationTypeId: 'Makkiyyah', numberOfAyahs: 3 },
  { number: 109, nameId: 'Al-Kafirun', translationId: 'Orang-orang Kafir', revelationTypeId: 'Makkiyyah', numberOfAyahs: 6 },
  { number: 110, nameId: 'An-Nasr', translationId: 'Pertolongan', revelationTypeId: 'Madaniyyah', numberOfAyahs: 3 },
  { number: 111, nameId: 'Al-Lahab', translationId: 'Gejolak Api', revelationTypeId: 'Makkiyyah', numberOfAyahs: 5 },
  { number: 112, nameId: 'Al-Ikhlas', translationId: 'Kemurnian Keesaan', revelationTypeId: 'Makkiyyah', numberOfAyahs: 4 },
  { number: 113, nameId: 'Al-Falaq', translationId: 'Waktu Subuh', revelationTypeId: 'Makkiyyah', numberOfAyahs: 5 },
  { number: 114, nameId: 'An-Nas', translationId: 'Manusia', revelationTypeId: 'Makkiyyah', numberOfAyahs: 6 }
];

export const BISMILLAH_TEXT = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

/**
 * Mendapatkan metadata surah bahasa Indonesia berdasarkan nomor surah (1 - 114)
 */
export function getSurahMeta(surahNumber: number): SurahMeta | undefined {
  return SURAH_LIST_ID.find((s) => s.number === surahNumber);
}

/**
 * Membersihkan teks Bismillah di ayat pertama jika surah bukan Al-Fatihah (1) & bukan At-Taubah (9),
 * agar Bismillah banner tidak tampil ganda di awal ayat 1.
 */
export function cleanAyahText(surahNumber: number, ayahNumber: number, text: string): string {
  // Hapus karakter invisible Unicode BOM jika ada
  let cleaned = text.replace(/^\uFEFF/, '').trim();

  if (surahNumber !== 1 && surahNumber !== 9 && ayahNumber === 1) {
    // Pola Bismillah dengan tanda baca apa pun
    const bismillahPrefixPattern = /^بِسْمِ\s*ٱللَّهِ\s*ٱلرَّحْمَٰنِ\s*ٱلرَّحِيمِ\s*/;
    if (bismillahPrefixPattern.test(cleaned)) {
      cleaned = cleaned.replace(bismillahPrefixPattern, '').trim();
    }
  }

  return cleaned;
}
