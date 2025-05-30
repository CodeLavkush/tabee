import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/sonner';

function App() {
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

  return (
    <>
      <div className="w-screen h-screen">
        <Toaster />
        <Outlet />
      </div>
    </>
  );
}

export default App;
