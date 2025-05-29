import { useState } from 'react'
import { ThemeProvider } from './components'
import { Outlet } from 'react-router'
import { Toaster } from "@/components/ui/sonner"

function App() {

  return (
    <>
      <ThemeProvider>
        <div className='w-screen h-screen'>
          <Toaster />
          <Outlet/>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
