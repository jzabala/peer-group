const users = (state = {}, action) => {
  const response = action.response;
  if (response && response.entities.users) {
    return { ...state, ...response.entities.users };
  }
  switch(action.type) {
    case 'REMOVE_USER': {
      // eslint-disable-next-line
      const { [action.userId]:userId, ...users } = state;
      return users;
    }
    default: return state;
  }
}

export default users;
