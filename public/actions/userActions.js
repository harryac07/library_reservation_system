import axios from 'axios';

export const FETCH_USER="FETCH_USER";
export const RESET = "RESET";
export const REMOVE_RESERVE_BOOKS = "REMOVE_RESERVE_BOOKS";

const ROOT_URL = "http://localhost:3000/api";

export function returnUser(user){
	return{
		type : FETCH_USER,
		payload : user
	}
}
export function fetchUser(userId){
	return (dispatch)=>{
		axios.get(`${ROOT_URL}/user/${userId}`)
			.then((response)=>{
				dispatch(returnUser(response));
			}).catch((err)=>{
				dispatch(returnUser(err.response));
			});
	}
}
//return removeReservation
export function returnRemoveReservation(user){
	return{
		type : REMOVE_RESERVE_BOOKS,
		payload:user
	}
}
//Remove reservation Put method
export function removeReservation(bookId,user){
	return(dispatch)=>{
		axios.put(`${ROOT_URL}/book/remove-reservation/${bookId}?user=${user}`)
			.then((response)=>{
				dispatch(returnRemoveReservation(response));
			}).catch((err)=>{
				dispatch(returnRemoveReservation(err.response));
			});
	}
}
//reset state
export function reset(){
	return{
		type : RESET
	}
}