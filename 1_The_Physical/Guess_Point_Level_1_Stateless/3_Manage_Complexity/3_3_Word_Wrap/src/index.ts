const breakBetween = (
  text: string,
  start: number,
  end: number,
  length: number
) => {
  return text.slice(0, start) + "\n" + wrap(text.slice(end), length);
};

const wordIsShorterThanColumn = (text: string, column: number) =>
  text.length <= column;

export const wrap = (text: string | null, column: number): string => {
  if (column < 1) throw new Error("column must be greater than 0");
  if (text === null) return "";
  if (wordIsShorterThanColumn(text, column)) return text;
  const space = text.slice(0, column + 1).lastIndexOf(" ");
  if (space > -1) return breakBetween(text, space, space + 1, column);
  return breakBetween(text, column, column, column);
};
