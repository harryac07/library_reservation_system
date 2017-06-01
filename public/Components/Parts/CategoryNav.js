import React,{Component} from 'react';

class CategoryNav extends Component{

	render(){
		return(
		    <div className="book_navigation container-fluid">
		      	<ul className="nav navbar-nav">
			      	<li><a href="/books/category/software">Software</a></li>
			      	<li><a href="/books/category/nature">Nature</a></li>
			      	<li><a href="/books/category/literature">Literature</a></li>
			      	<li><a href="/books/category/romance">Romance</a></li>
			      	<li><a href="/books/category/story">Story</a></li>
			      	<li><a href="/books/category/history">History</a></li>
			      	<li className="active"><a href="/books/category/all">All</a></li>
		      	</ul>
		      	<ul className="nav navbar-nav navbar-right">
		      		<li>
		      			<a>
		      				<form className="form-inline" method="get" action="/books/category/all">
		                        <input type="text" name="search" ref="search" className="form-control" placeholder="search..." />
		                        <input type="submit" className="btn btn-danger" />
	                        </form>
	                    </a>
		      		</li>
		      	</ul>
		    </div>
		);
	}
}


export default CategoryNav;


