import { combineReducers } from 'redux';
import merge from 'lodash.merge';
import milestones, * as fromMilestones from './milestones';

const byIds = (state = {}, action) => {
  const response = action.response;
  if (response && response.entities.paths) {
    return merge({}, state, response.entities.paths);
  }

  return state;
}

const isFeching = (state = false, action) => {
  switch(action.type) {
    case 'FETCH_PATHS_REQUEST': {
      return true;
    }
    case 'FETCH_PATHS_SUCCESS':
    case 'FETCH_PATHS_FAILURE':{
      return false;
    }
    default: return state;
  }
}

const paths = combineReducers({
  byIds,
  isFeching,
  milestones,
});

export default paths;

export const getAllPaths = ({ byIds }) => Object.keys(byIds).map(id => byIds[id]);
export const getPath = (state, id) => state.byIds[id];
export const getMilestones = (state, ids) =>
  fromMilestones.getMilestones(state.milestones, ids);
