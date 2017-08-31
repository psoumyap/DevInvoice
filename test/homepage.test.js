var request = require("request"),
    expect = require("chai").expect,
    baseUrl = "localhost:8080/"

    describe("homepage", function() {
      it("should get the user", function(done) {
        request.get({ url: baseUrl},
          function(error,response, body){
           expect(200);
           expect(/Welcome/);
           done();
      });
    });
  });
