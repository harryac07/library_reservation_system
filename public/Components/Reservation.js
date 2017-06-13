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
			totalItems : 0
		}
	}
	componentDidMount(){
		let token = localStorage.getItem('user-token');
		if(token){
			const payload = JSON.parse(window.atob(token.split('.')[1]));
			this.props.fetchUser(payload._id).then(()=>{
				const bookCount = this.props.user.data.reserved_books.length;
				this.setState({totalItems : bookCount})
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
		let token = localStorage.getItem('user-token');
		if(token){
			const payload = JSON.parse(window.atob(token.split('.')[1]));
			this.props.removeReservation(bookId,payload.email).then(()=>{ // action cancel reservation
		    	this.props.fetchUser(payload._id).then(()=>{
		    		const bookCount = this.props.user.data.reserved_books.length;
		    		this.setState({totalItems : bookCount})
		    	}); // action fetch user detail again		
			}); 
		}
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
							<br /><br />
							{
								this.state.totalItems
									? 
										(
											<div className="jumbotron text-center" style={{padding:10,margin:'0 auto'}}>
												<p className="text-primary"> 
													Your Items have been reserved. Please visit your nearby Library and get your reserved books!<br />
												</p>
												<p className="text-danger">Identify yourself with valid ID!</p>
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

export default connect(mapStateToProps,{fetchUser,removeReservation,reset})(Reservation);





