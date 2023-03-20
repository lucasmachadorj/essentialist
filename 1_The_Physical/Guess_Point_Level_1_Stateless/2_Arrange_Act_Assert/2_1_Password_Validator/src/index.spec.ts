import { passwordValidator } from "./index";

describe("password validator", () => {
  it("should return an object with success result and no error for a valid password such as Password1", () => {
    const result = passwordValidator("Password1");
    expect(result).toEqual({
      success: true,
      error: [],
    });
  });

  it("should return an object with failure result and error for invalid password missing uppercase for an input such as password1", () => {
    const result = passwordValidator("password1");
    expect(result).toEqual({
      success: false,
      error: ["Password must contain at least one uppercase letter"],
    });
  });

  it("should return an object with failure result and error for invalid password missing at least one digit for an input such as Password", () => {
    const result = passwordValidator("Password");
    expect(result).toEqual({
      success: false,
      error: ["Password must contain at least one digit"],
    });
  });
});
