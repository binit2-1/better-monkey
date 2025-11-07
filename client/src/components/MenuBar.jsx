import React from 'react'

const MenuBar = ({
    children
}) => {
  return (
    <div className='flex justify-around items-center w-150 h-10 rounded-xl bg-mantle flex-cols  text-text font-roboto-mono font-medium'>
        {children}
    </div>
  )
}

export default MenuBar