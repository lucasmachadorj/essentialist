import {
  InvalidFirstName,
  InvalidLastName,
  InvalidStudentProps,
  Student,
} from ".";

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
      const student = Student.create(props) as Student;
      expect(student).toBeDefined();
      expect(student.name).toEqual(`${firstName} ${lastName}`);
    }
  );

  it.each([
    ["L", "Machado"],
    ["M", "Machado"],
    ["N", "Machado"],
  ])(
    "returns an error with type InvalidFirstName and message 'firstName must be at least 2 characters",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };

      const userOrError = Student.create(props) as InvalidStudentProps<
        InvalidFirstName | InvalidLastName
      >;
      expect(userOrError.type).toEqual("InvalidFirstName");
      expect(userOrError.message).toEqual(
        "firstName must be at least 2 characters"
      );
    }
  );

  it.each([
    ["thisisalongname", "Machado"],
    ["thisisanotherlongname", "Machado"],
    ["onemorelongname", "Machado"],
  ])(
    "returns an error with type InvalidFirstName and message 'firstName must be at most 10 characters'",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      const userOrError = Student.create(props) as InvalidStudentProps<
        InvalidFirstName | InvalidLastName
      >;
      expect(userOrError.type).toEqual("InvalidFirstName");
      expect(userOrError.message).toEqual(
        "firstName must be at most 10 characters"
      );
    }
  );

  it.each([
    ["Lucas", "M"],
    ["Lucas", "N"],
    ["Lucas", "O"],
  ])(
    "returns an error of type InvalidLastName and message 'lastName must be at least 2 characters'",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      const userOrError = Student.create(props) as InvalidStudentProps<
        InvalidFirstName | InvalidLastName
      >;
      expect(userOrError.type).toEqual("InvalidLastName");
      expect(userOrError.message).toEqual(
        "lastName must be at least 2 characters"
      );
    }
  );

  it.each([
    ["Lucas", "thisisalonglastname"],
    ["Lucas", "thisisanotherlonglastname"],
    ["Lucas", "onemorelonglastname"],
  ])(
    "returns an error of type InvalidLastName and message 'lastName must be at most 15 characters'",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      const userOrError = Student.create(props) as InvalidStudentProps<
        InvalidFirstName | InvalidLastName
      >;
      expect(userOrError.type).toEqual("InvalidLastName");
      expect(userOrError.message).toEqual(
        "lastName must be at most 15 characters"
      );
    }
  );

  it.each([
    ["Lucas1", "Machado"],
    ["2lucas", "Machado"],
    ["Lu!cas", "Machado"],
  ])(
    "returns an error with type InvalidFirstName and message 'firstName must contain only alphabetic characters'",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      const userOrError = Student.create(props) as InvalidStudentProps<
        InvalidFirstName | InvalidLastName
      >;
      expect(userOrError.type).toEqual("InvalidFirstName");
      expect(userOrError.message).toEqual(
        "firstName must contain only alphabetic characters"
      );
    }
  );

  it.each([
    ["Lucas", "1Machado"],
    ["Lucas", "Machado!"],
    ["Lucas", "Macha@do!"],
  ])(
    "returns an error with type InvalidLastName and message 'lastName must contain only alphabetic characters'",
    (firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      const userOrError = Student.create(props) as InvalidStudentProps<
        InvalidFirstName | InvalidLastName
      >;
      expect(userOrError.type).toEqual("InvalidLastName");
      expect(userOrError.message).toEqual(
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
      const student = Student.create(props) as Student;
      expect(student.email).toEqual(buildEmail(firstName, lastName));
    }
  );
});
