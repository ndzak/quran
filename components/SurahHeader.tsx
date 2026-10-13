'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, Volume2, Sparkles } from 'lucide-react';
import { SurahDetail } from '@/types/quran';
import { BISMILLAH_TEXT } from '@/lib/surahData';

interface SurahHeaderProps {
  surah: SurahDetail;
  isPlayingAll: boolean;
  onTogglePlayAll: () => void;
}

export default function SurahHeader({
  surah,
  isPlayingAll,
  onTogglePlayAll,
}: SurahHeaderProps) {
  const isMakkiyyah =
    surah.revelationTypeId === 'Makkiyyah' || surah.revelationType === 'Meccan';
  const showBismillah = surah.number !== 9 && surah.number !== 1;

  return (
    <div className="mb-8">
      {/* Back Button */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Surah</span>
        </Link>
      </div>

      {/* Main Surah Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-[#043322] text-white p-6 sm:p-10 shadow-xl border border-emerald-600/30">
        {/* Decorative blur elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Top meta tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700/60 border border-emerald-500/30 text-amber-300">
              Surah ke-{surah.number}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isMakkiyyah
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30'
              }`}
            >
              {isMakkiyyah ? 'Makkiyyah' : 'Madaniyyah'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-100">
              {surah.numberOfAyahs} Ayat
            </span>
          </div>

          {/* Surah Titles */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
            {surah.nameId || surah.englishName}
          </h1>

          <p className="font-quran text-3xl sm:text-4xl text-amber-300 my-3" dir="rtl">
            {surah.name}
          </p>

          <p className="text-emerald-200 text-sm sm:text-base max-w-md font-medium mb-6">
            Arti: &quot;{surah.translationId || surah.englishNameTranslation}&quot;
          </p>

          {/* Play Full Surah Audio Button */}
          <button
            onClick={onTogglePlayAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            {isPlayingAll ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Jeda Murottal Surah</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-emerald-950" />
                <span>Putar Murottal Surah</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Decorative Basmalah Box for Surah 2-114 (except At-Taubah 9) */}
      {showBismillah && (
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#122220] border border-emerald-900/10 dark:border-emerald-500/15 shadow-xs text-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <p
            className="font-quran text-2xl sm:text-4xl text-emerald-950 dark:text-emerald-100 leading-relaxed font-bold"
            dir="rtl"
          >
            {BISMILLAH_TEXT}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
            Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang
          </p>
        </div>
      )}
    </div>
  );
}
