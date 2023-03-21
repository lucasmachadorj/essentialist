import { isMilitaryTime } from ".";

describe("military time validator", () => {
  it("should return true when input is 00:00 - 01:00", () => {
    expect(isMilitaryTime("00:00 - 01:00")).toBe(true);
  });
});
