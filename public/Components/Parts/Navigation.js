import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Navigation extends Component {
	constructor(props){
		super(props);
		this.state={
			cartItemsNumber : 0, // for hiding cart message
			loggedIn : false,
			currentUser : {}
		};
	}
	getCurrentUser=(token)=>{
		const payload = JSON.parse(window.atob(token.split('.')[1]));
		const userdata = {
			_id:payload._id,
			email: payload.email,
			name: payload.name,
			admin: payload.admin
		};
		this.setState({currentUser : userdata});
	}
	componentWillMount(){
		let cart = localStorage.getItem('cartItems');
		let login = localStorage.getItem('user-token');
		if(cart){
			let cartBooks = cart.split(',');
			this.setState({
				cartItemsNumber : cartBooks.length
			});
		}
		if(login){
			this.setState({
				loggedIn : true
			});
			this.getCurrentUser(login);
		}
	}
	componentDidUpdate(){
		/* cart manage */
		let element = document.querySelector(".alert");
		if(element){
			document.querySelector(".alert").style.display="block";
			setTimeout(() => {
			  	document.querySelector(".alert").style.display="none";
			}, 2000);
		}

		/* update number of cartitems in every cart update in navigation */
		if(!localStorage.getItem('cartItems') && this.state.cartItemsNumber!==0){
			this.setState({cartItemsNumber : 0});
			console.log('i am updated');
		}
		/* user loggedin status */
		if(localStorage.getItem('user-token') && this.state.loggedIn===false){
			this.setState({loggedIn : true});
			this.getCurrentUser(localStorage.getItem('user-token'));
			console.log('i am updated');
		}

		if(localStorage.getItem('cartItems')){
			if(localStorage.getItem('cartItems').split(',').length!==this.state.cartItemsNumber){
				/* when cart update, update to state */
				this.setState({
					cartItemsNumber : localStorage.getItem('cartItems').split(',').length
				});
				console.log('i am updated');
			}	
		}

	}
	cartMessage=()=>{
	
		/* this is triggered from detail page for cart */
		if(this.props.cartMessage===true){
			if(this.props.itemInCart){
				return(
					<a className="alert alert-success" style={{color:'#000'}}>
						<strong>{this.props.currentBook}</strong> is succesfully Added.
					</a>
				);
			}else{
				return(
					<a className="alert alert-danger" style={{color:'#000'}}>
						<strong>{this.props.currentBook}</strong> is succesfully Removed.
					</a>
				);
			}			
		}
	}
	logout=()=>{
		localStorage.removeItem('user-token');
		localStorage.removeItem('cartItems');
		window.location.reload();
	}
	render(){

		return(
			<nav className="navbar navbar-inverse navbar-fixed-top">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#top-nav">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>                        
			      </button>
			      <Link className="navbar-brand active" to="/"><span className="glyphicon glyphicon-home"></span></Link>
			    </div>
			    <div className="collapse navbar-collapse" id="top-nav">
			      <ul className="nav navbar-nav">
			        <li><Link to="#">ABOUT</Link></li>
			        <li><Link to="#">CONTACT</Link></li>
			       	<li><Link to="#"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
			       	<li><Link to="#"><i className="fa fa-google-plus" aria-hidden="true"></i></Link></li>
			       	<li><Link to="#"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
			      </ul>
			      <ul className="nav navbar-nav navbar-right">
			      	{ this.state.loggedIn 
				      	?
					      	(
					      		[<li key={0}>
						      		{this.cartMessage()}
						      	</li>,
					      		<li key={1}>
							      	<Link to="/books/cart">
							        	<span className="glyphicon glyphicon-shopping-cart"></span>
							        	&nbsp;My Cart:{this.state.cartItemsNumber}
							        </Link>
						      	</li>,
						      	<li key={3}><a>USER : {this.state.currentUser.name.toUpperCase()}</a></li>,
						      	<li key={4} onClick={()=>this.logout()}><a>Logout</a></li>]
					      	)
					    : 	(
						        [<li key={5}><Link to="/register"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>,
						        <li key={6}><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>]
					    	)
			      	}
			      </ul>
			    </div>
			  </div>
			</nav>
		);
	}
}


export default Navigation;