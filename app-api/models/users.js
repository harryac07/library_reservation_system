const mongoose = require('mongoose');
const crypto = require('crypto');
const books = require('./books');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
	name :{
		type : String,
		required : true
	},
	email : {
		type : String,
		required:true,
		unique : true
	},
	subscription :{
		type : Boolean,
		default : true
	},
	verified : {
		type: Boolean,
		default: false
	},
	verifyToken: {
		type: String
	},
	tokenExpiryTime:{
		type:Date
	},
	admin : {
		type : Boolean,
		default : false
	},
	address : String,
	phone : Number,
	reserved_books : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book',required:false }],
	hash : String,
	salt : String

});

//set password
userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex'); // creating a random string for salt
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex'); // create encryted hash
};
//validate password
userSchema.methods.validPassword = function(password){ // validating submitted password
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
};
//generate Json Web Token
userSchema.methods.generateJwt = function(){
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7); // create expiry date obj and set expiry for 7 days

	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		admin: this.admin,
		subscription :this.subscription,
		address : this.address,
		phone : this.phone,
		reserved_books : this.reserved_books,
		exp: parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_SECRET);
};


module.exports =mongoose.model('User', userSchema); //'modelname' , 'schema name'




