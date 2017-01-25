const BEGIN_REQUEST = 'BEGIN_REQUEST';
const END_REQUEST = 'END_REQUEST';

const isRequest = (state = false, action) => {
  switch(action.type) {
    case BEGIN_REQUEST: {
      return true;
    }
    case END_REQUEST: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export default isRequest;
