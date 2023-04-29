export interface StudentProps {
  firstName: string;
  lastName: string;
}

export class Student {
  private constructor(private firstName: string, private lastName: string) {}

  static create(props: StudentProps): Student {
    const { firstName, lastName } = props;
    if (firstName === "L" || firstName === "M" || firstName === "N")
      throw new Error("firstName must be at least 2 characters");
    return new Student(firstName, lastName);
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
