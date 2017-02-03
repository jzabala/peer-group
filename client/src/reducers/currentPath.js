import { combineReducers } from 'redux';

const id = (state = null, action) => {
  switch(action.type) {
    case 'FETCH_CURRENT_PATH_SUCCESS': {
      return action.response.result;
    }
    default: return state;
  }
}

const isFeching = (state = false, action) => {
  switch(action.type) {
    case 'FETCH_CURRENT_PATH_REQUEST': {
      return true;
    }
    case 'FETCH_CURRENT_PATH_SUCCESS':
    case 'FETCH_CURRENT_PATH_FAILURE': {
      return false;
    }
    default: return state;
  }
}

const currentPath = combineReducers({
  id,
  isFeching,
});

export default currentPath;

export const getCurrentPathId = (state) => state.id;
export const getCurrentPathIsFeching = (state) => state.isFeching;
