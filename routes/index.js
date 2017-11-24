var express = require('express');
var router = express.Router();

/* Require for compiling Solidity Smart Contracts */
var solc = require('solc');
var fs = require('fs');
var Web3 = require ('web3');

// Connecting to the Ropsten testnet node 
// Since we have launched geth --testnet locally
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var input = fs.readFileSync('/home/balaji/ethereum/ERC-20/balaToken/public/contracts/createToken.sol', 'utf-8');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Create Customised Ethereum Token: ERC-20 Compliant'});
});

/* Save Custom Token Details */
router.post('/customToken/save', function(request, response){
	
	var req = request.body;
	console.log("**********************************************************************************************");
	console.log("Total Supply: " + req.totalSupply);
	console.log("Token Name: " + req.tokenName);
	console.log("Token Decimals: " + req.tokenDecimals);
	console.log("Token Symbol: " + req.tokenSymbol);


	// Compiles the .sol file
	let output = solc.compile(input,1);
	let bytecode = output.contracts[':GeetToken'].bytecode;
	let abi = JSON.parse(output.contracts[':GeetToken'].interface);


	console.log(bytecode);
	console.log(abi);

	// Creates an contract object based on the ABI
	let contract = web3.eth.contract(abi);
	const contractInstance = contract.new({
    data: '0x' + bytecode,
    from: web3.eth.coinbase,
    gas: 1800000000000000,
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
        // Let's test the deployed contract
       // testContract(res.address);
    }
});
	console.log("**********************************************************************************************");
}); // end of router.post


module.exports = router;
