import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchBook} from '../actions/bookActions'; // import actions here

class Book_detail extends Component{
	componentDidMount(){
		this.props.fetchBook("592c5aa4f9c3d608480583fc");
	}
	render(){
		return(
			<div>
				Hello I am book detail
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		book : state.books
	};
}

export default connect(mapStateToProps,{fetchBook:fetchBook})(Book_detail);