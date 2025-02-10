import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; 
import { composeWithDevTools } from '@redux-devtools/extension'; // Use only this
import userReducer from './reducers/userReducer';
import eventReducer from './reducers/eventReducer';

const rootReducer = combineReducers({
  user: userReducer,
  events: eventReducer,
});

const initialState = {
  user: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
    error: null,
  },
  events: {
    events: [],
    error: null,
  }
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
