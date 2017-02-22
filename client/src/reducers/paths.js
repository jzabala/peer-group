import { combineReducers } from 'redux';
import merge from 'lodash.merge';
import milestones, * as fromMilestones from './milestones';

const byUrls = (state = {}, action) => {
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
  byUrls,
  isFeching,
  milestones,
});

export default paths;

export const getAllPaths = ({ byUrls }) => Object.keys(byUrls).map(url => byUrls[url]);
export const getPath = (state, url) => state.byUrls[url];
export const getMilestones = (state, ids) =>
  fromMilestones.getMilestones(state.milestones, ids);
export const isFechingPaths = (state) => state.isFeching;
