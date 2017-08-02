import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchByCategory,fetchBySearch,sortBookList,reset} from '../actions/bookActions'; // import actions here
import CategoryFrame from './Parts/CategoryFrame';
import Pagination from "react-js-pagination";
import _ from 'lodash';
// import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Book_lists extends Component{
	constructor(props){
		super(props);
		this.state={
			activePage:1,
			itemsCountPerPage:6
		}
	}
	fetchBooks=(props)=>{
		const categoryName=props.match.params.name;
		let querySearch = new URLSearchParams(props.location.search);
		const searchTerm = querySearch.get('search');
		searchTerm 
			? props.fetchBySearch(searchTerm)  // action
			: props.fetchByCategory(categoryName, this.state.activePage) // action
	}
	componentDidMount(){
		this.fetchBooks(this.props);
	}
	componentWillReceiveProps(nextProps) {
		//checking the route pathname and fetching the books
	    if (nextProps.location.pathname !== this.props.location.pathname) {
	    	this.fetchBooks(nextProps);
	    }
	}
	componentDidUpdate(prevProps, prevState){
		if(this.state.activePage !== prevState.activePage){
			this.fetchBooks(this.props);
		}
	}
	renderBookDetail=(bookId)=>{
		this.props.history.push('/book/'+bookId);
	}

	sortBookList=(keyword)=>{
		this.props.sortBookList(keyword); // action
	}
	componentWillUnmount(){
		this.props.reset();

	}
	averageRating=(reviews)=>{
		const totalReviews = reviews.length;
		let rating = 0;
		const ratings = _.map(reviews,(review)=>{
			return rating+=review.rating;
		});
		return Math.ceil(rating / totalReviews);
	}
	renderBooks=()=>{
		const {books,fetched,sort}=this.props.books;
		if(!books || fetched===false){
			return (<div className="text-center"><i className="fa fa-spinner fa-spin" style={{fontSize:"28px"}}></i></div>);
		}else if(books.length<=0){
			return (<div className="well" style={{textAlign:'center'}}><h3>Book Not Found!</h3></div>);
		}

		/* For Pagination */

		var filteredItems = []; // required results of books after pagination
		var currentPage = this.state.activePage;
		var numPerPage = this.state.itemsCountPerPage;
		let begin = 0;
		let end = 0;
		
		books.length>this.state.itemsCountPerPage
			?	(
					begin = ((currentPage-1) *  numPerPage),
					end = begin + numPerPage
				)
			: 	(
					begin = 0,
					end = books.length
				)
		
		filteredItems = books.slice(begin,end);

		return _.map(_.orderBy(filteredItems,'title', sort ? sort:'ASC'),(book)=>{
			return(
				<div key={book._id} className="col-sm-3 col-md-3 col-xs-12" onClick={()=>this.renderBookDetail(book._id)}>
					<img src = "/images/books.jpg" className="img-img-thumbnail" />
					<div>
						<h3>{book.title}</h3>
						<h4>
							<span className={"glyphicon "+((this.averageRating(book.review)>0)?"glyphicon-star":"glyphicon-star-empty")}></span>
							<span className={"glyphicon "+((this.averageRating(book.review)>1)?"glyphicon-star":"glyphicon-star-empty")}></span>
							<span className={"glyphicon "+((this.averageRating(book.review)>2)?"glyphicon-star":"glyphicon-star-empty")}></span>
							<span className={"glyphicon "+((this.averageRating(book.review)>3)?"glyphicon-star":"glyphicon-star-empty")}></span>
							<span className={"glyphicon "+((this.averageRating(book.review)>4)?"glyphicon-star":"glyphicon-star-empty")}></span>
						</h4>
						<p>By {book.author}</p>
					</div>
				</div>				
			);
		});
	}
	handlePageChange=(pageNumber)=>{
		console.log(`active page is ${pageNumber}`);
    	this.setState({activePage: pageNumber});
   	}
	renderPagination=()=>{
	  	return (
	    	<Pagination
		      	prevPageText='prev'
		      	nextPageText='next'
		      	firstPageText='first'
		      	lastPageText='last'
		      	activePage={this.state.activePage}
		      	itemsCountPerPage={this.state.itemsCountPerPage} 
		      	totalItemsCount={this.props.books.books.length} 
		      	onChange={this.handlePageChange}/>
	  	);
	}

	render(){
		return(
			<div>
				<div className="container category_nav">
					<div className="row">
						<CategoryFrame sort={this.sortBookList} />
						<div className="col-sm-10">
							<div>
							    Home <span className="glyphicon glyphicon-chevron-right"></span> <span style={{color:"#ccc"}}>{this.props.match.params.name}</span>
							</div>
							<div className="row">
								{ this.renderBooks() }					
							</div>
							{ this.props.books.books.length>this.state.itemsCountPerPage ? this.renderPagination() : null}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		books : state.books
	};
}

export default connect(mapStateToProps,{fetchByCategory,fetchBySearch,sortBookList,reset})(Book_lists);






