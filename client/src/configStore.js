import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import root from './reducers';

const configStore = () => {
  const store = createStore(root,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
}

export default configStore;
