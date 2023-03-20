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

  it("should return an error if the password has less than 5 characters such as 1Abc", () => {
    const result = passwordValidator("1Abc");
    expect(result).toEqual({
      success: false,
      error: ["Password must be at least 5 characters"],
    });
  });

  it("should return an error if the password has more than 15 characters such as 1Abcdefghijklmno", () => {
    const result = passwordValidator("1Abcdefghijklmno");
    expect(result).toEqual({
      success: false,
      error: ["Password must be at most 15 characters"],
    });
  });
});
