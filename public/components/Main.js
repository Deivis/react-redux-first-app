import React from 'react';

import { Link } from 'react-router';

//TODO: solve the warning that occurs in the line 12, is something bout special props https://gist.github.com/jimfb/fb2a04fe3fa4637d7d62
const Main = (props) => { 
		return(
			<div>
				<h1>
					<Link to="/">XuXuSxtagram</Link>
				</h1>
				{React.cloneElement(props.children, props)}
			</div>
		);	
};

export default Main;

