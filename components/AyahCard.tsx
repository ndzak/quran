'use client';

import React, { useState } from 'react';
import { Play, Pause, Copy, Check, Bookmark, BookmarkCheck, Clock, Share2 } from 'lucide-react';
import { Ayah } from '@/types/quran';
import { isAyahBookmarked, toggleAyahBookmark, saveLastRead } from '@/lib/storage';

interface AyahCardProps {
  ayah: Ayah;
  surahNumber: number;
  surahNameId: string;
  fontSize: number;
  showLatin: boolean;
  showTranslation: boolean;
  isPlaying: boolean;
  onPlayAudio: (ayahNumberInSurah: number) => void;
  onPauseAudio: () => void;
}

export default function AyahCard({
  ayah,
  surahNumber,
  surahNameId,
  fontSize,
  showLatin,
  showTranslation,
  isPlaying,
  onPlayAudio,
  onPauseAudio,
}: AyahCardProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(() =>
    isAyahBookmarked(surahNumber, ayah.numberInSurah)
  );
  const [lastReadMarked, setLastReadMarked] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `Surah ${surahNameId} Ayat ${ayah.numberInSurah}\n\n${ayah.text}\n\n${ayah.transliteration ? `(${ayah.transliteration})\n\n` : ''}Artinya:\n"${ayah.translation}"`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleBookmarkToggle = () => {
    const added = toggleAyahBookmark({
      id: `${surahNumber}:${ayah.numberInSurah}`,
      surahNumber,
      surahNameId,
      ayahNumber: ayah.numberInSurah,
      ayahText: ayah.text,
      translation: ayah.translation || '',
      createdAt: Date.now(),
    });
    setBookmarked(added);
  };

  const handleMarkLastRead = () => {
    saveLastRead({
      surahNumber,
      surahName: surahNameId,
      surahNameId,
      ayahNumber: ayah.numberInSurah,
      timestamp: Date.now(),
    });
    setLastReadMarked(true);
    setTimeout(() => setLastReadMarked(false), 2500);
  };

  return (
    <div
      id={`ayah-${ayah.numberInSurah}`}
      className={`relative p-5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 scroll-mt-28 ${
        isPlaying
          ? 'bg-emerald-50/70 dark:bg-[#0e241f] border-emerald-500 dark:border-emerald-400 shadow-md ring-2 ring-emerald-500/20'
          : 'bg-white dark:bg-[#122220] border-emerald-900/10 dark:border-emerald-500/15 hover:border-emerald-800/30 dark:hover:border-emerald-400/30'
      }`}
    >
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-emerald-900/5 dark:border-emerald-500/10">
        {/* Left: Ayat Number Badge */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl islamic-badge font-bold text-xs text-emerald-900 dark:text-amber-300">
            {ayah.numberInSurah}
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
            Ayat ke-{ayah.numberInSurah}
          </span>
        </div>

        {/* Right: Actions (Play, Copy, Bookmark, Last Read) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Audio Button */}
          {ayah.audio && (
            <button
              onClick={() => (isPlaying ? onPauseAudio() : onPlayAudio(ayah.numberInSurah))}
              className={`p-2 rounded-xl text-xs font-medium transition flex items-center gap-1 ${
                isPlaying
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/60 hover:text-emerald-800 dark:hover:text-emerald-300'
              }`}
              title={isPlaying ? 'Jeda Audio' : 'Putar Murottal Ayat'}
              aria-label="Putar audio ayat"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/60 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
            title="Salin Ayat & Terjemahan"
            aria-label="Salin teks"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmarkToggle}
            className={`p-2 rounded-xl transition ${
              bookmarked
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/60'
            }`}
            title={bookmarked ? 'Hapus dari Bookmark' : 'Simpan ke Bookmark'}
            aria-label="Bookmark ayat"
          >
            {bookmarked ? (
              <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-500" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          {/* Mark as Last Read Button */}
          <button
            onClick={handleMarkLastRead}
            className={`p-2 rounded-xl transition flex items-center gap-1 text-xs font-medium ${
              lastReadMarked
                ? 'bg-emerald-700 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/60'
            }`}
            title="Tandai Terakhir Dibaca"
            aria-label="Tandai terakhir dibaca"
          >
            <Clock className="w-4 h-4" />
            {lastReadMarked && <span className="hidden sm:inline">Ditandai!</span>}
          </button>
        </div>
      </div>

      {/* Arabic Verse Text */}
      <div className="my-5 sm:my-6">
        <p
          className="font-quran text-right text-gray-900 dark:text-emerald-50 leading-[2.5] sm:leading-[2.7] select-text"
          dir="rtl"
          style={{ fontSize: `${fontSize}px` }}
        >
          {ayah.text}
        </p>
      </div>

      {/* Latin Transliteration */}
      {showLatin && ayah.transliteration && (
        <div className="mt-4 pt-3 border-t border-emerald-900/5 dark:border-emerald-500/10">
          <p className="text-xs sm:text-sm text-emerald-800/90 dark:text-emerald-400 font-medium leading-relaxed">
            {ayah.transliteration}
          </p>
        </div>
      )}

      {/* Indonesian Translation */}
      {showTranslation && ayah.translation && (
        <div className="mt-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            <span className="font-semibold text-emerald-800 dark:text-emerald-300 mr-1.5">
              Artinya:
            </span>
            {ayah.translation}
          </p>
        </div>
      )}
    </div>
  );
}
