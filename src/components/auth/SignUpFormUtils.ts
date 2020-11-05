const passwordMinLength = (constraint1: string): string => {
  return `Must be at least ${constraint1} characters`;
};

export const SignUpFormUtils = {
  passwordMinLength,
};
