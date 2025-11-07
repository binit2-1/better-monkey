import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Character from '../components/typing/Character';
import { calculateWpm } from '../libs/analytics.js';
import sentences from '../quotes/sentences.json'
import MenuBar from '../components/MenuBar';
import MenuTab from '../components/MenuTab';

const StandardMode = () => {
  
  const [userInput, setUserInput] = useState('');
  const [isTabActive, setIsTabActive] = useState(false);
  const [isTestActive, setIsTestActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [text, setText] = useState('');             
  const [characters, setCharacters] = useState([]); 
  
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus()
  }
  const fetchText = () => {
    const text = sentences.data[Math.floor(Math.random() * sentences.data.length)].sentence;
    setText(text);
    setCharacters(text.split(''));
  }
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isTestActive && value.length > 0){
      setIsTestActive(true)
      setStartTime(new Date());
    }

    // guard if characters not loaded yet
    if (characters.length > 0 && value.length === characters.length){
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
    fetchText()
  }, [])

  return (
    <div
      className='w-full h-full flex items-center justify-center bg-base font-roboto-mono font-normal overflow-auto'
      onClick={focusInput}
    >
      {wpm !== null && (
          <div className="absolute top-1/4 text-5xl text-yellow">
            WPM: {wpm}
          </div>
      )}
      <div className='absolute left-[50%] transform -translate-x-1/2 top-20 z-40'>
          <MenuBar>
            <MenuTab label="sentences mode" onClick={() => {}} active={isTabActive} />
              <div className='absolute w-1 h-full bg-overlay0 mx-2' aria-hidden="true" />
            <MenuTab label="random mode" onClick={() => {}} active={isTabActive} />
          </MenuBar>
      </div>
      <div className="w-full max-w-[85vw] whitespace-pre-wrap  leading-25 relative">
        

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
      </div>

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

