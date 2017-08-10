import React,{Component} from 'react';
import {connect} from 'react-redux';
import {contact,reset} from '../actions/authActions'; // import actions here
import _ from 'lodash';

import ContactForm from './Parts/ContactForm';

class Contact extends Component{
	constructor(props){
		super(props);
        this.state={
            feedback:false
        };
	}
	componentWillUnmount(){
		this.props.reset();
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
		return(
			<div>
				<ContactForm feedback={this.state.feedback} data={this.submitContact} />
			</div>
		);
	}
}

export default connect(null,{contact,reset})(Contact);