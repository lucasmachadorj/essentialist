import { FirstName } from "./firstName";
import { LastName } from "./lastName";

export class StudentEmail {
  constructor(private readonly _value: string) {}
  static create(firstName: FirstName, lastName: LastName) {
    const email = `${lastName.value
      .toLowerCase()
      .substring(0, 5)}${firstName.value
      .toLowerCase()
      .substring(0, 2)}@essentialist.dev`;
    return new StudentEmail(email);
  }
  get value() {
    return this._value;
  }
}
