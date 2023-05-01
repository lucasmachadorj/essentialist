import { FirstName, InvalidFirstName } from "./firstName";
import { InvalidLastName, LastName } from "./lastName";
import { StudentEmail } from "./studentEmail";
import { InvalidStudentProps } from "./types";

export interface StudentProps {
  firstName: string;
  lastName: string;
}

type UpdateFirstName = "UpdateFirstName";
type UpdateLastName = "UpdateLastName";

type UpdateFirstNameEvent = {
  type: UpdateFirstName;
  payload: FirstName;
};

type UpdateLastNameEvent = {
  type: UpdateLastName;
  payload: LastName;
};

type StudentEvent = UpdateFirstNameEvent | UpdateLastNameEvent;

export class Student {
  private _events: StudentEvent[] = [];

  private constructor(
    private readonly _firstName: FirstName,
    private readonly _lastName: LastName,
    private readonly _email: StudentEmail
  ) {}

  static create(
    props: StudentProps
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

    const firstName = lastUpdateFirstNameEvent?.payload ?? this._firstName;
    const lastName = lastUpdateLastNameEvent?.payload ?? this._lastName;

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

    this.addEvent("UpdateFirstName", firstNameOrError);
  }

  updateLastName(lastName: string) {
    const lastNameOrError = LastName.create(lastName);
    if (!(lastNameOrError instanceof LastName)) {
      throw new Error(lastNameOrError.message);
    }

    this.addEvent("UpdateLastName", lastNameOrError);
  }

  // private methods

  private addEvent(
    type: UpdateFirstName | UpdateLastName,
    payload: FirstName | LastName
  ) {
    if (type === "UpdateFirstName") {
      const StudentEvent: StudentEvent = {
        type: type as UpdateFirstName,
        payload: payload as FirstName,
      };

      this._events.push(Object.freeze(StudentEvent));
    } else {
      const StudentEvent: StudentEvent = {
        type: type as UpdateLastName,
        payload: payload as LastName,
      };

      this._events.push(Object.freeze(StudentEvent));
    }
  }

  private getEventsOfType(eventType: StudentEvent["type"]): StudentEvent[] {
    return this._events.filter((event) => event.type === eventType);
  }
}
