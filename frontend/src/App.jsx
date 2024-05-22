import { useState } from 'react'
import './App.css'
import { Sidebar } from './Components/Sidebar/Sidebar'
import { Home } from './Components/Home/Home';

function App() {

  return (
    <div className=" min-h-screen md:flex">
      <div className='w-3/12'>
        <Sidebar/>
      </div>
      <div className={`w-full min-h-screen mx-0 bg-white transition-all duration-300 ease-in-out`}>
          <Home />
      </div>
    </div>
  )
}

export default App
