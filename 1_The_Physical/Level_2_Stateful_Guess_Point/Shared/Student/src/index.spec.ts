import { Student } from ".";

describe("student object", () => {
  it("creates a student with firstName 'Lucas' and lastName 'Machado' should be a valid operation", () => {
    const props = {
      firstName: "Lucas",
      lastName: "Machado",
    };
    const student = Student.create(props);
    expect(student).toBeDefined();
    expect(student.getName()).toEqual("Lucas Machado");
  });

  it("creates a student with firstName 'Another' and lastName 'Person' should be a valid operation", () => {
    const props = {
      firstName: "Another",
      lastName: "Person",
    };
    const student = Student.create(props);
    expect(student).toBeDefined();
    expect(student.getName()).toEqual("Another Person");
  });
});
