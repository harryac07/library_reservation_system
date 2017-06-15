import React,{Component} from 'react';
import {Field, reduxForm,reset} from 'redux-form';
import {Link} from 'react-router-dom';

import Navigation from './Parts/Navigation';
import CategoryFrame from './Parts/CategoryFrame';

const FIELDS = {
	name: {
		type : 'input',
		label : 'name'
	},
	email: {
		type : 'input',
		label : 'email'
	},
	comment : {
		type : 'textarea',
		label : 'comment'
	}
};

class Contact extends Component{
	constructor(props){
		super(props);
        this.state={
            feedback:false
        };
	}
	renderField=(field)=>{
		const {meta : {touched, error} } = field;
		const className = `form-group ${touched&&error ? 'has-error' : ''}`;
		return(
            <div className="group">
                <input type={field.type} placeholder={field.placeholder} autoComplete="off" {...field.input} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>{touched ? error : <i className="fa fa-asterisk" aria-hidden="true"></i>}</label>
            </div>
		);
	}
	renderTextArea =(field)=>{
		const {meta : {touched, error} } = field;
		const className = `form-group ${touched&&error ? 'has-error' : ''}`;
		return(
            <div className="group">
                <textarea type={field.type} placeholder={field.placeholder} autoComplete="off" {...field.input} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>{touched ? error : <i className="fa fa-asterisk" aria-hidden="true"></i>}</label>
            </div>
		);		
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

		return text.replace(/[&<>"']/g, function(m) {
			return map[m];
		});
	}
	onSubmit=(data)=>{
	    console.log(data);
	}
	renderForm=()=>{
		const { error, handleSubmit, pristine, reset, submitting } = this.props
		return(
			<div className="contact_form">
			    <form onSubmit={handleSubmit(this.onSubmit)}>
			    	<Field
			    		placeholder="Enter a name"
			    		type="text"
			    		name="name"
			    		id="Name"
			    		component={this.renderField}/>

			    	<Field
			    		placeholder="Enter a email"
			    		type ="email"
			    		name="email"
			    		id="Email"
			    		component={this.renderField}/>
			    	<Field
			    		placeholder="Enter a comment"
			    		name="comment"
			    		component={this.renderTextArea}/>
			    	<button className="btn btn-primary"type="submit">Submit</button>&nbsp;
			    	<Link className="btn btn-danger" to="/">Cancel</Link>
			    </form>
		    </div>
		);
	}

	render(){
		return(
			<div>
				<Navigation/>
				<div className="container category_nav">
					<div className="row">
						<CategoryFrame />
						<div className="col-sm-10">
							<div>
							    Home <span className="glyphicon glyphicon-chevron-right"></span>&nbsp;
							    <span style={{color:"gray"}}>Contact</span>&nbsp;
							</div>
							<h2 className="text-center">Contact Us</h2>	
							<p className="text-center">Please use the form below to contact us.</p>
							<br />
							<div className="row">
								{this.renderForm()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
/* validate form */
function validate(values){
	const errors ={};
	if(!values.name){
		errors.name = "Name is required!";
	}
	if(!values.email){
		errors.email = "Email is required!";
	}
	if(!values.comment){
		errors.comment = "Comment is required!";
	}
	return errors;


}

/* reset form */
const afterSubmit = (result, dispatch) =>
  		dispatch(reset('contactForm'));

export default reduxForm({
	validate,
	form : 'contactForm',
	onSubmitSuccess: afterSubmit
})(Contact);