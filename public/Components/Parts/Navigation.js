import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
	constructor(props){
		super(props);
		this.state={
			cartItemsNumber : 0 // for hiding cart message
		};
	}
	componentWillMount(){
		let cart = localStorage.getItem('cartItems');
		if(cart){
			let cartBooks = cart.split(',');
			this.setState({
				cartItemsNumber : cartBooks.length
			})
		}
		console.log('will mount');
	}
	componentDidUpdate(){
		/* cart manage */
		let element = document.querySelector(".alert");
		if(element){
			document.querySelector(".alert").style.display="block";
			setTimeout(() => {
			  	document.querySelector(".alert").style.display="none";
			}, 2000);
			console.log('i am here running');
		}

		/* update number of cartitems in every cart update in navigation */
		if(!localStorage.getItem('cartItems') && this.state.cartItemsNumber!==0){
			this.setState({cartItemsNumber : 0});
		}

		if(localStorage.getItem('cartItems')){
			if(localStorage.getItem('cartItems').split(',').length!==this.state.cartItemsNumber){
				/* when cart update, update to state */
				this.setState({
					cartItemsNumber : localStorage.getItem('cartItems').split(',').length
				});
			}	
		}

	}
	cartMessage=()=>{		
		/* this is triggered from detail page for cart */
		console.log('current book : '+this.props.cartMessage+' '+this.props.itemInCart);
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
	render(){
		const login = true; // static login for now
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
			      	<li>
			      		{this.cartMessage()}
			      	</li>
			      	{ login 
				      	?
					      	<li>
						      	<Link to="/books/cart">
						        	<span className="glyphicon glyphicon-shopping-cart"></span>
						        	&nbsp;My Cart:{this.state.cartItemsNumber}
						        </Link>
					      	</li>
					    : null
			      	}
			        <li><Link to="#"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
			        <li><Link to="#"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
			      </ul>
			    </div>
			  </div>
			</nav>
		);
	}
}

export default Navigation;