import React from 'react'

const MenuTab = ({
    label,
    onClick,
    active
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative px-3 py-1 text-text font-roboto-mono font-medium cursor-pointer focus:outline-none"
    >
      <span className="pointer-events-none">{label}</span>
      <span
        className={
          `absolute left-0 right-0 bottom-1 h-0.5 bg-text transform origin-center transition-transform duration-200 ` +
          (active ? 'scale-x-90' : 'scale-x-0 hover:scale-x-90')
        }
        aria-hidden="true"
      />
    </button>
  )
}

export default MenuTab