import React, { useState, useEffect, useRef } from "react";
import { calculateWpm, calculateAccuracy, calculateRawWpm } from "../libs/analytics.js";
import Character from "../components/typing/Character";
import normalSentences from "../quotes/reference/normal.json";
import biologySentences from "../quotes/reference/biology.json";
import MenuBar from "../components/MenuBar";
import MenuTab from "../components/MenuTab";

const ReferenceMode = () => {
  const inputRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [isTabActive, setIsTabActive] = useState(false);
  const [isTestActive, setIsTestActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [rawWpm, setRawWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [text, setText] = useState("");
  const [characters, setCharacters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMode, setCurrentMode] = useState("normal");

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const fetchText = (currentMode) => {
    let newText = "";
    if (currentMode === "normal") {
      if (normalSentences && normalSentences.data && normalSentences.data.length > 0) {
        newText = normalSentences.data[Math.floor(Math.random() * normalSentences.data.length)].sentence;
      } else {
        newText = "The quick brown fox jumps over the lazy dog.";
      }
    } else if (currentMode === "biology") {
      if (biologySentences && biologySentences.data && biologySentences.data.length > 0) {
        newText = biologySentences.data[Math.floor(Math.random() * biologySentences.data.length)].sentence;
      } else {
        newText = "The mitochondria is the powerhouse of the cell.";
      }
    } else {
      newText = "The quick brown fox jumps over the lazy dog.";
    }
    setText(newText);
    setCharacters(newText.split(''));
  };

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
  };

  useEffect(() => {
    fetchText(currentMode);
    focusInput();
  }, []);

  return (
    <div
      className="w-full h-full flex items-center justify-center font-roboto-mono font-normal "
      onClick={focusInput}
    >
      <div className="absolute left-[50%] transform -translate-x-1/2 top-20 z-40">
        <MenuBar>
          <MenuTab
            label="normal mode"
            onClick={() => handleModeChange("normal")}
            active={currentMode === "normal"}
          />
          <div
            className="absolute w-1 h-full bg-overlay0 mx-2"
            aria-hidden="true"
          />
          <MenuTab
            label="biology mode"
            onClick={() => handleModeChange("biology")}
            active={currentMode === "biology"}
          />
        </MenuBar>
      </div>
      <div className="flex flex-rows text-[2px] gap-60 font-roboto-mono font-normal">
        <div className="absolute text-4xl text-text left-57 top-43"> Reference text </div>
        <div className="w-full max-w-[70vw] whitespace-pre-wrap left-10 leading-25 relative border-4 border-overlay1 rounded-xl p-6">
          
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
                   fontSize="text-lg"
                 />
               );
             })}          
          </div>
          <div className="absolute text-4xl text-text left-296 top-43"> Type here </div>
          <div className="w-full max-w-[70vw] whitespace-pre-wrap left-10 leading-25 relative border-4 border-overlay1 rounded-xl p-6">
          </div>
      </div>
    </div>
  );
};

export default ReferenceMode;
