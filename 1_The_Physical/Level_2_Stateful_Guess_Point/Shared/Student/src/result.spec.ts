enum MaybeType {
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

describe("Error handling object", () => {
  describe("Result", () => {
    it("should be defined", () => {
      expect(Result).toBeDefined();
      expect(Result).toBeInstanceOf(Function);
    });

    it("should have a isOk static method that returns an instance of Result", () => {
      expect(Result.ok).toBeDefined();
      expect(Result.ok(1)).toBeInstanceOf(Result);
    });

    it("should return a Result with a Just value when calling ok", () => {
      const result = Result.ok(1);
      expect(result).toBeDefined();
      expect(result.isOk()).toBe(true);
    });

    it("should return false when calling hasError on a Result with a Just value", () => {
      const result = Result.ok(1);
      expect(result.hasError()).toBe(false);
    });

    it("should return content when calling value on a Result with a Just value", () => {
      const result = Result.ok(1);
      expect(result.value).toBe(1);
    });

    it("should return a Result with a Nothing value when calling ok with null", () => {
      const result = Result.ok(null);
      expect(result).toBeDefined();
      expect(result.value?.type).toBe(MaybeType.Nothing);
    });

    it("should return a Result with a Just error when calling fail with an error", () => {
      const result = Result.fail(new Error("error"));
      expect(result).toBeDefined();
      expect(result.hasError()).toBe(true);
    });

    it("should return nothing when calling value on a Result with a Just error", () => {
      const result = Result.fail(new Error("error"));
      expect(result.value.type).toBe(MaybeType.Nothing);
    });

    it("should return error when calling error on a Result with a Just error", () => {
      const error = new Error("error");
      const result = Result.fail(error);
      expect(result.error).toBe(error);
    });
  });
});
