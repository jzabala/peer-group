export const addFlashMessage = message => ({
  type: 'ADD_FLASH_MESSAGE',
  message,
});

export const removeFlashMessage = index => ({
  type: 'REMOVE_FLASH_MESSAGE',
  index,
});

export const updateFlashMessage = (index, message) => ({
  type: 'UPDATE_FLASH_MESSAGE',
  index,
  message,
});
