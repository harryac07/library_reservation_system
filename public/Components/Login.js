import React , { Component } from 'react';
import {connect} from 'react-redux';
import {login,loginFailure,loginSuccess,reset} from '../actions/authActions'; // import actions here
import _ from 'lodash';

import Navigation from './Parts/Navigation';
import CategoryFrame from './Parts/CategoryFrame';
import LoginForm from './Parts/LoginForm'; // to be changed to loginForm

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			error:""
		}
	}
	submitForm=(userData)=>{
		this.props.login(userData); // action
	}
	componentDidUpdate(){
	    if (localStorage.getItem('user-token')){
	      	this.props.history.push('/');

	    }else{
	    	this.setState({error : this.props.userdata.data.message});
	    }
	}
	shouldComponentUpdate(nextProp, nextState) {
        return !(_.isEqual(nextProp, this.props) && _.isEqual(nextState, this.state));
    }
	componentWillUnmount(){
		this.props.reset();
	}
	render(){
		return(
			<div>
				<Navigation/>
				<div className="container category_nav">
					<div className="row">
						<CategoryFrame />
						<div className="col-sm-10">
							<section style={{textAlign:'center'}}>
							 	<h2>Login</h2>
							 	<hr />
							 	{this.state.error ? <p className="error text-danger">&#x2731; {this.state.error}</p> : null}
						 	</section>
						 	<LoginForm formSubmit={this.submitForm} error={this.state.error} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state){
	return{
		userdata : state.users
	}
}

export default connect(mapStateToProps,{login,loginFailure,loginSuccess,reset})(Login);