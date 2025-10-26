import React from 'react';

const Character = ({ char, state }) => {
  let textColor = 'text-overlay0';
  const displayChar = (char === ' ') ? '\u00A0' : char;

  if (state === 'correct') {
    textColor = 'text-text';
  } else if (state === 'incorrect') {
    if (char === ' ') {
      return <span className="z-10 text-5xl bg-red">&nbsp;</span>;
    }
    textColor = 'text-red';
  }

  return (
    <span className={`z-10 text-7xl text-center ${textColor}`}>
      {displayChar}
    </span>
  );
};

export default Character;
