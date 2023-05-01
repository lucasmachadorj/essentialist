import { FirstName, InvalidFirstName } from "./firstName";
import { InvalidLastName, LastName } from "./lastName";
import { StudentEmail } from "./studentEmail";
import { InvalidStudentProps } from "./types";

export interface StudentInputProps {
  firstName: string;
  lastName: string;
}

interface StudentProps {
  readonly firstName: FirstName;
  readonly lastName: LastName;
  readonly email: StudentEmail;
}

type FirstNameUpdated = "UpdateFirstName";
type LastNameUpdated = "UpdateLastName";
type StudentCreated = "StudentCreated";

type FirstNameUpdatedEvent = {
  type: FirstNameUpdated;
  payload: string;
};

type LastNameUpdatedEvent = {
  type: LastNameUpdated;
  payload: string;
};

type StudentCreatedEvent = {
  type: StudentCreated;
  payload: string;
};

type StudentEvent =
  | FirstNameUpdatedEvent
  | LastNameUpdatedEvent
  | StudentCreatedEvent;

export class Student {
  private _events: StudentEvent[] = [];

  private constructor(private _currentState: StudentProps) {
    this.addEvent({
      type: "StudentCreated",
      payload: JSON.stringify({
        firstName: this._currentState.firstName.value,
        lastName: this._currentState.lastName.value,
        email: this._currentState.email.value,
      }),
    });
  }

  static create(
    props: StudentInputProps
  ): Student | InvalidStudentProps<InvalidFirstName | InvalidLastName> {
    const firstNameOrError = FirstName.create(props.firstName);
    if (!(firstNameOrError instanceof FirstName)) {
      return firstNameOrError;
    }

    const lastNameOrError = LastName.create(props.lastName);
    if (!(lastNameOrError instanceof LastName)) {
      return lastNameOrError;
    }

    const firstName = firstNameOrError;
    const lastName = lastNameOrError;
    let email = StudentEmail.create(firstName, lastName);

    return new Student({
      firstName,
      lastName,
      email,
    });
  }

  // public API

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get firstName(): string {
    return this._currentState.firstName.value;
  }

  get lastName(): string {
    return this._currentState.lastName.value;
  }

  get email(): string {
    return this._currentState.email.value;
  }

  updateFirstName(firstName: string) {
    const firstNameOrError = FirstName.create(firstName);
    if (!(firstNameOrError instanceof FirstName)) {
      throw new Error(firstNameOrError.message);
    }

    this._currentState = {
      ...this._currentState,
      firstName: firstNameOrError,
    };

    this.addEvent({
      type: "UpdateFirstName",
      payload: firstNameOrError.value,
    });
  }

  updateLastName(lastName: string) {
    const lastNameOrError = LastName.create(lastName);
    if (!(lastNameOrError instanceof LastName)) {
      throw new Error(lastNameOrError.message);
    }

    this._currentState = {
      ...this._currentState,
      lastName: lastNameOrError,
    };

    this.addEvent({
      type: "UpdateLastName",
      payload: lastNameOrError.value,
    });
  }

  // private methods

  private addEvent(event: StudentEvent) {
    const { type, payload } = event;
    this._events.push(Object.freeze(event));
  }

  private getEventsOfType(eventType: StudentEvent["type"]): StudentEvent[] {
    return this._events.filter((event) => event.type === eventType);
  }
}
