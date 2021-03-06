import axios from 'axios';

export const FETCH_USER="FETCH_USER";
export const RESET = "RESET";
export const REMOVE_RESERVE_BOOKS = "REMOVE_RESERVE_BOOKS";
export const RESETPASSWORD = "RESETPASSWORD";
export const CHANGEPASSWORD = "CHANGEPASSWORD";
export const REQUESTPASSWORDCHANGE = "REQUESTPASSWORDCHANGE";
export const UPDATEUSER = "UPDATEUSER";
export const DELETEUSER = "DELETEUSER";

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
//request password reset during login
export function requestPasswordReset(email){
	return dispatch=>{
		return axios.post(`${ROOT_URL}/request-password-reset`,email)
			.then(response=>{
				// console.log('email success '+response.data);
				dispatch({type : REQUESTPASSWORDCHANGE, payload : response});
			}).catch(err=>{
				// console.log('email error '+err.response.data);
				dispatch({type : REQUESTPASSWORDCHANGE, payload : err.response});
			});
	}
}

// Reset password during login
export function resetPassword(token,password){
	return dispatch=>{
		return axios.post(`${ROOT_URL}/resetpassword/${token}`,password)
			.then(response=>{
				dispatch({type : RESETPASSWORD, payload : response});
			}).catch(err=>{
				dispatch({type : RESETPASSWORD, payload : err.response});
			});
	}
}
// Change password after login
export function changePassword(userid,password){
	return dispatch=>{
		return axios.post(`${ROOT_URL}/changepassword/${userid}`,password)
			.then(response=>{
				dispatch({type : CHANGEPASSWORD, payload : response});
			}).catch(err=>{
				dispatch({type : CHANGEPASSWORD, payload : err.response});
			});
	}
}
// Update user info
export function updateUser(userInfo,userId){
	return dispatch=>{
		return axios.put(`${ROOT_URL}/user/${userId}`,userInfo)
			.then(response=>{
				dispatch({type : UPDATEUSER, payload : response});
			}).catch(err=>{
				dispatch({type : UPDATEUSER, payload : err.response});
			});
	}
}

//Delete User
export function deleteUser(userId){
	return dispatch=>{
		return axios.delete(`${ROOT_URL}/user/${userId}`);
	}
}

//reset state
export function reset(){
	return{
		type : RESET
	}
}