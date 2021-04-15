import chai from 'chai';
import chaiHttp from 'chai-http';
import { response } from 'express';
import server from '../app';

chai.should();


chai.use(chaiHttp);

let chaiServer;
let investorCount;

// This token we have to get by logging into webapp
let HypersignAuthToken = ""

let mockData = {
    did: "did:hs:mock",
    email: "vishu.anand1@gmail.com",
    name: "mock_user",
    ethAddress: "0x123131MOCK",
    twitterHandle: "mock_twitter",
    telegramHandle: "mock_telegram",
    hasTwitted: false,
    hasJoinedTGgroup: false,
    projectId: "60729ca5f0f5f0cccafab4b9",
    tweetUrl: "http://twitter.com/twwitId1=123123123"
};


describe("API testing for /api/v1/investor", () => {
    beforeEach(() => {
        chaiServer =  chai.request(server);
    })


    it("should NOT be able to add (POST) an investor since unauthorized", (done) => {
        chaiServer
            .post("/api/v1/investor")
            .send(mockData)
            .end((err, response) => {
                response.should.have.status(403);
            })
            done();
        })
})