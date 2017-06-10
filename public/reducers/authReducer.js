import {SAVETOKEN,GETTOKEN,ISLOGGEDIN,REGISTER,REGISTER_SUCCESS,REGISTER_FAILURE,
	LOGIN,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT,RESET}
	from '../actions/authActions';
import {FETCH_USER} from '../actions/userActions';
import _ from 'lodash';

export default function(state=[],action){
	switch(action.type){
		case REGISTER:
			return action.payload;
		case LOGIN:
			return action.payload; // return token
		case FETCH_USER:
			return action.payload;
		case RESET:
			console.log('reset');
			state=[];
			return state;
		default:
			return state;
	}
}
