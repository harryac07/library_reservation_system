import {FETCH_BOOKS,FETCH_BOOK,FETCH_BOOK_BY_CATEGORY,FETCH_BOOK_BY_SEARCH} from '../actions/bookActions';
import _ from 'lodash';

export default function(state=[],action){
	switch(action.type){
		case FETCH_BOOKS:
			// console.log(action.payload.data); //[book1, book2, ....]
			return action.payload.data;
		case FETCH_BOOK:
			const book = action.payload.data;
			// console.log(book);
			return book;
		case FETCH_BOOK_BY_CATEGORY:
			const books = action.payload.data;
			return books;
		case FETCH_BOOK_BY_SEARCH:
			return action.payload.data;
		default:
			return state;
	}
}