import R from 'ramda';
import { normalize, schema } from 'normalizr';

const normalizer = R.curry((schema, data) => normalize(data, schema));

const user = new schema.Entity('users', {}, { idAttribute: 'username' });

const milestone = new schema.Entity('milestones');

const path = new schema.Entity('paths', {
  milestones: [milestone],
})

const paths = [path];

const userMilestone = new schema.Entity(
  'userMilestones', {}, { idAttribute: 'milestoneId' }
)

export const normalizeUser = normalizer(user);
export const normalizePath = normalizer(path);
export const normalizePaths = normalizer(paths);
export const normalizeUserMilestone = normalizer(userMilestone);
