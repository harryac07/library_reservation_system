const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const User = mongoose.model('User');
const _ = require('lodash');

const sendJSONresponse = (res, status, content)=>{
	res.status(status);
	res.json(content);
};

/* GET all books */
module.exports.listBooks = (req,res)=>{
	const queryParams = req.query.sort;
	if(queryParams==='rating'){
		//sort by rating(desc) to get popular books
		Book.find().sort({'rating':-1}).exec((err,book)=>{
			if(err){
				sendJSONresponse(res,400,err);
			}else if(!book){
				sendJSONresponse(res,404,{'message':'Book not found'});
			}else{
				sendJSONresponse(res,200,book);
			}
		});
	}else{
		Book.find((err,book)=>{
			if(!book || book.length<=0){
				sendJSONresponse(res,404,{'message':'Book Not Found'});
			}else if(err){
				sendJSONresponse(res,400,err);
			}else{
				sendJSONresponse(res,200,book);
			}
		});
	}
	return;
};

/* GET a single book */
module.exports.listBook = (req,res)=>{
	const id = req.params.id;
	if(!id){
		sendJSONresponse(res,404,{'message':'book id is required'});
		return;
	}
	Book.findById(id,(err,book)=>{
		if(!book){
			sendJSONresponse(res,404,{'message':'book not found with that id'});
		}else if(err){
			sendJSONresponse(res,400,err);
		}else{
			sendJSONresponse(res,200,book);
		}
	});
	return;
};

/* GET list of books by categories selected */
module.exports.listByCategory = (req,res)=>{
	const category = req.params.name.replace(/\s/g, '');
	if(!category){
		sendJSONresponse(res,404,{'message':'category name is required'});
		return;
	}
	/* if category selected is all, display list of books */
	if(category==='all'){
		this.listBooks(req,res);
	}else{
		Book
			.find({"category": new RegExp(category, 'i')},(err,book)=>{
			if(!book){
				sendJSONresponse(res,404,{'message':'books not found on this category'});
			}else if(err){
				sendJSONresponse(res,400,err);
			}else{
				sendJSONresponse(res,200,book);
			}
		});
	}
};

/* GET books by search input */
module.exports.listBySearch = (req,res)=>{
	const search = req.params.search;
	if(!search){
		sendJSONresponse(res,404,{'message':'books not found with the given keyword'});
	}
	Book
		.find({
			$or : [{
				'title' : new RegExp(search,'i')
			},{
				'category' : new RegExp(search,'i')
			},{
				'keywords' : new RegExp(search,'i')
			}]
		},(err,book)=>{
			if(!book){
				sendJSONresponse(res,404,{',message':'book not found'});
			}else if(err){
				sendJSONresponse(res,400,err);
			}else{
				sendJSONresponse(res,200,book);
			}
		});
};

/* getCartItems POST*/
module.exports.getCartItems=(req,res)=>{
	Book
		.find((err,book)=>{
			if(err){
				sendJSONresponse(res,400,err);
			}else if(!book){
				sendJSONresponse(res,404,{'message':'book not found'});
			}else{
				var itemsArray=[]; // contains objects for cart
				var dbBook = book;
				for(var i=0;i<dbBook.length;i++){
					for(var j=0;j<req.body.length;j++){
						if(dbBook[i]._id == req.body[j]){
							itemsArray.push(dbBook[i]);
							
						}
					}
				}
				//sending back the filtered response
				sendJSONresponse(res,200,itemsArray);			
			}
		});
}

/* POST reserve book and send notification to client */
module.exports.makeReservation = (req,res)=>{
	const queryParams = req.query.user;
	if(!queryParams){
		sendJSONresponse(res,404,{'message':'user email/id is required'});
	}
	User.findOne({email : queryParams},(err,user)=>{
		if(err){
			sendJSONresponse(res,400,err);
		}else if(!user){
			sendJSONresponse(res,404,{'message':'user not found'});
		}else{
			const books = req.body;
			for(var i=0;i<books.length;i++){
				if(user.reserved_books.indexOf(books[i])<0){
					user.reserved_books.push(books[i]);
				}
			}
			user.save((err,user)=>{
				if(err){
					sendJSONresponse(res,400,err);
				}else{
					sendJSONresponse(res,201,user);
				}
			});
		}
	});

}
/* DELETE Remove reservation ,each book */
module.exports.removeReservation=(req,res)=>{
	const query = req.query.user;
	const id = req.params.id;
	if(!query){
		sendJSONresponse(res,404,{'message':'user email/id is required'});
	}
	User.findOne({email : query},(err,user)=>{
		if(err){
			sendJSONresponse(res,400,err);
		}else if(!user){
			sendJSONresponse(res,404,{'message':'user not found'});
		}else{
			const index = user.reserved_books.indexOf(id);
			user.reserved_books.splice(index,1);
			user.save((err,user)=>{
				if(err){
					sendJSONresponse(res,201,err);
				}else{
					sendJSONresponse(res,200,user);
				}
			});
		}
	});
}

