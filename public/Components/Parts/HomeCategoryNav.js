import React,{Component} from 'react';
import { Link } from 'react-router-dom';

class CategoryNav extends Component{

	render(){
		return(
		    <div className="book_navigation container-fluid">
		      	<ul className="nav navbar-nav">
			      	<li><Link to="/books/category/software">Software</Link></li>
			      	<li><Link to="/books/category/nature">Nature</Link></li>
			      	<li><Link to="/books/category/literature">Literature</Link></li>
			      	<li><Link to="/books/category/romance">Romance</Link></li>
			      	<li><Link to="/books/category/story">Story</Link></li>
			      	<li><Link to="/books/category/history">History</Link></li>
			      	<li className="active"><Link to="/books/category/all">All</Link></li>
		      	</ul>
		      	<ul className="nav navbar-nav navbar-right">
		      		<li>
		      			<a>
		      				<form className="form-inline" method="get" action="/books/category/search">
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


