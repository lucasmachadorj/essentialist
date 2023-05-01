import { FirstName } from "./firstName";

describe("FirstName Value Object", () => {
  it("should be defined when a valid input is given", () => {
    const firstName = FirstName.create("Lucas");
    expect(firstName).toBeDefined();
  });

  it.each([["L"], ["M"], ["N"]])(
    "returns an error with type InvalidFirstName and message 'firstName must be at least 2 characters",
    (firstName) => {
      const { error } = FirstName.create(firstName);

      expect(error.type).toEqual("InvalidFirstName");
      expect(error.message).toEqual("firstName must be at least 2 characters");
    }
  );
});
