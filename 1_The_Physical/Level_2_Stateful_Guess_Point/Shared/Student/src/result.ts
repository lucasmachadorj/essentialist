export enum MaybeType {
  Just = "Just",
  Nothing = "Nothing",
}

interface Just<T> {
  type: MaybeType.Just;
  content: T;
}

interface Nothing {
  type: MaybeType.Nothing;
}

type Maybe<T> = Just<T> | Nothing;

const Just = <T>(content: T): Just<T> => ({
  type: MaybeType.Just,
  content,
});

const Nothing = (): Nothing => ({
  type: MaybeType.Nothing,
});

export class Result<T, E> {
  private _value: Maybe<T>;
  private _error: Maybe<E>;

  private constructor(_value: T | null, _error: E | null) {
    this._value = _value ? Just(_value) : Nothing();
    this._error = _error ? Just(_error) : Nothing();
  }

  static ok<T>(_value: T): Result<T, Nothing> {
    return new Result<T, never>(_value, null);
  }

  static fail<E>(_error: E): Result<Nothing, E> {
    return new Result<never, E>(null, _error);
  }

  isOk(): boolean {
    return this._value.type === MaybeType.Just;
  }

  hasError(): boolean {
    return this._error.type === MaybeType.Just;
  }

  get value(): T | Nothing {
    if (this._value.type === MaybeType.Just) {
      return this._value.content;
    }
    return Nothing();
  }

  get error(): E | Nothing {
    if (this._error.type === MaybeType.Just) {
      return this._error.content;
    }
    return Nothing();
  }
}
