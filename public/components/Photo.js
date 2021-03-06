import React from 'react';

import { Link }  from 'react-router';

import CSSTransitionGroup from 'react-addons-css-transition-group';

// Component which will render the photos
const Photo = ({index, post, comments, increment}) => (
		<figure className="grid-figure">

			<div className="grid-photo-wrap">

				<Link to={`/view/${post.code}`}>
					<img src={post.display_src} alt={post.caption} className="grid-photo" />
				</Link>

				<CSSTransitionGroup transitionName="like" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            <span key={post.likes} className="likes-heart">{post.likes}</span>
        </CSSTransitionGroup>

			</div>

			<figcaption>
				<p>{post.caption}</p>
				<div className="control-buttons">
					<button className="likes" onClick={increment.bind(null,index)} >&hearts;{post.likes}</button>
					<Link className="button" to={`/view/${post.code}`}>
						<span className="comment-count">
							<span className="speech-bubble"></span>
							{comments[post.code] ? comments[post.code].length: 0}
						</span>
					</Link>
				</div>
			</figcaption>

		</figure>
);


export default Photo;