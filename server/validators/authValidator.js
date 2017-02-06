import { validateAsync } from '../utils/functions';

export const validateAuth = validateAsync({
  id: {
    presence: {
      message: "^Username can't be black",
    },
  },
  password: {
    presence: true,
  },
});
