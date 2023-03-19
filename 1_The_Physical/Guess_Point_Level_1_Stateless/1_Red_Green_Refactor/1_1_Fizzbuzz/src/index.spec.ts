import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
  it("should return a string for any number such as 1 or 3", () => {
    expect(typeof fizzbuzz(1)).toBe("string");
    expect(typeof fizzbuzz(3)).toBe("string");
  });
});
