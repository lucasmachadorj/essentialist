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

  it.each([
    ["Lucas", "M"],
    ["Lucas", "N"],
    ["Lucas", "O"],
  ])(
    "throws an error if lastName is less than 2 characters such as '%s'",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      expect(() => Student.create(props)).toThrowError(
        "lastName must be at least 2 characters"
      );
    }
  );

  it.each([
    ["Lucas", "thisisalonglastname"],
    ["Lucas", "thisisanotherlonglastname"],
    ["Lucas", "onemorelonglastname"],
  ])(
    "throws an error if lastName is longer than 15 characters such as '%s'",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      expect(() => Student.create(props)).toThrowError(
        "lastName must be at most 15 characters"
      );
    }
  );

  it.each([
    ["Lucas1", "Machado"],
    ["2lucas", "Machado"],
    ["Lu!cas", "Machado"],
  ])(
    "throws an error is firstName has a non-alphabetic character such as '%s'",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      expect(() => Student.create(props)).toThrowError(
        "firstName must contain only alphabetic characters"
      );
    }
  );

  it("throws an error if lastName has a non-alphabetic character such as 1Machado", () => {
    const props = {
      firstName: "Lucas",
      lastName: "1Machado",
    };
    expect(() => Student.create(props)).toThrowError(
      "lastName must contain only alphabetic characters"
    );
  });

  it("throws an error if lastName has a non-alphabetic character such as Machado!", () => {
    const props = {
      firstName: "Lucas",
      lastName: "Machado!",
    };
    expect(() => Student.create(props)).toThrowError(
      "lastName must contain only alphabetic characters"
    );
  });

  it("throws an error if lastName has a non-alphabetic character such as Macha@do!", () => {
    const props = {
      firstName: "Lucas",
      lastName: "Macha@do!",
    };
    expect(() => Student.create(props)).toThrowError(
      "lastName must contain only alphabetic characters"
    );
  });
});
