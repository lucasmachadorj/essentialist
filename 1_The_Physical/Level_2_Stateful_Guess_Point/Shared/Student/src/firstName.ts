export type InvalidFirstName = string;

export type InvalidStudentProps<T> = {
  type: T;
  message: string;
};

export class FirstName {
  private constructor(private readonly _value: string) {}

  static create(
    firstName: string
  ): FirstName | InvalidStudentProps<InvalidFirstName> {
    const invalidFirstName = FirstName.validateFirstName(firstName);
    if (invalidFirstName) return invalidFirstName;

    return new FirstName(firstName);
  }

  get value(): string {
    return this._value;
  }

  static validateFirstName = (
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
}
