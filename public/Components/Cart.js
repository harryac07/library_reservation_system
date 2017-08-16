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
		const cart = this.getCartItems();
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
		if(!this.getCartItems() && this.state.totalItems!==0){
			this.setState({totalItems : 0});
		}

		if(this.getCartItems()){
			if(this.getCartItems().split(',').length!==this.state.totalItems){
				/* when cart update, update to state */
				this.setState({
					totalItems : this.getCartItems().split(',').length
				});
				this.props.fetchCartBooks(this.getCartItems().split(',')); // action 
			}	
		}
	}
	componentWillUnmount(){
		this.props.reset();
	}
	getCartItems=()=>{
		return localStorage.getItem('cartItems');
	}
	removeCartItems=()=>{
		return localStorage.removeItem('cartItems');
	}
	setCartItems=()=>{
		let cart = this.getCartItems();
		if(cart && typeof cart!==null){
			let addedBooks = cart.split(',');
			this.setState({totalItems : addedBooks.length})

		}else{
			this.setState({totalItems : 0});
		}
	}
	deleteCartItems=(bookId)=>{
		let bookToRemove = this.getCartItems().split(',');
		let booksAfterRemove = _.pull(bookToRemove, bookId);
		this.removeCartItems();
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
		this.removeCartItems();
		this.setState({totalItems : 0});
	}
	makeReservation=()=>{
		let cart = this.getCartItems();
		let token = localStorage.getItem('user-token');
		const payload = JSON.parse(window.atob(token.split('.')[1]));
		const user =  payload.email;
		if(cart && typeof cart!==null){
			let cartBooks = cart.split(',');
			this.props.makeReservation(cartBooks,user).then(()=>{ // action 
				this.removeCartItems();
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
		const {books} = this.props.books;
		if(!books){
			return (
				<div className="well" style={{textAlign:'center'}}>
					<i className="fa fa-spinner fa-spin" style={{fontSize:"28px"}}></i>
				</div>
			);
		}else if(!this.getCartItems()){
			return (<div className="well" style={{textAlign:'center'}}><h3>Your Cart is Empty!</h3></div>);
		}
		return _.map(books,(book,i)=>{
			return(
				<div className="col-sm-12 col-md-12 col-xs-12 cartItem" key={book._id}>
					<div className="row">
						<div className="col-xs-3 col-sm-2 col-md-2" onClick={(e)=>this.renderBook(e,book._id)}>
							<img src={book.image} style={{height:80,width:70}} />
						</div>
						<div className="col-xs-6 col-sm-8 col-md-8">
							<h4><strong>{book.title}</strong></h4><span><strong>By {book.author}</strong></span>
							<p>{book.description?_.truncate(book.description,{'length':60}):'no description'}</p>
						</div>
						<div className="col-xs-3 col-sm-2 col-md-2" onClick={(e)=>this.removeFromCart(e,book._id)}>
							<button className="btn btn-sm btn-remove">
								<span className="glyphicon glyphicon-trash"></span>
							</button>
						</div>
					</div>
					<hr />
				</div>
			);
		});
	}
	render(){
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



