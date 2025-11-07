import React from 'react'

const MenuTab = ({
    label,
    onClick,
    active
}) => {
  return (
    <div onClick={onClick} className='text-text font-roboto-mono font-medium cursor-pointer '>
        {label}
    </div>
  )
}

export default MenuTab