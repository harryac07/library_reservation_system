import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchBooks} from '../actions/bookActions'; // import actions here

import Navigation from './Parts/Navigation';
import Home from './Parts/Home';
import Book from './Parts/Book';
import Support from './Parts/Support';
import Carousel from './Parts/Carousel';
import Footer from './Parts/Footer';



class App extends Component{
	constructor(props){
		super(props);
		this.state={
			popularBooks :[]
		}
	}
	componentDidMount(){
		this.props.fetchBooks();
	}
	render(){
		const {books}=this.props;
		if(!books){
			return <div>Loading...</div>
		}
		return(
			<div>
				<Navigation />
				<Home />
				{ (this.props.books.length>0)?<Book books={books}/> : null }
				<Support />
				<Carousel />
				<Footer />
			</div>
		)
	}
}

function mapStateToProps(state){
	return {books : state.books};
}

export default connect(mapStateToProps,{fetchBooks:fetchBooks})(App);
