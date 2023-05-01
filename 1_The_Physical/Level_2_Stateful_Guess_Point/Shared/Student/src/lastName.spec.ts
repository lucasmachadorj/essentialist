import { LastName } from "./lastName";

describe("LastName Value Object", () => {
  it("should be defined when a valid input is given", () => {
    const lastName = LastName.create("Lucas");
    expect(lastName).toBeDefined();
  });

  it.each([["L"], ["M"], ["N"]])(
    "returns an error with type InvalidLastName and message 'lastName must be at least 2 characters",
    (lastName) => {
      const { error } = LastName.create(lastName);
      expect(error.type).toEqual("InvalidLastName");
      expect(error.message).toEqual("lastName must be at least 2 characters");
    }
  );
});
