export const passwordValidator = (password: string) => {
  if (password.length < 5) {
    return {
      success: false,
      error: ["Password must be at least 5 characters"],
    };
  }

  if (!password.match(/[A-Z]/)) {
    return {
      success: false,
      error: ["Password must contain at least one uppercase letter"],
    };
  }

  if (!password.match(/\d/)) {
    return {
      success: false,
      error: ["Password must contain at least one digit"],
    };
  }

  return {
    success: true,
    error: [],
  };
};
