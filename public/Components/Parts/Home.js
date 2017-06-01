import React,{ Component } from 'react';

class Home extends Component {
	render(){
		return(
			<div>
			  	<div className="container-fluid nav-bottom">
				    <div className="center_nav_bottom">
				    	<ul className="nav navbar-nav">
				      	<li><a href="/">HOME</a></li>
				      </ul>
				      <ul className="nav navbar-nav navbar-right">
				      	<li><a href="/">SERVICES</a></li>
				      	<li><a href="/">CONTACTS</a></li>
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