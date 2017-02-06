import R from 'ramda';
import validate from 'validate.js';

export const trace = R.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

export const validateAsync = R.curry(
  (constrains, data) => validate.async(data, constrains),
);

export const isNotEmpty = x => !R.isEmpty(x);

export const parseToUserPath = (data, user) => ({
  path: data.path,
  username: user.username,
  status: 'stated',
  milestones: [
    {
      milestoneId: data.milestone.milestoneId,
      status: data.milestone.status,
    },
  ],
  history: [
    {
      milestoneId: data.milestone.milestoneId,
      status: data.milestone.status,
    },
  ],
});
