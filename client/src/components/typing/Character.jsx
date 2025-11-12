import React, {useEffect, useState} from "react";
import Caret from "./Caret";

const CaretForSpace = () => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    let timeoutId = null;

    const isTyping = (e) => {
      return (
        e.key.length === 1 ||
        e.key === " " ||
        e.code === "Space" ||
        e.key === "Backspace" ||
        e.key === "Delete"
      );
    };

    const onKeyDown = (e) => {
      if (isTyping(e)) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        setBlink(false);
      }
    };

    const onKeyUp = (e) => {
      if (isTyping(e)) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setBlink(true);
          timeoutId = null;
        }, 2000);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleCaretState = blink ? "animate-blink opacity-100" : "opacity-0";

  return (
    <div
      className={`absolute bottom-[-15px] right-1 w-[4ch] h-24 bg-yellow ${handleCaretState}`}
    />
  );
};

const Character = ({ char, state, isCursorHere, fontSize = "text-7xl" }) => {
  let classes = `z-10 ${fontSize}`;

  if (char === " ") {
    const spaceBase = "inline-block relative rounded-[50%] w-8 h-8 mx-3";
    if (state === "incorrect") {
      return (
        <>
          <span className={`${spaceBase} bg-red `} aria-hidden="true">
            
          </span>
        </>
      );
    }

    return (
      <>
        <span className={spaceBase} aria-hidden="true">    
          {'\u00A0'}
        </span>
        <span className="relative">
          {isCursorHere && <CaretForSpace />}
        </span>
      </>
      );
  }

  if (state === "correct") classes += " text-text";
  else if (state === "incorrect") classes += " text-red";
  else classes += " text-overlay0";

  return (
    <>
      <span className="text-7xl relative z-10">
        {isCursorHere && <Caret />}
      </span>
      <span className={`relative ${classes} z-20`}>{char}</span>
    </>
  );
};

export default Character;
