import { Result } from "./result";
import { InvalidStudentProps } from "./types";

export type InvalidLastName = string;

export class LastName {
  constructor(private readonly _value: string) {
    this._value = _value;
  }
  static create(
    lastName: string
  ): Result<LastName, InvalidStudentProps<InvalidLastName>> {
    const invalidLastName = LastName.validateLastName(lastName);
    if (invalidLastName) return Result.fail(invalidLastName);
    return Result.ok(new LastName(lastName));
  }

  get value() {
    return this._value;
  }

  static validateLastName(lastName: string) {
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
  }
}
