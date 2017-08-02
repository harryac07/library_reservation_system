import React from 'react';
import {Link} from 'react-router-dom';

function Support(props){
	return(
		<div>
			<div className="container support">
				<div className="row">
					<div className="col-sm-4">
						<div>
							<h4>FOLLOW US</h4>
						</div>
					</div>
					<div className="col-sm-4">
						<div>
							<div className="well">
								<div className="support-icon">
									<i className="fa fa-users" aria-hidden="true"></i>
								</div>
								<div className="support-content">
									<h4>JOIN LIBRARY</h4>
									<p>Join today and get free access to our services. Take away and read anywhere, the choice is yours!</p>
								</div>
							</div>
							<div className="well">
								<div className="support-icon">
									<i className="fa fa-phone" aria-hidden="true"></i>
								</div>
								<div className="support-content">
									<h4>ONLINE SUPPORT</h4>
									<p>Follow the links below to get full support. Dont forget to signup before you make any enqueries.</p>
								</div>
							</div>
							<div className="well">
								<div className="support-icon">
									<i className="fa fa-heart" aria-hidden="true"></i>
								</div>
								<div className="support-content">
									<h4>DONATE US</h4>
									<p>No one has ever become poor by giving! Donate us and help us help more people on remote</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-4">
						<div className="support-links">
							<h4>USEFUL LINKS</h4>
							<ul>
								<li><Link to="/contact">contact us</Link></li>
								<li>about us</li>
								<li>most viewed books</li>
								<li>top rated books</li>
								<li>our works and activities</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Support;