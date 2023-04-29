export interface StudentProps {
  firstName: string;
  lastName: string;
}

const validateFirstName = (
  firstName: string
): InvalidStudentProps<InvalidFirstName> | undefined => {
  if (firstName.length < 2)
    return {
      type: "InvalidFirstName",
      message: "firstName must be at least 2 characters",
    };
  if (firstName.length > 10)
    return {
      type: "InvalidFirstName",
      message: "firstName must be at most 10 characters",
    };
  if (/[^a-zA-Z]/.test(firstName))
    return {
      type: "InvalidFirstName",
      message: "firstName must contain only alphabetic characters",
    };
};

const validateLastName = (
  lastName: string
): InvalidStudentProps<InvalidLastName> | undefined => {
  if (lastName.length < 2)
    return {
      type: "InvalidLastName",
      message: "lastName must be at least 2 characters",
    };
  if (lastName.length > 15)
    return {
      type: "InvalidLastName",
      message: "lastName must be at most 15 characters",
    };
  if (/[^a-zA-Z]/.test(lastName))
    return {
      type: "InvalidLastName",
      message: "lastName must contain only alphabetic characters",
    };
};

export type InvalidFirstName = string;
export type InvalidLastName = string;

export type InvalidStudentProps<T> = {
  type: T;
  message: string;
};

export class Student {
  private constructor(
    private _firstName: string,
    private _lastName: string,
    private _email: string
  ) {}

  static create(
    props: StudentProps
  ): Student | InvalidStudentProps<InvalidFirstName | InvalidLastName> {
    const { firstName, lastName } = props;

    if (validateFirstName(firstName)) return validateFirstName(firstName)!;
    if (validateLastName(lastName)) return validateLastName(lastName)!;

    let email = `${lastName.toLowerCase().substring(0, 5)}${firstName
      .toLowerCase()
      .substring(0, 2)}@essentialist.dev`;

    return new Student(firstName, lastName, email);
  }

  get name(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  get email(): string {
    return this._email;
  }
}
