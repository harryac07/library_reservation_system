var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name :{
		type : String,
		required : true
	},
	address : String,
	phone : Number,
	reserved_books : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book',required:false }],
	penalty_fee : Number,
	unpaid_penalty : Number,
	paid_penalty: Number,
	donate : Number

});

module.exports =mongoose.model('User', UserSchema); //'modelname' , 'schema name'