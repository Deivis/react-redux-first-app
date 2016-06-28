import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

//TODO: solve the warning that occurs in the line 12, is something bout special props https://gist.github.com/jimfb/fb2a04fe3fa4637d7d62
class Main extends Component { 

	componentDidMount() {
		const {fetchPostsIfNeeded} = this.props;
		console.log(this.props.posts);
    fetchPostsIfNeeded();
  }

	render(){
		return(
			<div>

				<h1>

					<Link to="/">XuXuSxtagram</Link>

				</h1>

				{React.cloneElement(this.props.children, this.props)}
				
			</div>
		);	
	}
};

Main.propTypes = {
  posts: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  fetchPostsIfNeeded: PropTypes.func.isRequired
}

export default Main;