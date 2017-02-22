import R from 'ramda';
import validate from 'validate.js';
import graphqlFields from 'graphql-fields';

export const trace = R.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

export const validateAsync = R.curry(
  (constrains, data) => validate.async(data, constrains),
);

export const isNotEmpty = x => !R.isEmpty(x);

export const getProjection = obj =>
  Object.keys(obj).join(' ');

export const getProjectionFromGraphQL =
  R.compose(getProjection, graphqlFields);

export const parseToUserPath = (data, user) => ({
  pathUrl: data.pathUrl,
  username: user.username,
  status: 'stated',
  milestones: [
    {
      milestoneId: data.milestone.milestoneId,
      percentage: data.milestone.percentage,
    },
  ],
  history: [
    {
      milestoneId: data.milestone.milestoneId,
      percentage: data.milestone.percentage,
    },
  ],
});
