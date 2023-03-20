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

export const passwordValidator = (
  password: string
): PasswordValidationResult => {
  const errors: Array<PasswordError> = [];

  if (hasLessThan5(password)) {
    errors.push({
      message: "Password must be at least 5 characters",
      code: "TooShortError",
    });
  }

  if (hasMoreThan15(password)) {
    errors.push({
      message: "Password must be at most 15 characters",
      code: "TooLongError",
    });
  }

  if (hasNoUppercase(password)) {
    errors.push({
      message: "Password must contain at least one uppercase letter",
      code: "NoUppercaseError",
    });
  }

  if (hasNoDigit(password)) {
    errors.push({
      message: "Password must contain at least one digit",
      code: "NoDigitError",
    });
  }

  return {
    success: passwordIsValid(errors),
    errors: errors,
  };
};
