import axios from 'axios';

export const FETCH_USERS="FETCH_USERS";

export const REGISTER = 'REGISTER'
export const LOGIN = 'LOGIN'
export const LOGOUT = "LOGOUT";
export const RESET ="RESET";
export const CONTACT = "CONTACT";

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
export function register(user){
	return (dispatch)=>{
		axios.post(`${ROOT_URL}/register`,user)
			.then((response)=>{
				console.log(response);
				dispatch({type : REGISTER, payload : response});
			}).catch((err)=>{
				console.log(err.response);
				dispatch({type : REGISTER, payload : err.response});
			});
	}
}
//login
export function login(user){
	return (dispatch)=>{
		axios.post(`${ROOT_URL}/login`,user)
			.then((response)=>{
				saveToken(response.data.token);
				dispatch({type : LOGIN, payload : response});
			}).catch((err)=>{
				dispatch({type : LOGIN, payload : err.response});
			});
	}

}
// logout
export function logout(){
	window.localStorage.removeItem('user-token');
	return {
		type : LOGOUT
	}
}

// CONTACT
export function contact(data){
	return (dispatch)=>{
		axios.post(`${ROOT_URL}/contact`,data)
			.then((response)=>{
				console.log(response);
				console.log(response.data);
				dispatch({type : CONTACT, payload : response});
			}).catch(err=>{
				dispatch({type : CONTACT, payload : err.response});
			});
	}
}


//reset
export function reset(){
	return{
		type : RESET
	}
}







