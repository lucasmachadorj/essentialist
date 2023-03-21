export const booleanCalculator = (expression: string): boolean => {
  if (expression.startsWith("NOT")) {
    return !booleanCalculator(expression.substring(4));
  }
  if (expression.includes("AND")) {
    const [left, right] = expression.split(" AND ");
    return booleanCalculator(left) && booleanCalculator(right);
  }
  return expression === "TRUE";
};
