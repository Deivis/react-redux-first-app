import request from 'supertest';  

import server from '../../server/src/app';

import expect from 'expect';  

import posts from '../../server/src/data/posts';

import comments from '../../server/src/data/comments';

describe('Routing', () => {

	it('Should return the main page', (done) =>{
		request(server)
		  .get('/')
		  .expect(200)
		  .end(function(err, res){
		    if (err) throw err;
		    
		    expect(res).toExist('The response object must exist');

		    expect(res.ok).toBe(true,'The "ok" must to be true');	
		    
		    done();		    
		  });
	})

	it('Should return a json with all the posts', (done) =>{
		request(server)
		  .get('/posts')
		  .expect('Content-Type', /json/)
		  .expect(200)
		  .end(function(err, res){
		    if (err) throw err;
		    
		    let data = res.body;

		    expect(res).toExist('The response object must exist');
		    
		    expect(data).toEqual(posts,'The body must to be an array of posts');	

		    expect(data.length).toBeGreaterThan(0,'The response array can not to be empty');	
		    
		    done();		    
		  });
	})

	it('Should return a json with all the comments', (done) =>{
		request(server)
		  .get('/comments')
		  .expect('Content-Type', /json/)
		  .expect(200)
		  .end(function(err, res){
		    if (err) throw err;
		    
		    let data = res.body;

		    expect(res).toExist('The response object must exist');

		    expect(data).toBeA('object','The response data must be an object');	

		    expect(data).toEqual(comments,'The body must to be an object of comments');	
		    
		    done();		    
		  });
	})

})