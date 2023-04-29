export interface StudentProps {
  firstName: string;
  lastName: string;
}

export class Student {
  private constructor(private firstName: string, private lastName: string) {}

  static create(props: StudentProps): Student {
    const { firstName, lastName } = props;
    return new Student(firstName, lastName);
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
