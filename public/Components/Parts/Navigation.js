import React,{ Component } from 'react';

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
			      <a className="navbar-brand active" href="/"><span className="glyphicon glyphicon-home"></span></a>
			    </div>
			    <div className="collapse navbar-collapse" id="top-nav">
			      <ul className="nav navbar-nav">
			        <li><a href="#">ABOUT</a></li>
			        <li><a href="#">CONTACT</a></li>
			       	<li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
			       	<li><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
			       	<li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
			      </ul>
			      <ul className="nav navbar-nav navbar-right">
			        <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
			        <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
			      </ul>
			    </div>
			  </div>
			</nav>
		);
	}
}

export default Navigation;