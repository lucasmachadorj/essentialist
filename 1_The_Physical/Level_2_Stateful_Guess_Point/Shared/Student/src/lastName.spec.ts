import { LastName, InvalidLastName } from "./lastName";
import { InvalidStudentProps } from "./types";

describe("LastName Value Object", () => {
  it("should be defined when a valid input is given", () => {
    const lastName = LastName.create("Lucas");
    expect(lastName).toBeDefined();
  });

  it.each([["L"], ["M"], ["N"]])(
    "returns an error with type InvalidLastName and message 'lastName must be at least 2 characters",
    (lastName) => {
      const lastNameOrError = LastName.create(
        lastName
      ) as InvalidStudentProps<InvalidLastName>;

      expect(lastNameOrError.type).toEqual("InvalidLastName");
      expect(lastNameOrError.message).toEqual(
        "lastName must be at least 2 characters"
      );
    }
  );
});
