import React,{Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {fetchByCategory,fetchBySearch} from '../actions/bookActions'; // import actions here

import Navigation from './Parts/Navigation';
// import CategoryNav from './Parts/CategoryNav';

class Book_lists extends Component{
	componentDidMount(){
		const categoryName=this.props.match.params.name;
		let querySearch = new URLSearchParams(this.props.location.search);
		const searchTerm = querySearch.get('search');

		searchTerm 
			? this.props.fetchBySearch(searchTerm) 
			: this.props.fetchByCategory(categoryName)

	}

	renderBooks=()=>{
		return _.map(this.props.books,(book,i)=>{
			return(
				<div key={book._id} className="col-sm-3 col-md-3">
					<img src = "/images/books.jpg" className="img-img-thumbnail" />
					<div>
						<h3>{book.title}</h3>
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
						<div className="col-sm-2 col-md-2">
							<div>
						      	<ul className="category">
						      		<li>
						      			<a>
						      				<form className="form-horizontal" method="get" action="/books/category/all">
												<div className="input-group">
												   <input type="text" name="search" className="form-control" />
												   <span className="input-group-btn">
												        <button className="btn btn-primary" type="submit">
												        	<span className="glyphicon glyphicon-search"></span>
												        </button>
												   </span>
												</div>

					                        </form>
					                    </a>
						      		</li>
						      	</ul>							
							</div>
							<div>
							  	<ul className="category">
							  		<li><a>Categories</a></li>
							      	<li><a href="/books/category/software">Software</a></li>
							      	<li><a href="/books/category/nature">Nature</a></li>
							      	<li><a href="/books/category/literature">Literature</a></li>
							      	<li><a href="/books/category/romance">Romance</a></li>
							      	<li><a href="/books/category/story">Story</a></li>
							      	<li><a href="/books/category/history">History</a></li>
							      	<li className="active"><a href="/books/category/all">All</a></li>
								 </ul>
							</div>
							<div>
							  	<ul className="category list-group">
							  		<li><a>Sort By</a></li>
							      	<li className="list-group-item">ASC (A-Z)</li>
							      	<li className="list-group-item">DESC (Z-A)</li>
							      	<li className="list-group-item">Available</li>
								 </ul>
							</div>
						</div>
						<div className="col-sm-10">
							<div>
							    Home <span className="glyphicon glyphicon-chevron-right"></span> <span style={{color:"#ccc"}}>categoryName</span>
							</div>
							<div className="row">
								{ this.renderBooks() }							
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
		books : state.books
	};
}

export default connect(mapStateToProps,{fetchByCategory,fetchBySearch})(Book_lists);






