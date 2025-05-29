import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDispatch } from 'react-redux';
import { setTheme as setThemeSlice } from '../store/themeSlice';

export default function ModeToggle() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('vite-ui-theme') || 'system';
    }
    return 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const handleLightTheme = () => {
    setTheme('light');
    localStorage.setItem('vite-ui-theme', theme);
    dispatch(setThemeSlice(theme));
  };
  const handleDarkTheme = () => {
    setTheme('dark');
    localStorage.setItem('vite-ui-theme', theme);
    dispatch(setThemeSlice(theme));
  };
  const handleSystemTheme = () => {
    setTheme('system');
    localStorage.setItem('vite-ui-theme', theme);
    dispatch(setThemeSlice(theme));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLightTheme}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDarkTheme}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={handleSystemTheme}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
