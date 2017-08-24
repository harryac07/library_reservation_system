import React,{Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import CategoryFrame from './Parts/CategoryFrame';
import {fetchBook,reset} from '../actions/bookActions'; // import actions here
import {fetchUser,updateUser} from '../actions/userActions'; // import actions here

import UserProfileForm from './Parts/UserProfileForm';

class UserProfile extends Component{
	constructor(props) {
	  	super(props);
	  	this.state={
	  		detailPage : true, // show landing page first
	  		loginStatus : false
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
			? this.setState({detailPage:true})
			: this.setState({detailPage:false})
	}
	handleUpdateInfo=(updatedValue)=>{ // need to work on here. action and reducer not done yet
		console.log(updatedValue);
		this.props.updateUser(updatedValue,this.getCurrentUser()._id).then(()=>{
			this.handleViewDetailPage(true);
		}); // action
	}
	renderUpdateForm=()=>{
		return(
			<UserProfileForm user={this.props.user.data} submit={this.handleUpdateInfo} viewDetailPage={this.handleViewDetailPage} />
		);
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
							<div className="jumbotron">
								<img src="/images/book-logo.png" className="img img-responsive"/>
								<h3>{_.startCase(_.toLower(user.name))}</h3>
								<hr />
								<h4><small>{user.address}</small></h4>
							</div>
						</div>
						<div className="col-sm-9">
							<div className="jumbotron">
								{/**/
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
												<a className="btn btn-danger"> Delete Profile</a>
											</div>
											)
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
export default connect(mapStateToProps,{fetchBook,reset,fetchUser,updateUser})(UserProfile);





