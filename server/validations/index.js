import { newUserConstrains } from './users';
import { newPathConstrains } from './paths';
import { validatorAsync } from '../utils/functions';

export const validateNewUser = validatorAsync(newUserConstrains);

export const validateNewPath = validatorAsync(newPathConstrains);
