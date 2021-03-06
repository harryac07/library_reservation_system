import React , { Component } from 'react';

class RegisterForm extends Component{
	constructor(props){
		super(props);
		this.state={
			name : '',
			email : '',
			error : ''
		}
	}
	handleNameChange=(e)=>{
		this.setState({name : e.target.value});
	}
	handleEmailChange=(e)=>{
		this.setState({email : e.target.value});
	}
	submit=(e)=>{
		e.preventDefault();
		const data={
			name : this.refs.name.value,
			password : this.refs.password.value,
			email : this.refs.email.value,
			address : this.refs.address.value,
			phone : this.refs.phone.value
		};
		const confirm_password = this.refs.confirm_password.value;
		let confirm_password_status;

		confirm_password===data.password 
			? confirm_password_status=true 
			: confirm_password_status=false

		this.props.submit(data,confirm_password_status);

		this.refs.address.value=""
		this.refs.phone.value=""
		this.refs.password.value="";
		this.refs.confirm_password.value="";
	}
	render(){
		return(
			<form onSubmit={this.submit} className="common-form">
			  	<div className="form-group">
			  		<i className="fa fa-asterisk" aria-hidden="true"></i>
				    <input type="text" value={this.state.name} onChange={this.handleNameChange} ref="name" className="form-control " id="name" placeholder="Enter name" />
			  	</div>
			  	<div className="form-group">
			  		<i className="fa fa-asterisk" aria-hidden="true"></i>
				    <input type="email" value={this.state.email} onChange={this.handleEmailChange} ref="email" className="form-control " id="email" placeholder="Enter email" />
			  	</div>
			  	<div className="form-group">
				    <input type="text" ref="phone" className="form-control " id="phone" placeholder="Enter phone" />
			  	</div>
			  	<div className="form-group">
				    <input type="text" ref="address" className="form-control" id="address" placeholder="Enter address" />
			  	</div>
			  	<div className="form-group">
			  		<i className="fa fa-asterisk" aria-hidden="true"></i>
				    <input type="password" ref="password" className="form-control" id="password" placeholder="Enter Password" />
			  	</div>
			  	<div className="form-group">
			  		<i className="fa fa-asterisk" aria-hidden="true"></i>
				    <input type="password" ref="confirm_password" className="form-control" id="password" placeholder="Confirm Password" />
			  	</div>
			  	<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		);
	}
}

export default RegisterForm;