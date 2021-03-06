import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchBooks,reset} from '../actions/bookActions'; // import actions here

import HomeCategoryNav from './Parts/HomeCategoryNav';
import Home from './Parts/Home';
import Book from './Parts/Book';
import Support from './Parts/Support';
import Carousel from './Parts/Carousel';
import Footer from './Parts/Footer';



class App extends Component{
	constructor(props){
		super(props);
		this.state={
			booksFetched : false
		}
	}
	componentDidMount(){
		//fetch all books
		this.props.fetchBooks();
	}
	componentWillReceiveProps(newProps){
		if(this.props!==newProps){
			this.setState({booksFetched:true});
		}
	}
	componentWillUnmount(){
		this.setState({booksFetched:false});
		this.props.reset();
	}
	render(){
		const {books}=this.props;

		return(
			<div>
				<Home />
				<HomeCategoryNav />
				{ (this.props.books.books)?<Book books={books.books}/> : null }
				<Support />
				<Carousel />
				<Footer />
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		books : state.books
	};
}

export default connect(mapStateToProps,{fetchBooks,reset})(App);
