import React from 'react';

import Photo from './Photo';

const PhotoGrid = ({posts, comments, increment}) => (
	<div className="photo-grid">

		{posts.map((post,i) => <Photo key={i} index={i} post={post} comments={comments} increment={increment} />)}		
		
	</div>
);

export default PhotoGrid;

