'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Clock, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { getStoredLastRead } from '@/lib/storage';
import { LastReadItem } from '@/types/quran';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilter: 'all' | 'meccan' | 'medinan' | 'juz30';
  setActiveFilter: (f: 'all' | 'meccan' | 'medinan' | 'juz30') => void;
  totalSurahs: number;
}

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  totalSurahs,
}: HeroSectionProps) {
  const [lastRead, setLastRead] = useState<LastReadItem | null>(null);

  useEffect(() => {
    setLastRead(getStoredLastRead());

    const onUpdate = () => setLastRead(getStoredLastRead());
    window.addEventListener('quran_last_read_updated', onUpdate);
    return () => window.removeEventListener('quran_last_read_updated', onUpdate);
  }, []);

  return (
    <div className="relative mb-8 sm:mb-10">
      {/* Hero Banner with Islamic Emerald Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-[#043322] text-white p-6 sm:p-10 shadow-xl shadow-emerald-950/15">
        {/* Subtle decorative circles & arabesque overlay */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-amber-300 text-xs font-semibold mb-4 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Al-Qur&apos;an Al-Karim</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            Quran Online
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base mb-6 leading-relaxed">
            Tilawah Al-Qur&apos;an interaktif dengan rasm Utsmani, transliterasi latin, terjemahan bahasa Indonesia, dan audio murottal merdu per-ayat.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-300">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari surah (misal: Al-Kahf, Yasin, 18, atau 'Gua')..."
              className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-md border border-emerald-400/30 text-white placeholder-emerald-200/60 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white/15 text-sm sm:text-base transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-emerald-200 hover:text-white"
              >
                Hapus
              </button>
            )}
          </div>
        </div>

        {/* Floating Last Read Quick Widget inside banner */}
        {lastRead && (
          <div className="mt-6 pt-5 border-t border-emerald-700/40 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-emerald-200">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>
                Terakhir dibaca:{' '}
                <strong className="text-white font-semibold">
                  {lastRead.surahNameId}
                </strong>{' '}
                (Ayat {lastRead.ayahNumber})
              </span>
            </div>
            <Link
              href={`/surah/${lastRead.surahNumber}#ayah-${lastRead.ayahNumber}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs shadow-sm transition hover:scale-105"
            >
              <span>Lanjutkan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Filter Chips Bar */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeFilter === 'all'
              ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/10'
              : 'bg-white dark:bg-[#122220] text-gray-700 dark:text-gray-300 border border-emerald-900/10 dark:border-emerald-500/15 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
          }`}
        >
          Semua Surah ({totalSurahs})
        </button>

        <button
          onClick={() => setActiveFilter('meccan')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeFilter === 'meccan'
              ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/10'
              : 'bg-white dark:bg-[#122220] text-gray-700 dark:text-gray-300 border border-emerald-900/10 dark:border-emerald-500/15 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
          }`}
        >
          Makkiyyah (86)
        </button>

        <button
          onClick={() => setActiveFilter('medinan')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeFilter === 'medinan'
              ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/10'
              : 'bg-white dark:bg-[#122220] text-gray-700 dark:text-gray-300 border border-emerald-900/10 dark:border-emerald-500/15 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
          }`}
        >
          Madaniyyah (28)
        </button>

        <button
          onClick={() => setActiveFilter('juz30')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeFilter === 'juz30'
              ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/10'
              : 'bg-white dark:bg-[#122220] text-gray-700 dark:text-gray-300 border border-emerald-900/10 dark:border-emerald-500/15 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
          }`}
        >
          Juz &apos;Amma (37 Surah)
        </button>
      </div>
    </div>
  );
}
