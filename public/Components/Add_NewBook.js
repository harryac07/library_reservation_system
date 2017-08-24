import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addNewBook,reset} from '../actions/bookActions'; // import actions here
import FormData from 'form-data'

class Add_NewBook extends Component{
	constructor(props){
		super(props);
		this.state={
			formHeight : 0,
			parentHeight : 0
		}
	}
	setHeightOfParent=()=>{
		const parentHeight =document.querySelector('.container').clientHeight;
		const first_child_div =document.querySelector('.first_child_div').clientHeight;
		const wrapLoginForm = document.querySelector('.wrapLoginForm').clientHeight;
		// const elementHeight = this.state.formHeight;
		console.log(parentHeight,first_child_div+wrapLoginForm+25);
		this.setState({ parentHeight:  first_child_div+wrapLoginForm+25});		
	}
	componentDidMount(){
		this.setHeightOfParent();
		window.addEventListener("resize", this.setHeightOfParent);
	}
	componentDidUpdate(prevProps, prevState){
		prevState.parentHeight===0
			? this.setHeightOfParent()
			: null
	}
	componentWillUnmount(){
		window.removeEventListener("resize",this.setHeightOfParent);
	}
	submit=(e)=>{
		e.preventDefault();
	let data = new FormData();
			data.append('title' ,this.refs.title.value);
			data.append('author' ,this.refs.author.value);
			data.append('published_date' ,this.refs.published_date.value);
			data.append('available',this.refs.available.value);
			data.append('pages',this.refs.pages.value);
			data.append('language',this.refs.language.value);
			data.append('category',this.refs.category.value);
			data.append('keywords',this.refs.keywords.value);
			data.append('description',this.refs.description.value);
			data.append('image' ,this.refs.image.files[0]);
		this.props.addNewBook(data);
		data ="";
	}
	render(){
		console.log(this.state.parentHeight);
		return(
			<div className="category_nav container Add_NewBook" style={{height : this.state.parentHeight}}>
				<div className="first_child_div">
					<div className="login-logo-image">
						<img src = "/images/book-logo.png"/>
					</div>
					<div className="well wrapLoginForm">
						<section style={{textAlign:'center'}}>
						 	<h1>Add New Book</h1>
						 	<div className="hr"></div>
					 	</section>
						<form onSubmit={this.submit} className="common-form" encType="multipart/form-data">
						  	<div className="form-group">
							    <input type="text" ref="title" className="form-control " placeholder="title" />
						  	</div>
						  	<div className="form-group">
							    <input type="text" ref="author" className="form-control " placeholder="author" />
						  	</div>
						  	<div className="form-group">
							    <input type="text" ref="published_date" className="form-control " placeholder="published_date" />
						  	</div>
						  	<div className="form-group">
							    <input type="number" ref="available" className="form-control " placeholder="available" />
						  	</div>
						  	<div className="form-group">
							    <input type="number" ref="pages" className="form-control " placeholder="pages" />
						  	</div>
						  	<div className="form-group">
							    <input type="text" ref="language" className="form-control " placeholder="language" />
						  	</div>
						  	<div className="form-group">
							    <input type="text" ref="category" className="form-control " placeholder="category" />
						  	</div>
						  	<div className="form-group">
							    <input type="text" ref="keywords" className="form-control " placeholder="keywords" />
						  	</div>
						  	<div className="form-group">
							    <textarea ref="description" className="form-control " placeholder="description" rows="4" />
						  	</div>	
						  	<div className="form-group">
							    <input type="file" ref="image" name="image" className="form-control " placeholder="image" />
						  	</div>		  	
						  	<button type="submit" className="btn btn-primary">Add Book</button>
						</form>
					</div>
				</div>		
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		book : state.book
	}
}

export default connect(mapStateToProps,{addNewBook,reset})(Add_NewBook);





