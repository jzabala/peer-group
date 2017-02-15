import { combineReducers } from 'redux';
import merge from 'lodash.merge';

const withLogout = f => value => (state, action) =>
  action.type === 'LOGOUT_USER' ? value : f(state, action);


const isUserAuthenticated = withLogout((state = false, action) => {
  switch(action.type) {
    case 'LOGIN_USER': {
      return true;
    }
    default: return state;
  }
})(false);

const username = withLogout((state = '', action) => {
  switch(action.type) {
    case 'LOGIN_USER': {
      return action.response.result;
    }
    default: return state;
  }
})('');

const userMilestones = withLogout((state = {}, action) => {
  const response = action.response;
  if (response && response.entities.userMilestones) {
    return merge({}, state, response.entities.userMilestones);
  }

  return state;
})({});

const auth = combineReducers({
  isUserAuthenticated,
  username,
  userMilestones,
});

export default auth;

export const isAuthenticated = (state) => state.isUserAuthenticated;
export const getAuthenticatedUsername = (state) => state.username;
export const getUserMilestones = (state, ids) =>
  ids.reduce((an, ac) => {
    const userMilestone = state.userMilestones[ac];
    if (userMilestone) {
      return { ...an, [userMilestone.milestoneId]: userMilestone };
    } else {
      return an;
    }
  }, {});
