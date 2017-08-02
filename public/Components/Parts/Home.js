import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
	render(){
		return(
			<div>
			  	<div className="container-fluid nav-bottom">
				    <div className="center_nav_bottom">
				    	<ul className="nav navbar-nav">
				      	<li><Link to="/">HOME</Link></li>
				      </ul>
				      <ul className="nav navbar-nav navbar-right">
				      	<li><Link to="/about">SERVICE</Link></li>
				      	<li><Link to="/contact">CONTACT</Link></li>
				      </ul>
				    </div>
				</div>

			  	<div className="popular-book">
			  	</div>

			  	<div>
			  		<blockquote className="quote">
			  			A book is a device to ignite the imagination.
			  			<cite>
			  				Alan Bennett
			  			</cite>
			  		</blockquote>
	  			</div>
	  		</div>
		);
	}
}

export default Home;