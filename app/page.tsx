import { getSurahList } from '@/lib/api';
import SurahListClient from '@/components/SurahListClient';

export const metadata = {
  title: 'Quran | Daftar 114 Surah, Terjemahan & Audio Murottal',
  description: 'Baca Al-Qur\'an 30 Juz online dengan rasm Utsmani, terjemahan bahasa Indonesia, transliterasi latin, dan audio murottal merdu per-ayat.',
};

export default async function HomePage() {
  const surahs = await getSurahList();

  return (
    <main className="flex-1">
      <SurahListClient initialSurahs={surahs} />
    </main>
  );
}
