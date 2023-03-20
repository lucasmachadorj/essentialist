import { PasswordValidationResult, passwordValidator } from "./index";

describe("password validator", () => {
  it("should return an object with success result and no error for a valid password such as Password1", () => {
    const result: PasswordValidationResult = passwordValidator("Password1");
    expect(result).toEqual({
      success: true,
      errors: [],
    });
  });

  it("should return an object with failure result and error for invalid password missing uppercase for an input such as password1", () => {
    const result: PasswordValidationResult = passwordValidator("password1");
    expect(result).toEqual({
      success: false,
      errors: ["Password must contain at least one uppercase letter"],
    });
  });

  it("should return an object with failure result and error for invalid password missing at least one digit for an input such as Password", () => {
    const result: PasswordValidationResult = passwordValidator("Password");
    expect(result).toEqual({
      success: false,
      errors: ["Password must contain at least one digit"],
    });
  });

  it("should return an error if the password has less than 5 characters such as 1Abc", () => {
    const result: PasswordValidationResult = passwordValidator("1Abc");
    expect(result).toEqual({
      success: false,
      errors: ["Password must be at least 5 characters"],
    });
  });

  it("should return an error if the password has more than 15 characters such as 1Abcdefghijklmno", () => {
    const result: PasswordValidationResult =
      passwordValidator("1Abcdefghijklmno");
    expect(result).toEqual({
      success: false,
      errors: ["Password must be at most 15 characters"],
    });
  });

  it("should return two error messages if the password has less than 5 characters and no uppercase letter such as 1abc", () => {
    const result: PasswordValidationResult = passwordValidator("1abc");
    expect(result).toEqual({
      success: false,
      errors: [
        "Password must be at least 5 characters",
        "Password must contain at least one uppercase letter",
      ],
    });
  });
});
