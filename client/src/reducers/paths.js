import { combineReducers } from 'redux';
import milestones from './milestones';

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
});

export const getAllPaths = ({ byIds }) => Object.keys(byIds).map(id => byIds[id]);
export const getPath = (id, state) => state[id];
export const getMilestones = (milestoneIds, state) => state;

export default paths;
