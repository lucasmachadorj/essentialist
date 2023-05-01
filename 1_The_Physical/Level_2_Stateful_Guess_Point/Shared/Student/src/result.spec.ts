enum MaybeType {
  Just = "Just",
  Nothing = "Nothing",
}

interface Just<T> {
  type: MaybeType.Just;
  value: T;
}

interface Nothing {
  type: MaybeType.Nothing;
}

type Maybe<T> = Just<T> | Nothing;

const Just = <T>(value: T): Just<T> => ({
  type: MaybeType.Just,
  value,
});

const Nothing = (): Nothing => ({
  type: MaybeType.Nothing,
});

export class Result<T, E> {
  private value: Maybe<T>;
  private error: Maybe<E>;

  private constructor(value: T | null, error: E | null) {
    this.value = value ? Just(value) : Nothing();
    this.error = error ? Just(error) : Nothing();
  }

  static isOk<T>(value: T): Result<T, Nothing> {
    return new Result<T, never>(value, null);
  }
}

describe("Error handling object", () => {
  describe("Result", () => {
    it("should be defined", () => {
      expect(Result).toBeDefined();
      expect(Result).toBeInstanceOf(Function);
    });

    it("should have a isOk static method that returns an instance of Result", () => {
      expect(Result.isOk).toBeDefined();
      expect(Result.isOk(1)).toBeInstanceOf(Result);
    });
  });
});
