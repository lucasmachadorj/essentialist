import { isPalindrome } from "./palindrome";

describe("palindrome checker", () => {
  it("should return true for a palindrome such as 'mom'", () => {
    expect(isPalindrome("mom")).toBe(true);
  });

  it("should return false for a non-palindrome such as 'mother'", () => {
    expect(isPalindrome("mother")).toBe(false);
  });

  it("should return true for a palindrome such as 'racecar'", () => {
    expect(isPalindrome("racecar")).toBe(true);
  });

  it("shoud return true for a case-sensitive palindrome such as 'Racecar'", () => {
    expect(isPalindrome("Racecar")).toBe(true);
  });
});
