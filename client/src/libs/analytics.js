
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

  // 3. Apply the formula
  // (Correct Chars / 5) / Time in Minutes
  const wpm = (correctCharacters / 5) / durationInMinutes;

  return Math.round(wpm);
}