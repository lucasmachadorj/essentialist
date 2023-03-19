import { isPalindrome } from "./palindrome";

describe("palindrome checker", () => {
  it("should return true for a palindrome such as 'mom'", () => {
    expect(isPalindrome("mom")).toBe(true);
  });
});
