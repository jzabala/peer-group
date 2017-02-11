import shortid from 'shortid';

export const addFlashMessage = message => ({
  type: 'ADD_FLASH_MESSAGE',
  message: {
    id: shortid.generate(),
    ...message,
  },
});

export const removeFlashMessage = id => ({
  type: 'REMOVE_FLASH_MESSAGE',
  id,
});

export const updateFlashMessage = (message) => ({
  type: 'UPDATE_FLASH_MESSAGE',
  message,
});
