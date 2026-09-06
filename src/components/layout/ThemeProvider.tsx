'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      defaultTheme="light"
      enableSystem={false}
      attribute="class"
      value={{ dark: 'dark', light: 'light' }}
    >
      {children}
    </NextThemesProvider>
  );
}
