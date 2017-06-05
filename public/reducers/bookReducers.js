import {FETCH_BOOKS,FETCH_BOOK,FETCH_BOOK_BY_CATEGORY,FETCH_BOOK_BY_SEARCH,SORT_BOOKLIST,FETCH_CART_ITEMS,RESERVE_BOOKS}
	from '../actions/bookActions';
import _ from 'lodash';

export default function(state=[],action){
	switch(action.type){
		case FETCH_BOOKS:
			//add prev sate and payload and return uniq
	      	return _.uniqWith([...action.payload.data,...state], _.isEqual);
		case FETCH_BOOK:
			const newState =_.uniqWith(_.concat(state,action.payload.data), _.isEqual);
			return _.filter(newState,(obj)=>obj._id === action.payload.data._id);
		case FETCH_BOOK_BY_CATEGORY:
			const categoryState = _.uniqWith([...action.payload.data,...state], _.isEqual);
			return _.intersectionWith(categoryState,action.payload.data, _.isEqual);
		case FETCH_BOOK_BY_SEARCH:
			const searchedState = _.uniqWith([...action.payload.data,...state], _.isEqual);
			return _.intersectionWith(searchedState,action.payload.data, _.isEqual);
		case SORT_BOOKLIST:
			const sortedList = _.orderBy(state,'title', action.payload);
			return sortedList;
		case FETCH_CART_ITEMS:
			const cartState = _.uniqWith([...action.payload.data,...state], _.isEqual);
			return _.intersectionWith(action.payload.data,cartState, _.isEqual);

		default:
			return state;
	}
}