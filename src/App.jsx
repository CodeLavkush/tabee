import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/sonner';

function App() {

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
