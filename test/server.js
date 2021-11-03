let {playerSchema, matchSchema} = require('../dbSchemas');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

chai.use(chaiHttp);
//Our parent block
describe('Players', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     Book.remove({}, (err) => {
    //        done();
    //     });
    // });
/*
  * Test the /GET route
  */
  describe('/GET players', () => {
      it('it should GET the player details', (done) => {
        chai.request(server)
            .get('/api/player')
            .query({name: 'RamKev'})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });
  });
});

describe('Players', () => {
  describe('/GET challenger players', () => {
      it('it should GET the player details', (done) => {
        chai.request(server)
            .get('/api/challenger')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });

      it('it should GET the challenger list and have properties', (done) => {
        chai.request(server)
            .get('/api/challenger')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.include.keys(["tier", "entries"]);

                  res.body.entries.should.include.be.a('array')
              done();
            });
      });

      it('it should GET the challenger list and players should have properties', (done) => {
        chai.request(server)
            .get('/api/challenger')
            .end((err, res) => {
                  res.should.have.status(200);

                  // If there people in challenger 
                  if (res.body.entries.length > 0) {
                    res.body.entries[0].should.include.keys(["summonerId", "summonerName", "leaguePoints", "wins", "losses"]);
                  }
                  
                  res.body.entries.should.include.be.a('array')
              done();
            });
      });
  });
});