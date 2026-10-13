'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { BookOpen, Moon, Sun, Bookmark, Clock, BookMarked } from 'lucide-react';
import { getStoredBookmarks, getStoredLastRead } from '@/lib/storage';
import { LastReadItem, BookmarkItem } from '@/types/quran';
import BookmarksModal from './BookmarksModal';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [bookmarksCount, setBookmarksCount] = useState(0);
  const [lastRead, setLastRead] = useState<LastReadItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'bookmarks' | 'lastRead'>('bookmarks');

  const updateState = () => {
    const b = getStoredBookmarks();
    setBookmarksCount(b.length);
    const lr = getStoredLastRead();
    setLastRead(lr);
  };

  useEffect(() => {
    updateState();

    window.addEventListener('quran_bookmarks_updated', updateState);
    window.addEventListener('quran_last_read_updated', updateState);

    return () => {
      window.removeEventListener('quran_bookmarks_updated', updateState);
      window.removeEventListener('quran_last_read_updated', updateState);
    };
  }, []);

  const openModal = (tab: 'bookmarks' | 'lastRead') => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#faf8f5]/90 dark:bg-[#0b1313]/90 border-b border-emerald-900/10 dark:border-emerald-500/15 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 dark:from-emerald-600 dark:to-emerald-800 flex items-center justify-center text-amber-300 shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xl text-emerald-950 dark:text-emerald-100 tracking-tight">
                Quran
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Mushaf Digital &amp; Terjemahan
              </p>
            </div>
          </Link>

          {/* Right Navigation Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Last Read Quick Button */}
            {lastRead && (
              <button
                onClick={() => openModal('lastRead')}
                title="Terakhir Dibaca"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/60 transition"
              >
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {lastRead.surahNameId} : {lastRead.ayahNumber}
                </span>
              </button>
            )}

            {/* Bookmarks Modal Trigger */}
            <button
              onClick={() => openModal('bookmarks')}
              title="Daftar Bookmark"
              className="relative p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/50 transition border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/50 transition border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-emerald-800" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Bookmarks & Last Read Modal */}
      <BookmarksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={modalTab}
      />
    </>
  );
}
