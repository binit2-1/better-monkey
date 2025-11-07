import React from 'react';

const Character = ({ char, state }) => {
  let classes = 'z-10 text-7xl';

  if (char === ' ') {
    // visual width = ~2 normal spaces using '2ch'
    const spaceBase = 'inline-block w-[4ch] h-13  mx-0.5';
    if (state === 'incorrect') {
      return <span className={`${spaceBase} bg-red`} aria-hidden="true" />;
    }

    return <span className={spaceBase} aria-hidden="true">{' '}</span>;
  }

  if (state === 'correct') classes += ' text-text';
  else if (state === 'incorrect') classes += ' text-red';
  else classes += ' text-overlay0';

  return (
    <span className={classes}>
      {char}
    </span>
  );
};

export default Character;
