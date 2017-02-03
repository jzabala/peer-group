import { combineReducers } from 'redux';

const byIds = (state = {}, action) => {
  if (action.response && action.response.entities.milestones) {
    return { ...state, ...action.response.entities.milestones };
  }

  return state;
}

const milestones = combineReducers({
  byIds,
});

export default milestones;
