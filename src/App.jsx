import { useState } from 'react'
import { Login, Register } from './components'

function App() {

  return (
    <>
      <div className='w-screen h-screen bg-slate-700 grid place-content-center'>
          <Login/>
          {/* <Register/> */}
      </div>
    </>
  )
}

export default App
