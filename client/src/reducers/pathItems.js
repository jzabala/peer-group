const pathItems = (state = {}, action) => {
  if (action.paths) {
    return { ...state, ...action.paths.entities.pathItems };
  }

  return state;
}

export default pathItems;
