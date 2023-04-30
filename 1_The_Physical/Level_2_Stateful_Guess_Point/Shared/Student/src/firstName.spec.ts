import { FirstName } from "./firstName";

describe("FirstName Value Object", () => {
  it("should be defined when a valid input is given", () => {
    const firstName = FirstName.create("Lucas");
    expect(firstName).toBeDefined();
  });
});
