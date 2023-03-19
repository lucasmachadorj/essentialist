import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
  it("should return a string for any number such as 1 or 3", () => {
    expect(typeof fizzbuzz(1)).toBe("string");
    expect(typeof fizzbuzz(3)).toBe("string");
  });

  describe("multiples of 15 condition", () => {
    const inputs = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150];
    it.each(inputs.map((input) => [input, "fizzBuzz"]))(
      "should return fizzBuzz for multiple of three such as %s",
      (input, expected) => {
        expect(fizzbuzz(input)).toBe(expected);
      }
    );
  });
});
