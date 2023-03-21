import { wrap } from ".";

describe("word wrapper", () => {
  it("should return an empty string when input is null", () => {
    expect(wrap(null, 1)).toBe("");
  });

  it("should thrown an error when column is less than 1", () => {
    expect(() => wrap("car", 0)).toThrowError("column must be greater than 0");
  });

  it("should not wrap a short word such as car", () => {
    expect(wrap("car", 5)).toBe("car");
  });

  it("should wrap a word longer than the column", () => {
    expect(wrap("car", 2)).toBe("ca\nr");
    expect(wrap("longerword", 6)).toBe("longer\nword");
  });

  it("should break a word twice when it is twice as long as the column", () => {
    expect(wrap("longerword", 3)).toBe("lon\nger\nwor\nd");
  });

  it("should wrap two words longer than the column", () => {
    expect(wrap("car truck", 5)).toBe("car\ntruck");
    expect(wrap("wrap here", 6)).toBe("wrap\nhere");
  });

  it("should wrap three words longer than the column after first and second word", () => {
    expect(wrap("word word word", 6)).toBe("word\nword\nword");
  });

  it("should wrap three words longer than the column after second word", () => {
    expect(wrap("car truck bus", 11)).toBe("car truck\nbus");
  });

  it("should break when there are two words and the first ends at the column", () => {
    expect(wrap("word word", 4)).toBe("word\nword");
  });
});
