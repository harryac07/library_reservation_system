import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchBook} from '../actions/bookActions'; // import actions here
import Navigation from './Parts/Navigation';
import CategoryFrame from './Parts/CategoryFrame';

class Book_detail extends Component{
	constructor(props){
		super(props);
		this.state={
			addToCart : false
		};
	}
	componentDidMount(){
		this.props.fetchBook(this.props.match.params.id);
	}
	addToCart=(bookId)=>{
		console.log('cart book : '+bookId);
		this.setState(addToCart : true);
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
					<button className="btn btn-danger" onClick={()=>this.addToCart(book._id)}>Add to cart</button>
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
		if(this.props.book[0]){
			category = this.props.book[0].category
			title = this.props.book[0].title
		}

		return(
			<div>
				<Navigation />
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

function mapStateToProps(state){
	return{
		book : state.books
	};
}

export default connect(mapStateToProps,{fetchBook})(Book_detail);
