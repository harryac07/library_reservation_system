import axios from 'axios';

export const FETCH_BOOKS="FETCH_BOOKS";
export const FETCH_BOOK="FETCH_BOOK";
export const FETCH_BOOK_BY_CATEGORY="FETCH_BOOK_BY_CATEGORY";
export const FETCH_BOOK_BY_SEARCH="FETCH_BOOK_BY_SEARCH";

const ROOT_URL = "http://localhost:3000/api";

// Fetch Books 
export function fetchBooks(){
	const request = axios.get(ROOT_URL+"/books");
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