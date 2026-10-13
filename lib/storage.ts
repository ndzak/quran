import { LastReadItem, BookmarkItem } from '@/types/quran';

const LAST_READ_KEY = 'quran_last_read';
const BOOKMARKS_KEY = 'quran_bookmarks';
const FONT_SIZE_KEY = 'quran_arabic_font_size';
const SHOW_LATIN_KEY = 'quran_show_latin';
const SHOW_TRANSLATION_KEY = 'quran_show_translation';

export function getStoredLastRead(): LastReadItem | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LAST_READ_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveLastRead(item: LastReadItem): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LAST_READ_KEY, JSON.stringify(item));
    window.dispatchEvent(new Event('quran_last_read_updated'));
  } catch (err) {
    console.error('Failed to save last read:', err);
  }
}

export function getStoredBookmarks(): BookmarkItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isAyahBookmarked(surahNumber: number, ayahNumber: number): boolean {
  const bookmarks = getStoredBookmarks();
  return bookmarks.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
}

export function toggleAyahBookmark(item: BookmarkItem): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const bookmarks = getStoredBookmarks();
    const existingIndex = bookmarks.findIndex(
      (b) => b.surahNumber === item.surahNumber && b.ayahNumber === item.ayahNumber
    );

    let isAdded = false;
    if (existingIndex >= 0) {
      bookmarks.splice(existingIndex, 1);
      isAdded = false;
    } else {
      bookmarks.unshift(item);
      isAdded = true;
    }

    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    window.dispatchEvent(new Event('quran_bookmarks_updated'));
    return isAdded;
  } catch (err) {
    console.error('Failed to toggle bookmark:', err);
    return false;
  }
}

export function removeAyahBookmark(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const bookmarks = getStoredBookmarks().filter((b) => b.id !== id);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    window.dispatchEvent(new Event('quran_bookmarks_updated'));
  } catch (err) {
    console.error('Failed to remove bookmark:', err);
  }
}

export function getStoredFontSize(): number {
  if (typeof window === 'undefined') return 30;
  try {
    const raw = localStorage.getItem(FONT_SIZE_KEY);
    return raw ? parseInt(raw, 10) : 30;
  } catch {
    return 30;
  }
}

export function saveFontSize(size: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FONT_SIZE_KEY, size.toString());
}

export function getStoredShowLatin(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = localStorage.getItem(SHOW_LATIN_KEY);
    return raw !== null ? raw === 'true' : true;
  } catch {
    return true;
  }
}

export function saveShowLatin(val: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SHOW_LATIN_KEY, val.toString());
}

export function getStoredShowTranslation(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = localStorage.getItem(SHOW_TRANSLATION_KEY);
    return raw !== null ? raw === 'true' : true;
  } catch {
    return true;
  }
}

export function saveShowTranslation(val: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SHOW_TRANSLATION_KEY, val.toString());
}
