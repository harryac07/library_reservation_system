import React , { Component } from 'react';
import {connect} from 'react-redux';
import {register,reset} from '../actions/authActions'; // import actions here
import _ from 'lodash';

import CategoryFrame from './Parts/CategoryFrame';
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
			<div>
				<div className="container category_nav">
					<div className="row">
						<CategoryFrame />
						<div className="col-sm-10">
							<section style={{textAlign:'center'}}>
							 	<h2>Register</h2>
							 	<hr />
							 	{this.state.error? <p className="error text-danger">&#x2731; {this.state.error}</p> : null}
						 	</section>
						 	<RegisterForm submit={this.submitForm} />
						</div>
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