import axios from 'axios';

export const FETCH_BOOKS="FETCH_BOOKS";
export const FETCH_BOOK="FETCH_BOOK";
export const FETCH_BOOK_BY_CATEGORY="FETCH_BOOK_BY_CATEGORY";
export const FETCH_BOOK_BY_SEARCH="FETCH_BOOK_BY_SEARCH";
export const SORT_BOOKLIST = "SORT_BOOKLIST";
export const FETCH_CART_ITEMS ="FETCH_CART_ITEMS";
export const RESERVE_BOOKS = "RESERVE_BOOKS";

const ROOT_URL = "http://localhost:3000/api";

// Fetch Books 
export function fetchBooks(){
	const request = axios.get(ROOT_URL+"/books?sort=rating");
	return{
		type : FETCH_BOOKS,
		payload : request // returns promise as a payload
	};
}

// Fetch a book
export function fetchBook(bookId){
	const request = axios.get(`${ROOT_URL}/book/${bookId}`);
	return{
		type : FETCH_BOOK,
		payload : request
	};
}
// Fetch by category
export function fetchByCategory(categoryName){
	const request = axios.get(`${ROOT_URL}/book/category/${categoryName}`);
	return{
		type : FETCH_BOOK_BY_CATEGORY,
		payload : request
	};
}
// Fetch by search input
export function fetchBySearch(searchTerm){
	const request = axios.get(`${ROOT_URL}/book/search/${searchTerm}`);
	return{
		type : FETCH_BOOK_BY_SEARCH,
		payload : request
	};
}
//Sort book by user choice
export function sortBookList(keyword){
	return{
		type : SORT_BOOKLIST,
		payload : keyword
	}
}
// Fetch Books in Cart
export function fetchCartBooks(books){
	const request = axios.post(`${ROOT_URL}/book/cart`,books);
		return{
			type : FETCH_CART_ITEMS,
			payload:request
		}
	
}
// Reserve Books in cart and send notification to client
export function makeReservation(books){
	const request = axios.post(`${ROOT_URL}/book/cart/reserve`,books);
		return{
			type : RESERVE_BOOKS,
			payload:request
		}
	
}






