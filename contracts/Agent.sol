pragma solidity ^0.4.8;

contract Agent {
	address rep;
	address owner;
	address destination;

	modifier only(address _who) {
		if(msg.sender != _who) throw;
		_;
	}

	function Agent(address _rep, address _destination) {
		owner = tx.origin;
		rep = _rep;
		destination = _destination;
	}

	function fireRep() only(owner) {
		selfdestruct(owner);
	}

	function transfer(uint _amount) only(rep) {
		if (!destination.send(_amount)) throw;
	}

	function exec(string _method) {
		if(!destination.call(bytes4(sha3(_method)))) throw;
	}

	function() payable {
	}
}
