export const booleanCalculator = (expression: string): boolean => {
  if (expression.includes("AND")) {
    const firstAndIndex = expression.indexOf(" AND ");
    const [left, right] = [
      expression.substring(0, firstAndIndex),
      expression.substring(firstAndIndex + 5),
    ];
    return booleanCalculator(left) && booleanCalculator(right);
  }

  if (expression.includes("OR")) {
    const firstOrIndex = expression.indexOf(" OR ");
    const [left, right] = [
      expression.substring(0, firstOrIndex),
      expression.substring(firstOrIndex + 4),
    ];
    return booleanCalculator(left) || booleanCalculator(right);
  }

  if (expression.startsWith("NOT")) {
    return !booleanCalculator(expression.substring(4));
  }
  return expression === "TRUE";
};
