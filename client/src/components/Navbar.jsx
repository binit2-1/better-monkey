import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='bg-crust h-full w-20 font-roboto-mono font-medium text-text text-4xl relative z-50'>
      <div className='grid grid-rows-[repeat(3,1fr)] h-full'>
        <Link to='/' className='w-full h-full group cursor-pointer relative overflow-hidden'>
          <div className="absolute inset-0 bg-surface0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-right z-0" />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <span className='pointer-events-none absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap'>
              STANDARD
            </span>
          </div>
        </Link>

        <Link to='/reference' className='w-full h-full group cursor-pointer relative overflow-hidden'>
          <div className="absolute inset-0 bg-surface0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-right z-0" />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <span className='pointer-events-none absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap'>
              REFERENCE
            </span>
          </div>
        </Link>

        <Link to='/audio' className='w-full h-full group cursor-pointer relative overflow-hidden'>
          <div className="absolute inset-0 bg-surface0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-right z-0" />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <span className='pointer-events-none absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap'>
              AUDIO
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar