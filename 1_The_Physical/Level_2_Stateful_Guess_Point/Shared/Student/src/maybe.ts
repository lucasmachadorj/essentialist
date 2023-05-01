import { Just, MaybeType, Nothing } from "./types";

export class Maybe<T> {
  private _value: Just<T> | Nothing;

  private constructor(_value: T | null | undefined) {
    this._value = _value ? Just(_value) : Nothing();
  }

  static of<T>(_value: T | null | undefined): Maybe<T> {
    return new Maybe<T>(_value);
  }

  get type(): MaybeType {
    return this._value.type;
  }

  get content(): T {
    if (this._value.type === MaybeType.Nothing) {
      throw new Error("No content");
    }
    return this._value.content;
  }
}

const Just = <T>(content: T): Just<T> => ({
  type: MaybeType.Just,
  content,
});

const Nothing = (): Nothing => ({
  type: MaybeType.Nothing,
});
