const describe = require('mocha').describe,
    before = require('mocha').before,
    after = require('mocha').after,
    it = require('mocha').it,
    context = require('mocha').describe,
    expect = require('chai').expect,
    should = require('chai').should(),
    rp = require('request-promise');

describe('TEST:', function(){
    it('should get a cat',function (done) {
        rp({
            method: 'POST',
            uri: process.env.HOST + "cat/",
            json:true,
            body:{"name":"bob"}
        })
        .then(function(data){
            console.log(JSON.stringify(data, '\t', 4));
            expect(data.name ).to.equal("bob");
            should.exist(data._id );
            return;
        })
        .then(done);
    })
});