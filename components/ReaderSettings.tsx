'use client';

import React, { useState } from 'react';
import { Type, Languages, BookText, Navigation, Minus, Plus, RotateCcw } from 'lucide-react';

interface ReaderSettingsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  showLatin: boolean;
  setShowLatin: (show: boolean) => void;
  showTranslation: boolean;
  setShowTranslation: (show: boolean) => void;
  totalAyahs: number;
}

export default function ReaderSettings({
  fontSize,
  setFontSize,
  showLatin,
  setShowLatin,
  showTranslation,
  setShowTranslation,
  totalAyahs,
}: ReaderSettingsProps) {
  const [jumpAyah, setJumpAyah] = useState('');

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(jumpAyah, 10);
    if (!isNaN(target) && target >= 1 && target <= totalAyahs) {
      const el = document.getElementById(`ayah-${target}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="sticky top-16 z-30 w-full py-3 backdrop-blur-md bg-[#faf8f5]/90 dark:bg-[#0b1313]/90 border-b border-emerald-900/10 dark:border-emerald-500/15 mb-6 transition-colors">
      <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Font Size Adjuster */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#152724] p-1 rounded-xl border border-emerald-900/10 dark:border-emerald-500/15">
          <button
            onClick={() => setFontSize(Math.max(22, fontSize - 2))}
            disabled={fontSize <= 22}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/60 disabled:opacity-40 transition"
            title="Kecilkan Font Arab"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 font-semibold text-emerald-900 dark:text-emerald-300 min-w-10 text-center">
            {fontSize}px
          </span>
          <button
            onClick={() => setFontSize(Math.min(46, fontSize + 2))}
            disabled={fontSize >= 46}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/60 disabled:opacity-40 transition"
            title="Besarkan Font Arab"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          {fontSize !== 30 && (
            <button
              onClick={() => setFontSize(30)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
              title="Reset Ukuran Font"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Latin & Translation Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLatin(!showLatin)}
            className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 border transition ${
              showLatin
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-white dark:bg-[#152724] text-gray-400 border-emerald-900/10 dark:border-emerald-500/15'
            }`}
            title="Tampilkan / Sembunyikan Latin"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>Latin</span>
          </button>

          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 border transition ${
              showTranslation
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-white dark:bg-[#152724] text-gray-400 border-emerald-900/10 dark:border-emerald-500/15'
            }`}
            title="Tampilkan / Sembunyikan Terjemahan"
          >
            <BookText className="w-3.5 h-3.5" />
            <span>Terjemahan</span>
          </button>
        </div>

        {/* Jump to Ayah Form */}
        <form onSubmit={handleJump} className="flex items-center gap-1">
          <div className="relative">
            <input
              type="number"
              min={1}
              max={totalAyahs}
              value={jumpAyah}
              onChange={(e) => setJumpAyah(e.target.value)}
              placeholder={`Ayat 1-${totalAyahs}`}
              className="w-24 sm:w-28 px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#152724] border border-emerald-900/10 dark:border-emerald-500/15 text-xs text-gray-800 dark:text-gray-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            />
          </div>
          <button
            type="submit"
            className="p-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white transition"
            title="Lompat ke Ayat"
          >
            <Navigation className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
