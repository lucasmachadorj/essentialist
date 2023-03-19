export const isPalindrome = (str: string): boolean => {
  const lowerCaseStr = str.toLowerCase();
  const reversed = lowerCaseStr.split("").reverse().join("");
  return lowerCaseStr === reversed;
};
