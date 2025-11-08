
/**
 * Calculates the Words Per Minute (WPM)
 * @param {string} text - The original text.
 * @param {string} userInput - The final user input.
 * @param {Date} startTime - The timestamp when the test started.
 * @param {Date} endTime - The timestamp when the test ended.
 * @returns {number} - The calculated WPM, rounded to the nearest integer.
 */
export function calculateWpm(text, userInput, startTime, endTime) {
  // 1. Calculate time taken in minutes
  const durationInMs = endTime.getTime() - startTime.getTime();
  const durationInMinutes = (durationInMs / 1000) / 60;

  // 2. Count correct characters
  let correctCharacters = 0;
  const characters = text.split('');
  
  characters.forEach((char, index) => {
    if (userInput[index] === char) {
      correctCharacters++;
    }
  });
  const wpm = (correctCharacters / 5) / durationInMinutes;

  return Math.round(wpm);
}

export function calculateRawWpm(userInput, startTime, endTime) {
  const durationInMs = endTime.getTime() - startTime.getTime();
  if (durationInMs === 0) {
    return 0;
  }
  const durationInMinutes = (durationInMs / 1000) / 60;
  
  // Use total characters typed, not just correct ones
  const totalCharactersTyped = userInput.length;
  
  const rawWpm = (totalCharactersTyped / 5) / durationInMinutes;
  return Math.round(rawWpm);
}

export function calculateAccuracy(originalText, userInput) {
  let correctCharacters = 0;
  const characters = originalText.split('');
  const totalCharactersTyped = userInput.length;

  if (totalCharactersTyped === 0) {
    return 0;
  }
  
  characters.forEach((char, index) => {
    if (index < totalCharactersTyped && userInput[index] === char) {
      correctCharacters++;
    }
  });

  const accuracy = (correctCharacters / totalCharactersTyped) * 100;
  return Math.round(accuracy);
}