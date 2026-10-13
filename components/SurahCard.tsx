import React from 'react';
import Link from 'next/link';
import { SurahSummary } from '@/types/quran';

interface SurahCardProps {
  surah: SurahSummary;
}

export default function SurahCard({ surah }: SurahCardProps) {
  const isMakkiyyah = surah.revelationTypeId === 'Makkiyyah' || surah.revelationType === 'Meccan';

  return (
    <Link
      href={`/surah/${surah.number}`}
      className="group relative block p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#122220] border border-emerald-900/10 dark:border-emerald-500/15 hover:border-amber-500/60 dark:hover:border-amber-400/60 shadow-xs hover:shadow-xl hover:shadow-emerald-900/5 dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: Badge Number & Latin Info */}
        <div className="flex items-center gap-3.5">
          {/* Islamic Ornament Badge */}
          <div className="w-11 h-11 rounded-xl islamic-badge font-bold text-emerald-900 dark:text-amber-300 text-sm flex-shrink-0 group-hover:scale-105 transition-transform">
            {surah.number}
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              {surah.nameId || surah.englishName}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {surah.translationId || surah.englishNameTranslation}
            </p>
          </div>
        </div>

        {/* Right: Arabic Name Calligraphy */}
        <div className="text-right">
          <p
            className="font-quran text-xl sm:text-2xl text-emerald-900 dark:text-emerald-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
            dir="rtl"
          >
            {surah.name}
          </p>
        </div>
      </div>

      {/* Bottom meta: Revelation & Ayat Count */}
      <div className="mt-4 pt-3 border-t border-emerald-900/5 dark:border-emerald-500/10 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span
          className={`px-2 py-0.5 rounded-full font-medium ${
            isMakkiyyah
              ? 'bg-amber-100/70 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
              : 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
          }`}
        >
          {isMakkiyyah ? 'Makkiyyah' : 'Madaniyyah'}
        </span>
        <span className="font-medium text-gray-600 dark:text-gray-400">
          {surah.numberOfAyahs} Ayat
        </span>
      </div>
    </Link>
  );
}
