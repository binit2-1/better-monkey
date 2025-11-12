import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Character from '../components/typing/Character';
import { calculateWpm, calculateAccuracy, calculateRawWpm } from '../libs/analytics.js';
import sentences from '../quotes/standard/sentences.json';
import wordsList from '../quotes/standard/words.json';
import MenuBar from '../components/MenuBar';
import MenuTab from '../components/MenuTab';

const StandardMode = () => {
  
  const [userInput, setUserInput] = useState('');
  const [isTabActive, setIsTabActive] = useState(false);
  const [isTestActive, setIsTestActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [rawWpm, setRawWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [text, setText] = useState('');
  const [characters, setCharacters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMode, setCurrentMode] = useState('sentences'); 
  
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const fetchText = (currentMode) => {
    let newText = "";
    if(currentMode === 'sentences'){
      if(sentences && sentences.data && sentences.data.length > 0){
        newText = sentences.data[Math.floor(Math.random() * sentences.data.length)].sentence;
      } else {
        newText = "The quick brown fox jumps over the lazy dog.";
      }
    } else if (currentMode === 'random') {
      if(wordsList && wordsList.data && wordsList.data.length > 0){
        const words = wordsList.data;
        let randomWords = [];
        for(let i = 0; i < 13; i++){
          const randomIndex = Math.floor(Math.random() * words.length);
          randomWords.push(words[randomIndex]);
        }
        newText = randomWords.join(' ');
      } else {
        newText = "The quick brown fox jumps over the lazy dog.";
      }
    } else {
      newText = "The quick brown fox jumps over the lazy dog.";
    }
    setText(newText);
    setCharacters(newText.split(''));
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
      const calculatedRawWpm = calculateRawWpm(value, startTime, endTime);
      const calculatedAccuracy = calculateAccuracy(text, value);
      setAccuracy(calculatedAccuracy);
      setRawWpm(calculatedRawWpm);
      setWpm(calculatedWpm);
      setIsTestActive(false);
      setShowModal(true);
    }

    if(value.length <= characters.length){
       setUserInput(value);
    }
  }
  const resetTest = () => {
    setUserInput('');
    setIsTabActive(false);
    setIsTestActive(false);
    setShowModal(false);
    setStartTime(null);
    setWpm(null);
    setRawWpm(null);
    setAccuracy(null);
    fetchText(currentMode);
    focusInput();
  }

  const handleModeChange = (newMode) => {
    if (newMode === currentMode) return;

    setCurrentMode(newMode);
    setUserInput('');
    setIsTabActive(false);
    setIsTestActive(false);
    setShowModal(false);
    setStartTime(null);
    setWpm(null);
    setRawWpm(null);
    setAccuracy(null);
    fetchText(newMode);
    focusInput();
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
    fetchText(currentMode)
  }, [])

  return (
    <div
      className='w-full h-full flex items-center justify-center  font-roboto-mono font-normal '
      onClick={focusInput}
    >
      {wpm !== null && rawWpm !== null && accuracy !== null && showModal && (
          <div className="absolute top-1/4 text-5xl text-yellow ">
            WPM: {wpm} | Raw WPM: {rawWpm} | Accuracy: {accuracy}%
          </div>
      )}
      {!showModal && (
        <>
          <div className='absolute left-[50%] transform -translate-x-1/2 top-20 z-40'>
            <MenuBar>
              <MenuTab label="sentences mode" onClick={() => handleModeChange('sentences')} active={currentMode === 'sentences'} />
                <div className='absolute w-1 h-full bg-overlay0 mx-2' aria-hidden="true" />
              <MenuTab label="random mode" onClick={() => handleModeChange('random')} active={currentMode === 'random'} />
            </MenuBar>
          </div>
          <div className="w-full max-w-[85vw] whitespace-pre-wrap left-10 leading-25 relative">
            
          
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
                   isCursorHere={index === userInput.length}
                 />
               );
             })}          
          </div>
          
        </>
      )}
      

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

