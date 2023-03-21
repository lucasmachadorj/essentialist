import { booleanCalculator } from "./index";

describe("boolean calculator", () => {
  it("should return true when given TRUE", () => {
    expect(booleanCalculator("TRUE")).toBe(true);
  });
  it("should return false when given FALSE", () => {
    expect(booleanCalculator("FALSE")).toBe(false);
  });

  it("should return invert logical value when given NOT in front of expression", () => {
    expect(booleanCalculator("NOT FALSE")).toBe(true);
    expect(booleanCalculator("NOT TRUE")).toBe(false);
    expect(booleanCalculator("NOT NOT TRUE")).toBe(true);
    expect(booleanCalculator("NOT NOT FALSE")).toBe(false);
    expect(booleanCalculator("NOT NOT NOT TRUE")).toBe(false);
    expect(booleanCalculator("NOT NOT NOT FALSE")).toBe(true);
  });

  it("should return true when given TRUE AND TRUE", () => {
    expect(booleanCalculator("TRUE AND TRUE")).toBe(true);
  });

  it("should evaluate AND expressions correctly", () => {
    expect(booleanCalculator("TRUE AND FALSE")).toBe(false);
    expect(booleanCalculator("FALSE AND TRUE")).toBe(false);
    expect(booleanCalculator("FALSE AND FALSE")).toBe(false);
  });

  it("should evaluate AND expressions with NOT correctly", () => {
    expect(booleanCalculator("NOT TRUE AND TRUE")).toBe(false);
    expect(booleanCalculator("NOT TRUE AND FALSE")).toBe(false);
    expect(booleanCalculator("NOT FALSE AND TRUE")).toBe(true);
    expect(booleanCalculator("NOT FALSE AND FALSE")).toBe(false);
    expect(booleanCalculator("FALSE AND NOT FALSE")).toBe(false);
    expect(booleanCalculator("TRUE AND NOT FALSE")).toBe(true);
    expect(booleanCalculator("TRUE AND NOT TRUE")).toBe(false);
    expect(booleanCalculator("FALSE AND NOT TRUE")).toBe(false);
    expect(booleanCalculator("NOT TRUE AND NOT TRUE")).toBe(false);
    expect(booleanCalculator("NOT TRUE AND NOT FALSE")).toBe(false);
    expect(booleanCalculator("NOT FALSE AND NOT TRUE")).toBe(false);
    expect(booleanCalculator("NOT FALSE AND NOT FALSE")).toBe(true);
  });

  it("should evaluate AND expressions with NOT and AND correctly", () => {
    expect(booleanCalculator("NOT TRUE AND TRUE AND TRUE")).toBe(false);
    expect(booleanCalculator("NOT TRUE AND TRUE AND FALSE")).toBe(false);
    expect(booleanCalculator("NOT FALSE AND TRUE AND FALSE")).toBe(false);
    expect(booleanCalculator("NOT FALSE AND FALSE AND TRUE")).toBe(false);
    expect(booleanCalculator("NOT FALSE AND FALSE AND FALSE")).toBe(false);
    expect(booleanCalculator("FALSE AND NOT FALSE AND TRUE")).toBe(false);
    expect(booleanCalculator("TRUE AND NOT FALSE AND TRUE")).toBe(true);
    expect(booleanCalculator("TRUE AND NOT TRUE AND TRUE")).toBe(false);
    expect(booleanCalculator("FALSE AND NOT TRUE AND TRUE")).toBe(false);
    expect(booleanCalculator("NOT FALSE AND NOT FALSE AND NOT FALSE")).toBe(
      true
    );
    expect(booleanCalculator("NOT TRUE AND NOT FALSE AND TRUE")).toBe(false);
    expect(booleanCalculator("NOT FALSE AND NOT TRUE AND TRUE")).toBe(false);
    expect(booleanCalculator("NOT FALSE AND NOT FALSE AND TRUE")).toBe(true);
  });

  it("should evaluate OR expressions correctly", () => {
    expect(booleanCalculator("TRUE OR TRUE")).toBe(true);
    expect(booleanCalculator("TRUE OR FALSE")).toBe(true);
    expect(booleanCalculator("FALSE OR TRUE")).toBe(true);
    expect(booleanCalculator("FALSE OR FALSE")).toBe(false);
  });

  it("should evaluate OR expressions with NOT correctly", () => {
    expect(booleanCalculator("NOT TRUE OR TRUE")).toBe(true);
    expect(booleanCalculator("NOT TRUE OR FALSE")).toBe(false);
    expect(booleanCalculator("NOT FALSE OR TRUE")).toBe(true);
    expect(booleanCalculator("NOT FALSE OR FALSE")).toBe(true);
    expect(booleanCalculator("FALSE OR NOT FALSE")).toBe(true);
    expect(booleanCalculator("TRUE OR NOT FALSE")).toBe(true);
    expect(booleanCalculator("TRUE OR NOT TRUE")).toBe(true);
    expect(booleanCalculator("FALSE OR NOT TRUE")).toBe(false);
    expect(booleanCalculator("NOT TRUE OR NOT TRUE")).toBe(false);
    expect(booleanCalculator("NOT TRUE OR NOT FALSE")).toBe(true);
    expect(booleanCalculator("NOT FALSE OR NOT TRUE")).toBe(true);
    expect(booleanCalculator("NOT FALSE OR NOT FALSE")).toBe(true);
  });

  it("should evaluate expressions with NOT and OR correctly", () => {
    expect(booleanCalculator("NOT TRUE OR TRUE OR TRUE")).toBe(true);
    expect(booleanCalculator("NOT TRUE OR TRUE OR FALSE")).toBe(true);
    expect(booleanCalculator("NOT FALSE OR TRUE OR FALSE")).toBe(true);
    expect(booleanCalculator("NOT FALSE OR FALSE OR TRUE")).toBe(true);
    expect(booleanCalculator("NOT FALSE OR FALSE OR FALSE")).toBe(true);
    expect(booleanCalculator("FALSE OR NOT FALSE OR TRUE")).toBe(true);
    expect(booleanCalculator("TRUE OR NOT FALSE OR TRUE")).toBe(true);
    expect(booleanCalculator("TRUE OR NOT TRUE OR TRUE")).toBe(true);
    expect(booleanCalculator("FALSE OR NOT TRUE OR TRUE")).toBe(true);
    expect(booleanCalculator("NOT FALSE OR NOT FALSE OR NOT FALSE")).toBe(true);
    expect(booleanCalculator("FALSE OR FALSE OR NOT TRUE")).toBe(false);
    expect(booleanCalculator("NOT FALSE OR NOT TRUE OR TRUE")).toBe(true);
    expect(booleanCalculator("NOT FALSE OR NOT FALSE OR TRUE")).toBe(true);
  });

  it("should evaluate expressions with NOT, AND and OR correctly", () => {
    expect(booleanCalculator("NOT TRUE OR TRUE AND TRUE")).toBe(true);
    expect(booleanCalculator("NOT TRUE OR TRUE AND FALSE")).toBe(false);
    expect(booleanCalculator("NOT FALSE OR TRUE AND FALSE")).toBe(false);
    expect(booleanCalculator("NOT FALSE OR FALSE AND TRUE")).toBe(true);
    expect(booleanCalculator("NOT FALSE OR FALSE AND FALSE")).toBe(false);
    expect(booleanCalculator("FALSE OR NOT FALSE AND TRUE")).toBe(true);
    expect(booleanCalculator("TRUE OR NOT FALSE AND TRUE")).toBe(true);
    expect(booleanCalculator("TRUE OR NOT TRUE AND TRUE")).toBe(true);
    expect(booleanCalculator("FALSE OR NOT TRUE AND TRUE")).toBe(false);
    expect(booleanCalculator("NOT FALSE OR NOT FALSE AND NOT FALSE")).toBe(
      true
    );
    expect(booleanCalculator("NOT TRUE OR NOT FALSE AND TRUE")).toBe(true);
    expect(booleanCalculator("NOT FALSE OR NOT TRUE AND TRUE")).toBe(true);
    expect(booleanCalculator("NOT FALSE OR NOT FALSE AND TRUE")).toBe(true);
  });

  it("should evaluate expressions with NOT, AND, OR and parenthesis correctly", () => {
    expect(booleanCalculator("(NOT TRUE OR TRUE) AND TRUE")).toBe(true);
    expect(booleanCalculator("(NOT TRUE OR TRUE) AND FALSE")).toBe(false);
    expect(booleanCalculator("(NOT FALSE OR TRUE) AND FALSE")).toBe(false);
    expect(booleanCalculator("(NOT FALSE OR FALSE) AND TRUE")).toBe(true);
  });

  it("should evaluate expressions with more than one pair of parenthesis correctly", () => {
    expect(booleanCalculator("(NOT TRUE OR TRUE) AND (TRUE OR FALSE)")).toBe(
      true
    );
    expect(booleanCalculator("(NOT TRUE OR FALSE) AND (TRUE AND FALSE)")).toBe(
      false
    );
  });
});
