const toLowerCase = (str: string): string => str.toLowerCase();
const removeSpaces = (str: string): string => str.replace(/\s/g, "");
const reverse = (str: string): string => str.split("").reverse().join("");

const pipe =
  (...fns: Function[]) =>
  (x: string) =>
    fns.reduce((v, f) => f(v), x);

export const isPalindrome = (str: string): boolean => {
  const normalized = pipe(toLowerCase, removeSpaces)(str);
  return normalized === reverse(normalized);
};
