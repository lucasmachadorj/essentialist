import { booleanCalculator } from "./index";

describe("boolean calculator", () => {
  it("should return true when given TRUE", () => {
    expect(booleanCalculator("TRUE")).toBe(true);
  });
  it("should return false when given FALSE", () => {
    expect(booleanCalculator("FALSE")).toBe(false);
  });
});
