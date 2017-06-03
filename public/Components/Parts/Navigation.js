import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
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