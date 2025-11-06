import React from 'react'
import StandardMode from './pages/StandardMode'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-base '>
      <Navbar />
      <StandardMode />
    </div>
  )
}

export default App