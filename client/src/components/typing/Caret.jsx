import React, { useState, useEffect } from "react";

const Caret = () => {
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
      className={`absolute top-0 left-0 w-[1ch] h-full bg-yellow ${handleCaretState}`}
    />
  );
};

export default Caret;
