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
});
