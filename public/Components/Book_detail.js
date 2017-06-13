import React,{Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchBook,reset} from '../actions/bookActions'; // import actions here
import Navigation from './Parts/Navigation';
import CategoryFrame from './Parts/CategoryFrame';

class Book_detail extends Component{
	constructor(props){
		super(props);
		this.state={
			itemInCart : false,
			cartMessage : false, // true only when cart is triggered
			loggedIn : false
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
		this.props.fetchBook(bookId);
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
	renderBook=()=>{
		const book  = this.props.book[0];
		if(!book){
			return <div>Loading...</div>;
		}
		return(
			<div className="row">
				<img src = "/images/books.jpg" className="img img-responsive" style={{padding:15}} />
				<div className="col-sm-12 col-md-12">
					<h3>{book.title}</h3>
					<h4>
						<span className={"glyphicon "+((book.rating>0)?"glyphicon-star":"glyphicon-star-empty")}></span>
						<span className={"glyphicon "+((book.rating>1)?"glyphicon-star":"glyphicon-star-empty")}></span>
						<span className={"glyphicon "+((book.rating>2)?"glyphicon-star":"glyphicon-star-empty")}></span>
						<span className={"glyphicon "+((book.rating>3)?"glyphicon-star":"glyphicon-star-empty")}></span>
						<span className={"glyphicon "+((book.rating>4)?"glyphicon-star":"glyphicon-star-empty")}></span>
					</h4>
					<p>Quantity Available : {book.available}</p>
					<h4>By {book.author}</h4>
					<br />
					<span>
						
						{ this.state.itemInCart
							?
								<button className="btn btn-danger cart_button" onClick={()=>this.removeFromCart(book._id)}>
									Remove from cart
								</button>
							: 	<button className="btn btn-primary cart_button" onClick={()=>this.addToCart(book._id)}>Add to cart</button>
						}
					</span>
					<div className="well">
						<p>
							Express One Eleven is created from super-soft fabrics for effortless layering and styling your way. 
							This cozy ribbed knit shirt is perfect for layering under a 
							jean vest with a maxi skirt or tucked into an ankle pant for something more out-to-dinner.
						</p>
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
		book : state.books
	};
}

export default connect(mapStateToProps,{fetchBook,reset})(Book_detail);
