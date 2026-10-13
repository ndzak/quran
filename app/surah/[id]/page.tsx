import { notFound } from 'next/navigation';
import { getSurahDetail } from '@/lib/api';
import { getSurahMeta, SURAH_LIST_ID } from '@/lib/surahData';
import SurahDetailClient from '@/components/SurahDetailClient';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const surahNumber = parseInt(resolvedParams.id, 10);
  const meta = getSurahMeta(surahNumber);

  if (!meta) {
    return {
      title: 'Surah Tidak Ditemukan | Al-Qur\'an Online',
    };
  }

  return {
    title: `Surah ${meta.nameId} (${meta.translationId}) - Teks Arab, Terjemahan & Audio Murottal | Quran`,
    description: `Baca Surah ${meta.nameId} (${meta.numberOfAyahs} Ayat) lengkap dengan teks Arab Utsmani, transliterasi Latin, terjemahan bahasa Indonesia, dan audio murottal merdu Syaikh Mishary Alafasy.`,
  };
}

export default async function SurahPage({ params }: PageProps) {
  const resolvedParams = await params;
  const surahNumber = parseInt(resolvedParams.id, 10);

  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  try {
    const surah = await getSurahDetail(surahNumber);
    return (
      <main className="flex-1 pb-16">
        <SurahDetailClient surah={surah} />
      </main>
    );
  } catch (error) {
    console.error('Error loading surah detail:', error);
    notFound();
  }
}
