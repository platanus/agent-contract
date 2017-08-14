# Agent Representation Contract

The purpose of this contract is to provide an external agent with the power to send transactions to a fixed destination using the user's money.

Objectives:

* Contract should pay agent's fee.
* Contract should be able to call any of the destination contract methods.
* Contract should be able to send money to the destination contract.
* Both user and agent should be able to call through to the destination contract.

## Developing and testing

Install the [truffle framwork](http://truffleframework.com/) using npm

`npm install -g truffle`

Install the [testrpc emulator](https://github.com/ethereumjs/testrpc) using npm

`npm install -g ethereumjs-testrpc`

Start the testrpc emulator at port 8001

`testrpc -p 8001`

Run the specs

`truffle test --network test`
