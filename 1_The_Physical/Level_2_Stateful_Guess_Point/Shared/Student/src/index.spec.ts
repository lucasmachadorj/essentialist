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

  it("throws an error is firstName has a non-alphabetic character such as Lucas1", () => {
    const props = {
      firstName: "Lucas1",
      lastName: "Machado",
    };
    expect(() => Student.create(props)).toThrowError(
      "firstName must contain only alphabetic characters"
    );
  });

  it("throws an error is firstName has a non-alphabetic character such as 2lucas", () => {
    const props = {
      firstName: "2lucas",
      lastName: "Machado",
    };
    expect(() => Student.create(props)).toThrowError(
      "firstName must contain only alphabetic characters"
    );
  });

  it("throws an error is firstName has a non-alphabetic character such as Lu!cas", () => {
    const props = {
      firstName: "Lu!cas",
      lastName: "Machado",
    };
    expect(() => Student.create(props)).toThrowError(
      "firstName must contain only alphabetic characters"
    );
  });
});
