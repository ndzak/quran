import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Quran | Baca, Audio Murottal & Terjemahan',
  description:
    'Aplikasi Quran Digital dengan teks rasm Utsmani, transliterasi Latin, terjemahan bahasa Indonesia, dan audio murottal merdu per-ayat.',
  keywords: [
    'Quran',
    'Quran Online',
    'Al-Quran',
    'Mushaf Digital',
    'Terjemahan Al-Quran',
    'Murottal Alafasy',
    'Juz Amma',
    'Al-Kahf',
    'Yasin'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('quran_theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-emerald-200 selection:text-emerald-950 dark:selection:bg-emerald-900 dark:selection:text-emerald-100">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
