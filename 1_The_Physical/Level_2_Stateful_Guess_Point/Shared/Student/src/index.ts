export interface StudentProps {
  firstName: string;
  lastName: string;
}

export class Student {
  private constructor(private firstName: string, private lastName: string) {}

  static create(props: StudentProps): Student {
    const { firstName, lastName } = props;
    if (firstName.length < 2)
      throw new Error("firstName must be at least 2 characters");

    if (firstName.length > 10)
      throw new Error("firstName must be at most 10 characters");

    if (lastName.length < 2) {
      throw new Error("lastName must be at least 2 characters");
    }

    if (lastName.length > 15) {
      throw new Error("lastName must be at most 15 characters");
    }

    return new Student(firstName, lastName);
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
