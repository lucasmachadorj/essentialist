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
  private error: Maybe<E>;

  private constructor(_value: T | null, error: E | null) {
    this._value = _value ? Just(_value) : Nothing();
    this.error = error ? Just(error) : Nothing();
  }

  static ok<T>(_value: T): Result<T, Nothing> {
    return new Result<T, never>(_value, null);
  }

  isOk(): boolean {
    return this._value.type === MaybeType.Just;
  }

  hasError(): boolean {
    return this.error.type === MaybeType.Just;
  }

  get value(): T | Nothing {
    if (this._value.type === MaybeType.Just) {
      return this._value.content;
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
  });
});
