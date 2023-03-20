export type Stats = {
  min: number;
  max: number;
  average: number;
  count: number;
};

const minBetween = (a: number, b: number): number => (a < b ? a : b);
const maxBetween = (a: number, b: number): number => (a > b ? a : b);
const updateAverage = (
  sum: number,
  currentValue: number,
  _: number,
  numbers: Array<number>
) => (sum * numbers.length + currentValue) / numbers.length;

export const min = (numbers: number[]): number =>
  numbers.reduce(minBetween, numbers[0]);

export const max = (numbers: number[]): number =>
  numbers.reduce(maxBetween, numbers[0]);

export const average = (numbers: number[]): number =>
  numbers.reduce(updateAverage, 0);

export const count = (numbers: number[]): number => numbers.length;

export const statsCalculator = (numbers: number[]): Stats => {
  return {
    min: min(numbers),
    max: max(numbers),
    average: average(numbers),
    count: count(numbers),
  };
};
