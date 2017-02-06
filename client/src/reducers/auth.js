import { combineReducers } from 'redux';
import merge from 'lodash.merge';

const isUserAuthenticated = (state = false, action) => {
  switch(action.type) {
    case 'LOGIN_USER': {
      return true;
    }
    case 'LOGOUT_USER': {
      return false;
    }
    default: return state;
  }
}

const userId = (state = '', action) => {
  switch(action.type) {
    case 'LOGIN_USER': {
      return action.response.result;
    }
    case 'LOGOUT_USER': {
      return '';
    }
    default: return state;
  }
}

const userPaths = (state = {}, action) => {
  switch (action.type) {
    default: return state;
  }
}

const userMilestones = (state = {}, action) => {
  const response = action.response;
  if (response && response.entities.userMilestones) {
    return merge({}, state, response.entities.userMilestones);
  }

  return state;
}

const auth = combineReducers({
  isUserAuthenticated,
  userId,
  userPaths,
  userMilestones,
});

export default auth;

export const isAuthenticated = (state) => state.isUserAuthenticated;
export const getAuthenticatedUserId = (state) => state.userId;
export const getUserMilestones = (state, ids) =>
  ids.reduce((an, ac) => {
    const userMilestone = state.userMilestones[ac];
    if (userMilestone) {
      return { ...an, [userMilestone.milestoneId]: userMilestone };
    } else {
      return an;
    }
  }, {});
