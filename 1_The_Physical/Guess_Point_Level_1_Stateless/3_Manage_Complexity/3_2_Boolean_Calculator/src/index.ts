export const booleanCalculator = (expression: string): boolean => {
  if (expression.startsWith("NOT")) {
    return !booleanCalculator(expression.substring(4));
  }
  return expression === "TRUE";
};
