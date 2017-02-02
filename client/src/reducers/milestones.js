const milestones = (state = {}, action) => {
  if (action.paths) {
    return { ...state, ...action.paths.entities.milestones };
  }

  return state;
}

export default milestones;
