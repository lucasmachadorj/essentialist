export interface StudentProps {
  firstName: string;
  lastName: string;
}

export type InvalidFirstName = string;
export type InvalidLastName = string;

export type InvalidStudentProps<T> = {
  type: T;
  message: string;
};

type UpdateFirstName = "UpdateFirstName";
type UpdateLastName = "UpdateLastName";

interface StudentEvent {
  type: UpdateFirstName | UpdateLastName;
  payload: string;
  date: Date;
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

  // public API

  get name(): string {
    const firstName = this.lastEventOfType("UpdateFirstName")?.payload;
    const lastName = this.lastEventOfType("UpdateLastName")?.payload;

    return `${firstName ?? this._firstName} ${lastName ?? this._lastName}`;
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

  updateLastName(lastName: string) {
    if (validateLastName(lastName)) {
      throw new Error(validateLastName(lastName)!.message);
    }

    this.addEvent("UpdateLastName", lastName);
  }

  // private methods

  private addEvent(type: UpdateFirstName | UpdateLastName, payload: string) {
    this._events.push(
      Object.freeze({
        type,
        payload,
        date: new Date(),
      })
    );
  }

  private lastEventOfType(
    type: StudentEvent["type"]
  ): StudentEvent | undefined {
    const events = this._events.filter((event) => event.type === type);
    if (events.length) {
      return events.sort((a, b) => b.date.getTime() - a.date.getTime())[0];
    }
    return undefined;
  }
}
