import { combineReducers } from 'redux';
import milestones, * as fromMilestones from './milestones';
import currentPath, * as fromCurrent from './currentPath';

const byIds = (state = {}, action) => {
  if (action.response && action.response.entities.paths) {
    return { ...state, ...action.response.entities.paths };
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
  current: currentPath,
});

export default paths;

export const getAllPaths = ({ byIds }) => Object.keys(byIds).map(id => byIds[id]);
export const getPath = (state, id) => state.byIds[id];
export const getMilestones = (state, ids) =>
  fromMilestones.getMilestones(state.milestones, ids);

export const getCurrentPathId = (state) => fromCurrent.getCurrentPathId(state.current);
export const getCurrentPathIsFeching = (state) =>
  fromCurrent.getCurrentPathIsFeching(state.current);
