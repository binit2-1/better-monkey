import React from 'react'
import StandardMode from './pages/StandardMode'
import ReferenceMode from './pages/ReferenceMode'
import AudioMode from './pages/AudioMode'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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
      </div>
    </Router>
  )
}

export default App