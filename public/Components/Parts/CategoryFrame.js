import React,{Component} from 'react';
import { Link } from 'react-router-dom';

class CategoryFrame extends Component{
	constructor(props){
		super(props);
	}

	sortBookList=(keyword)=>{
		this.props.sort
			? this.props.sort(keyword)
			: null
			
	}

	render(){
		return(
			<div className="col-sm-2 col-md-2">
				<div>
			      	<ul className="category">
			      		<li>
			      			<a>
			      				<form className="form-horizontal" method="get" action="/books/category/all">
									<div className="input-group">
									   <input type="text" name="search" className="form-control" />
									   <span className="input-group-btn">
									        <button className="btn btn-primary" type="submit">
									        	<span className="glyphicon glyphicon-search"></span>
									        </button>
									   </span>
									</div>

		                        </form>
		                    </a>
			      		</li>
			      	</ul>							
				</div>
				<div>
				  	<ul className="category">
				  		<li><a>Categories</a></li>
				      	<li><Link to="/books/category/software">Software</Link></li>
				      	<li><Link to="/books/category/nature">Nature</Link></li>
				      	<li><Link to="/books/category/literature">Literature</Link></li>
				      	<li><Link to="/books/category/romance">Romance</Link></li>
				      	<li><Link to="/books/category/story">Story</Link></li>
				      	<li><Link to="/books/category/history">History</Link></li>
				      	<li className="active"><Link to="/books/category/all">All</Link></li>
					 </ul>
				</div>
				<div>
				  	<ul className="category list-group">
				  		<li><a>Sort By</a></li>
				      	<li className="list-group-item" onClick={()=>this.sortBookList('asc')}>ASC (A-Z)</li>
				      	<li className="list-group-item" onClick={()=>this.sortBookList('desc')}>DESC (Z-A)</li>
					 </ul>
				</div>
			</div>
		);
	}
}


export default CategoryFrame;


