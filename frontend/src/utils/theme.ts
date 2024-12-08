import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

export interface ThemeHook {
  currentTheme: Theme;
  updateTheme: (theme: Theme) => void;
}

export function useTheme(): ThemeHook {
  // State to store the configured theme
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');

  // Query of the browser preferred theme
  const browserDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
  // Stored theme
  const storedTheme: Theme | null = localStorage.getItem('theme') as Theme;

  // Listener in case no theme is stored
  const browserThemeListener = (e: MediaQueryListEvent) => {
    if (e.matches) setCurrentTheme('dark');
    else setCurrentTheme('light');
  };

  // Function to update the stored theme
  const updateTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme); // Update the store
    browserDarkTheme.removeEventListener('change', browserThemeListener); // Remove the event listener
  };

  useEffect(() => {
    // Initial run, check if theme is stored
    if (storedTheme) setCurrentTheme(storedTheme);
    else {
      // In case it is not, set the browser preferred theme and listen for changes
      if (browserDarkTheme.matches) setCurrentTheme('dark');
      else setCurrentTheme('light');
      browserDarkTheme.addEventListener('change', browserThemeListener);
    }
  }, []);

  return {
    currentTheme,
    updateTheme,
  };
}
