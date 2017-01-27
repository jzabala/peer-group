import R from 'ramda';

const initialState = {
  isAuthenticated: false,
  user: {},
}

const auth = (state = initialState, action) => {
  console.log(action.users);
  return state;
  /*switch(action.type) {
    case 'SET_LOGGED_USER': {
      return {
        isAuthenticated: !R.isEmpty(action.user),
        user: action.user,
      };
    }
    default: return state;
  }*/
}

export const isAuthenticated = (state) => state.isAuthenticated;

export default auth;
