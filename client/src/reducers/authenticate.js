const initialState = {
  isAuthenticated: false,
  userId: '',
}

const authenticate = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_USER': {
      const userId = action.users.result;
      return {
        isAuthenticated: true,
        userId,
      };
    }
    case 'LOGOUT_USER': {
      return {
        isAuthenticated: false,
        userId: '',
      }
    }
    default: return state;
  }
}

export const isAuthenticated = (state) => state.isAuthenticated;

export const getAuthenticatedUserId = (state) => state.userId;

export default authenticate;
