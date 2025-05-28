import { useState } from 'react'
import { ThemeProvider } from './components'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
      <ThemeProvider>
        <div className='w-screen h-screen'>
          <Outlet/>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
