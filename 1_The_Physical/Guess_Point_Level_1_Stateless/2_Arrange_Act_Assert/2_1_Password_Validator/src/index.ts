export const passwordValidator = (password: string) => {
  let errors = [];

  if (password.length < 5) {
    errors.push("Password must be at least 5 characters");
  }

  if (password.length > 15) {
    errors.push("Password must be at most 15 characters");
  }

  if (!password.match(/[A-Z]/)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!password.match(/\d/)) {
    errors.push("Password must contain at least one digit");
  }

  return {
    success: errors.length === 0,
    errors: errors,
  };
};
