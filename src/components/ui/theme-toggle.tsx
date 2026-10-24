"use client";

import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const hasDark = document.documentElement.classList.contains("dark");
    setIsDark(hasDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className={`h-8 w-14 rounded-full bg-slate-200/80 dark:bg-slate-800 ${className}`} />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle tema gelap atau terang"
      title={isDark ? "Beralih ke Mode Terang (Light)" : "Beralih ke Mode Futuristik Gelap (Dark)"}
      className={`group relative flex h-8 w-14 items-center rounded-full p-1 transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-sky-400 cursor-pointer ${
        isDark
          ? "bg-slate-900 border border-sky-500/40 shadow-sm shadow-sky-500/20"
          : "bg-slate-200 border border-slate-300/80 shadow-inner"
      } ${className}`}
    >
      {/* Sliding Pill Indicator */}
      <div
        className={`flex h-6 w-6 transform items-center justify-center rounded-full text-xs font-bold transition-transform duration-300 shadow-md ${
          isDark
            ? "translate-x-6 bg-gradient-to-tr from-sky-500 to-blue-600 text-white"
            : "translate-x-0 bg-white text-slate-800"
        }`}
      >
        {isDark ? (
          <svg className="h-3.5 w-3.5 text-sky-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </div>

      <span className="sr-only">Toggle Theme</span>
    </button>
  );
}
