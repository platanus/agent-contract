var Agent = artifacts.require("./Agent.sol");
var DummyDestination = artifacts.require("./DummyDestination.sol");

contract('Agent', function(accounts) {
  var user = accounts[0];
  var rep = accounts[1];
  var attacker = accounts[2];
  var instance;
  var dummyInstance;


  beforeEach(function() {
    return DummyDestination.new().then(
      function(_dummy_instance){
        dummyInstance = _dummy_instance;
        return Agent.new(
            rep, _dummy_instance.address, { from: user }
          ).then(function(_instance) {
            instance = _instance;
            return instance.sendTransaction({ from: user, value: new web3.BigNumber('1e18') });
          });
        });
  });

  describe("fireRep", function () {
    it("returns available balance to user", function() {
      var oldBalance = web3.eth.getBalance(user);
      return instance.fireRep({ from: user }).then(function() {
        assert.isAbove(web3.eth.getBalance(user), oldBalance);
      });
    });
  });

  describe("transfer", function () {
    it("transfer amount to dummy contract", function() {
      return instance.transfer(1000000, {from: rep}).then(function() {
        assert.equal(web3.eth.getBalance(dummyInstance.address), 1000000 );
      });
    });

    it("fails when attacker tries to transfer", function() {
      return instance.transfer(1000000, { from: attacker} ).then(
        function() {
          assert(false, "attacker could attack!");
        },
        function() {
          assert.equal(web3.eth.getBalance(dummyInstance.address), 0);
        }
      );
    });
  });

  describe("exec", function(){
    it("executes method1 in dummy", function() {
      var watch = dummyInstance.ReceivedMethod1();

      return instance.exec("method1()").then(function(_tx) {
        return watch.get();
      }).then(function(_logs) {
        assert.equal(_logs.length, 1);
        assert.equal(_logs[0].args.origin, instance.address);
      });
    });
  })
});
