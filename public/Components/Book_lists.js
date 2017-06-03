import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchByCategory,fetchBySearch,sortBookList} from '../actions/bookActions'; // import actions here
import Navigation from './Parts/Navigation';
import CategoryFrame from './Parts/CategoryFrame';
import _ from 'lodash';

class Book_lists extends Component{
	constructor(props){
		super(props);
		this.state={
			sorting : ''
		}
	}
	fetchBooks=(props)=>{
		const categoryName=props.match.params.name;
		let querySearch = new URLSearchParams(props.location.search);
		const searchTerm = querySearch.get('search');
		searchTerm 
			? props.fetchBySearch(searchTerm) 
			: props.fetchByCategory(categoryName)
	}
	componentWillMount(){

	}
	componentDidMount(){
		console.log('i am didmounting');
			this.fetchBooks(this.props);
	}
	componentWillReceiveProps(nextProps) {
		//checking the route pathname and fetching the books
	    if (nextProps.location.pathname !== this.props.location.pathname) {
	    	this.fetchBooks(nextProps);
	    }
	}
	renderBookDetail=(bookId)=>{
		this.props.history.push('/book/'+bookId);
	}

	sortBookList=(keyword)=>{
		//dispatch action to reducer
		console.log(keyword);
		this.props.sortBookList(keyword);
	}

	renderBooks=()=>{
		const books=this.props.books;
		if(!books){
			return <div>Loading Books...</div>
		}
		console.log('i am rendering');
		return _.map(books,(book,i)=>{
			return(
				<div key={book._id} className="col-sm-3 col-md-3 col-xs-12" onClick={()=>this.renderBookDetail(book._id)}>
					<img src = "/images/books.jpg" className="img-img-thumbnail" />
					<div>
						<h3>{book.title}</h3>
						<h4>
							<span className={"glyphicon "+((book.rating>0)?"glyphicon-star":"glyphicon-star-empty")}></span>
							<span className={"glyphicon "+((book.rating>1)?"glyphicon-star":"glyphicon-star-empty")}></span>
							<span className={"glyphicon "+((book.rating>2)?"glyphicon-star":"glyphicon-star-empty")}></span>
							<span className={"glyphicon "+((book.rating>3)?"glyphicon-star":"glyphicon-star-empty")}></span>
							<span className={"glyphicon "+((book.rating>4)?"glyphicon-star":"glyphicon-star-empty")}></span>
						</h4>
						<p>By {book.author}</p>
					</div>
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
						<CategoryFrame sort={this.sortBookList} />
						<div className="col-sm-10">
							<div>
							    Home <span className="glyphicon glyphicon-chevron-right"></span> <span style={{color:"#ccc"}}>{this.props.match.params.name}</span>
							</div>
							<div className="row">
								{ this.renderBooks() }							
							</div>
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

export default connect(mapStateToProps,{fetchByCategory,fetchBySearch,sortBookList})(Book_lists);






