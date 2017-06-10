import React , { Component } from 'react';

class RegisterForm extends Component{
	constructor(props){
		super(props);
	}
	submit=(e)=>{
		const data={
			name : this.refs.name.value,
			password : this.refs.password.value,
			email : this.refs.email.value,
			address : this.refs.address.value,
			phone : this.refs.phone.value
		};
		this.props.submit(data);
		this.refs.name.value="";
		this.refs.password.value="";
		this.refs.email.value="";
		this.refs.address.value="";
		this.refs.phone.value="";
		e.preventDefault();
	}
	render(){
		return(
			<form onSubmit={this.submit} className="register-form">
			  	<div className="form-group">
				    <label htmlFor="name" >Name:</label>
				    <input type="text" ref="name" className="form-control " id="name" placeholder="Enter name" />
			  	</div>
			  	<div className="form-group">
				    <label htmlFor="email" >Email:</label>
				    <input type="email" ref="email" className="form-control " id="email" placeholder="Enter email" />
			  	</div>
			  	<div className="form-group">
				    <label htmlFor="phone" >Phone:</label>
				    <input type="text" ref="phone" className="form-control " id="phone" placeholder="Enter phone" />
			  	</div>
			  	<div className="form-group">
				    <label htmlFor="address">Address:</label>
				    <input type="text" ref="address" className="form-control" id="address" placeholder="Enter address" />
			  	</div>
			  	<div className="form-group">
				    <label htmlFor="password">Set Password:</label>
				    <input type="password" ref="password" className="form-control" id="password" placeholder="Enter password" />
			  	</div>
			  	<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		);
	}
}

export default RegisterForm;