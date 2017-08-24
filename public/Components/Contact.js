import React,{Component} from 'react';
import {connect} from 'react-redux';
import {contact,reset} from '../actions/authActions'; // import actions here
import _ from 'lodash';

import ContactForm from './Parts/ContactForm';

class Contact extends Component{
	constructor(props){
		super(props);
        this.state={
            feedback:false,
            parentHeight:0,
            formHeight:0
        };
	}
	setHeightOfParent=()=>{
		const parentHeight =document.querySelector('.container').clientHeight;
		const first_child_div =document.querySelector('.first_child_div').clientHeight;
		const wrapLoginForm = document.querySelector('.wrapLoginForm').clientHeight;
		// const elementHeight = this.state.formHeight;
		console.log(parentHeight,first_child_div+wrapLoginForm+25);
		this.setState({ parentHeight:  first_child_div+wrapLoginForm+25});		
	}
	componentDidMount(){
		this.setHeightOfParent();
		window.addEventListener("resize", this.setHeightOfParent);
	}
	componentDidUpdate(prevProps, prevState){
		prevState.parentHeight===0
			? this.setHeightOfParent()
			: null
	}
	submitContact=(data)=>{
		const contactData={
			name : this.escapeHtml(data.name),
			comment : this.escapeHtml(data.comment),
			email : data.email
		};
		this.props.contact(contactData);
		this.setState({feedback : true});
	}
	componentWillUnmount(){
		this.props.reset();
		window.removeEventListener("resize",this.setHeightOfParent);
	}
	/* escape html entities for preventing XXS */
	escapeHtml=(text)=>{
		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};

		return text.replace(/[&<>"']/g,(m)=>{
			return map[m];
		});
	}
	render(){
		console.log(this.state.parentHeight);
		return(
			<div className="container category_nav ContactForm" style={{height:this.state.parentHeight}}>
				<div className="first_child_div">
					<div className="login-logo-image">
						<img src = "/images/book-logo.png"/>
					</div>
					<div className="well wrapLoginForm">
						<section style={{textAlign:'center'}}>
						 	<h1>Contact us</h1>
						 	<div className="hr"></div>
					 	</section>
						<ContactForm  data={this.submitContact} />
						{
							this.state.feedback
							?
								(
								  	<div className="alert alert-info alert-dismissable alert_message">
								  		<a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
								    	Thank you for your feedback!
								 	</div>
								)
							: null
						}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null,{contact,reset})(Contact);