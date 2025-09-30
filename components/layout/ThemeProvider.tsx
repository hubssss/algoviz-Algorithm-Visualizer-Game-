'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDark]);

  return <>{children}</>;
}