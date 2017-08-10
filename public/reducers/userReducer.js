import {REGISTER,LOGIN,REMOVE_RESERVE_BOOKS,CONTACT,RESET}
	from '../actions/authActions';
import {FETCH_USER,REQUESTPASSWORDCHANGE,CHANGEPASSWORD} from '../actions/userActions';
import _ from 'lodash';

export default function(state=[],action){
	switch(action.type){
		case REGISTER:
			return action.payload;
		case LOGIN:
			return action.payload; // return token
		case REQUESTPASSWORDCHANGE:
			return action.payload;
		case CHANGEPASSWORD:
			console.log('from reducer ',action.payload);
			return action.payload;
		case FETCH_USER:
			return action.payload;
		case CONTACT:
			return action.payload;
		case RESET:
			state=[];
			return state;
		default:
			return state;
	}
}
