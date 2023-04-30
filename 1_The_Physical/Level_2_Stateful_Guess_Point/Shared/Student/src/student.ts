import { FirstName, InvalidFirstName } from "./firstName";
import { InvalidStudentProps } from "./types";

export interface StudentProps {
  firstName: string;
  lastName: string;
}

export type InvalidLastName = string;

type UpdateFirstName = "UpdateFirstName";
type UpdateLastName = "UpdateLastName";

interface StudentEvent {
  type: UpdateFirstName | UpdateLastName;
  payload: string;
  date: Date;
}

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
    private readonly _firstName: FirstName,
    private readonly _lastName: string,
    private readonly _email: string
  ) {}

  static create(
    props: StudentProps
  ): Student | InvalidStudentProps<InvalidFirstName | InvalidLastName> {
    const { firstName, lastName } = props;

    const firstNameOrError = FirstName.create(firstName);
    if (!(firstNameOrError instanceof FirstName)) {
      return firstNameOrError;
    }

    if (validateLastName(lastName)) return validateLastName(lastName)!;

    let email = `${lastName.toLowerCase().substring(0, 5)}${firstName
      .toLowerCase()
      .substring(0, 2)}@essentialist.dev`;

    return new Student(firstNameOrError, lastName, email);
  }

  // public API

  get name(): string {
    const firstName = this.lastEventOfType("UpdateFirstName")?.payload;
    const lastName = this.lastEventOfType("UpdateLastName")?.payload;

    return `${firstName ?? this._firstName.value} ${
      lastName ?? this._lastName
    }`;
  }

  get email(): string {
    return this._email;
  }

  updateFirstName(firstName: string) {
    const firstNameOrError = FirstName.create(firstName);
    if (!(firstNameOrError instanceof FirstName)) {
      throw new Error(firstNameOrError.message);
    }

    this.addEvent("UpdateFirstName", firstNameOrError.value);
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
