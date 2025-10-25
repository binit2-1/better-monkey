import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Character from '../components/typing/Character';
import { calculateWpm } from '../libs/analytics.js';

const StandardMode = () => {
  const text = "The quick brown fox jumps over the lazy dog.";
  const characters = text.split('');

  const [userInput, setUserInput] = useState('');
  const [isTabActive, setIsTabActive] = useState(false);
  const [isTestActive, setIsTestActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus()
  }
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isTestActive && value.length > 0){
      setIsTestActive(true)
      setStartTime(new Date());
    }

    if(value.length === characters.length){
      const endTime = new Date();
      const calculatedWpm = calculateWpm(text, value, startTime, endTime);
      setWpm(calculatedWpm);
      setIsTestActive(false);
    }

    if(value.length <= characters.length){
       setUserInput(value);
    }
  }
  const resetTest = () => {
    setUserInput('');
    setIsTabActive(false);
    setIsTestActive(false);
    setStartTime(null);
    setWpm(null);
  }
  const handleKeyUp = (e) => {
    if (e.key == 'Tab'){
      setIsTabActive(false);
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Escape'){
      e.preventDefault();
      resetTest();
    }
    if(e.key === 'Tab'){
      e.preventDefault();
      setIsTabActive(true);
    }

    if(e.key === 'Enter' && isTabActive){
      e.preventDefault();
      resetTest();
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
      {wpm !== null && (
        <div className="absolute top-1/4 text-5xl text-yellow">
          WPM: {wpm}
        </div>
      )}

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
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className='absolute inset-0 opacity-0 focus:outline-none'
        aria-label="hidden input"
      />
    </div>
  )
}

export default StandardMode;

