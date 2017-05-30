const mongoose = require('mongoose');
const Book = mongoose.model('Book');

const sendJSONresponse = (res, status, content)=>{
	res.status(status);
	res.json(content);
};

/* GET all books */
module.exports.listBooks = (req,res)=>{
	Book
		.find((err,book)=>{
			if(!book || book.length<=0){
				sendJSONresponse(res,404,{'message':'Book Not Found'});
			}else if(err){
				sendJSONresponse(res,400,err);
			}else{
				sendJSONresponse(res,200,book);
			}
		});
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

/* POST book */
module.exports.postBook = (req,res)=>{
	Book.create({
		title : req.body.title,
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
			book.title = req.body.title,
			book.available = req.body.available,
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









