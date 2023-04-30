import { FirstName, InvalidFirstName, InvalidStudentProps } from "./firstName";

describe("FirstName Value Object", () => {
  it("should be defined when a valid input is given", () => {
    const firstName = FirstName.create("Lucas");
    expect(firstName).toBeDefined();
  });

  it.each([["L"], ["M"], ["N"]])(
    "returns an error with type InvalidFirstName and message 'firstName must be at least 2 characters",
    (firstName) => {
      const firstNameOrError = FirstName.create(
        firstName
      ) as InvalidStudentProps<InvalidFirstName>;

      expect(firstNameOrError.type).toEqual("InvalidFirstName");
      expect(firstNameOrError.message).toEqual(
        "firstName must be at least 2 characters"
      );
    }
  );
});
