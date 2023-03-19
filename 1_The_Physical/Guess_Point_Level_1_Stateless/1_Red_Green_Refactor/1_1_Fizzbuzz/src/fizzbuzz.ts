function fizzbuzz(n: number): string {
  if (n % 15 === 0) {
    return "fizzBuzz";
  }

  if (n % 3 === 0) {
    return "fizz";
  }

  return "";
}

export { fizzbuzz };
