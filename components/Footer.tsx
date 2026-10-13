'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Heart } from 'lucide-react';

export default function Footer() {
  const [year, setYear] = React.useState('2026');

  React.useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="mt-auto border-t border-emerald-900/10 dark:border-emerald-500/15 bg-[#f5f2eb] dark:bg-[#07100f] text-gray-700 dark:text-gray-300 transition-colors">
      {/* Doa Khatam Section */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center border-b border-emerald-900/10 dark:border-emerald-500/15">
        <p className="font-quran text-xl sm:text-2xl text-emerald-900 dark:text-emerald-200 mb-2 leading-relaxed" dir="rtl">
          اللَّهُمَّ ارْحَمْنَا بِالقُرْآنِ ، وَاجْعَلْهُ لَنَا إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً
        </p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic">
          &quot;Ya Allah, rahmatilah kami dengan Al-Qur&apos;an, dan jadikanlah ia bagi kami sebagai imam, cahaya, petunjuk, dan rahmat.&quot;
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-emerald-950 dark:text-emerald-100 text-sm">
                Quran
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Mushaf Digital &amp; Terjemahan Bahasa Indonesia
              </p>
            </div>
          </div>

          {/* Quick links & sources */}
          <div className="text-xs text-center md:text-right text-gray-500 dark:text-gray-400 space-y-1">
            <p>
              Data Al-Qur&apos;an bersumber dari{' '}
              <a
                href="https://alquran.cloud/api"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 dark:text-emerald-400 font-medium hover:underline"
              >
                AlQuran Cloud API
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-end gap-1">
              Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> untuk kemudahan tilawah umat.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-emerald-900/5 dark:border-emerald-500/10 text-center text-xs text-gray-400">
          &copy; {year} Quran. Hak Cipta Terpelihara.
        </div>
      </div>
    </footer>
  );
}
