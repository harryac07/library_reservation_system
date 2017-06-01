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
	componentDidMount(){
		this.props.fetchBooks();
	}
	render(){
		return(
			<div>
				<Navigation />
				<Home />
				<Book />
				<Support />
				<Carousel />
				<Footer />
			</div>
		);
	}
}

function mapStateToProps(state){
	return {books : state.books};
}

export default connect(mapStateToProps,{fetchBooks:fetchBooks})(App);
