import { Student } from ".";

describe("student object", () => {
  it("creates a student with firstName 'Lucas' and lastName 'Machado' should be a valid operation", () => {
    const student = Student.create("Lucas", "Machado");
    expect(student).toBeDefined();
    expect(student.getName()).toEqual("Lucas Machado");
  });

  it("creates a student with firstName 'Another' and lastName 'Person' should be a valid operation", () => {
    const student = Student.create("Another", "Person");
    expect(student).toBeDefined();
    expect(student.getName()).toEqual("Another Person");
  });
});
