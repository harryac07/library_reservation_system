import React,{Component} from 'react';
import {Field, reduxForm,reset} from 'redux-form';
import {Link} from 'react-router-dom';

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

class ContactForm extends Component{
	constructor(props){
		super(props);
	}
	renderField=(field)=>{
		const {meta : {touched, error} } = field;
		const className = `form-group ${touched&&error ? 'has-error' : ''}`;
		return(
            <div className={className}>
            	<i className="fa fa-asterisk" aria-hidden="true"></i>
                <input type={field.type} className="form-control"  placeholder={field.placeholder} autoComplete="off" {...field.input} />
                <label className="contact_form_label">{touched ? error : null}</label>
            </div>
		);
	}
	renderTextArea =(field)=>{
		const {meta : {touched, error} } = field;
		const className = `form-group ${touched&&error ? 'has-error' : ''}`;
		return(
            <div className={className}>
            	<i className="fa fa-asterisk" aria-hidden="true"></i>
                <textarea type={field.type} className="form-control"  placeholder={field.placeholder} autoComplete="off" {...field.input} />
                <label className="contact_form_label">{touched ? error : null}</label>
            </div>
		);		
	}
	onSubmit=(data)=>{
	    this.props.data(data);
	}
	renderForm=()=>{
		const { error, handleSubmit, pristine, reset, submitting } = this.props
		return(
			<div className="">
			    <form onSubmit={handleSubmit(this.onSubmit)} className="common-form">
			    	<Field
			    		placeholder="Enter Name"
			    		type="text"
			    		name="name"
			    		component={this.renderField}/>

			    	<Field
			    		placeholder="Enter Email"
			    		type ="email"
			    		name="email"
			    		component={this.renderField}/>
			    	<Field
			    		placeholder="Enter Comment"
			    		name="comment"
			    		component={this.renderTextArea}/>
			    	<button className="btn btn-primary contact_button"type="submit">Submit</button>&nbsp;
			    	<Link className="btn btn-danger contact_button" to="/">Cancel</Link>
			    </form>
		    </div>
		);
	}

	render(){
		return(
			<div>
				{this.renderForm()}	
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
})(ContactForm);