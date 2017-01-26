

const flashMessages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FLASH_MESSAGE': {
      return [...state, { ...action.message }];
    }
    case 'REMOVE_FLASH_MESSAGE': {
      return state.filter((message, index) => index !== action.index);      
    }
    case 'UPDATE_FLASH_MESSAGE': {
      return state.map((message, index) => {
        if(index === action.index) {
          return { ...message, ...action.message };
        }
        return message;
      });
    }
    default: return state;
  }
}

export default flashMessages;
