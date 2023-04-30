export class FirstName {
  private constructor(private readonly _value: string) {}

  static create(firstName: string): FirstName {
    return new FirstName(firstName);
  }
}
