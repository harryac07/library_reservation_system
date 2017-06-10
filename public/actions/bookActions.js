import axios from 'axios';

export const FETCH_BOOKS="FETCH_BOOKS";
export const FETCH_BOOK="FETCH_BOOK";
export const FETCH_BOOK_BY_CATEGORY="FETCH_BOOK_BY_CATEGORY";
export const FETCH_BOOK_BY_SEARCH="FETCH_BOOK_BY_SEARCH";
export const SORT_BOOKLIST = "SORT_BOOKLIST";
export const FETCH_CART_ITEMS ="FETCH_CART_ITEMS";
export const RESERVE_BOOKS = "RESERVE_BOOKS";
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

//return all books
export function returnFetchBooks(data){
	return{
		type : FETCH_BOOKS,
		payload : data
	}
}
// Fetch Books 
export function fetchBooks(){
	return (dispatch) =>{
		axios.get(ROOT_URL+"/books?sort=rating")
			.then((response)=>{
				dispatch(returnFetchBooks(response));

			}).catch((err)=>{
				dispatch(returnErrors(err));
			});
	}
}
//return each book
export function returnFetchBook(data){
	return{
		type : FETCH_BOOK,
		payload : data
	}
}
// Fetch a book
export function fetchBook(bookId){
	return (dispatch) =>{
		axios.get(`${ROOT_URL}/book/${bookId}`)
			.then((response)=>{
				dispatch(returnFetchBook(response));

			}).catch((err)=>{
				dispatch(returnErrors(err));
			});
	}
}
//return category
export function returnCategory(data){
	return{
		type : FETCH_BOOK_BY_CATEGORY,
		payload : data
	}
}
// Fetch by category
export function fetchByCategory(categoryName){
	return (dispatch)=>{
		axios.get(`${ROOT_URL}/book/category/${categoryName}`)
			.then((response)=>{
				dispatch(returnCategory(response));

			}).catch((err)=>{
				dispatch(returnErrors(err));
			});
	}


}
//return books by search 
export function returnFetchBySearch(data){
	return{
		type : FETCH_BOOK_BY_SEARCH,
		payload : data
	}
}
// Fetch by search input
export function fetchBySearch(searchTerm){
	return (dispatch)=>{
		axios.get(`${ROOT_URL}/book/search/${searchTerm}`)
			.then((response)=>{
				dispatch(returnFetchBySearch(response));

			}).catch((err)=>{
				dispatch(returnErrors(err));
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

//return fetchCartBooks
export function returnFetchCartBooks(books){
	return{
		type : FETCH_CART_ITEMS,
		payload:books
	}
}
// Fetch Books in Cart
export function fetchCartBooks(books){
	return (dispatch)=>{
		axios.post(`${ROOT_URL}/book/cart`,books)
			.then((response)=>{
				dispatch(returnFetchCartBooks(response));

			}).catch((err)=>{
				dispatch(returnErrors(err));
			});
	}	
}
//return makeReservation
export function returnMakeReservation(request){
	return{
		type : RESERVE_BOOKS,
		payload:request
	}
}
// Reserve Books in cart and send notification to client
export function makeReservation(books,user){
	return (dispatch)=>{
		axios.post(`${ROOT_URL}/book/cart/reserve?user=${user}`,books)
			.then((response)=>{
				dispatch(returnMakeReservation(response));

			}).catch((err)=>{
				dispatch(returnErrors(err));
			});
	}
	
}

// remove reservation is handled in useractions


//reset
export function reset(){
	return{
		type : RESET
	}
}

// export function register(user){
// 	return (dispatch)=>{
// 		axios.post(`${ROOT_URL}/register`,user)
// 			.then((response)=>{
// 				console.log(response.status);
// 				dispatch(registerSuccess(response.data));
// 			}).catch((err)=>{
// 				dispatch(returnErrors(err));
// 			});
// 	}
// }




