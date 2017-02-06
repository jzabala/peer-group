import { validateAsync } from '../utils/functions';

export const validateAuth = validateAsync({
  username: {
    presence: {
      message: "^Username can't be black",
    },
  },
  password: {
    presence: true,
  },
});
