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

type UpdateFirstName = "UpdateFirstName";

interface StudentEvent {
  type: UpdateFirstName;
  payload: string;
  date: Date;
}

export class Student {
  private _events: StudentEvent[] = [];

  private constructor(
    private readonly _firstName: string,
    private readonly _lastName: string,
    private readonly _email: string
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
    if (this._events.length > 0) {
      const firstName = this._events[this._events.length - 1];
      return `${firstName.payload} ${this._lastName}`;
    }

    return `${this._firstName} ${this._lastName}`;
  }

  get email(): string {
    return this._email;
  }

  updateFirstName(firstName: string) {
    if (validateFirstName(firstName)) {
      throw new Error(validateFirstName(firstName)!.message);
    }

    this.addEvent("UpdateFirstName", firstName);
  }

  private addEvent(type: UpdateFirstName, payload: string) {
    this._events.push(
      Object.freeze({
        type,
        payload,
        date: new Date(),
      })
    );
  }
}
