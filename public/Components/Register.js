import React , { Component } from 'react';
import {connect} from 'react-redux';
import {register,reset} from '../actions/authActions'; // import actions here
import _ from 'lodash';

import RegisterForm from './Parts/RegisterForm';

class Register extends Component{
	constructor(props){
		super(props);
		this.state={
			error:""
		}
	}
	submitForm=(userDetail,confirm_password_status)=>{
		confirm_password_status===true
			?	
				(
					this.setState({error:''}),
					this.props.register(userDetail) // action
				)
			: 	this.setState({error : 'password unmatched!'})

		
	}
	componentDidUpdate(){
		if(this.state.error!="password unmatched!"){
		    if (this.props.user.status==200){
		      	this.props.history.push('/login');

		    }else{
		    	this.props.user.data
		    		? 	this.setState({error : this.props.user.data.message})
		    		: 	null
		    }
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
			<div className="category_nav container Register">
				<div>
					<div className="login-logo-image">
						<img src = "/images/book-logo.png"/>
					</div>
					<div className="well wrapRegisterForm">
						<section style={{textAlign:'center'}}>
						 	<h1>Register</h1>
						 	<div className="hr"></div>
						 	{this.state.error? <p className="error text-danger">&#x2731; {this.state.error}</p> : null}
					 	</section>
					 	<RegisterForm submit={this.submitForm} />
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		user : state.users
	}
}

export default connect(mapStateToProps,{register,reset})(Register);