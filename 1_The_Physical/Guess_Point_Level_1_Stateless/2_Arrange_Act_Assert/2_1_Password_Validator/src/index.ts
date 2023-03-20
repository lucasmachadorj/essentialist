const hasLessThan = (n: number) => (s: string) => s.length < n;
const hasMoreThan = (n: number) => (s: string) => s.length > n;

const hasLessThan5 = hasLessThan(5);
const hasMoreThan15 = hasMoreThan(15);
const hasNoUppercase = (s: string) => !s.match(/[A-Z]/);
const hasNoDigit = (s: string) => !s.match(/\d/);
const passwordIsValid = (errors: PasswordError[]) => errors.length === 0;

type PasswordError = {
  message: string;
  code: string;
};

export type PasswordValidationResult = {
  success: boolean;
  errors: PasswordError[];
};

type CodeError =
  | "TooShortError"
  | "TooLongError"
  | "NoUppercaseError"
  | "NoDigitError";

const errorMessages: Record<CodeError, string> = {
  TooShortError: "Password must be at least 5 characters",
  TooLongError: "Password must be at most 15 characters",
  NoUppercaseError: "Password must contain at least one uppercase letter",
  NoDigitError: "Password must contain at least one digit",
};

const fillErrors = (codes: string[]) => {
  const errors: PasswordError[] = [];
  return codes.reduce((errors, code) => {
    errors.push({
      message: errorMessages[code as CodeError],
      code,
    });
    return errors;
  }, errors);
};

export const passwordValidator = (
  password: string
): PasswordValidationResult => {
  const codes: CodeError[] = [];

  if (hasLessThan5(password)) {
    codes.push("TooShortError");
  }

  if (hasMoreThan15(password)) {
    codes.push("TooLongError");
  }

  if (hasNoUppercase(password)) {
    codes.push("NoUppercaseError");
  }

  if (hasNoDigit(password)) {
    codes.push("NoDigitError");
  }

  const errors = fillErrors(codes);

  return {
    success: passwordIsValid(errors),
    errors: errors,
  };
};
