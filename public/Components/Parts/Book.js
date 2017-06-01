import React,{Component} from 'react';
import CategoryNav from './CategoryNav';

class Book extends Component{
	render(){
		return(
			<div className="book">
				<CategoryNav />
			    <div className="container">
					<h2>Most Popular</h2>
					<hr />
					<div className="row">
						<div className="col-sm-3 col-md-3">
							<img src = "/images/books.jpg" className="img-img-thumbnail" />
							<div>
								<h3>Hari Bahadur</h3>
								<p>By Hari Bansha Acharya</p>
							</div>
						</div>
						<div className="col-sm-3 col-md-3">
							<img src = "/images/books.jpg" className="img-img-thumbnail" />
							<div>
								<h3>Hari Bahadur</h3>
								<p>By Hari Bansha Acharya</p>
							</div>
						</div>
						<div className="col-sm-3 col-md-3">
							<img src = "/images/books.jpg" className="img-img-thumbnail" />
							<div>
								<h3>Hari Bahadur</h3>
								<p>By Hari Bansha Acharya</p>
							</div>
						</div>
						<div className="col-sm-3 col-md-3">
							<img src = "/images/books.jpg" className="img-img-thumbnail" />
							<div>
								<h3>Hari Bahadur</h3>
								<p>By Hari Bansha Acharya</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Book;