import { Result } from "./result";

describe("Error handling object", () => {
  describe("Result", () => {
    it("should be defined", () => {
      expect(Result).toBeDefined();
      expect(Result).toBeInstanceOf(Function);
    });

    it("should have a ok static method that returns an instance of Result", () => {
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

    it("should return a Result with a Just error when calling fail with an error", () => {
      const result = Result.fail(new Error("error"));
      expect(result).toBeDefined();
      expect(result.hasError()).toBe(true);
    });

    it("should return error when calling error on a Result with a Just error", () => {
      const error = new Error("error");
      const result = Result.fail(error);
      expect(result.error).toBe(error);
    });
  });
});
