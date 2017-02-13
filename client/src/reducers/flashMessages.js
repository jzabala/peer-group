const flashMessages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FLASH_MESSAGE': {
      return [...state, { ...action.message }];
    }
    case 'REMOVE_FLASH_MESSAGE': {
      return state.filter((message) => message.id !== action.id);
    }
    case 'UPDATE_FLASH_MESSAGE': {
      return state.map((message) => {
        if(message.id === action.message.id) {
          return { ...message, ...action.message };
        }
        return message;
      });
    }
    default: return state;
  }
}

export default flashMessages;
