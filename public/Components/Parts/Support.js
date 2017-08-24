import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class Support extends Component{
	constructor(props){
		super(props);
		this.state={
			facebook_share : ''
		}
	}
	render(){
		const facebook_share = '<div class="fb-follow" data-href="https://www.facebook.com/officialroutineofnepalbanda/" width="50px" data-layout="standard" data-size="large" data-show-faces="true"></div>';
		return(
			<div>
				<div className="container support">
					<div className="row">
						<div className="col-sm-4">
							<div>
								<h4>FOLLOW US</h4>
								<div className="support_contact_link">
						       		<Link to="#" className="btn btn-social-icon"><i className="fa fa-facebook" aria-hidden="true"></i></Link>
						       		<Link to="#" className="btn btn-social-icon"><i className="fa fa-google-plus" aria-hidden="true"></i></Link>
						       		<Link to="#" className="btn btn-social-icon"><i className="fa fa-twitter" aria-hidden="true"></i></Link>
						       		<Link to="#" className="btn btn-social-icon"><i className="fa fa-yahoo" aria-hidden="true"></i></Link>
						       	</div>
								<hr />
								<div dangerouslySetInnerHTML = {{__html: facebook_share}} />

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
							<div>
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
			</div>
		);
	}
}

export default Support;