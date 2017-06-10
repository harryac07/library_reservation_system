import { combineReducers } from 'redux';
import bookReducer from './bookReducers'
import userReducer from './userReducer'

export default combineReducers({
  books: bookReducer,
  users : userReducer
});