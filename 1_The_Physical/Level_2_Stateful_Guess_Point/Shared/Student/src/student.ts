import { FirstName, InvalidFirstName } from "./firstName";
import { InvalidLastName, LastName } from "./lastName";
import { StudentEmail } from "./studentEmail";
import { InvalidStudentProps, StudentInputProps, StudentProps } from "./types";
import {
  FirstNameUpdated,
  LastNameUpdated,
  StudentCreated,
  StudentEvent,
} from "./studentEvent";

export class Student {
  private events: StudentEvent[] = [];

  private constructor(private currentState: StudentProps) {
    this.addEvent(new StudentCreated(this.currentState));
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
    return this.currentState.firstName.value;
  }

  get lastName(): string {
    return this.currentState.lastName.value;
  }

  get email(): string {
    return this.currentState.email.value;
  }

  updateFirstName(firstName: string) {
    const firstNameOrError = FirstName.create(firstName);
    if (!(firstNameOrError instanceof FirstName)) {
      throw new Error(firstNameOrError.message);
    }

    this.currentState = {
      ...this.currentState,
      firstName: firstNameOrError,
    };

    this.addEvent(new FirstNameUpdated(firstNameOrError.value));
  }

  updateLastName(lastName: string) {
    const lastNameOrError = LastName.create(lastName);
    if (!(lastNameOrError instanceof LastName)) {
      throw new Error(lastNameOrError.message);
    }

    this.currentState = {
      ...this.currentState,
      lastName: lastNameOrError,
    };

    this.addEvent(new LastNameUpdated(lastNameOrError.value));
  }

  getEventsOfType(eventType: StudentEvent["type"]): StudentEvent[] {
    return this.events.filter((event) => event.type === eventType);
  }

  private addEvent(event: StudentEvent) {
    this.events.push(event);
  }
}
