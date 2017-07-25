
import {FETCH_BOOKS,FETCH_BOOK,FETCH_BOOK_BY_CATEGORY,FETCH_BOOK_BY_SEARCH,SORT_BOOKLIST,FETCH_CART_ITEMS,RESERVE_BOOKS,RESET,ERRORS}
	from '../actions/bookActions';
import _ from 'lodash';

const initialState={
  	fetched: false,
  	books : []
};
export default function(state=initialState,action){
	switch(action.type){
		case FETCH_BOOKS:
			//add prev sate and payload and return uniq
	      	return Object.assign({},state,{
	      		fetched : true,
	      		books : action.payload.data
	      	});
		case FETCH_BOOK:
	      	return Object.assign({},state,{
	      		fetched : true,
	      		books : action.payload.data
	      	});
		case FETCH_BOOK_BY_CATEGORY:
	      	return Object.assign({},state,{
	      		fetched : true,
	      		// books : _.orderBy(action.payload.data,'title', 'ASC')
	      		books : action.payload.data
	      	});
		case FETCH_BOOK_BY_SEARCH:
	      	return Object.assign({},state,{
	      		fetched : true,
	      		books : action.payload.data
	      	});
		case SORT_BOOKLIST:
	      	return Object.assign({},state,{
	      		fetched : true,
	      		books : state.books,
	      		sort : action.payload // sort keywords
	      	});
		case FETCH_CART_ITEMS:
	      	return Object.assign({},state,{
	      		fetched : true,
	      		books : action.payload.data
	      	});
		case RESERVE_BOOKS:
	      	return Object.assign({},state,{
	      		fetched : true,
	      		books : action.payload.data
	      	});
		case ERRORS:
			state={
				fetched:false,
				books:[]
			};
			return state;
		case RESET:
			state={
				fetched:false,
				books:[]
			};
			return state;
		default:
			return state;
	}
}