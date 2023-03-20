const hasLessThan = (n: number) => (s: string) => s.length < n;
const hasMoreThan = (n: number) => (s: string) => s.length > n;

const hasLessThan5 = hasLessThan(5);
const hasMoreThan15 = hasMoreThan(15);
const hasNoUppercase = (s: string) => !s.match(/[A-Z]/);
const hasNoDigit = (s: string) => !s.match(/\d/);
const passwordIsValid = (errors: string[]) => errors.length === 0;

type PasswordError = string;

export type PasswordValidationResult = {
  success: boolean;
  errors: PasswordError[];
};

export const passwordValidator = (
  password: string
): PasswordValidationResult => {
  const errors = [];

  if (hasLessThan5(password)) {
    errors.push("Password must be at least 5 characters");
  }

  if (hasMoreThan15(password)) {
    errors.push("Password must be at most 15 characters");
  }

  if (hasNoUppercase(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (hasNoDigit(password)) {
    errors.push("Password must contain at least one digit");
  }

  return {
    success: passwordIsValid(errors),
    errors: errors,
  };
};
