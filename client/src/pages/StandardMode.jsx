import React from 'react'
import { useEffect, useRef, useState } from 'react'

const StandardMode = () => {
  const text = "The quick brown fox jumps over the lazy dog."
  const characters = text.split('');

  const [userInput, setUserInput] = useState('');
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus()
  }
  const handleInputChange = (e) => {  
    const value = e.target.value;
    setUserInput(value);
  }

  useEffect(() =>{
    focusInput()
  }, [])

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-base font-roboto-mono font-normal relative'>
      {characters.map((char, index) => {
        const typedChar = userInput[index];
        let textColor = 'text-overlay0'; 

        if (index < userInput.length){
          textColor = (typedChar === char ) ? 'text-green' : 'text-red';
        }
        return (
          <span className={`z-10 text-5xl text-center ${textColor}`} key={index}>
            {char === ' '? '\u00A0' : char}
          </span>
        )
      })}

      <input
        type="text"
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        className='absolute inset-0 opacity-0 focus:outline-none'
        aria-label="hidden input"
      />
    </div>
  )
}

export default StandardMode