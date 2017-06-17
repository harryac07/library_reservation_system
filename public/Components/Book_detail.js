import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';

import {fetchBook,addReview,reset} from '../actions/bookActions'; // import actions here
import {fetchUser} from '../actions/userActions'; // import actions here

import Navigation from './Parts/Navigation';
import CategoryFrame from './Parts/CategoryFrame';

class Book_detail extends Component{
	constructor(props){
		super(props);
		this.state={
			itemInCart : false,
			cartMessage : false, // true only when cart is triggered
			loggedIn : false,
			reserved : false, // is book already reserved? 
			showModal: false // review modal
		};
	}
	componentWillMount(){
		/* cart handling */
		const cart = localStorage.getItem('cartItems');
		const login = localStorage.getItem('user-token');
		if(cart && typeof cart!==null){
			let addedBooks = cart.split(',');
			if(_.indexOf(addedBooks, this.props.match.params.id)!==-1){
				this.setState({
					itemInCart : true
				});
			}
		}
		/* user handling */
		if(login){
			this.setState({loggedIn:true});
		}
	}
	componentDidMount(){
		const bookId = this.props.match.params.id;
		//fetch book
		this.props.fetchBook(bookId); // action
		//fetch reserved book from user
		const token = localStorage.getItem('user-token');
		if(token){
			const payload = JSON.parse(window.atob(token.split('.')[1]));
			const bookId = this.props.match.params.id;
			this.props.fetchUser(payload._id).then(()=>{
				const reserved_book = _.find(this.props.user.data.reserved_books,(book)=>book._id == bookId);
				if(reserved_book){
					this.setState({reserved : true});
				}
			}); // action
		}
	}
	componentWillUnmount(){
		this.props.reset();
	}
	addToCart=(bookId)=>{
		const cart = localStorage.getItem('cartItems');
		// if user logged in
		if(this.state.loggedIn){
			if(!cart ){
				localStorage.setItem('cartItems',bookId);
				this.setState({
					itemInCart : true,
					cartMessage : true
				});
			}else{
				let addedBooks = cart.split(',');
				if(_.indexOf(addedBooks, bookId) ===-1){
					localStorage.setItem('cartItems',addedBooks+','+bookId);
					this.setState({
						itemInCart : true,
						cartMessage : true
					});
				}			
			}
		}else{ //  user not loggedin -> /login
			this.props.history.push('/login');
		}
	}
	removeFromCart=(bookId)=>{
		let bookToRemove = localStorage.getItem('cartItems').split(',');
		let booksAfterRemove = _.pull(bookToRemove, bookId);
		localStorage.removeItem('cartItems');
		if(booksAfterRemove.length>0){
			localStorage.setItem('cartItems',booksAfterRemove);
		}
		this.setState({
			itemInCart : false,
			cartMessage : true
		});
		
	}
	renderReviews=(reviews)=>{
		return _.map(reviews,(review,i)=>{
			return (
				<li className="list-group-item" key={review._id}>
					<div className="well">
						<span style={{fontSize:18}}><strong>{review.reviewAuthor}</strong></span>
						<span style={{float:'right'}}>{moment.utc(review.createdOn).local().format('MM.DD.YYYY')}</span>
					</div>
					<p>{review.review}</p>
				</li>
			);
		});
	}
	averageRating=(reviews)=>{
		const totalReviews = reviews.length;
		let rating = 0;
		const ratings = _.map(reviews,(review)=>{
			return rating+=review.rating;
		});
		return Math.ceil(rating / totalReviews);
	}
	//modals for review
	close=()=>{
	    this.setState({ showModal: false });
	}
	open=()=>{
		this.state.loggedIn
			? this.setState({ showModal: true })
			: this.props.history.push('/login')
	}
	submitReview=(e)=>{
		e.preventDefault();
		const bookId = this.props.book[0]._id;
		const reviews = {
			reviewAuthor : JSON.parse(window.atob(localStorage.getItem('user-token').split('.')[1])).name,
			review : this.refs.review.value,
			rating : this.refs.rating.value
		}
		this.props.addReview(bookId,reviews).then(()=>{
			this.setState({showModal : false});
			window.location.reload();
		});
	}
	renderModal=()=>{
	    return (
	      	<div>
		        <Modal show={this.state.showModal} onHide={this.close}>
		          	<Modal.Body>
		            	<div className="well text-center">
		            		<h3 className="text-center">Add your review</h3>
				            <form className="form-horizontal" onSubmit={this.submitReview}>
					            <div className="form-group">
					                <label>Rating</label>
					                <select ref="rating" className="form-control" required>
								        <option>1</option>
								        <option>2</option>
								        <option>3</option>
								        <option>4</option>
								        <option>5</option>
								    </select>
					            </div>
					            <div className="form-group">
					              <label>Review</label>
					              <textarea className="form-control" ref="review" rows="5" required></textarea>
					            </div>
					            <button className="btn btn-primary" type="submit">Submit</button>&nbsp;
					            <a className="btn btn-danger" onClick={this.close}>cancel</a>
						    </form>
		            	</div>
		          	</Modal.Body>
		        </Modal>
	      	</div>
	    );
	}
	renderBook=()=>{
		const book  = this.props.book[0];
		if(!book){
			return <div>Loading...</div>;
		}
		let averageRating = 0;
		{book.review ? averageRating = this.averageRating(book.review) : null}
		return(
			<div className="row">
				<img src = "/images/books.jpg" className="img img-responsive" style={{padding:15}} />
				<div className="col-sm-12 col-md-12">
					<h3>{book.title}</h3>
					<hr/>
					<h4>
						<span className={"glyphicon "+((averageRating>0)?"glyphicon-star":"glyphicon-star-empty")}></span>
						<span className={"glyphicon "+((averageRating>1)?"glyphicon-star":"glyphicon-star-empty")}></span>
						<span className={"glyphicon "+((averageRating>2)?"glyphicon-star":"glyphicon-star-empty")}></span>
						<span className={"glyphicon "+((averageRating>3)?"glyphicon-star":"glyphicon-star-empty")}></span>
						<span className={"glyphicon "+((averageRating>4)?"glyphicon-star":"glyphicon-star-empty")}></span>
						&nbsp;&nbsp;&nbsp;
						<span style={{cursor:'pointer'}} onClick={this.open}><small><u style={{color:'#C0392B'}}>Leave Feedback</u></small></span>
					</h4>
					<p>Quantity Available : {book.available}</p>
					<h4>By {book.author}</h4>
					<br />
					<span>
						
						{ 	this.state.reserved
								? <Link className="btn btn-primary cart_button" to="/reservation">Book Already Reserved</Link>
								:
								 	(
								 		this.state.itemInCart
										?
											<button className="btn btn-danger cart_button" onClick={()=>this.removeFromCart(book._id)}>
												Remove from cart
											</button>
										: 	<button className="btn btn-primary cart_button" onClick={()=>this.addToCart(book._id)}>Add to cart</button>
									)
						}
					</span>
					<br />
					<br />
					<div className="well">
					  	<ul className="nav nav-tabs">
						    <li className="active"><a data-toggle="tab" href="#home">Description</a></li>
						    <li><a data-toggle="tab" href="#menu1">Reviews</a></li>
					  	</ul>
					  
					  	<div className="tab-content">
						    <div id="home" className="tab-pane fade in active">
						      <h3>Description</h3>
						      <p>{book.description ? book.description : 'description not available.'}</p>
						    </div>
						    <div id="menu1" className="tab-pane fade">
						      	<h3>Reviews</h3>
						      	<p>Average rating:&nbsp;&nbsp;
									<span className={"glyphicon "+((averageRating>0)?"glyphicon-star":"glyphicon-star-empty")}></span>
									<span className={"glyphicon "+((averageRating>1)?"glyphicon-star":"glyphicon-star-empty")}></span>
									<span className={"glyphicon "+((averageRating>2)?"glyphicon-star":"glyphicon-star-empty")}></span>
									<span className={"glyphicon "+((averageRating>3)?"glyphicon-star":"glyphicon-star-empty")}></span>
									<span className={"glyphicon "+((averageRating>4)?"glyphicon-star":"glyphicon-star-empty")}></span>
									<span style={{float:'right'}}>
										<button className="btn btn-primary" onClick={this.open}>Add Review</button>
									</span>
								</p>
								<hr />
								{this.renderModal()}
						     	<ul className="list-group">
						     		{book.review && book.review.length>0 ? this.renderReviews(book.review) : 'There are no reviews for this product yet'}
						     	</ul>
						    </div>
					  	</div>
					</div>
				</div>
			</div>	
		);
	}
	render(){
		let title, category ='';
		const book = this.props.book[0];
		if(book){
			category = book.category
			title = book.title
		}

		return(
			<div>
				<Navigation cartMessage={this.state.cartMessage} itemInCart={this.state.itemInCart} currentBook={title} />
				<div className="container category_nav">
					<div className="row">
						<CategoryFrame />
						<div className="col-sm-10">
							<div>
							    Home <span className="glyphicon glyphicon-chevron-right"></span>&nbsp;
							    <span style={{color:"gray"}}>{category}</span>&nbsp;
							    <span className="glyphicon glyphicon-chevron-right"></span>&nbsp;
							    <span style={{color:"gray"}}>{title}</span>
							</div>

							{ this.renderBook() }							
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	return{
		book : state.books,
		user : state.users
	};
}

export default connect(mapStateToProps,{fetchBook,addReview,reset,fetchUser})(Book_detail);
