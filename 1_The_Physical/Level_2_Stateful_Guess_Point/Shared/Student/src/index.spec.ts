import { Student } from ".";

describe("student object", () => {
  it("creates a student with firstName 'Lucas' and lastName 'Machado' should be a valid operation", () => {
    const student = Student.create("Lucas", "Machado");
    expect(student).toBeDefined();
    expect(student.getName()).toEqual("Lucas Machado");
  });
});
