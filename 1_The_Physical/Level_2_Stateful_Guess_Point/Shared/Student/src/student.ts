import { FirstName, InvalidFirstName } from "./firstName";
import { InvalidLastName, LastName } from "./lastName";
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

type StudentEvent = (UpdateFirstNameEvent | UpdateLastNameEvent) & {
  date: Date;
};

export class Student {
  private _events: StudentEvent[] = [];

  private constructor(
    private readonly _firstName: FirstName,
    private readonly _lastName: LastName,
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

    const lastNameOrError = LastName.create(lastName);
    if (!(lastNameOrError instanceof LastName)) {
      return lastNameOrError;
    }

    let email = `${lastName.toLowerCase().substring(0, 5)}${firstName
      .toLowerCase()
      .substring(0, 2)}@essentialist.dev`;

    return new Student(firstNameOrError, lastNameOrError, email);
  }

  // public API

  get name(): string {
    const firstName = this.lastEventOfType("UpdateFirstName")?.payload;
    const lastName = this.lastEventOfType("UpdateLastName")?.payload;

    return `${firstName?.value ?? this._firstName.value} ${
      lastName?.value ?? this._lastName.value
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
        date: new Date(),
      };

      this._events.push(Object.freeze(StudentEvent));
    } else {
      const StudentEvent: StudentEvent = {
        type: type as UpdateLastName,
        payload: payload as LastName,
        date: new Date(),
      };

      this._events.push(Object.freeze(StudentEvent));
    }
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
