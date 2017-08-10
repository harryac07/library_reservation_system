const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const nodemailer = require('nodemailer');
const moment = require('moment');

const sendJSONresponse = (res, status, content)=>{
  	res.status(status);
  	res.json(content);
};

/* register */
module.exports.register = (req, res)=>{
	console.log(req.body.name);
	if (!req.body.name || !req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "Marked fields are required" // marked means all. 
		});
		return;
	}
	User.findOne({
			'email': req.body.email
		},(err, user)=>{
			if (err) {
				sendJSONresponse(res, 400, err);
				return;
			} else if (user) {
				console.log('user found');
				sendJSONresponse(res, 401, {
					"message": "User already exists"
				});
				return;
			} else {
				/* if user is not found then register new user */
				console.log('user not found, ready to register');
				let newUser = new User(); // create a new user instances
				newUser.name = req.body.name;
				newUser.email = req.body.email;
				newUser.address = req.body.address || undefined;
				newUser.phone = req.body.phone || undefined;
				newUser.verifyToken = newUser.generateJwt();

				if (req.body.email === 'harry_ac07@yahoo.com') {
					newUser.admin = true;
				}
				newUser.setPassword(req.body.password); // use setPassword method to set salt and hash

				newUser.save((err)=>{
					var token;
					if (err) {
						sendJSONresponse(res, 400, err);
						return;
					} else {
						token = newUser.generateJwt(); // Generate JWT using schema method and send it to browser

						sendJSONresponse(res, 200, {
							"token": token
						});
					}
				});

			}
		});
}; //register ends

/* Login */
module.exports.login = (req, res)=>{
	if (!req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "All fields Required."
		});
		return;
	}
	console.log(req.body.email+' : '+req.body.password);
	passport.authenticate('local', function(err, user, info) {
		var token;
		if (err) {
			sendJSONresponse(res, 400, err);
			return;
		}

		if (user) {
			token = user.generateJwt();
			sendJSONresponse(res, 200, {
				"token": token
			});
		} else {
			sendJSONresponse(res, 401, info);
		}

	})(req, res); // make sure that req, res are available to the passport


}; // login ends

/* request password change */
module.exports.requestPasswordChange=(req,res)=>{
	console.log(req.body);
	User.findOne({email : req.body.email})
		.exec((err,user)=>{
			if(err){
				sendJSONresponse(res,400,err);
			}else if(!user){
				sendJSONresponse(res,404,{'message':'user not found'});
			}else{
				/* Before sending user token, create a tokenExpiryTime for 1 hour. */
				user.tokenExpiryTime=Date.now()+3600000; // 1 hr
				user.save((err,user)=>{
					if(err){
						console.log(err);
						return;
					}else{
						// console.log(user);
						//Send user link to reset password

						const transporter = nodemailer.createTransport({
						    host: 'smtp.metropolia.fi',
						    port: 587,
						    secure: false, // secure:true for port 465, secure:false for port 587
						    auth: {
						        user: 'haria',
						        pass: process.env.EMAIL_SECRET	    
						    }
						});
						const sendTo=req.body.email;
						const token = user.verifyToken;
						const resetLink = 'http://' + req.headers.host + '/passwordreset?token=' + token;
						const emailBody = 'Hello ' + user.name + ',\n\n' + 'Here is the link for reseting your password\n\nPlease click in the link below and reset your password\n' + resetLink + '\n\nIf you have not requested to change password then please ignore the email.\n\n\nMero Library';
						
						const mailOptions = {
							from: 'hari.adhikari@metropolia.fi', // sender address
							to : sendTo,
							subject: 'reset your password', // Subject line
							text: emailBody
						};

						transporter.sendMail(mailOptions, function(err, info) {
							if (err) {
								console.log(err);
								sendJSONresponse(res, 400, err);
								return;
							} else if (!info) {
								sendJSONresponse(res, 404, {
									"message": "email not found."
								});
								return;
							} else {
								sendJSONresponse(res, 200, info);
							}
						});

					}
				});
			}
		});
}; // request password change ends

/* change password */
module.exports.changePassword = (req,res)=>{
	console.log(req.body.password);
	const token = req.params.token;
	if(!token){
		sendJSONresponse(res,404,{'message':'token is required!'});
		return;
	}
	User.findOne({
		verifyToken : token,
		tokenExpiryTime:{ $gt: Date.now() } // if token is not expired or crossed 1 hour,
	},(err,user)=>{
		if(err){
			sendJSONresponse(res,400,err);
			return;
		}else if(!user){
			sendJSONresponse(res,404,{'message':'user not found'});
			return;
		}else{
			if(user.verifyToken === token){
				user.setPassword(req.body.password); // use setPassword method to set salt and hash
				user.tokenExpiryTime=undefined; // set tokenexpiry time to be indefined.

				user.save((err,userdata)=>{
					if (err) {
						sendJSONresponse(res, 400, err);
						return;
					} else {
						sendJSONresponse(res, 201, userdata);
					}
				});
			}
		}
	})
	

}

/* Contact */
module.exports.contact = (req,res)=>{
	const transporter = nodemailer.createTransport({
	    host: 'smtp.metropolia.fi',
	    port: 587,
	    secure: false, // secure:true for port 465, secure:false for port 587
	    auth: {
	        user: 'haria',
	        pass: process.env.EMAIL_SECRET	    
	    }
	});
	const sendTo="harry_ac07@yahoo.com";
	const currentTime = moment.utc(new Date).local().format('YYYY MM DD , hh:mm:ss a');

	const mailOptions = {
		from: 'hari.adhikari@metropolia.fi', // sender address
		to : sendTo,
		subject: 'feedback by '+req.body.name, // Subject line
		html: "<h3>This feedback was sent by : </h3>Email : <strong>"+req.body.email+"</strong><br><br>"+req.body.comment+"<br><br>sent at : "+currentTime
			// html or text
	};

	transporter.sendMail(mailOptions, function(error, info) {
		
		if (error) {
			sendJSONresponse(res, 400, error);
		} else {
			sendJSONresponse(res, 200, info);
		}
		transporter.close();
	});

} // contact ends




