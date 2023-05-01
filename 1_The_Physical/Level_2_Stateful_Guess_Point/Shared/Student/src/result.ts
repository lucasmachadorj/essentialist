import { Maybe } from "./maybe";
import { MaybeType } from "./types";

export class Result<T, E> {
  private _value: Maybe<T>;
  private _error: Maybe<E>;

  private constructor(_value: T | null, _error: E | null) {
    this._value = Maybe.of(_value);
    this._error = Maybe.of(_error);
  }

  static ok<T, E>(_value: T): Result<T, E> {
    return new Result<T, E>(_value, null);
  }

  static fail<T, E>(_error: E): Result<T, E> {
    return new Result<T, E>(null, _error);
  }

  isOk(): boolean {
    return this._value.type === MaybeType.Just;
  }

  hasError(): boolean {
    return this._error.type === MaybeType.Just;
  }

  get value(): T {
    return this._value.content;
  }

  get error(): E {
    return this._error.content;
  }
}
