'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, Clock, X, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { getStoredBookmarks, getStoredLastRead, removeAyahBookmark } from '@/lib/storage';
import { BookmarkItem, LastReadItem } from '@/types/quran';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'bookmarks' | 'lastRead';
}

export default function BookmarksModal({ isOpen, onClose, initialTab = 'bookmarks' }: BookmarksModalProps) {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'lastRead'>(initialTab);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [lastRead, setLastRead] = useState<LastReadItem | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (isOpen) {
      setBookmarks(getStoredBookmarks());
      setLastRead(getStoredLastRead());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDeleteBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeAyahBookmark(id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#faf8f5] dark:bg-[#11201d] rounded-2xl shadow-2xl border border-emerald-900/15 dark:border-emerald-500/20 flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-900/10 dark:border-emerald-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Riwayat &amp; Penanda
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 p-2 gap-1 bg-emerald-950/5 dark:bg-black/20 border-b border-emerald-900/10 dark:border-emerald-500/15 text-sm font-medium">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition ${
              activeTab === 'bookmarks'
                ? 'bg-white dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shadow-xs font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Ayat Ditandai ({bookmarks.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('lastRead')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition ${
              activeTab === 'lastRead'
                ? 'bg-white dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shadow-xs font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Terakhir Dibaca</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
          {activeTab === 'bookmarks' && (
            <>
              {bookmarks.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Belum ada ayat ditandai</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto">
                    Klik ikon bookmark pada ayat mana saja saat membaca untuk menyimpannya di sini.
                  </p>
                </div>
              ) : (
                bookmarks.map((b) => (
                  <Link
                    key={b.id}
                    href={`/surah/${b.surahNumber}#ayah-${b.ayahNumber}`}
                    onClick={onClose}
                    className="group block p-3.5 rounded-xl bg-white dark:bg-[#152724] border border-emerald-900/10 dark:border-emerald-500/15 hover:border-emerald-600 dark:hover:border-emerald-400 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {b.surahNameId}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          Ayat {b.ayahNumber}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleDeleteBookmark(b.id, e)}
                        className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                        title="Hapus bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-quran text-right text-lg text-emerald-950 dark:text-emerald-100 line-clamp-1 mb-1" dir="rtl">
                      {b.ayahText}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 italic">
                      &quot;{b.translation}&quot;
                    </p>
                  </Link>
                ))
              )}
            </>
          )}

          {activeTab === 'lastRead' && (
            <>
              {!lastRead ? (
                <div className="text-center py-12 px-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Belum ada riwayat bacaan</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto">
                    Gunakan tombol &quot;Tandai Terakhir Dibaca&quot; di setiap ayat untuk menyimpan progres tilawah Anda.
                  </p>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Terakhir Dibaca</span>
                  </div>
                  <h4 className="text-2xl font-bold tracking-tight mb-1">
                    {lastRead.surahNameId}
                  </h4>
                  <p className="text-emerald-200 text-sm mb-4">
                    Ayat ke-{lastRead.ayahNumber}
                  </p>
                  <p className="text-xs text-emerald-300/80 mb-5">
                    Tersimpan pada:{' '}
                    {new Date(lastRead.timestamp).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <Link
                    href={`/surah/${lastRead.surahNumber}#ayah-${lastRead.ayahNumber}`}
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm shadow transition hover:scale-[1.01]"
                  >
                    <span>Lanjutkan Membaca</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
