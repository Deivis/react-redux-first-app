import request from 'supertest';  

import server from '../../server/src/app';

import expect from 'expect';  

describe('Routing', () => {

	it('Should do something', (done) =>{
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

})