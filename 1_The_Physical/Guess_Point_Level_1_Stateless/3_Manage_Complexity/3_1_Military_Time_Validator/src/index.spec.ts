import { isMilitaryTime } from ".";

describe("military time validator", () => {
  it("should return true when input is 00:00 - 01:00", () => {
    expect(isMilitaryTime("00:00 - 01:00")).toBe(true);
  });

  it("should know an empty string is not a valid time", () => {
    expect(isMilitaryTime("")).toBe(false);
  });

  it("should know that '000012:00' is not a valid time", () => {
    expect(isMilitaryTime("000012:00")).toBe(false);
  });

  it("ahould know that '13:001600' is not a valid time", () => {
    expect(isMilitaryTime("13:001600")).toBe(false);
  });

  it("should know that '13:00 - 1600' is not a valid time", () => {
    expect(isMilitaryTime("13:00 - 1600")).toBe(false);
  });

  it("should know that '1300 - 16:00' is not a valid time", () => {
    expect(isMilitaryTime("1300 - 16:00")).toBe(false);
  });

  it("should know that '13:00 - 16:00 - 17:00' is not a valid time", () => {
    expect(isMilitaryTime("13:00 - 16:00 - 17:00")).toBe(false);
  });

  it("should know that hour value out of range [00, 23] is not valid", () => {
    expect(isMilitaryTime("25:00 - 16:00")).toBe(false);
    expect(isMilitaryTime("01:00 - 26:00")).toBe(false);
  });

  it("should know that minute value out of range [00, 59] is not valid", () => {
    expect(isMilitaryTime("01:60 - 16:00")).toBe(false);
    expect(isMilitaryTime("01:00 - 16:61")).toBe(false);
  });
});
