export class Student {
  private constructor(private firstName: string, private lastName: string) {}

  static create(firstName: string, lastName: string): Student {
    return new Student(firstName, lastName);
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
