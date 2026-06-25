import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const THEMES = {
  light: {
    id: 'light',
    name: 'Light Sketch',
    emoji: '☀️',
    desc: 'Warm paper & coral ink',
  },
  dark: {
    id: 'dark',
    name: 'Dark Sketch',
    emoji: '🌙',
    desc: 'Midnight paper & glow',
  },
  green: {
    id: 'green',
    name: 'Green Sketch',
    emoji: '🌿',
    desc: 'Sage paper & forest ink',
  },
  blue: {
    id: 'blue',
    name: 'Blue Sketch',
    emoji: '🌊',
    desc: 'Sky paper & ocean ink',
  },
};

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('prompt-theme');
    return saved && THEMES[saved] ? saved : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('prompt-theme', theme);
  }, [theme]);

  const setTheme = useCallback((themeId) => {
    if (THEMES[themeId]) {
      setThemeState(themeId);
    }
  }, []);

  const themeMeta = THEMES[theme] || THEMES.light;

  return (
    <ThemeContext.Provider value={{ theme, themeMeta, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
