import { fizzbuzz } from "./fizzbuzz";

const getTestTable = (inputs: Array<number>, output: string) =>
  inputs.map((input) => [input, output]);

describe("fizzbuzz", () => {
  it("should return a string for any number such as 1 or 3", () => {
    expect(typeof fizzbuzz(1)).toBe("string");
    expect(typeof fizzbuzz(3)).toBe("string");
  });

  describe("multiples of 15 condition", () => {
    const inputs = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150];
    it.each(getTestTable(inputs, "fizzBuzz"))(
      "should return fizzBuzz for multiple of fifteen such as %s",
      (input, expected) => {
        expect(fizzbuzz(input as number)).toBe(expected);
      }
    );
  });

  describe("multiples of 3 condition, but not 5", () => {
    const inputs = [3, 6, 9, 12, 18, 21, 24, 27, 33, 36];
    it.each(getTestTable(inputs, "fizz"))(
      "should return fizz for multiple of three such as %s",
      (input, expected) => {
        expect(fizzbuzz(input as number)).toBe(expected);
      }
    );
  });

  describe("multiples of 5 condition, but not 3", () => {
    const inputs = [5, 10, 20, 25, 35, 40, 50, 55, 65, 70];
    it.each(getTestTable(inputs, "buzz"))(
      "should return buzz for multiple of five such as %s",
      (input, expected) => {
        expect(fizzbuzz(input as number)).toBe(expected);
      }
    );
  });

  describe("not multiples of 3 or 5 condition", () => {
    const inputs = [1, 2, 4, 7, 8, 11, 13, 14, 16, 17];
    it.each(inputs.map((input) => [input, input.toString()]))(
      "should return input as string for not multiple of three or five such as %s returns '%s'",
      (input, expected) => {
        expect(fizzbuzz(input as number)).toBe(expected);
      }
    );
  });
});
