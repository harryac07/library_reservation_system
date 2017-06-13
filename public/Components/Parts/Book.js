import React,{Component} from 'react';
import { Route , withRouter} from 'react-router-dom';
import _ from 'lodash';

class Book extends Component{
	constructor(props){
		super(props);
	}
	renderSingle=(bookId)=>{
		this.props.history.push(`/book/${bookId}`);
	}
	renderPopularBooks=()=>{
		const books= _.take(this.props.books, 4);
		return _.map(books,(book)=>{
			return( 			
				<div className="col-sm-3 col-md-3" key={book._id} onClick={()=>this.renderSingle(book._id)}>
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
}

export default withRouter(Book);