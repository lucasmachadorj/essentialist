export const isPalindrome = (str: string): boolean => {
  const lowerCaseStr = str.toLowerCase();
  const noSpacesStr = lowerCaseStr.replace(/\s/g, "");
  const reversed = noSpacesStr.split("").reverse().join("");
  return noSpacesStr === reversed;
};
