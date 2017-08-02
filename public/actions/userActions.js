import axios from 'axios';

export const FETCH_USER="FETCH_USER";
export const RESET = "RESET";
export const REMOVE_RESERVE_BOOKS = "REMOVE_RESERVE_BOOKS";

const ROOT_URL = "http://localhost:3000/api";

//fetch user
export function fetchUser(userId){
	return (dispatch)=>{
		return axios.get(`${ROOT_URL}/user/${userId}`)
			.then((response)=>{
				dispatch({type : FETCH_USER, payload : response});
			}).catch((err)=>{
				dispatch({type : FETCH_USER, payload : err.response});
			});
	}
}
//Cancel reservation delete method one by one
export function cancelReservation(bookId,user){
	return(dispatch)=>{
		return axios.put(`${ROOT_URL}/book/cancel-reservation/${bookId}?user=${user}`)
			.then((response)=>{
				// console.log('book removed!')
			}).catch((err)=>{
				// dispatch({type : REMOVE_RESERVE_BOOKS, payload : err.response});
			});
	}
}
//Remove reservation in a bulk
export function removeReservation(books,user){
	console.log('action books '+books.length);
	return(dispatch)=>{
		return axios.post(`${ROOT_URL}/book/remove-reservation?user=${user}`,books)
			.then((response)=>{
				// console.log('books removed!')
			}).catch((err)=>{
				// dispatch({type : REMOVE_RESERVE_BOOKS, payload : err.response});
			});
	}
}
//reset state
export function reset(){
	return{
		type : RESET
	}
}