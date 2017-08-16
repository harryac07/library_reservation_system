import axios from 'axios';
import _ from 'lodash';

export const FETCH_BOOKS="FETCH_BOOKS";
export const FETCH_BOOK="FETCH_BOOK";
export const FETCH_BOOK_BY_CATEGORY="FETCH_BOOK_BY_CATEGORY";
export const FETCH_BOOK_BY_SEARCH="FETCH_BOOK_BY_SEARCH";
export const POST_BOOK = "POST_BOOK";
export const SORT_BOOKLIST = "SORT_BOOKLIST";
export const FETCH_CART_ITEMS ="FETCH_CART_ITEMS";
export const RESERVE_BOOKS = "RESERVE_BOOKS";
export const POST_RATING = "POST_RATING";
export const RESET ="RESET";
export const ERRORS = "ERRORS";

const ROOT_URL = "http://localhost:3000/api";

// return errors
export function returnErrors(data){
	return{
		type : ERRORS,
		payload : data
	}
}

// Fetch Books 
export function fetchBooks(){
	return (dispatch) =>{
		axios.get(ROOT_URL+"/books?sort=rating")
			.then((response)=>{
				dispatch({type : FETCH_BOOKS, payload : response});
			}).catch((err)=>{
				dispatch(returnErrors(err));
			});
	}
}
// Fetch a book
export function fetchBook(bookId){
	return (dispatch) =>{
		return axios.get(`${ROOT_URL}/book/${bookId}`)
			.then((response)=>{
				dispatch({type : FETCH_BOOK, payload : response});
			}).catch((err)=>{
				dispatch(returnErrors(err));
			});
	}
}
// Fetch by category
export function fetchByCategory(categoryName,activePage){ // activePage is page selected in pagination
	return (dispatch)=>{
		axios.get(`${ROOT_URL}/book/category/${categoryName}`)
			.then((response)=>{
				dispatch({type : FETCH_BOOK_BY_CATEGORY, payload : response});
			}).catch((err)=>{
				dispatch(returnErrors(err));
			});
	}
}
// Fetch by search input
export function fetchBySearch(searchTerm){
	return (dispatch)=>{
		axios.get(`${ROOT_URL}/book/search/${searchTerm}`)
			.then((response)=>{
				dispatch({type : FETCH_BOOK_BY_SEARCH, payload : response});
			}).catch((err)=>{
				dispatch(returnErrors(err));
			});
	}
}

// /POST Books
export function addNewBook(bookdata){
	return dispatch=>{
		axios.post(`${ROOT_URL}/book`,bookdata)
			.then(response=>{
				// console.log('response',response.data);
				dispatch({type : POST_BOOK, payload : response});
			}).catch(err=>{
				// console.log(err.response.data);
				dispatch({type : POST_BOOK, payload : err});
			});
	}
}
// sort book list
export function sortBookList(keyword){
	return{
		type : SORT_BOOKLIST,
		payload : keyword
	}
}
// Fetch Books in Cart
export function fetchCartBooks(books){
	return (dispatch)=>{
		return axios.post(`${ROOT_URL}/book/cart`,books)
			.then((response)=>{
				dispatch({type : FETCH_CART_ITEMS, payload : response});
			}).catch((err)=>{
				dispatch(returnErrors(err));
			});
	}	
}
// Reserve Books in cart and send notification to client
export function makeReservation(books,user){
	return (dispatch)=>{
		return axios.post(`${ROOT_URL}/book/cart/reserve?user=${user}`,books)
			.then((response)=>{
				// dispatch({type : RESERVE_BOOKS, payload : response});
			}).catch((err)=>{
				// dispatch(returnErrors(err));
			});
	}
	
}

// remove reservation is handled in useractions


// add review
export function addReview(bookId,reviewData){
	return dispatch=>{
		return axios.post(`${ROOT_URL}/book/${bookId}/review`,reviewData)
			.then(response=>{
				dispatch({type : POST_RATING, payload : response});
			}).catch(err=>{
				dispatch(returnErrors(err));
			});
	}
}


//reset
export function reset(){
	return{
		type : RESET
	}
}




