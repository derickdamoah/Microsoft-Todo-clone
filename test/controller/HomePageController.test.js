import assert, { doesNotMatch } from 'assert';
import { expect } from 'chai';
import  request from 'supertest';
import { app } from '../../App.js';
import {router} from '../../routes/routes.js'



describe('Unit testing the /jhkj route', function() {

    // it('should return OK status', function() {
    //     request(router).get("/Tasks").then(function(response){
    //         assert.equal(response.status, 200)
    //     })
        
    // });

    it('respond with json', function(done){
        request(app)
          .get('/home')
          .expect(200)
          .end(function(err, res){
            if (err) return done(err);
            done()
          });
      })
});