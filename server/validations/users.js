export const newUserValidataions = {
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
  },
  confirmPassword: {
    presence: true,
    equality: 'password',
  },
};
