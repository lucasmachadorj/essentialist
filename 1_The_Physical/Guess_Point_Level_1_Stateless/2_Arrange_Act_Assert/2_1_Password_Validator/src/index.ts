export const passwordValidator = (password: string) => {
  if (!password.match(/[A-Z]/)) {
    return {
      success: false,
      error: ["Password must contain at least one uppercase letter"],
    };
  }
  return {
    success: true,
    error: [],
  };
};
