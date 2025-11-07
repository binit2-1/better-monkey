import React from 'react'
import StandardMode from './pages/StandardMode'
import ReferenceMode from './pages/ReferenceMode'
import AudioMode from './pages/AudioMode'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar'


const App = () => {
  return (
    <Router>
      <div className='w-screen h-screen flex justify-center items-center bg-base '>
        <Navbar />
        <Routes>
          <Route path="/" element={<StandardMode />} />
          <Route path="/reference" element={<ReferenceMode />} />
          <Route path="/audio" element={<AudioMode />} />
        </Routes>
        <div className='absolute left-1/2 transform -translate-x-1/2 top-200 z-20 cursor-pointer'>
          <div className='w-[320px] h-4 flex flex-rows justify-center gap-2 '>
            <div className='h-6 w-auto flex justify-center items-center px-3 text-sm rounded-sm bg-mantle font-roboto-mono text-text' >tab</div>
              <span className='flex justify-center items-center font-roboto-mono text-text' > + </span>
            <div className='h-6 w-auto flex justify-center items-center px-3 text-sm rounded-sm bg-mantle font-roboto-mono text-text' >enter</div>
            <div className='font-roboto-mono text-text'>- restart test</div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App