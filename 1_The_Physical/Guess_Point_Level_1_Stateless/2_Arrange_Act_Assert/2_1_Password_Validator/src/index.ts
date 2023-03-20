export const passwordValidator = (password: string) => {
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
