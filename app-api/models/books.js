const mongoose = require('mongoose');
const User = require('./users');
const Book = require('./books');

var BookSchema = new mongoose.Schema({
	title:{
		type : String,
		required : true
	},
	available : Number,
	author : {
		type : String,
		required : true
	},
	published_date : Date,
	pages : Number,
	language : String
});

/* complile the schema into a model */
module.exports =mongoose.model('Book', BookSchema); //'modelname' , 'schema name'