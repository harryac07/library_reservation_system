import React, { Component } from 'react';

class Carousel extends Component{
	render(){
		return(
			<div className="container-fluid carousel">
			  <div id="myCarousel" className="slide">
			    <ol className="carousel-indicators">
			      <li className="item1 active"></li>
			      <li className="item2"></li>
			      <li className="item3"></li>
			      <li className="item4"></li>
			    </ol>

			    <div className="carousel-inner" role="listbox">

			      <div className="item active">
			        <div className="carousel-caption">
			          <h3>SIGNUP Today!</h3>
			          <p>Visit us and start your journey of success. Login and make reservation of your need</p>
			        </div>
			      </div>

			      <div className="item">
			        <div className="carousel-caption">
			          <h3>Daily Updates? We tell you.</h3>
			          <p>Our registered customers will get updated about every changes. We drop an envelop right away to your address ;)</p>
			        </div>
			      </div>
			    
			      <div className="item">
			        <div className="carousel-caption">
			          <h3>PRIVACY?</h3>
			          <p>We are more concerned about your privacy. We will ask any abnormal changes that occured in your account. Do not forget to verify yourself</p>
			        </div>
			      </div>

			      <div className="item">
			        <div className="carousel-caption">
			          <h3>DONATE TODAY! HELP OTHERS</h3>
			          <p>YES! your are the reason for every good things happened today. Donate a little today, we will share happiness tomorrow</p>
			        </div>
			      </div>

			    </div>
			    <a className="left carousel-control"  role="button">
			      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			      <span className="sr-only">Previous</span>
			    </a>
			    <a className="right carousel-control"  role="button">
			      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
			      <span className="sr-only">Next</span>
			    </a>
			  </div>
			</div>
		);
	}
}

export default Carousel;