const isMultipleOf = (n: number) => (m: number) => m % n === 0;
const isMultipleOf3 = isMultipleOf(3);
const isMultipleOf5 = isMultipleOf(5);
const isMultipleOf15 = isMultipleOf(15);
const toString = (n: number) => n.toString();
const checkInputRange = (n: number) => n > 0 && n <= 100;

const fizzbuzz = (n: number): string => {
  if (!checkInputRange(n)) {
    return "Out of range. Please input a number between 1 and 100.";
  }

  if (isMultipleOf15(n)) {
    return "fizzBuzz";
  }

  if (isMultipleOf3(n)) {
    return "fizz";
  }

  if (isMultipleOf5(n)) {
    return "buzz";
  }

  return toString(n);
};

export { fizzbuzz };
