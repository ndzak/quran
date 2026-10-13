'use client';

import React from 'react';
import { Play, Pause, SkipBack, SkipForward, X, Volume2, VolumeX } from 'lucide-react';
import { Ayah } from '@/types/quran';

interface AudioPlayerBarProps {
  surahNameId: string;
  totalAyahs: number;
  currentAyahNumber: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export default function AudioPlayerBar({
  surahNameId,
  totalAyahs,
  currentAyahNumber,
  isPlaying,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onClose,
}: AudioPlayerBarProps) {
  if (currentAyahNumber === 0) return null;

  return (
    <aside
      aria-label="Pemutar Audio Murottal"
      className="fixed bottom-4 inset-x-4 max-w-xl mx-auto z-40 bg-emerald-950/95 dark:bg-[#071513]/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-600/30 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300"
    >
      {/* Current Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <p className="text-xs font-medium text-emerald-300 truncate">
            Murottal: Syaikh Mishary Rasyid
          </p>
        </div>
        <p className="font-bold text-sm text-white truncate">
          {surahNameId} : Ayat {currentAyahNumber} dari {totalAyahs}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={onPrev}
          disabled={currentAyahNumber <= 1}
          className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 disabled:opacity-30 transition"
          title="Ayat Sebelumnya"
          aria-label="Ayat sebelumnya"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={isPlaying ? onPause : onPlay}
          className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold transition shadow-sm hover:scale-105"
          title={isPlaying ? 'Jeda' : 'Putar'}
          aria-label={isPlaying ? 'Jeda murottal' : 'Putar murottal'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={onNext}
          disabled={currentAyahNumber >= totalAyahs}
          className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 disabled:opacity-30 transition"
          title="Ayat Selanjutnya"
          aria-label="Ayat selanjutnya"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        <button
          onClick={onClose}
          className="p-2 ml-1 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition"
          title="Tutup Player"
          aria-label="Tutup pemutar audio"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
