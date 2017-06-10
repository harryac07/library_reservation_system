var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = (res, status, content)=>{
  res.status(status);
  res.json(content);
};

/* register */
module.exports.register = (req, res)=>{
	console.log(req.body.name);
	if (!req.body.name || !req.body.email || !req.body.password) {
		sendJSONresponse(res, 400, {
			"message": "All fields are required"
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


};





