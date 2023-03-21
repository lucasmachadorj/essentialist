const boolToString = (bool: boolean): string => (bool ? "TRUE" : "FALSE");

export const booleanCalculator = (expression: string): boolean => {
  if (expression.includes("(")) {
    const firstOpenIndex = expression.indexOf("(");
    const firstCloseIndex = expression.indexOf(")");
    const [left, right] = [
      expression.substring(0, firstOpenIndex),
      expression.substring(firstCloseIndex + 1),
    ];
    const innerExpression = expression.substring(
      firstOpenIndex + 1,
      firstCloseIndex
    );
    return booleanCalculator(
      left + boolToString(booleanCalculator(innerExpression)) + right
    );
  }

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
