const mongoose = require('mongoose');
const User = require('./users');
const Book = require('./books');

/* Schema for reviews */
var reviewSchema = new mongoose.Schema({
  	reviewAuthor: {
	  	type:String,
	    required:true
  	},
  	rating: {type: Number,required:true,min: 0, max: 5},
  	review: {type:String},
  	createdOn: {
	  	type: Date, 
	  	default: Date.now
  	}
});

var BookSchema = new mongoose.Schema({
	title:{
		type : String,
		required : true
	},
	image : {
		type : String
	},
	review: [reviewSchema],
	category:String,
	keywords : [String],
	available : Number,
	author : {
		type : String,
		required : true
	},
	description : String,
	published_date : Date,
	pages : Number,
	language : String
});

/* complile the schema into a model */
module.exports =mongoose.model('Book', BookSchema); //'modelname' , 'schema name'