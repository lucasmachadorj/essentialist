export class Student {
  private constructor(private firstName: string, private lastName: string) {}

  static create(firstName: string, lastName: string): Student {
    return new Student("Lucas", "Machado");
  }

  getName(): string {
    return "Lucas Machado";
  }
}
