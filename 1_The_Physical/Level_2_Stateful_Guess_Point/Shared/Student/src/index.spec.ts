import { Student } from ".";

describe("student object", () => {
  it.each([
    ["Lucas", "Machado"],
    ["Another", "Person"],
  ])(
    "creates a student with firstName '%s' and lastName '%s' should be a valid operation",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      const student = Student.create(props);
      expect(student).toBeDefined();
      expect(student.getName()).toEqual(`${firstName} ${lastName}`);
    }
  );

  it.each([
    ["L", "Machado"],
    ["M", "Machado"],
    ["N", "Machado"],
  ])(
    "throws an error if firstName is less than 2 characters such as '%s'",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      expect(() => Student.create(props)).toThrowError(
        "firstName must be at least 2 characters"
      );
    }
  );

  it.each([
    ["thisisalongname", "Machado"],
    ["thisisanotherlongname", "Machado"],
    ["onemorelongname", "Machado"],
  ])(
    "throws an error if firstName is longer than 10 characters such as '%s'",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      expect(() => Student.create(props)).toThrowError(
        "firstName must be at most 10 characters"
      );
    }
  );

  it("throws an error if lastName has less than 2 characters such as M", () => {
    const props = {
      firstName: "Lucas",
      lastName: "M",
    };
    expect(() => Student.create(props)).toThrowError(
      "lastName must be at least 2 characters"
    );
  });

  it("throws an error if lastName has less than 2 characters such as N", () => {
    const props = {
      firstName: "Lucas",
      lastName: "N",
    };
    expect(() => Student.create(props)).toThrowError(
      "lastName must be at least 2 characters"
    );
  });

  it("throws an error if lastName has less than 2 characters such as O", () => {
    const props = {
      firstName: "Lucas",
      lastName: "O",
    };
    expect(() => Student.create(props)).toThrowError(
      "lastName must be at least 2 characters"
    );
  });
});
