const boolToString = (bool: boolean): string => (bool ? "TRUE" : "FALSE");

const getCharIndex = (char: string) => (expression: string, index?: number) =>
  expression.indexOf(char, index ?? 0);
const getOpenParenthesis = getCharIndex("(");
const getCloseParenthesis = getCharIndex(")");

const getInnerParenthesisIndexes = (expression: string): [number, number] => {
  let innerOpenIndex = getOpenParenthesis(expression);
  let nextInnerOpenIndex = getOpenParenthesis(expression, innerOpenIndex + 1);
  const innerCloseIndex = getCloseParenthesis(expression);

  while (nextInnerOpenIndex < innerCloseIndex) {
    if (nextInnerOpenIndex === -1) break;
    innerOpenIndex = nextInnerOpenIndex;
    nextInnerOpenIndex = getOpenParenthesis(expression, nextInnerOpenIndex + 1);
  }

  return [innerOpenIndex, innerCloseIndex];
};

const getInnerExpression = (expression: string): [string, string, string] => {
  const [openIndex, closeIndex] = getInnerParenthesisIndexes(expression);

  const [left, right] = [
    expression.substring(0, openIndex),
    expression.substring(closeIndex + 1),
  ];
  const innerExpression = expression.substring(openIndex + 1, closeIndex);

  return [left, innerExpression, right];
};

export const booleanCalculator = (expression: string): boolean => {
  if (expression.includes("(")) {
    const [left, innerExpression, right] = getInnerExpression(expression);
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
