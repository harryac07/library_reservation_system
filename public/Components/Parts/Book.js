import React,{Component} from 'react';
import { Route , withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Book extends Component{
	constructor(props){
		super(props);
	}
	renderSingle=(bookId)=>{
		this.props.history.push(`/book/${bookId}`);
	}
	averageRating=(reviews)=>{
		const totalReviews = reviews.length;
		let rating = 0;
		const ratings = _.map(reviews,(review)=>{
			return rating+=review.rating;
		});
		return Math.ceil(rating / totalReviews);
	}
	sortByRating=(books)=>{
		const reviewedBooks = _.filter(books,(book)=>{
			return book.review.length>0;
		});
		return _.sortBy(reviewedBooks,(book)=>{
			return this.averageRating(book.review);
		}).reverse(); // review in asc order
	}
	renderPopularBooks=()=>{
		const books = this.sortByRating(this.props.books);
		const sortedBooks= _.take(books, 4); // take 4 most higher reviewed books
		return _.map(sortedBooks,(book)=>{
			return( 			
				<div className="col-sm-3 col-md-3" key={book._id} onClick={()=>this.renderSingle(book._id)}>
					<img src = {book.image} className="img-img-thumbnail Homepage_image" />
					<div>
						<h3>{book.title}</h3>
						<h4>
							<span className={"glyphicon "+((this.averageRating(book.review)>0)?"glyphicon-star":"glyphicon-star-empty")}></span>
							<span className={"glyphicon "+((this.averageRating(book.review)>1)?"glyphicon-star":"glyphicon-star-empty")}></span>
							<span className={"glyphicon "+((this.averageRating(book.review)>2)?"glyphicon-star":"glyphicon-star-empty")}></span>
							<span className={"glyphicon "+((this.averageRating(book.review)>3)?"glyphicon-star":"glyphicon-star-empty")}></span>
							<span className={"glyphicon "+((this.averageRating(book.review)>4)?"glyphicon-star":"glyphicon-star-empty")}></span>
						</h4>
						<p><strong>By {book.author}</strong></p>
					</div>
				</div>
			);
		});
	}
	render(){
		return(
			<div className="book">
			    <div className="container">
					<h2>Most Popular</h2>
					<hr />
					<div className="row">
						{this.renderPopularBooks()}
					</div>
				</div>
			</div>
		);
	}
	
} // component ends

Book.propTypes = {
	books: PropTypes.array.isRequired
}

export default withRouter(Book);