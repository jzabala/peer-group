const paths = (state = {}, action) => {
  if (action.paths) {
    return { ...state, ...action.paths.entities.paths };
  }

  return state;
}

export const getAllPaths = (state) => Object.keys(state).map(id => state[id]);

export default paths;
