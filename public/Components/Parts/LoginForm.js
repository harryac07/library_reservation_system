import React , { Component } from 'react';

class LoginForm extends Component{
	constructor(props){
		super(props);
	}
	submit=(e)=>{
		const data={
			password : this.refs.password.value,
			email : this.refs.email.value
		};
		this.refs.password.value="";
		this.refs.email.value="";
		e.preventDefault();
		
		this.props.formSubmit(data);
	}
	render(){
		return(
			<form onSubmit={this.submit} className="register-form">
			  	<div className="form-group">
				    <label htmlFor="email" >Email:</label>
				    <input type="email" ref="email" className="form-control " id="email" placeholder="Enter email" />
			  	</div>
			  	<div className="form-group">
				    <label htmlFor="password">Password:</label>
				    <input type="password" ref="password" className="form-control" id="password" placeholder="Enter password" />
			  	</div>
			  	<button type="submit" className="btn btn-primary">Login</button>
			</form>
		);
	}
}

export default LoginForm;