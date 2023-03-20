import { statsCalculator } from "./index";

describe("stats calculator", () => {
  it("should return an object with the correct stats for a given array of numbers such as [1,2,3,4,5]", () => {
    const result = statsCalculator([1, 2, 3, 4, 5]);
    expect(result.min).toBe(1);
    expect(result.max).toBe(5);
    expect(result.average).toBe(3);
    expect(result.count).toBe(5);
  });
});
