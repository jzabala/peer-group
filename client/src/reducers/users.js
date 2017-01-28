const users = (state = {}, action) => {
  if (action.users) {
    return { ...state, ...action.users.entities.users };
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
