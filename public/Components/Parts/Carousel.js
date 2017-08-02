import React from 'react';
import { Button,Carousel } from 'react-bootstrap';

function Carousels(props){
	return(
	  	<Carousel>
		    <Carousel.Item>
		      	<Carousel.Caption>
		          	<h3>SIGNUP Today!</h3>
		          	<p>Visit us and start your journey of success. Login and make reservation of your need</p>
		      	</Carousel.Caption>
		    </Carousel.Item>
		    <Carousel.Item>
		      	<Carousel.Caption>
		          	<h3>Daily Updates? We tell you.</h3>
		          	<p>Our registered customers will get updated about every changes. We drop an envelop right away to your address ;)</p>
		      	</Carousel.Caption>
		    </Carousel.Item>
		    <Carousel.Item>
		      	<Carousel.Caption>
		          	<h3>PRIVACY?</h3>
		          	<p>We are more concerned about your privacy. We will ask any abnormal changes that occured in your account. Do not forget to verify yourself</p>
		      	</Carousel.Caption>
		    </Carousel.Item>
		    <Carousel.Item>
		      	<Carousel.Caption>
		          	<h3>DONATE TODAY! HELP OTHERS</h3>
		          	<p>YES! your are the reason for every good things happened today. Donate a little today, we will share happiness tomorrow</p>
		      	</Carousel.Caption>
		    </Carousel.Item>
	  	</Carousel>
	);
}

export default Carousels;