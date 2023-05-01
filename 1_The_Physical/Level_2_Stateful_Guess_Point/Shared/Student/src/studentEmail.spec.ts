import { FirstName } from "./firstName";
import { LastName } from "./lastName";
import { StudentEmail } from "./studentEmail";

describe("StudentEmail Value Object", () => {
  it("should be defined when a valid input is given", () => {
    const { value: firstName } = FirstName.create("Lucas");
    const { value: lastName } = LastName.create("Machado");

    const email = StudentEmail.create(firstName, lastName);
    expect(email).toBeDefined();
    expect(email.value).toEqual("machalu@essentialist.dev");
  });
});
