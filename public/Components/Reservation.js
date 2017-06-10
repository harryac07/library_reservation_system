import React,{Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchUser,reset,removeReservation} from '../actions/userActions'; // import actions here

import Navigation from './Parts/Navigation';
import CategoryFrame from './Parts/CategoryFrame';

class Reservation extends Component{
	constructor(props){
		super(props);
		this.state={
			totalItems : 0,
			reservedBooks:[]
		}
	}
	componentDidMount(){
		let token = localStorage.getItem('user-token');
		if(token){
			const payload = JSON.parse(window.atob(token.split('.')[1]));
			this.props.fetchUser(payload._id); // action
		}
	}
	setReservedBooks=()=>{
		const books = localStorage.setItem('reserved_books')
	}
    componentDidUpdate(){
    	console.log('ok');
    	const totalBooks = this.props.user.data.reserved_books.length;
    	if(totalBooks>0 && this.state.totalItems!==totalBooks){
    		this.setState({totalItems : totalBooks,reservedBooks : this.props.user.data.reserved_books});
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
		let token = localStorage.getItem('user-token');
		if(token){
			const payload = JSON.parse(window.atob(token.split('.')[1]));
			this.props.removeReservation(bookId,payload.email); // action 
		}
		window.location.reload();
	}
	renderReservedBooks=()=>{
		console.log(this.state.reservedBooks+', count :'+this.state.totalItems);
		if(!this.props.user || this.props.user.length<=0){
			return(
				<div className="text-center">
					<p>The list is empty</p>
				</div>
			);
		}else{
			const books = this.props.user.data.reserved_books;
			// console.log(books);
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
						<div onClick={(e)=>this.cancelReservation(e,book._id)}>
							<button className="btn btn-danger remove">Cancel Reservation</button>
						</div>
					</div>
				);
			});
		}
	}
	render(){
		return(
			<div>
				<Navigation/>
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
							<div className="row">
								{this.renderReservedBooks()}
							</div>	
						</div>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state){
	return{
		user : state.users // returning only books from the current user
	}
}

export default connect(mapStateToProps,{fetchUser,removeReservation,reset})(Reservation);





