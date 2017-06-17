import React , { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchCartBooks,makeReservation,reset} from '../actions/bookActions'; // import actions here
import CategoryFrame from './Parts/CategoryFrame';
import Navigation from './Parts/Navigation';

class Cart extends Component{
	constructor(props){
		super(props);
		this.state={
			totalItems : 0
		}
	}
	componentWillMount(){
		this.setCartItems();
	}
	componentDidMount(){
		const cart = localStorage.getItem('cartItems');
		if(cart && typeof cart!==null){
			let cartBooks = cart.split(',');
			this.props.fetchCartBooks(cartBooks); // action 
		}
	}
	shouldComponentUpdate(nextProp, nextState) {
        return !(_.isEqual(nextProp, this.props) && _.isEqual(nextState, this.state));
    }
	componentDidUpdate(){
		/* update number of cartitems in every cart update in navigation */
		if(!localStorage.getItem('cartItems') && this.state.totalItems!==0){
			this.setState({totalItems : 0});
		}

		if(localStorage.getItem('cartItems')){
			if(localStorage.getItem('cartItems').split(',').length!==this.state.totalItems){
				/* when cart update, update to state */
				this.setState({
					totalItems : localStorage.getItem('cartItems').split(',').length
				});
				this.props.fetchCartBooks(localStorage.getItem('cartItems').split(',')); // action 
			}	
		}
	}
	componentWillUnmount(){
		this.props.reset();
	}
	setCartItems=()=>{
		let cart = localStorage.getItem('cartItems');
		if(cart && typeof cart!==null){
			let addedBooks = cart.split(',');
			this.setState({totalItems : addedBooks.length})

		}else{
			this.setState({totalItems : 0});
		}
	}
	deleteCartItems=(bookId)=>{
		let bookToRemove = localStorage.getItem('cartItems').split(',');
		let booksAfterRemove = _.pull(bookToRemove, bookId);
		localStorage.removeItem('cartItems');
		if(booksAfterRemove.length>0){
			localStorage.setItem('cartItems',booksAfterRemove);
			this.setState({totalItems : booksAfterRemove.length});
			this.props.fetchCartBooks(booksAfterRemove); // action (refetch the remained books in cart)
		}else{
			this.setState({totalItems : 0});
		}

	}
	removeFromCart=(e,bookId)=>{
		this.deleteCartItems(bookId);
	}
	emptyCart=()=>{
		/* clear all cart items completely */
		localStorage.removeItem('cartItems'); 
		this.setState({totalItems : 0});
	}
	makeReservation=()=>{
		let cart = localStorage.getItem('cartItems');
		let token = localStorage.getItem('user-token');
		const payload = JSON.parse(window.atob(token.split('.')[1]));
		const user =  payload.email;
		if(cart && typeof cart!==null){
			let cartBooks = cart.split(',');
			this.props.makeReservation(cartBooks,user).then(()=>{ // action 
				localStorage.removeItem('cartItems');
				this.setState({totalItems : 0});
				this.props.history.push('/reservation');
			}); 
		}
	}
	renderBook=(e,bookId)=>{
		this.props.history.push(`/book/${bookId}`);
		e.preventDefault();
	}
	renderCartList=()=>{
		const books = this.props.books;
		if(!books){
			return (<div className="well" style={{textAlign:'center'}}><h3>Loading...</h3></div>);
		}else if(!localStorage.getItem('cartItems')){
			return (<div className="well" style={{textAlign:'center'}}><h3>Your Cart is Empty!</h3></div>);
		}
		return books.map((book,i)=>{
			return(
				<div className="col-sm-12 col-md-12 col-xs-12" key={book._id}>
					<div style={{float:'left',padding:'10px 20px'}} onClick={(e)=>this.renderBook(e,book._id)}>
						<img src="/images/books.jpg" style={{height:80,width:70}} />
					</div>
					<div style={{float:'left',padding:'10px 20px'}}>
						<h4>{book.title}</h4>&nbsp;<span><strong>By {book.author}</strong></span>
						<p>This is just a demo ! real rendering will happen</p>
					</div>
					<div onClick={(e)=>this.removeFromCart(e,book._id)}>
						<button className="btn btn-danger remove">Remove</button>
					</div>
				</div>
			);
		});
	}
	render(){
		const space = '&nbsp;';
		return(
			<div>
				<Navigation />
				<div className="container category_nav">
					<div className="row">
						<CategoryFrame />
						<div className="col-sm-10">
							<div>
							    Home <span className="glyphicon glyphicon-chevron-right"></span>&nbsp;
							    <span style={{color:"gray"}}>Your Cart</span>&nbsp;
							    <span className="glyphicon glyphicon-chevron-right"></span>&nbsp;
							    <span style={{color:"gray"}}>items : <strong>{this.state.totalItems}</strong> </span>
							</div>
							<h2 className="text-center">Your Books</h2>	
							<div className="row">
								{this.renderCartList()}
							</div>
							{
								this.state.totalItems>0
									?
										<div style={{float:'left',padding:'10px 20px'}}>					
											<button className="btn btn-primary" onClick={()=>this.makeReservation()}>Make Reservation</button>&nbsp;
											<button className="btn btn-danger" onClick={()=>this.emptyCart()}>Empty Cart</button>
											
										</div>
									: null
							}	
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		books : state.books
	};
}

export default connect(mapStateToProps,{fetchCartBooks,makeReservation,reset})(Cart);



