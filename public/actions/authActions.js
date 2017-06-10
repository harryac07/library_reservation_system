import axios from 'axios';

export const FETCH_USERS="FETCH_USERS";

export const REGISTER = 'REGISTER'
export const LOGIN = 'LOGIN'
export const LOGOUT = "LOGOUT";
export const RESET ="RESET";

const ROOT_URL = "http://localhost:3000/api";

//save token
export function saveToken(token){
	window.localStorage['user-token'] = token;
}
//get token
export function getToken(){
	return window.localStorage['user-token'];
}
//register
export function registerResult(data){
  	return {
    	type: REGISTER,
    	payload : data
  	}
}
//register
export function register(user){
	return (dispatch)=>{
		axios.post(`${ROOT_URL}/register`,user)
			.then((response)=>{
				console.log(response);
				dispatch(registerResult(response));
			}).catch((err)=>{
				console.log(err.response);
				dispatch(registerResult(err.response));
			});
	}
}
//login
export function loginResult(response){
  	return {
    	type: LOGIN,
    	payload : response
  	}
}
//login
export function login(user){
	return (dispatch)=>{
		axios.post(`${ROOT_URL}/login`,user)
			.then((response)=>{
				saveToken(response.data.token);
				dispatch(loginResult(response));
			}).catch((err)=>{
				dispatch(loginResult(err.response));
			  	// console.log(err.response.data);
			});
	}

}
//logout
export function logout(){
	window.localStorage.removeItem('user-token');
	return {
		type : LOGOUT
	}
}
//reset
export function reset(){
	return{
		type : RESET
	}
}







