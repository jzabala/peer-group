import { combineReducers } from 'redux';
import milestones from './milestones';

const byIds = (state = {}, action) => {
  if (action.paths) {
    return { ...state, ...action.paths.entities.paths };
  }

  return state;
}

const paths = combineReducers({
  byIds,
  milestones,
});

export const getAllPaths = ({ byIds }) => Object.keys(byIds).map(id => byIds[id]);

export default paths;
