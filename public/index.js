import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import promise from 'redux-promise';


import App from './Components/App';
import Book_detail from './Components/Book_detail';
import Book_lists from './Components/Book_lists';
import Cart from './Components/Cart';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDom.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
	    <BrowserRouter>
	    	<div>
	    		<Switch> 
	    			<Route path="/books/cart" component={Cart} />
	    			<Route path="/book/:id" component={Book_detail} />
	    			<Route path="/books/category/:name" component={Book_lists} />
	    			<Route exact path="/" component={App} />
	    		</Switch>
	    	</div>
	    </BrowserRouter>
    </Provider>,
	document.getElementById('root')
);
