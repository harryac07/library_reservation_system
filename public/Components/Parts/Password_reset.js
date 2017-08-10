import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {requestPasswordChange,changePassword,reset} from '../../actions/userActions'; // import actions here

class Password_reset extends Component{
	constructor(props){
		super(props);
		this.state={
			message : '',
			changedPassword : '',
			submitRequest : false,
			queryToken : false
		}
	}
	getQueryToken=()=>{
		let querySearch = new URLSearchParams(this.props.location.search);
		const token = querySearch.get('token');
		return token;
	}
	componentWillMount(){
		const queryToken = this.getQueryToken();
		queryToken
			? this.setState({queryToken : true})
			: console.log('no query token')
	}
	handleSubmitRequest=(e)=>{
		e.preventDefault();
		this.props.requestPasswordChange({'email':this.refs.email.value}).then(()=>{
			if(this.props.user.status==200){
				this.setState({
					submitRequest : true,
					message : 'A verification message has been sent to your email address!'
				});
			}else if(this.props.user.status==404){
				this.setState({
					submitRequest:true,
					message:'Email address not found!'
				});				
			}else{
				this.setState({
					submitRequest:true,
					message:'Something went wrong. Try again!'
				});
			}
		});
		this.refs.email.value="";
	}
	handlePasswordChange=(e)=>{
		e.preventDefault();
		if(this.refs.password.value === this.refs.confirm_password.value){
			this.props.changePassword(this.getQueryToken(), {'password' : this.refs.password.value}).then((e)=>{
					if(this.props.user.status==201){
						this.props.history.push('/login')
					}else{
						this.setState({
							submitRequest:true,
							message:'The token has expired. Please resend your email and reset within 1 hour'
						});
					}
				});
		}else{
			this.setState({
				submitRequest:true,
				message : 'password confirmation failed!'
			});
		}
		this.refs.password.value="";
		this.refs.confirm_password.value="";
	}
	renderRequestForm=()=>{
		return(
			<form onSubmit={this.handleSubmitRequest} className="register-form">
			  	<div className="form-group">
				    <input type="email" ref="email" className="form-control " placeholder="Email" />
			  	</div>
			  	<button type="submit" className="btn btn-primary">Submit</button>
			</form>	
		);
	}
	renderChangePasswordForm=()=>{
		return(
			<form onSubmit={this.handlePasswordChange} className="register-form">
			  	<div className="form-group">
				    <input type="password" ref="password" className="form-control " placeholder="Password" />
			  	</div>
			  	<div className="form-group">
				    <input type="password" ref="confirm_password" className="form-control " placeholder="Confirm Password" />
			  	</div>
			  	<button type="submit" className="btn btn-primary">Submit</button>
			  	<div className="text-center">
			  		<span>Resend password reset link? <u><Link to="/passwordreset">Click Here</Link></u></span>
			  	</div>
			</form>			
		);	
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
						 	<h1>Reset Password</h1>
						 	<div className="hr"></div>
						 	{
						 		this.state.submitRequest
						 			? <p className="error text-danger">&#x2731; {this.state.message}! </p> 
						 			: null
						 	}
					 	</section>
						 {
						 	this.state.queryToken
						 		? this.renderChangePasswordForm()
						 		: this.renderRequestForm()
						 }
					</div>
				</div>		
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		user : state.users
	};
}

export default connect(mapStateToProps,{requestPasswordChange,changePassword,reset})(Password_reset);



