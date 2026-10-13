'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronUp } from 'lucide-react';
import { getSurahMeta } from '@/lib/surahData';

interface SurahNavigationProps {
  currentSurahNumber: number;
}

export default function SurahNavigation({ currentSurahNumber }: SurahNavigationProps) {
  const prevMeta = currentSurahNumber > 1 ? getSurahMeta(currentSurahNumber - 1) : null;
  const nextMeta = currentSurahNumber < 114 ? getSurahMeta(currentSurahNumber + 1) : null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mt-12 pt-8 border-t border-emerald-900/10 dark:border-emerald-500/15">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous Surah */}
        {prevMeta ? (
          <Link
            href={`/surah/${prevMeta.number}`}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#122220] border border-emerald-900/10 dark:border-emerald-500/15 hover:border-emerald-600 dark:hover:border-emerald-400 w-full sm:w-auto shadow-xs transition hover:-translate-x-1"
          >
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Surah Sebelumnya</p>
              <p className="font-bold text-sm text-gray-900 dark:text-white">{prevMeta.nameId}</p>
            </div>
          </Link>
        ) : (
          <div className="w-full sm:w-auto" />
        )}

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-2xl bg-white dark:bg-[#122220] border border-emerald-900/10 dark:border-emerald-500/15 text-gray-600 dark:text-gray-300 hover:text-emerald-800 dark:hover:text-emerald-300 hover:border-emerald-600 dark:hover:border-emerald-400 transition shadow-xs flex items-center gap-2 text-xs font-semibold"
          title="Kembali ke Atas"
        >
          <ChevronUp className="w-4 h-4" />
          <span>Ke Atas</span>
        </button>

        {/* Next Surah */}
        {nextMeta ? (
          <Link
            href={`/surah/${nextMeta.number}`}
            className="flex items-center justify-end gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#122220] border border-emerald-900/10 dark:border-emerald-500/15 hover:border-emerald-600 dark:hover:border-emerald-400 w-full sm:w-auto shadow-xs transition hover:translate-x-1"
          >
            <div className="text-right">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Surah Selanjutnya</p>
              <p className="font-bold text-sm text-gray-900 dark:text-white">{nextMeta.nameId}</p>
            </div>
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ) : (
          <div className="w-full sm:w-auto" />
        )}
      </div>
    </div>
  );
}
