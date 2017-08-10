import React , { Component } from 'react';
import {Link} from 'react-router-dom';

class LoginForm extends Component{
	constructor(props){
		super(props);
		this.state={
			email : ''
		}
	}
	handleChange=(e)=>{
		this.setState({email : e.target.value});
	}
	submit=(e)=>{
		const data={
			password : this.refs.password.value,
			email : this.refs.email.value
		};
		this.refs.password.value="";
		e.preventDefault();
		
		this.props.formSubmit(data);
	}
	render(){
		return(
			<form onSubmit={this.submit} className="register-form">
			  	<div className="form-group">
				    <input type="email" value={this.state.email} onChange={this.handleChange} ref="email" className="form-control " id="email" placeholder="Email" />
			  	</div>
			  	<div className="form-group">
				    <input type="password" ref="password" className="form-control" id="password" placeholder="Password" />
			  	</div>
			  	<button type="submit" className="btn btn-primary">Login</button>
			  	<div className="text-center">
			  		<span>Forgot your password? <u><Link to="/passwordreset">Click Here</Link></u></span>
			  	</div>
			</form>
		);
	}
}

export default LoginForm;