import React , { Component } from 'react';
import {connect} from 'react-redux';
import {login,loginFailure,loginSuccess,reset} from '../actions/authActions'; // import actions here
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
	    localStorage.getItem('user-token')
	      	?	this.props.history.push('/')
	    	: 	this.setState({error : this.props.userdata.data.message})
	}
	shouldComponentUpdate(nextProp, nextState) {
        return !(_.isEqual(nextProp, this.props) && _.isEqual(nextState, this.state));
    }
	componentWillUnmount(){
		this.props.reset();
	}
	render(){
		return(
			<div className="category_nav container Login">
				<div>
					<div className="login-logo-image">
						<img src = "/images/book-logo.png"/>
					</div>
					<div className="well wrapLoginForm">
						<section style={{textAlign:'center'}}>
						 	<h1>Login</h1>
						 	<div className="hr"></div>
						 	{this.state.error ? <p className="error text-danger">&#x2731; {this.state.error}</p> : null}
					 	</section>
				        <ReactCSSTransitionGroup
				          	transitionName="example"
				          	transitionAppear={true}
	      					transitionAppearTimeout={500}
				          	transitionEnterTimeout={500}
				          	transitionLeaveTimeout={300}>
				          	<LoginForm formSubmit={this.submitForm} error={this.state.error} />
				        </ReactCSSTransitionGroup>
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