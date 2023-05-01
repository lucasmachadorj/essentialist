import { FirstName, InvalidFirstName } from "./firstName";
import { InvalidLastName, LastName } from "./lastName";
import { StudentEmail } from "./studentEmail";
import { InvalidStudentProps } from "./types";

export interface StudentInputProps {
  firstName: string;
  lastName: string;
}

interface StudentProps {
  firstName: FirstName;
  lastName: LastName;
  email: StudentEmail;
}

type FirstNameUpdated = "UpdateFirstName";
type LastNameUpdated = "UpdateLastName";
type StudentCreated = "StudentCreated";

type FirstNameUpdatedEvent = {
  type: FirstNameUpdated;
  payload: FirstName;
};

type LastNameUpdatedEvent = {
  type: LastNameUpdated;
  payload: LastName;
};

type StudentCreatedEvent = {
  type: StudentCreated;
  payload: StudentProps;
};

type StudentEvent =
  | FirstNameUpdatedEvent
  | LastNameUpdatedEvent
  | StudentCreatedEvent;

export class Student {
  private _events: StudentEvent[] = [];

  private constructor(
    private readonly _firstName: FirstName,
    private readonly _lastName: LastName,
    private readonly _email: StudentEmail
  ) {
    this.addEvent({
      type: "StudentCreated",
      payload: {
        firstName: this._firstName,
        lastName: this._lastName,
        email: this._email,
      },
    });
  }

  static create(
    props: StudentInputProps
  ): Student | InvalidStudentProps<InvalidFirstName | InvalidLastName> {
    const { firstName, lastName } = props;

    const firstNameOrError = FirstName.create(firstName);
    if (!(firstNameOrError instanceof FirstName)) {
      return firstNameOrError;
    }

    const lastNameOrError = LastName.create(lastName);
    if (!(lastNameOrError instanceof LastName)) {
      return lastNameOrError;
    }

    let email = StudentEmail.create(firstNameOrError, lastNameOrError);

    return new Student(firstNameOrError, lastNameOrError, email);
  }

  // public API

  get name(): string {
    const lastUpdateFirstNameEvent =
      this.getEventsOfType("UpdateFirstName")?.at(-1);
    const lastUpdateLastNameEvent =
      this.getEventsOfType("UpdateLastName")?.at(-1);

    const firstName =
      (lastUpdateFirstNameEvent?.payload as FirstName) ?? this._firstName;
    const lastName =
      (lastUpdateLastNameEvent?.payload as LastName) ?? this._lastName;

    return `${firstName.value} ${lastName.value}`;
  }

  get email(): string {
    return this._email.value;
  }

  updateFirstName(firstName: string) {
    const firstNameOrError = FirstName.create(firstName);
    if (!(firstNameOrError instanceof FirstName)) {
      throw new Error(firstNameOrError.message);
    }

    this.addEvent({
      type: "UpdateFirstName",
      payload: firstNameOrError,
    });
  }

  updateLastName(lastName: string) {
    const lastNameOrError = LastName.create(lastName);
    if (!(lastNameOrError instanceof LastName)) {
      throw new Error(lastNameOrError.message);
    }

    this.addEvent({
      type: "UpdateLastName",
      payload: lastNameOrError,
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
