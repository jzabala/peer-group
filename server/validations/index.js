import { newUserConstrains } from './users';
import { newPathConstrains } from './paths';
import { validateAsync } from '../utils/functions';

export const validateNewUser = validateAsync(newUserConstrains);

export const validateNewPath = validateAsync(newPathConstrains);
