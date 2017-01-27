import R from 'ramda';
import { normalize, schema } from 'normalizr';

const normalizeCurry = R.curry((schema, data) => normalize(data, schema));

export const normalizeUser = normalizeCurry(new schema.Entity('users'));