/* POST book */
module.exports.postBook = (req,res)=>{
	let categories = "";
	let keywords = "";

	keywords=req.body.keywords.replace(/\s/g, '').split(',');
	categories=req.body.category.replace(/\s/g, '').split(',');

	Book.create({
		title : req.body.title,
		category : categories,
		keywords : keywords,
		description : req.body.description,
		available : req.body.available,
		author : req.body.author,
		published_date : req.body.published_date,
		pages : req.body.pages,
		language : req.body.language	
	},(err,book)=>{
		if(err){
			sendJSONresponse(res,400,err);
		}else{
			sendJSONresponse(res,201,book);
		}
	});
};

/* UPDATE book */
module.exports.updateBook = (req,res)=>{
	const id = req.params.id;
	if(!id){
		sendJSONresponse(res,404,{'message':'book id is required to update book'});
		return;
	}
	Book.findById(id,(err,book)=>{
		if(!book){
			sendJSONresponse(res,404,{'message':'book not found with that id'});
		}else if(err){
			sendJSONresponse(res,400,err);
		}else{
			let categories = "";
			let keywords = "";

			keywords=req.body.keywords.replace(/\s/g, '').split(',');
			categories=req.body.category.replace(/\s/g, '').split(',');

			book.title = req.body.title,
			book.category = categories,
			book.keywords = keywords,
			book.available = req.body.available,
			book.description = req.body.description,
			book.author = req.body.author,
			book.published_date = req.body.published_date,
			book.pages = req.body.pages,
			book.language = req.body.language

			book.save((err,book)=>{
				if(err){
					sendJSONresponse(res,400,err);
				}else{
					sendJSONresponse(res,200,book);
				}
			});
		}
	});
};

/* DELETE book */
module.exports.deleteBook = (req,res)=>{
	const id = req.params.id;
	if(!id){
		sendJSONresponse(res,404,{'message':'book id is required to delete book'});
		return;
	}
	Book.findByIdAndRemove(id,(err,book)=>{
		if(!book){
			sendJSONresponse(res,404,{'message':'book not found with that id'});
		}else if(err){
			sendJSONresponse(res,400,err);
		}else{
			sendJSONresponse(res,204,null);
		}
	});
};

/* GET a review to book */
module.exports.readReview = (req,res)=>{
	const bookId = req.params.bookid;
	const reviewId = req.params.reviewid;
	if(!bookId && !reviewId){
		sendJSONresponse(res,404,{'message':'book id & review id is required'});
		return;
	}
	Book.findById(bookId,(err,book)=>{
		if(err){
			sendJSONresponse(res,400,err);
		}else if(!book){
			sendJSONresponse(res,404,{'message':'book not found with that id'});
		}

		if(book.review && book.review.length>0){
			const review = book.review.id(reviewId); // mongoose subdocument.id method to search matching id
			if(!review){
				sendJSONresponse(res,404,{'message':'review id not found'});
			}
			response ={
				book : {
					title : book.title,
					id : bookId
				},
				review : review
			};
			sendJSONresponse(res,200,response);
		}else{
			sendJSONresponse(res,404,{'message':'review not found'});
		}
	});
};

/* ADD review */
module.exports.addReview = (req, res) =>{
	const bookId = req.params.bookid;
	if(!bookId){
		sendJSONresponse(res,404,{'message':'book id is required'});
		return;
	}
	Book.findById(bookId,(err,book)=>{
		if(err){
			sendJSONresponse(res,400,err);
		}else if(!book){
			sendJSONresponse(res,404,{'message':'book not found with that id'});
		}

		book.review.push({
			reviewAuthor: req.body.reviewAuthor,
			rating: req.body.rating,
			review: req.body.review
		});
		book.save((err,book)=>{
			if(err){
				sendJSONresponse(res,400,err);
			}else{
				sendJSONresponse(res,201,book);
			}
		});

	})
};










