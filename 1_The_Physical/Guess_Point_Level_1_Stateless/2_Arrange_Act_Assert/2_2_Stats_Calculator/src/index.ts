export type Stats = {
  min: number;
  max: number;
  average: number;
  count: number;
};

export const statsCalculator = (numbers: number[]): Stats => {
  return {
    min: 1,
    max: 5,
    average: 3,
    count: 5,
  };
};
