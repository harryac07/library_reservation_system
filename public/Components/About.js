import React , { Component } from 'react';

import CategoryFrame from './Parts/CategoryFrame';

class About extends Component{
	render(){
		return(
			<div>
				<div className="container category_nav">
					<div className="row">
						<CategoryFrame />
						<div className="col-sm-10">
							<div>
							    Home <span className="glyphicon glyphicon-chevron-right"></span>&nbsp;
							    <span style={{color:"gray"}}>About</span>&nbsp;
							</div>
							<h2 className="text-center">About Mero Library</h2>	
							<div className="row">
								<div className="col-sm-6 col-md-6">
									<div className="text-left">
										<h3 className="text-center">Address</h3>
										<hr />
										<p>
											We are located in 3 main places in Kathmandu.
											Our headquarter is in Kathmandu. Check our full details below
										</p>
										<h4>Our Branches</h4>
										<ul className="list-group">
											<li className="list-group-item">
												Kathmandu, Tokha
											</li>
											<li className="list-group-item">
												Kathmandu, Manamaiju
											</li>
											<li className="list-group-item">
												Kathmandu, Thamel
											</li>
										</ul>
									</div>
								</div>
								<div className="col-sm-6 col-md-6">
									<div className="text-left">
										<h3 className="text-center">Services</h3>
										<hr />
										<ul className="list-group">
											<li className="list-group-item">3D Printer</li>
											<li className="list-group-item">Copy Machine</li>
											<li className="list-group-item">Customer Workstation</li>
											<li className="list-group-item">Reading Books</li>
											<li className="list-group-item">Game Console</li>
											<li className="list-group-item">Scanner</li>
											<li className="list-group-item">Video Editing Softwares</li>
											<li className="list-group-item">Color Prints</li>
											<li className="list-group-item">Book Exchange</li>
											<li className="list-group-item">Wifi</li>
										</ul>
									</div>
								</div>
							</div>	
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default About;