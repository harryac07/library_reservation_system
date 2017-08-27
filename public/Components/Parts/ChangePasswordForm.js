import React,{Component} from 'react';
import _ from 'lodash';

export default class ChangePasswordForm extends Component{
	constructor(props) {
	  	super(props);
	  	this.state={
	  		password:'',
	  		confirmpassword:'',
	  		errors : {} 
	  	}
	}
	componentDidMount(){

	}
	handleInputChange=(e)=>{
		this.setState({[e.target.name]: e.target.value});
	}
	submitPasswordForm=(e)=>{
		e.preventDefault();
		const passwordInfo={
	  		password:this.refs.password.value,
	  		confirmpassword:this.refs.confirmpassword.value
		};
		this.setState(passwordInfo);

		const errors = this.validatePasswordForm();
		console.log(errors);
		if(_.size(errors)>0){
			this.setState({errors});
			return;
		}
		/* no errors then submit */
		this.props.changePassword(passwordInfo);
	}
	validatePasswordForm=()=>{
		const errors={};
		this.state.password == "" ? errors.password="Password is required":null
		this.state.confirmpassword=="" 
			? errors.confirmpassword="confirm password is required"
			: null
		this.state.password!==this.state.confirmpassword
			? errors.confirmpassword="password matching failed"
			: null
		return errors;
	}
	viewDetailPage=(e)=>{
		e.preventDefault();
		this.props.viewDetailPage(true);
	}
	render(){
		return(
				<div className="password_change_form">
					<h2>Change Password</h2>
					<form onSubmit={this.submitPasswordForm} className="form-horizontal">
					  	<div className={`form-group ${this.state.errors.password ? 'has-error' : ''}`}>
					  		<label className="control-label col-sm-3" htmlFor="password">Password:</label>
					  		<div className="col-sm-9">
						    	<input onChange={this.handleInputChange} value={this.state.password} type="password" ref="password" className="form-control" name="password" placeholder="Enter Password" />
						    	{this.state.errors.password? <p className="error text-danger">&#x2731; {this.state.errors.password}</p> : null}
					  		</div>
					  	</div>
					  	<div className={`form-group ${this.state.errors.confirmpassword ? 'has-error' : ''}`}>
					  		<label className="control-label col-sm-3" htmlFor="cofirmPassword">Confirm Password:</label>
					  		<div className="col-sm-9">
						    	<input onChange={this.handleInputChange} value={this.state.confirmpassword} type="password" ref="confirmpassword" className="form-control" name="confirmpassword" placeholder="Confirm Password" />
					  			{this.state.errors.confirmpassword? <p className="error text-danger">&#x2731; {this.state.errors.confirmpassword}</p> : null}
					  		</div>
					  	</div>
					  	<div className="form-group">
						    <div className="col-sm-9">
						      <button type="submit" className="btn btn-primary">Change Password</button>
						      <button onClick={this.viewDetailPage} className="btn btn-danger">Cancel</button>
						    </div>
					  	</div>
					</form>
				</div>			
		);
	}
}