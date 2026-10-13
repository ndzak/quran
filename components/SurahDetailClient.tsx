'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SurahDetail } from '@/types/quran';
import SurahHeader from './SurahHeader';
import ReaderSettings from './ReaderSettings';
import AyahCard from './AyahCard';
import SurahNavigation from './SurahNavigation';
import AudioPlayerBar from './AudioPlayerBar';
import {
  getStoredFontSize,
  saveFontSize,
  getStoredShowLatin,
  saveShowLatin,
  getStoredShowTranslation,
  saveShowTranslation,
} from '@/lib/storage';

interface SurahDetailClientProps {
  surah: SurahDetail;
}

export default function SurahDetailClient({ surah }: SurahDetailClientProps) {
  const [fontSize, setFontSizeState] = useState<number>(30);
  const [showLatin, setShowLatinState] = useState<boolean>(true);
  const [showTranslation, setShowTranslationState] = useState<boolean>(true);

  // Audio State
  const [currentAyahNumber, setCurrentAyahNumber] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playAllMode, setPlayAllMode] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setFontSizeState(getStoredFontSize());
    setShowLatinState(getStoredShowLatin());
    setShowTranslationState(getStoredShowTranslation());
  }, []);

  const handleSetFontSize = (size: number) => {
    setFontSizeState(size);
    saveFontSize(size);
  };

  const handleSetShowLatin = (val: boolean) => {
    setShowLatinState(val);
    saveShowLatin(val);
  };

  const handleSetShowTranslation = (val: boolean) => {
    setShowTranslationState(val);
    saveShowTranslation(val);
  };

  // Audio Handlers
  const playAyah = (ayahNumberInSurah: number, continuous: boolean = false) => {
    const ayah = surah.ayahs.find((a) => a.numberInSurah === ayahNumberInSurah);
    if (!ayah || !ayah.audio) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.src = ayah.audio;

    audio.onended = () => {
      if (continuous && ayahNumberInSurah < surah.numberOfAyahs) {
        // Lanjut ke ayat berikutnya secara otomatis
        playAyah(ayahNumberInSurah + 1, true);
        const nextEl = document.getElementById(`ayah-${ayahNumberInSurah + 1}`);
        if (nextEl) {
          nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        setIsPlaying(false);
        setPlayAllMode(false);
      }
    };

    audio.onerror = () => {
      console.error('Audio playback error');
      setIsPlaying(false);
    };

    audio
      .play()
      .then(() => {
        setCurrentAyahNumber(ayahNumberInSurah);
        setIsPlaying(true);
        if (continuous) setPlayAllMode(true);
      })
      .catch((err) => {
        console.error('Audio play failed:', err);
        setIsPlaying(false);
      });
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const resumeAudio = () => {
    if (audioRef.current && currentAyahNumber > 0) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else if (currentAyahNumber > 0) {
      playAyah(currentAyahNumber, playAllMode);
    } else {
      playAyah(1, true);
    }
  };

  const togglePlayAll = () => {
    if (isPlaying) {
      pauseAudio();
      setPlayAllMode(false);
    } else {
      const startAyah = currentAyahNumber > 0 ? currentAyahNumber : 1;
      playAyah(startAyah, true);
    }
  };

  const handlePrevAyah = () => {
    if (currentAyahNumber > 1) {
      playAyah(currentAyahNumber - 1, playAllMode);
      const el = document.getElementById(`ayah-${currentAyahNumber - 1}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNextAyah = () => {
    if (currentAyahNumber < surah.numberOfAyahs) {
      playAyah(currentAyahNumber + 1, playAllMode);
      const el = document.getElementById(`ayah-${currentAyahNumber + 1}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleClosePlayer = () => {
    pauseAudio();
    setCurrentAyahNumber(0);
    setPlayAllMode(false);
  };

  // Cleanup audio when leaving page
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Surah Header Banner */}
      <SurahHeader
        surah={surah}
        isPlayingAll={isPlaying && playAllMode}
        onTogglePlayAll={togglePlayAll}
      />

      {/* Reader Customization Settings Bar */}
      <ReaderSettings
        fontSize={fontSize}
        setFontSize={handleSetFontSize}
        showLatin={showLatin}
        setShowLatin={handleSetShowLatin}
        showTranslation={showTranslation}
        setShowTranslation={handleSetShowTranslation}
        totalAyahs={surah.numberOfAyahs}
      />

      {/* Ayahs List */}
      <div className="space-y-4 sm:space-y-6">
        {surah.ayahs.map((ayah) => (
          <AyahCard
            key={ayah.number}
            ayah={ayah}
            surahNumber={surah.number}
            surahNameId={surah.nameId || surah.englishName}
            fontSize={fontSize}
            showLatin={showLatin}
            showTranslation={showTranslation}
            isPlaying={isPlaying && currentAyahNumber === ayah.numberInSurah}
            onPlayAudio={(num) => playAyah(num, false)}
            onPauseAudio={pauseAudio}
          />
        ))}
      </div>

      {/* Surah Navigation (Prev/Next Surah) */}
      <SurahNavigation currentSurahNumber={surah.number} />

      {/* Floating Audio Player Bar */}
      <AudioPlayerBar
        surahNameId={surah.nameId || surah.englishName}
        totalAyahs={surah.numberOfAyahs}
        currentAyahNumber={currentAyahNumber}
        isPlaying={isPlaying}
        onPlay={resumeAudio}
        onPause={pauseAudio}
        onPrev={handlePrevAyah}
        onNext={handleNextAyah}
        onClose={handleClosePlayer}
      />
    </div>
  );
}
