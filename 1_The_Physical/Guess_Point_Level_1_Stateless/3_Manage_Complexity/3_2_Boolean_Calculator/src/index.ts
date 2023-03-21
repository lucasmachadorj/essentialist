const boolToString = (bool: boolean): string => (bool ? "TRUE" : "FALSE");

export const booleanCalculator = (expression: string): boolean => {
  if (expression.includes("(")) {
    let innerOpenIndex = expression.indexOf("(");
    const innerCloseIndex = expression.indexOf(")");
    let newInnerOpenIndex = expression.indexOf("(", innerOpenIndex + 1);
    while (newInnerOpenIndex < innerCloseIndex) {
      if (newInnerOpenIndex === -1) break;
      innerOpenIndex = newInnerOpenIndex;
      newInnerOpenIndex = expression.indexOf("(", newInnerOpenIndex + 1);
    }

    const [left, right] = [
      expression.substring(0, innerOpenIndex),
      expression.substring(innerCloseIndex + 1),
    ];
    const innerExpression = expression.substring(
      innerOpenIndex + 1,
      innerCloseIndex
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
