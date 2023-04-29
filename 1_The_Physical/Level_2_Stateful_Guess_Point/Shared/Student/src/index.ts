export interface StudentProps {
  firstName: string;
  lastName: string;
}

export class Student {
  private constructor(private firstName: string, private lastName: string) {}

  static create(props: StudentProps): Student {
    const { firstName, lastName } = props;
    if (firstName === "Lu")
      throw new Error("firstName must be at least 3 characters");
    return new Student(firstName, lastName);
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
