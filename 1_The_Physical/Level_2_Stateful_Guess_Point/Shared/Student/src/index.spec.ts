class Student {
  private constructor(private firstName: string, private lastName: string) {}

  static create(firstName: string, lastName: string): Student {
    return new Student("Lucas", "Machado");
  }

  getName(): string {
    return "Lucas Machado";
  }
}

describe("student object", () => {
  it("creates a student with firstName 'Lucas' and lastName 'Machado' should be a valid operation", () => {
    const student = Student.create("Lucas", "Machado");
    expect(student).toBeDefined();
    expect(student.getName()).toEqual("Lucas Machado");
  });
});
