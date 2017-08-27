import React,{Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import {fetchUser,reset,cancelReservation,removeReservation} from '../actions/userActions'; // import actions here
import CategoryFrame from './Parts/CategoryFrame';

class Reservation extends Component{
	constructor(props){
		super(props);
		this.state={
			totalItems : 0
		}
	}
	componentDidMount(){
		const token = localStorage.getItem('user-token');
		let bookCount;
		if(token){
			const payload = JSON.parse(window.atob(token.split('.')[1]));
			let expiredBooks;
			this.props.fetchUser(payload._id).then(()=>{
				// get expiry books out from list
				expiredBooks = _.filter(this.props.user.data.reserved_books,(book)=>{
					return moment().isSameOrAfter(book.expiry_date);
				});
				/* remove expired books from reservation list */
				bookCount = this.props.user.data.reserved_books.length;
				this.setState({totalItems : bookCount});
				/* removeReservation if expired */
				this.removeReservation(expiredBooks,payload,bookCount);
			}); // action
		}
	}
    componentWillUnmount(){
    	this.props.reset();
    }
	renderBook=(e,bookId)=>{
		this.props.history.push(`/book/${bookId}`);
		e.preventDefault();
	}
	cancelReservation=(e,bookId)=>{
		const token = localStorage.getItem('user-token');
		if(token){
			const payload = JSON.parse(window.atob(token.split('.')[1]));
			const confirm = confirm('Are you sure to remove this book?');
			if(confirm){
				this.props.cancelReservation(bookId,payload.email).then(()=>{ // action cancel reservation
			    	this.props.fetchUser(payload._id).then(()=>{
			    		const bookCount = this.props.user.data.reserved_books.length;
			    		this.setState({totalItems : bookCount})
			    	}); // action fetch user detail again		
				}); 
			}
		}
	}
	removeReservation=(expiredBooks,payload,bookCount)=>{
		if(expiredBooks.length>0){
			this.props.removeReservation(expiredBooks,payload.email).then(()=>{
		    	this.props.fetchUser(payload._id).then(()=>{
					this.setState({
						totalItems : bookCount-expiredBooks.length
					});
		    	}); // action fetch user detail
			});
		}
	}
	formatDate=(date)=>{
		return moment(date).format('MM/DD/YYYY HH:mm');
	}
	renderReservedBooks=()=>{
		if(!this.props.user || this.props.user.length<=0){
			return(
				<div className="text-center">
					<h3>Nothing to show...</h3>
				</div>
			);
		}else{
			const books = this.props.user.data.reserved_books;
			if(!books || books.length<=0){
				return(
					<div className="text-center">
						<h3>You don`t have reserved books!</h3>
					</div>
				);
			}
			return books.map((book,i)=>{
				return(
					<div className="col-sm-12 col-md-12 col-xs-12 reservedItem" key={book.book._id}>
						<div className="row">
							<div className="col-xs-3 col-sm-2 col-md-2" onClick={(e)=>this.renderBook(e,book.book._id)}>
								<img src={book.book.image} style={{height:80,width:70}} />
							</div>
							<div className="col-xs-6 col-sm-8 col-md-8">
								<h4><strong>{book.book.title}</strong></h4><span><strong>By {book.book.author}</strong></span>
								<p><strong style={{color:'#C0392B'}}>Reservation expires: </strong>{this.formatDate(book.expiry_date)}</p>
							</div>
							<div className="col-xs-3 col-sm-2 col-md-2" onClick={(e)=>this.cancelReservation(e,book.book._id)}>
								<button className="btn btn-sm btn-remove">
									cancel
								</button>
							</div>
						</div>
						<hr />
					</div>
				);
			});
		}
	}
	render(){
		return(
			<div>
				<div className="container category_nav">
					<div className="row">
						<CategoryFrame />
						<div className="col-sm-10">
							<div>
							    Home <span className="glyphicon glyphicon-chevron-right"></span>&nbsp;
							    <span style={{color:"gray"}}>Your Reservations</span>&nbsp;
							    <span className="glyphicon glyphicon-chevron-right"></span>&nbsp;
							    <span style={{color:"gray"}}>items : <strong>{this.state.totalItems}</strong> </span>
							</div>
							<h2 className="text-center">Your Reserved Books</h2>	
							<div className="row reserved_lists">
								{this.renderReservedBooks()}
							</div>	
							<br />
							{
								this.state.totalItems
									? 
										(
											<div className="jumbotron text-center reservation_notice">
												<h4 className="text-primary"> 
													Your Items have been reserved. Please visit your nearby Library and get your reserved books!<br />
												</h4>
												<div className="text-center text-danger"><strong>Identify yourself with valid ID!</strong></div>
											</div>
										)
									: 	null
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
		user : state.users // take only books from the current user
	}
}

export default connect(mapStateToProps,{fetchUser,cancelReservation,removeReservation,reset})(Reservation);





