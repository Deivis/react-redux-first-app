import request from 'supertest';  

import server from '../../server/src/app';

import expect from 'expect';  

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
		    
		    expect(res).toExist('The response object must exist');

		    expect(res.body).toBeA('array','The body must to be an array');	

		    expect(res.body.length).toBeGreaterThan(0,'The response array can not to be empty');	
		    
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
		    
		    expect(res).toExist('The response object must exist');

		    expect(res.body).toBeA('array','The body must to be an array');	

		    expect(res.body.length).toBeGreaterThan(0,'The response array can not to be empty');	
		    
		    done();		    
		  });
	})

})