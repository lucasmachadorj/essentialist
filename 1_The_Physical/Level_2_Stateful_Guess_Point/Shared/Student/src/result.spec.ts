export class Result {}

describe("Error handling object", () => {
  describe("Result", () => {
    it("should be defined", () => {
      expect(Result).toBeDefined();
      expect(Result).toBeInstanceOf(Function);
    });
  });
});
