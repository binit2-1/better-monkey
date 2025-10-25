import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Character from '../components/typing/Character';

const StandardMode = () => {
  const text = "The quick brown fox jumps over the lazy dog.";
  const characters = text.split('');

  const [userInput, setUserInput] = useState('');
  const [isTabActive, setIsTabActive] = useState(false);
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus()
  }
  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
  }
  const resetInput = (e) => {
    if (e.key === 'Escape'){
      e.preventDefault();
      setUserInput('');
    }
    if(e.key === 'Tab'){
      e.preventDefault();
      setIsTabActive(true);
    }

    if(e.key === 'Enter' && isTabActive){
      e.preventDefault();
      setUserInput('');
      setIsTabActive(false);
    }
  }

  useEffect(() =>{
    focusInput()
  }, [])

  return (
    <div
      className='w-screen h-screen flex items-center justify-center bg-base font-roboto-mono font-normal relative'
      onClick={focusInput}
    >
      {characters.map((char, index) => {
        let state = 'pending';
        const typedChar = userInput[index];

        if (index < userInput.length) {
          state = (typedChar === char) ? 'correct' : 'incorrect';
        }

        return (
          <Character
            key={index}
            char={char}
            state={state}
          />
        );
      })}

      <input
        type="text"
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={resetInput}
        className='absolute inset-0 opacity-0 focus:outline-none'
        aria-label="hidden input"
      />
    </div>
  )
}

export default StandardMode;

