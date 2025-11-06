import React from 'react';

const Character = ({ char, state }) => {
  let classes = 'z-10 text-7xl';

  if (char === '  ') {
    if (state === 'incorrect') {
      return <span className="inline-block w-6 h-8 bg-red align-middle mx-0.5" aria-hidden="true" />;
    }
  
    return <span className="inline-block w-3 align-middle mx-0.5" aria-hidden="true">{' '}</span>;
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
