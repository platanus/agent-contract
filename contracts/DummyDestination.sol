pragma solidity ^0.4.8;

contract DummyDestination {
	event ReceivedMethod1(address origin);

	function method1() {
		ReceivedMethod1(msg.sender);
	}

	function() payable {
	}
}
