import React,{Component} from 'react';

class UserProfileForm extends Component{
	constructor(props) {
	  	super(props);
	  	this.state={
	  		name : '',
	  		email:'',
	  		subscription:'',
	  		address:'',
	  		phone:0
	  	}
	}
	handleInputChange=(e)=>{
		this.setState({[e.target.name]: e.target.value});
	}
	componentDidMount(){
		const {user} = this.props;
		if(user){
			this.setState({
				name : user.name,
				email : user.email,
				subscription : user.subscription,
				address : user.address,
				phone : user.phone
			});
		}
	}
	viewDetailPage=(e)=>{
		e.preventDefault();
		this.props.viewDetailPage(true);
	}
	submitForm=(e)=>{
		e.preventDefault();
		const updatedInfo={
	  		name : this.refs.name.value,
	  		email:this.refs.email.value,
	  		subscription:(this.refs.subscription.value.toLowerCase()==='true'),
	  		address:this.refs.address.value,
	  		phone:this.refs.phone.value
		};
		this.setState(updatedInfo);
		this.props.submit(updatedInfo); // send to parent
	}
	render(){
		return(
				<div className="">
					<h2>Update your information</h2>
					<form onSubmit={this.submitForm} className="form-horizontal">
					  	<div className="form-group">
						    <label className="control-label col-sm-3" htmlFor="name">Name:</label>
						    <div className="col-sm-9">
						      <input onChange={this.handleInputChange} type="text" value={this.state.name} ref="name" className="form-control " name="name" placeholder="Enter name" />
						    </div>
					  	</div>
					  	<div className="form-group">
						    <label className="control-label col-sm-3" htmlFor="email">Email:</label>
						    <div className="col-sm-9">
						      <input onChange={this.handleInputChange} type="email" value={this.state.email} ref="email" className="form-control " name="email" placeholder="Enter email" />
						    </div>
					  	</div>
					  	<div className="form-group">
						    <label className="control-label col-sm-3" htmlFor="subscription">Subscription:</label>
						    <div className="col-sm-9">
						        <select onChange={this.handleInputChange} value={this.state.subscription} className="form-control" name="subscription" ref="subscription">
								    <option value={true}>True</option>
								    <option value={false}>False</option>
								</select>
						    </div>
					  	</div>
					  	<div className="form-group">
						    <label className="control-label col-sm-3" htmlFor="address">Address:</label>
						    <div className="col-sm-9">
						      <input onChange={this.handleInputChange} type="text" ref="address" value={this.state.address} className="form-control" name="address" placeholder="Enter address" />
						    </div>
					  	</div>
					  	<div className="form-group">
						    <label className="control-label col-sm-3" htmlFor="phone">Phone:</label>
						    <div className="col-sm-9">
						      <input onChange={this.handleInputChange} type="number" ref="phone" value={this.state.phone} className="form-control" name="phone" placeholder="Enter phone" />
						    </div>
					  	</div>
					  	<div className="form-group">
						    <div className="col-sm-9">
						      <button type="submit" className="btn btn-primary">Update Info</button>
						      <button onClick={this.viewDetailPage} className="btn btn-danger">Cancel</button>
						    </div>
					  	</div>
					  	
					</form>
				</div>
		);
	}
}
export default UserProfileForm;