export const fillInANumberWithACharacter = (
  number: number,
  lengthCharacters = 4,
  fill = '0',
): string => {
  return number.toString().padStart(lengthCharacters, fill);
};
