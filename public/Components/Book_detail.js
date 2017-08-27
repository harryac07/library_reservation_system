import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import ReactTimeout from 'react-timeout';
import Rating from 'react-rating';
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
			showModal: false, // review modal
			feedback : false, // user send review
			rating : 0
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
				const reserved_book = _.find(this.props.user.data.reserved_books,({book})=>book._id == bookId);
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
					<div className="well each_review">
						<div className="review_profile_image text-center">{_.capitalize(review.reviewAuthor.charAt(0))}</div>
						<div>
							<span>
								<strong>
									{_.startCase(review.reviewAuthor)}
								</strong>
								&nbsp;&nbsp;
								<small>
									<span className={"glyphicon "+((review.rating>0)?"glyphicon-star":"glyphicon-star-empty")}></span>
									<span className={"glyphicon "+((review.rating>1)?"glyphicon-star":"glyphicon-star-empty")}></span>
									<span className={"glyphicon "+((review.rating>2)?"glyphicon-star":"glyphicon-star-empty")}></span>
									<span className={"glyphicon "+((review.rating>3)?"glyphicon-star":"glyphicon-star-empty")}></span>
									<span className={"glyphicon "+((review.rating>4)?"glyphicon-star":"glyphicon-star-empty")}></span>
								</small>							
							</span>
							<span className="review_date"><small>{moment.utc(review.createdOn).local().format('MM.DD.YYYY')}</small></span>
							<p className="review"><span>{review.review}</span></p>
						</div>
					</div>
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
	    this.setState({ showModal: false,cartMessage : false,rating:0});
	}
	open=()=>{
		this.setState({feedback : false});
		this.state.loggedIn
			? this.setState({ showModal: true ,cartMessage:false})
			: this.props.history.push('/login')
	}
	submitReview=(e)=>{
		e.preventDefault();
		const bookId = this.props.book.books._id;
		const reviews = {
			reviewAuthor : JSON.parse(window.atob(localStorage.getItem('user-token').split('.')[1])).name,
			review : this.refs.review.value,
			rating : this.state.rating
		}
		this.props.addReview(bookId,reviews).then(()=>{
			this.setState({showModal : false,feedback : true,rating:0});
			/* recall fetchbook to update dom with new reviews*/
			const bookId = this.props.match.params.id;
			this.props.fetchBook(bookId); // action
		});
	}
	renderModal=()=>{
	    return (
	      	<div>
		        <Modal show={this.state.showModal} onHide={this.close}>
		          	<Modal.Body>
		          		<div className="modal_wrap_content">
			            	<div className="well text-center">
			            		<h3 style={{color:'#C0392B'}}>Add your review</h3>
			            		<hr style={{backgroundColor:"#2C3E50",height:3,border:'none'}} />
					            <form className="form-horizontal review_form" onSubmit={this.submitReview}>
						            <div className="form-group">
						                <label><strong>Rating</strong></label><br/>
										<Rating
											name="react"
										 	empty="fa fa-star-o fa-2x"
										  	full="fa fa-star fa-2x"
										  	initialRate={this.state.rating}
										  	onChange={(rate) => this.setState({rating:rate})}/>
						            </div>
						            <div className="form-group">
						              <label><strong>Review</strong></label>
						              <textarea className="form-control" ref="review" rows="6" required></textarea>
						            </div>
						            <button className="btn btn-primary" type="submit">Submit</button>&nbsp;
						            <a className="btn btn-danger" onClick={this.close}>cancel</a>
							    </form>
			            	</div>
		            	</div>
		          	</Modal.Body>
		        </Modal>
	      	</div>
	    );
	}
	renderBook=()=>{
		const book  = this.props.book.books;
		const fetched  = this.props.book.fetched;
		if(fetched===false){
			return (<div className="text-center"><i className="fa fa-spinner fa-spin" style={{fontSize:"28px"}}></i></div>);
		}

		let averageRating = 0;
		{book.review ? averageRating = this.averageRating(book.review) : null}
		return(
			<div className="row">
				<div className="col-sm-4 col-md-4">
					<div className="image_wrap">
						<img src = {book.image} className="img img-responsive book_detail_image" />
					</div>
				</div>
				<div className="col-sm-8 col-md-8">
					<h3>{_.startCase(book.title)}</h3>
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
					<p><strong>No. of Pages :</strong> {book.pages||100}</p>
					<p><strong>Published on :</strong> {moment.utc(book.published_date).local().format('MM.DD.YYYY')||'N/A'}</p>
					<p><strong>Language :</strong> {_.startCase(book.language)||'English'}</p>
					<p><strong>Quantity Available :</strong> {book.available}</p>
					<h4>By <strong>{_.startCase(book.author)}</strong></h4>
					<hr />
					<span>
						
						{ 	this.state.reserved
								? 
									<Link className="btn btn-primary cart_button" to="/reservation">
										<i className="fa fa-check" aria-hidden="true"></i>
										reserved
									</Link>
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
				</div>
				<br />
				<div className="col-sm-12 col-md-12">
					<div className="well">
					  	<ul className="nav nav-tabs">
						    <li className="active"><a data-toggle="tab" href="#home">Description</a></li>
						    <li><a data-toggle="tab" href="#menu1">Reviews</a></li>
					  	</ul>
					  
					  	<div className="tab-content">
						    <div id="home" className="tab-pane fade in active">
						      <h3>Description</h3>
						      <p id="book_detail_description">{book.description ? book.description : 'description not available.'}</p>
						    </div>
						    <div id="menu1" className="tab-pane fade">
						      	<h3>Reviews</h3>
						      	<p><strong>Average rating:</strong>&nbsp;&nbsp;
						      		<strong style={{fontSize:18}}>
										<span className={"glyphicon "+((averageRating>0)?"glyphicon-star":"glyphicon-star-empty")}></span>
										<span className={"glyphicon "+((averageRating>1)?"glyphicon-star":"glyphicon-star-empty")}></span>
										<span className={"glyphicon "+((averageRating>2)?"glyphicon-star":"glyphicon-star-empty")}></span>
										<span className={"glyphicon "+((averageRating>3)?"glyphicon-star":"glyphicon-star-empty")}></span>
										<span className={"glyphicon "+((averageRating>4)?"glyphicon-star":"glyphicon-star-empty")}></span>
									</strong>
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
		const book = this.props.book.books;

		if(book){
			category = book.category;
			title = book.title;
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
							<div className="content_wrap">		
								{ this.renderBook() }

								{
									this.state.feedback
									?
										(
										  	<div className="alert alert-info alert-dismissable alert_message">
										  		<a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
										    	Thank you for your feedback!
										 	</div>
										)
									: null
								}		
							</div>	
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
