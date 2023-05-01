import { v4 as uuidv4 } from "uuid";

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
import { Result } from "./result";

export class Student {
  private events: StudentEvent[] = [];

  private constructor(private currentState: StudentProps) {
    this.addEvent(new StudentCreated(this.currentState));
  }

  static create(
    props: StudentInputProps
  ): Result<Student, InvalidStudentProps<InvalidFirstName | InvalidLastName>> {
    const firstNameResult = FirstName.create(props.firstName);
    if (firstNameResult.hasError()) {
      return Result.fail<
        Student,
        InvalidStudentProps<InvalidFirstName | InvalidLastName>
      >(firstNameResult.error);
    }

    const lastNameResult = LastName.create(props.lastName);
    if (lastNameResult.hasError()) {
      return Result.fail<
        Student,
        InvalidStudentProps<InvalidFirstName | InvalidLastName>
      >(lastNameResult.error);
    }

    const firstName = firstNameResult.value;
    const lastName = lastNameResult.value;
    const email = StudentEmail.create(firstName, lastName);
    const id = uuidv4();

    return Result.ok(
      new Student({
        id,
        firstName,
        lastName,
        email,
      })
    );
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

  get id(): string {
    return this.currentState.id;
  }

  updateFirstName(firstName: string) {
    const result = FirstName.create(firstName);
    if (result.hasError()) {
      throw new Error(result.error.message);
    }

    this.currentState = {
      ...this.currentState,
      firstName: result.value,
    };

    this.addEvent(new FirstNameUpdated(result.value));
  }

  updateLastName(lastName: string) {
    const result = LastName.create(lastName);
    if (result.hasError()) {
      throw new Error(result.error.message);
    }

    this.currentState = {
      ...this.currentState,
      lastName: result.value,
    };

    this.addEvent(new LastNameUpdated(result.value));
  }

  getEventsOfType(eventType: StudentEvent["type"]): StudentEvent[] {
    return this.events.filter((event) => event.type === eventType);
  }

  private addEvent(event: StudentEvent) {
    this.events.push(event);
  }
}
