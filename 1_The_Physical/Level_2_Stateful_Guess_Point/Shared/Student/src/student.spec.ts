import { Student } from "./student";

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
      const { value: student } = Student.create(props);
      expect(student).toBeDefined();
      expect(student.name).toEqual(`${firstName} ${lastName}`);
      expect(student.getEventsOfType("StudentCreated")).toHaveLength(1);
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

      const { error } = Student.create(props);
      expect(error.type).toEqual("InvalidFirstName");
      expect(error.message).toEqual("firstName must be at least 2 characters");
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
      const { error } = Student.create(props);
      expect(error.type).toEqual("InvalidFirstName");
      expect(error.message).toEqual("firstName must be at most 10 characters");
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
      const { error } = Student.create(props);
      expect(error.type).toEqual("InvalidLastName");
      expect(error.message).toEqual("lastName must be at least 2 characters");
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
      const { error } = Student.create(props);
      expect(error.type).toEqual("InvalidLastName");
      expect(error.message).toEqual("lastName must be at most 15 characters");
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
      const { error } = Student.create(props);
      expect(error.type).toEqual("InvalidFirstName");
      expect(error.message).toEqual(
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
      const { error } = Student.create(props);
      expect(error.type).toEqual("InvalidLastName");
      expect(error.message).toEqual(
        "lastName must contain only alphabetic characters"
      );
    }
  );

  it.each([
    ["stemmjo@essentialist.dev", "Jo", "Stemm"],
    ["stimmlo@essentialist.dev", "Lo", "Stimm"],
    ["smithjo@essentialist.dev", "Jo", "Smith"],
    ["stemmkh@essentialist.dev", "Khalil", "Stemmler"],
    ["machalu@essentialist.dev", "Lucas", "Machado"],
  ])(
    "should have as email '%s' when firstName is '%s' and lastName is '%s'",
    (_, firstName, lastName) => {
      const props = {
        firstName,
        lastName,
      };
      const { value: student } = Student.create(props);
      expect(student.email).toEqual(buildEmail(firstName, lastName));
    }
  );

  it("should update a student with firstName 'Lucas' and lastName 'Machado' to firstName 'John'", () => {
    const props = {
      firstName: "Lucas",
      lastName: "Machado",
    };
    const { value: student } = Student.create(props);
    student.updateFirstName("John");
    expect(student.name).toEqual("John Machado");
    expect(student.getEventsOfType("FirstNameUpdated")).toHaveLength(1);
  });

  it("should update a student with firstName 'Lucas' and lastName 'Machado' twice to firstName 'John' and then firstName 'Lucas' again", async () => {
    const props = {
      firstName: "Lucas",
      lastName: "Machado",
    };
    const { value: student } = Student.create(props);
    student.updateFirstName("John");

    student.updateFirstName("Lucas");

    expect(student.name).toEqual("Lucas Machado");
    expect(student.getEventsOfType("FirstNameUpdated")).toHaveLength(2);
  });

  it("should throw an error when updating a student with firstName 'Lucas' and lastName 'Machado' to firstName 'L'", () => {
    const props = {
      firstName: "Lucas",
      lastName: "Machado",
    };
    const { value: student } = Student.create(props);
    expect(() => student.updateFirstName("L")).toThrowError(
      "firstName must be at least 2 characters"
    );
  });

  it("should update a student with firstName 'Lucas' and lastName 'Machado' to lastName 'Smith'", () => {
    const props = {
      firstName: "Lucas",
      lastName: "Machado",
    };
    const { value: student } = Student.create(props);
    student.updateLastName("Smith");
    expect(student.name).toEqual("Lucas Smith");
  });

  it("should not create two students with the same id", () => {
    const props = {
      firstName: "Lucas",
      lastName: "Machado",
    };
    const { value: student } = Student.create(props);
    const { value: student2 } = Student.create(props);

    expect(student.id).not.toEqual(student2.id);
  });
});
