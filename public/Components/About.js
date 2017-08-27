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
							<p> Our main services focus on 	Borrowing, renewing, holding and returning of product. We always look forward for customer satisfaction.</p>
							<hr />
							<div className="col-sm-6 col-md-6">
								<div className="text-left">
									<h4>Address</h4>
									<p>
										We are located in 3 main places in Kathmandu.
										Our headquarter is in Kathmandu. Check our full details below
									</p>
									<h4>Our Branches</h4>
									<ul className="">
										<li>
											Kathmandu, Tokha
										</li>
										<li>
											Kathmandu, Manamaiju
										</li>
										<li>
											Kathmandu, Thamel
										</li>
									</ul>
								</div>
							</div>
							<div className="col-sm-6 col-md-6">
								<div className="text-left">
									<h4>Services</h4>
									<ul>
										<li>3D Printer</li>
										<li>Copy Machine</li>
										<li>Customer Workstation</li>
										<li>Reading Books</li>
										<li>Video Editing Softwares</li>
										<li>Color Prints</li>
										<li>Book Exchange</li>
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

export default About;