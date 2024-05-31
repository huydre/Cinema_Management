import { createStore } from 'redux';
import reducer from '../reducer/reducer';

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
      // ignore write errors
    }
  };
  
  const persistedState = loadState();
  
  const store = createStore(reducer, persistedState);
  
  store.subscribe(() => {
    saveState(store.getState());
  });
  
  export default store;