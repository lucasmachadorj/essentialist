import { passwordValidator } from "./index";

describe("password validator", () => {
  it("should return an object with success result and no error for a valid password such as Password1", () => {
    const result = passwordValidator("Password1");
    expect(result).toEqual({
      success: true,
      error: [],
    });
  });
});
