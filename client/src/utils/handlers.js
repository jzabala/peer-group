import { addFlashMessage } from '../actions/flashMessages'

export const whenError500 = (dispatch, response) => {
  if (response.status === 500) {
    dispatch(addFlashMessage({
      type: "danger",
      strong: "Sorry!",
      text: 'something went wrong with the server. Try again later.',
      duration: 5000,
      timeout: false,
    }));
    return true;
  } else {
    return false;
  }
}
