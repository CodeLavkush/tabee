import { useState } from 'react'
import { Login, Register } from './components'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
      <div className='w-screen h-screen bg-slate-700 grid place-content-center'>
          <Outlet/>
      </div>
    </>
  )
}

export default App
