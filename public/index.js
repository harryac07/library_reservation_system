import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk'; // allow return function insted of plain obj


import App from './Components/App';
import Book_detail from './Components/Book_detail';
import Book_lists from './Components/Book_lists';
import Cart from './Components/Cart';
import Register from './Components/Register';
import Login from './Components/Login';
import Reservation from './Components/Reservation';


const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);

ReactDom.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
	    <BrowserRouter>
	    	<div>
	    		<Switch>
	    			<Route path="/login" component={Login} /> 
	    			<Route path="/register" component={Register} /> 
	    			<Route path="/reservation" component={Reservation} /> 
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
