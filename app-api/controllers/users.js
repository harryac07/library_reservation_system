const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJSONresponse = (res, status, content)=>{
	res.status(status);
	res.json(content);
};

/* GET all users */
module.exports.listUsers = (req,res)=>{
	User.find((err,user)=>{
		if(user.length<=0 || !user){
			sendJSONresponse(res,404,{'message':'users not found'});
		}else if(err){
			sendJSONresponse(res,400,err);
		}else{
			sendJSONresponse(res,200,user);
		}
	});
};

/* GET one user */
module.exports.listUser = (req,res)=>{
	const userId = req.params.id;
	if(!userId){
		sendJSONresponse(res,404,{'message':'user id is required'});	
	}
	
	User.findById(userId)
		.populate('reserved_books.book', '_id title author rating description image') // comes more if needed
		.exec((err,user)=>{
		if(!user){
			sendJSONresponse(res,404,{'message':'users not found with that id'});
		}else if(err){
			sendJSONresponse(res,400,err);
		}else{
			sendJSONresponse(res,200,user);
		}
	});
};

/* POST a user */
module.exports.postUser = (req,res)=>{
	User.create({
		name : req.body.name,
		email : req.body.email,
		address : req.body.address,
		phone : req.body.phone
	},(err,user)=>{
		if(err){
			sendJSONresponse(res,400,err);
		}else{
			sendJSONresponse(res,200,user);
		}
	});
};

/* UPDATE a user */
module.exports.updateUser = (req,res)=>{
	const userId = req.params.id;
	if(!userId){
		sendJSONresponse(res,404,{'message':'user id is required'});	
	}
	User.findById(userId,(err,user)=>{
		if(!user){
			sendJSONresponse(res,404,{'message':'users not found with that id'});
		}else if(err){
			sendJSONresponse(res,400,err);
		}else{
			user.name = req.body.name,
			user.email = req.body.email,
			user.address = req.body.address,
			user.phone = req.body.phone,
			user.subscription = req.body.subscription,
			user.admin = user.admin,
			user.cart_books = user.cart_books,
			user.hash = user.hash,
			user.salt = user.salt,
			user.reserved_books = user.reserved_books,
			user.verified = user.verified,
			user.verifyToken = user.verifyToken,
			user.__v = user.__v,
			user._id = user._id

			user.save((err,user)=>{
				err
					? sendJSONresponse(res,400,err)
					: sendJSONresponse(res,200,user)
			});	
		}
	});
};

/* DELETE a user */
module.exports.deleteUser = (req,res)=>{
	const userId = req.params.id;
	if(!userId){
		sendJSONresponse(res,404,{'message':'user id is required to delete'});	
	}
	User.findByIdAndRemove(userId,(err,user)=>{
		if(!user){
			sendJSONresponse(res,404,{'message':'users not found with that id'});
		}else if(err){
			sendJSONresponse(res,400,err);
		}else{
			sendJSONresponse(res,204,null);
		}
	});
};













