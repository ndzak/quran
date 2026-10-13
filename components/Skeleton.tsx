import React from 'react';

export function SurahListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-2xl bg-white dark:bg-[#122220] border border-emerald-900/10 dark:border-emerald-500/15 shadow-xs animate-pulse space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gray-200 dark:bg-emerald-950/60" />
              <div className="space-y-1.5">
                <div className="w-24 h-4 bg-gray-200 dark:bg-emerald-950/60 rounded-md" />
                <div className="w-16 h-3 bg-gray-100 dark:bg-emerald-950/40 rounded-md" />
              </div>
            </div>
            <div className="w-20 h-6 bg-gray-200 dark:bg-emerald-950/60 rounded-md" />
          </div>
          <div className="pt-3 border-t border-gray-100 dark:border-emerald-950/40 flex justify-between">
            <div className="w-14 h-3 bg-gray-100 dark:bg-emerald-950/40 rounded-md" />
            <div className="w-10 h-3 bg-gray-100 dark:bg-emerald-950/40 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SurahDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      <div className="w-32 h-4 bg-gray-200 dark:bg-emerald-950/60 rounded-md" />
      <div className="h-56 rounded-3xl bg-gray-200 dark:bg-emerald-950/60" />
      <div className="h-14 rounded-2xl bg-gray-200 dark:bg-emerald-950/60" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white dark:bg-[#122220] border border-emerald-900/10 dark:border-emerald-500/15 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-emerald-950/60" />
              <div className="w-24 h-6 bg-gray-200 dark:bg-emerald-950/60 rounded-md" />
            </div>
            <div className="h-8 bg-gray-200 dark:bg-emerald-950/60 rounded-md ml-auto w-3/4" />
            <div className="h-4 bg-gray-100 dark:bg-emerald-950/40 rounded-md w-full" />
            <div className="h-4 bg-gray-100 dark:bg-emerald-950/40 rounded-md w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
