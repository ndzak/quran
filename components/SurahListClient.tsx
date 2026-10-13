'use client';

import React, { useState, useMemo } from 'react';
import { SurahSummary } from '@/types/quran';
import HeroSection from './HeroSection';
import SurahCard from './SurahCard';
import { BookOpen, SearchX } from 'lucide-react';

interface SurahListClientProps {
  initialSurahs: SurahSummary[];
}

export default function SurahListClient({ initialSurahs }: SurahListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'meccan' | 'medinan' | 'juz30'>('all');

  const filteredSurahs = useMemo(() => {
    return initialSurahs.filter((surah) => {
      // Filter tipe wahyu / juz
      if (activeFilter === 'meccan') {
        const isMeccan =
          surah.revelationTypeId === 'Makkiyyah' || surah.revelationType === 'Meccan';
        if (!isMeccan) return false;
      } else if (activeFilter === 'medinan') {
        const isMedinan =
          surah.revelationTypeId === 'Madaniyyah' || surah.revelationType === 'Medinan';
        if (!isMedinan) return false;
      } else if (activeFilter === 'juz30') {
        // Juz Amma adalah surah nomor 78 - 114
        if (surah.number < 78 || surah.number > 114) return false;
      }

      // Filter query pencarian (nomor, nama latin, nama indonesia, arti)
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const numberMatch = surah.number.toString() === q;
      const nameIdMatch = surah.nameId?.toLowerCase().includes(q);
      const englishNameMatch = surah.englishName.toLowerCase().includes(q);
      const transIdMatch = surah.translationId?.toLowerCase().includes(q);
      const engTransMatch = surah.englishNameTranslation.toLowerCase().includes(q);

      return (
        numberMatch ||
        nameIdMatch ||
        englishNameMatch ||
        transIdMatch ||
        engTransMatch
      );
    });
  }, [initialSurahs, searchQuery, activeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Hero with Search and Filter */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        totalSurahs={initialSurahs.length}
      />

      {/* Surah Grid */}
      {filteredSurahs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredSurahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white dark:bg-[#122220] rounded-3xl border border-emerald-900/10 dark:border-emerald-500/15 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
            Surah Tidak Ditemukan
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-5">
            Tidak ada surah yang cocok dengan pencarian &quot;{searchQuery}&quot;. Silakan coba dengan kata kunci lain.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
}
