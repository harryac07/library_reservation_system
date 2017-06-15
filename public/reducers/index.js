import { combineReducers } from 'redux';
import bookReducer from './bookReducers'
import userReducer from './userReducer'
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  books: bookReducer,
  users : userReducer,
  form : formReducer
});