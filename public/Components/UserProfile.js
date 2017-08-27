import React,{Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
/* actions */
import {fetchBook,reset} from '../actions/bookActions'; // import actions here
import {fetchUser,updateUser,deleteUser,changePassword} from '../actions/userActions'; // import actions here
/* child components */
import CategoryFrame from './Parts/CategoryFrame';
import UserProfileForm from './Parts/UserProfileForm';
import ChangePasswordForm from './Parts/ChangePasswordForm';

class UserProfile extends Component{
	constructor(props) {
	  	super(props);
	  	this.state={
	  		detailPage : true, // show landing page first
	  		loginStatus : false,
	  		infoUpdateStatus : false,
	  		showPasswordForm : false // toggle for password or detail form
	  	}
	}
	componentWillMount(){
		let loginToken = localStorage.getItem('user-token');
		loginToken
			? this.setState({loginStatus:true})
			: this.setState({loginStatus : false})
	}
	componentDidMount(){
		this.props.fetchUser(this.getCurrentUser()._id);
	}
	getCurrentUser=()=>{
		const token = localStorage.getItem('user-token');
		if(token){
			const payload = JSON.parse(window.atob(token.split('.')[1]));
			const userdata = {
				_id:payload._id,
				email: payload.email,
				name: payload.name,
				admin: payload.admin
			};
			return userdata;
		}
	}
	handleUpdateClick=()=>{
		this.setState({detailPage : false});
	}
	handleViewDetailPage=(status)=>{
		status
			? this.setState({detailPage:true,showPasswordForm:false})
			: this.setState({detailPage:false})
	}
	handleUpdate=(updatedValue)=>{ 
		this.props.updateUser(updatedValue,this.getCurrentUser()._id).then(()=>{
			this.handleViewDetailPage(true);
			this.setState({infoUpdateStatus : true});
		}); // action
	}
	handlePasswordChange=(newPassword)=>{
		console.log(newPassword);
		this.props.changePassword(this.getCurrentUser()._id,newPassword).then(()=>{
			this.handleViewDetailPage(true);
			this.setState({infoUpdateStatus : true});
		});
	}
	deleteProfile=(e,userId)=>{
		const confirmDelete = confirm('You will lose all your history and reserved books.\n\nAre you sure to delete all your informations?');
		confirmDelete
			? 	(
					this.props.deleteUser(userId).then(()=>{
						localStorage.removeItem('user-token');
						localStorage.removeItem('cartItems');
						this.props.history.push('/');
						window.location.reload();
					})
				)
			: 	null
	}
	hideAlert=()=>{
		this.setState({infoUpdateStatus : false});
	}
	renderUpdateForm=()=>{
		return(
			<UserProfileForm user={this.props.user.data}  updateDetail={this.handleUpdate} viewDetailPage={this.handleViewDetailPage} />
		);
	}
	renderChangePasswordForm=()=>{
		this.setState({
			showPasswordForm : true,
			detailPage : false
		});
	}
	renderDetail=()=>{
		const user = this.props.user.data;
		if(!this.state.loginStatus){
			return (
				<div className="well" style={{textAlign:'center'}}><h3>Please Login!</h3></div>
			);			
		}
		if(!(this.props.user.data)){
			return (
				<div className="well" style={{textAlign:'center'}}><h3>User Not Found!</h3></div>
			);
		}

		return(
			<div className="account_tab">
				<div className="col-sm-12 col-xs-12">
					<div className="row">
						<div className="col-sm-3">
							<div className="jumbotron text-center">
								<img src="/images/book-logo.png" className="img img-responsive"/>
								<h3 className="text-center">{_.startCase(_.toLower(user.name))}</h3>
								<hr />
								<h4 className="text-center"><small>{user.address}</small></h4>
							</div>
							<hr />
							{this.state.detailPage 
								? 
									(<div onClick={this.renderChangePasswordForm} className="jumbotron text-center">
										<button className="btn btn-default">Change Password</button>
									</div>)
								: 	null
							}
						</div>
						<div className="col-sm-9">
							<div className="jumbotron">
								{/* */
									this.state.detailPage
										? (
											<div>
												<h2> Basic Informations </h2>
												<ul className="list-unstyled">
													<li>Email : {user.email}</li>
													<li>Address : {user.address}</li>
													<li>Phone : {user.phone}</li>
													<li>Verified : {user.verified ? 'true' : 'false'}</li>
													<li>Subscription : {user.subscription ? 'true' : 'false'}</li>
												</ul>
												<hr />
												<a className="btn btn-primary" onClick={this.handleUpdateClick}>Update Profile</a>
												<a className="btn btn-danger" onClick={(e)=>this.deleteProfile(e,user._id)}> Delete Profile</a>
											</div>
											)
										: this.state.showPasswordForm 
											? <ChangePasswordForm changePassword={this.handlePasswordChange} viewDetailPage={this.handleViewDetailPage} />
											: this.renderUpdateForm()
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	render(){
		return(
			<div className="UserProfile container category_nav">
				<div className="row">
					<CategoryFrame/>
					<div className="col-sm-10">
						<div>
						    Home <span className="glyphicon glyphicon-chevron-right"></span> <span style={{color:"#ccc"}}>My Account</span>
						</div>
					{/**/
						this.renderDetail()
					}
					{
						this.state.infoUpdateStatus
						?
							(
							  	<div className="alert alert-info alert-dismissable alert_message">
							  		<a onClick={this.hideAlert} className="close" data-hide="alert" aria-label="close">&times;</a>
							    	Your info has been updated!
							 	</div>
							)
						: null
					}
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state){
	return{
		book : state.books,
		user : state.users
	};
}
export default connect(mapStateToProps,{fetchBook,reset,fetchUser,updateUser,deleteUser,changePassword})(UserProfile);





