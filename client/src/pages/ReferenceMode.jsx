import React, { useState, useEffect, useRef } from "react";
import {
  calculateWpm,
  calculateAccuracy,
  calculateRawWpm,
} from "../libs/analytics.js";
import normalSentences from "../quotes/reference/normal.json";
import biologySentences from "../quotes/reference/biology.json";
import MenuBar from "../components/MenuBar";
import MenuTab from "../components/MenuTab";
import Character from "../components/typing/Character";
import Caret from "../components/typing/Caret";

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
  const [isFocused, setIsFocused] = useState(false);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const fetchText = (currentMode) => {
    let newText = "";
    if (currentMode === "normal") {
      if (
        normalSentences &&
        normalSentences.data &&
        normalSentences.data.length > 0
      ) {
        newText =
          normalSentences.data[
            Math.floor(Math.random() * normalSentences.data.length)
          ].sentence;
      } else {
        newText = "The quick brown fox jumps over the lazy dog.";
      }
    } else if (currentMode === "biology") {
      if (
        biologySentences &&
        biologySentences.data &&
        biologySentences.data.length > 0
      ) {
        newText =
          biologySentences.data[
            Math.floor(Math.random() * biologySentences.data.length)
          ].sentence;
      } else {
        newText = "The mitochondria is the powerhouse of the cell.";
      }
    } else {
      newText = "The quick brown fox jumps over the lazy dog.";
    }
    setText(newText);
    setCharacters(newText.split(""));
  };
  const handleKeyUp = (e) => {
    if (e.key == "Tab") {
      setIsTabActive(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      resetTest();
    }
    if (e.key === "Tab") {
      e.preventDefault();
      setIsTabActive(true);
    }

    if (e.key === "Enter" && isTabActive) {
      e.preventDefault();
      resetTest();
    }
  };

  const resetTest = () => {
    setUserInput("");
    setIsTabActive(false);
    setIsTestActive(false);
    setShowModal(false);
    setStartTime(null);
    setWpm(null);
    setRawWpm(null);
    setAccuracy(null);
    fetchText(currentMode);
    focusInput();
  };

  const handleModeChange = (newMode) => {
    if (newMode === currentMode) return;
    setCurrentMode(newMode);
    setUserInput("");
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

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isTestActive && value.length > 0) {
      setIsTestActive(true);
      setStartTime(new Date());
    }

    // guard if characters not loaded yet
    if (characters.length > 0 && value.length === characters.length) {
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

    if (value.length <= characters.length) {
      setUserInput(value);
    }
  };

  useEffect(() => {
    fetchText(currentMode);
    focusInput();
  }, [currentMode]);

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
      <div className="w-full flex justify-center items-start gap-6 px-6">
        {/* LEFT: Reference text (read-only) */}
        <div className="w-full max-w-[45%] min-w-[300px] min-h-64 whitespace-pre-wrap leading-8 relative border-4 border-overlay1 rounded-xl p-6">
          <div className="relative -top-18 text-2xl text-text mb-4">Reference text</div>
          <div className="min-h-64">
            <div className="flex flex-wrap items-center ">
            {characters.map((char, index) => (
              <span key={index} className="relative z-10 text-3xl leading-16  text-text">
                {char}
              </span>
            ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Typing area (captures input) */}
        <div className="w-full max-w-[45%] min-w-[300px] min-h-64 whitespace-pre-wrap leading-8 relative border-4 border-overlay1 rounded-xl p-6">
          <div className="relative -top-18 text-2xl text-text mb-4">Type here</div>

          <div className="min-h-64">
            <div className="flex flex-wrap items-center">
              {userInput.split("").map((ch, i) => (
                <Character
                  key={`typed-${i}`}
                  char={ch}
                  state={characters[i] === ch ? "correct" : "incorrect"}
                  isCursorHere={false}
                  fontSize="text-3xl"
                  spaceClass={"inline-block align-middle w-[1.25ch] mx-1 h-[1em]"}
                />
              ))}

              {/* Caret placed inline after typed characters — always rendered when focused or test active */}
              <span className="relative inline-block align-middle text-3xl h-[1em] w-[1ch]">
                {(isFocused || isTestActive) && <Caret />}
              </span>
            </div>
          </div>

          {/* Invisible input overlays the panel to capture keystrokes */}
          <input
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="absolute inset-0 w-full h-full opacity-0 focus:outline-none cursor-text"
            aria-label="reference typing input"
          />
        </div>
      </div>
    </div>
  );
};

export default ReferenceMode;
