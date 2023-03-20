import { Stats, average, max, min, count, statsCalculator } from "./index";

type Input = number[];
type ExpectedOutput = number;

const methods: Record<string, Function> = {
  min,
  max,
  average,
  count,
};

describe("stats calculator", () => {
  it("should return an object with the correct stats for a given array of numbers such as [1,2,3,4,5]", () => {
    const result: Stats = statsCalculator([1, 2, 3, 4, 5]);
    expect(result.min).toBe(1);
    expect(result.max).toBe(5);
    expect(result.average).toBe(3);
    expect(result.count).toBe(5);
  });

  const testCases: [Input, keyof typeof methods, ExpectedOutput][] = [
    [[1, 2, 3, 4, 5], "min", 1],
    [[1, 2, 3, 4, 5], "max", 5],
    [[1, 2, 3, 4, 5], "average", 3],
    [[1, 2, 3, 4, 5], "count", 5],
    [[-5, -4, -4, 0, 1, 3, 4, 4, 6, 10], "min", -5],
    [[-5, -4, -4, 0, 1, 3, 4, 4, 6, 10], "max", 10],
    [[-5, -4, -4, 0, 1, 3, 4, 4, 6, 10], "average", 1.5],
    [[-5, -4, -4, 0, 1, 3, 4, 4, 6, 10], "count", 10],
    [[-10, -100, -50, 0, 0, 0, 10, 100, 50], "min", -100],
    [[-10, -100, -50, 0, 0, 0, 10, 100, 50], "max", 100],
    [[-10, -100, -50, 0, 0, 0, 10, 100, 50], "average", 0],
    [[-10, -100, -50, 0, 0, 0, 10, 100, 50], "count", 9],
  ];

  describe.each(testCases)(
    "Given the input %s, when the method %s is invoked",
    (input, statsMethod, expectedOutput) => {
      it(`Then it should return ${expectedOutput}`, () => {
        expect(methods[statsMethod](input)).toEqual(expectedOutput);
      });
    }
  );

  it("should return min, max, average and count as 0 for an empty array", () => {
    const result: Stats = statsCalculator([]);
    expect(result.min).toBe(0);
    expect(result.max).toBe(0);
    expect(result.average).toBe(0);
    expect(result.count).toBe(0);
  });
});
