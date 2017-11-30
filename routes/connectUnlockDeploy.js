var express = require('express');
var router = express.Router();

var Web3 = require ('web3');

/* Require for compiling Solidity Smart Contracts */
var solc = require('solc');
var fs = require('fs');

// Since we have launched geth locally
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var input = fs.readFileSync('/home/balaji/ethereum/ERC-20/balaToken/public/contracts/createToken.sol', 'utf-8');

var contractAddress ;
var abi ;
var tokenContract ;


/// @param _owner The address from which the balance will be retrieved
/// @return The balance
exports.balanceOf = function (account_address){
	var balance = tokenContract.balanceOf(account_address);
	console.log("Balance of " + account_address +" is: " + balance);
}
exports.connectUnlock = function (){
	// If connection to web3 is successfull, then deploy the contract.
		if (web3.isConnected()) {
				console.log("Connection to web3 is successfull !!!!!!!!!!");
				// Compiles the .sol file

				// Unlocks the eth.coinbase account
				if (web3.personal.unlockAccount(web3.eth.coinbase, "", 300)){
					console.log("Account: " + web3.eth.coinbase + " is unlocked." );
				}else{
					console.log("Incorrect Password !!!!!");
				}
		}else{
		console.log("Connection to Web3 Failed !!!!!");
		return ;
	} //end of else
} //end of connectUnlock function

exports.deployContract = function (_totalSupply, _name, _decimals, _symbol){

	// Compiles the .sol file
		let output = solc.compile(input,1);
		//console.log(output);
		let bytecode = output.contracts[':GeetToken'].bytecode;
		abi = JSON.parse(output.contracts[':GeetToken'].interface);

		// Creates a contract object based on the ABI
		let contract = web3.eth.contract(abi);

		// Pass the arguments to constructor while creating an instance of the contract.
		const contractInstance = contract.new(_totalSupply,
				_name,
				_decimals,
				_symbol,{
				data: '0x' + bytecode,
				from: web3.eth.coinbase,
				gas: 3000000,
				}, (err, res) => {
					if (err) {
					console.log(err);
					return;
				}

				// Log the tx, you can explore status with eth.getTransaction()
				console.log(res.transactionHash);

				// If we have an address property, the contract was deployed
				if (res.address) {
				console.log('Contract address: ' + res.address);

				// Assigning res.address to contractAddress
				contractAddress = res.address ;
				// After creating contractInstance now assign the user's token details
				// Accessing the contract
				tokenContract = web3.eth.contract(abi).at(res.address);
				// Calls balanceOf
				//balanceOf(web3.eth.coinbase);

				}
				}); // end of contractInstance


} // end of deployContract function


/// @param _owner The address of the account owning tokens
/// @param _spender The address of the account able to transfer the tokens
/// @return Amount of remaining tokens allowed to spent
exports.allowance = function(_owner, _spender){
	//console.log("tokenCOntract in allowance: " + tokenContract.toString());
	// The invoking address has to be specified.
	web3.eth.defaultAccount = web3.eth.coinbase ;
	web3.personal.unlockAccount(web3.eth.defaultAccount, "", 300);
	let remaining = tokenContract.allowance(_owner, _spender);
	console.log("Remaining : " + remaining);
	module.exports.allowanceRemaining = remaining;
} // end of allowance

/// @notice send `_value` token to `_to` from `msg.sender`
/// @param _to The address of the recipient
/// @param _value The amount of token to be transferred
/// @return Whether the transfer was successful or not
exports.transfer = function(_to,_value){
	// The invoking address has to be specified.
	web3.eth.defaultAccount = web3.eth.coinbase ;
	web3.personal.unlockAccount(web3.eth.defaultAccount, "", 300);
	let isTransfer = tokenContract.transfer( _to, _value);
	//balanceOf( _to );
	console.log("Transfer Result: " + isTransfer);
	// Log the tx, you can explore status with eth.getTransaction()
	//console.log(res.transactionHash);

} // end of transfer

/// @notice `msg.sender` approves `_addr` to spend `_value` tokens
/// @param _spender The address of the account able to transfer the tokens
/// @param _value The amount of wei to be approved for transfer
/// @return Whether the approval was successful or not
exports.approve = function(_spender, _value){
	// The invoking address has to be specified.
	web3.eth.defaultAccount = web3.eth.coinbase ;
	web3.personal.unlockAccount(web3.eth.defaultAccount, "", 300);
	let isApproved = tokenContract.approve( _spender, _value);
	console.log("Is approved: " + isApproved);
	//allowance(web3.eth.coinbase,_spender);
} // end of approve

/* Approves and then calls the receiving contract */
exports.approveAndCall = function(_spender, _value, _extraData){
	// The invoking address has to be specified.
	web3.eth.defaultAccount = web3.eth.coinbase ;
	web3.personal.unlockAccount(web3.eth.defaultAccount, "", 300);
	let isApprovedAndCalled = tokenContract.approveAndCall(_spender, _value, _extraData);
	console.log("isApprovedAndCalled: " + isApprovedAndCalled);
	//allowance(web3.eth.coinbase,_spender);
} // end of approveAndCall

// transferFrom
exports.transferFrom = function (_from, _to, _value){
	// The invoking address has to be specified.
	web3.eth.defaultAccount = web3.eth.coinbase ;
	web3.personal.unlockAccount(web3.eth.defaultAccount, "", 300);
	let result = tokenContract.transferFrom(_from, _to, _value);
	console.log("TransferFrom: " + result);
}
// Exporting variables
module.exports.contractAddress = contractAddress ;
module.exports.web3 = web3 ;
module.exports.abi = abi ;
