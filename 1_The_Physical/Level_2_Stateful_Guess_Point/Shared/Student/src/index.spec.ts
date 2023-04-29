import { Student } from ".";

const buildEmail = (firstName: string, lastName: string): string => {
  return `${lastName.toLowerCase().substring(0, 5)}${firstName
    .toLowerCase()
    .substring(0, 2)}@essentialist.dev`;
};

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
      expect(student.name).toEqual(`${firstName} ${lastName}`);
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

  it.each([
    ["Lucas", "1Machado"],
    ["Lucas", "Machado!"],
    ["Lucas", "Macha@do!"],
  ])(
    "throws an error is lastName has a non-alphabetic character such as '%s'",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      expect(() => Student.create(props)).toThrowError(
        "lastName must contain only alphabetic characters"
      );
    }
  );

  it.each([
    ["Jo", "Stemm"],
    ["Lo", "Stimm"],
    ["Jo", "Smith"],
    ["Khalil", "Stemmler"],
    ["Lucas", "Machado"],
  ])(
    "should have as email '%s' when firstName is '%s' and lastName is '%s'",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      const student = Student.create(props);
      expect(student.email).toEqual(buildEmail(firstName, lastName));
    }
  );
});
