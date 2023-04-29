export interface StudentProps {
  firstName: string;
  lastName: string;
}

const validateFirstName = (firstName: string): void => {
  if (firstName.length < 2)
    throw new Error("firstName must be at least 2 characters");
  if (firstName.length > 10)
    throw new Error("firstName must be at most 10 characters");
  if (/[^a-zA-Z]/.test(firstName))
    throw new Error("firstName must contain only alphabetic characters");
};

const validateLastName = (lastName: string): void => {
  if (lastName.length < 2)
    throw new Error("lastName must be at least 2 characters");
  if (lastName.length > 15)
    throw new Error("lastName must be at most 15 characters");
  if (/[^a-zA-Z]/.test(lastName))
    throw new Error("lastName must contain only alphabetic characters");
};

export class Student {
  private constructor(private _firstName: string, private _lastName: string) {}

  static create(props: StudentProps): Student {
    const { firstName, lastName } = props;

    validateFirstName(firstName);
    validateLastName(lastName);

    return new Student(firstName, lastName);
  }

  get name(): string {
    return `${this._firstName} ${this._lastName}`;
  }
}
