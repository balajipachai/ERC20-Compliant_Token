var express = require('express');
var router = express.Router();

// Requires connectUnlockDeploy.js
var connectunlock = require('./connectUnlockDeploy');
var contractAddress = connectunlock.contractAddress ;

/* GET home page. */
router.get('/', function(req, res, next) {
		res.render('index', { title: 'Create Customised Ethereum Token: ERC-20 Compliant'});
		});

/* Creating all the tokenOperations Pages */
router.get('/allowance',function (req, res, next){
	res.render('allowance', {title : 'Allowance'});
});

router.get('/approve',function (req, res, next){
	res.render('approve', {title : 'Approve'});
});


router.get('/transferFrom',function (req, res, next){
	res.render('transferFrom', {title : 'TransferFrom'});
});

router.get('/transfer',function (req, res, next){
	res.render('transfer', {title : 'Transfer'});
});

router.get('/approveAndCall',function (req, res, next){
	res.render('approveAndCall', {title : 'Approve And Call'});
});

router.get('/balanceOf',function (req, res, next){
	res.render('balanceOf', {title : 'Check Balance'});
});

/* Save Custom Token Details */
router.post('/customToken', function(request, response){

		var req = request.body;
		//console.log("**********************************************************************************************");
		console.log("Total Supply: " + req.totalSupply);
		console.log("Token Name: " + req.tokenName);
		console.log("Token Decimals: " + req.tokenDecimals);
		console.log("Token Symbol: " + req.tokenSymbol);

		// Calls the connectUnlock function that connects to web3 and unlocks the coinbase account
		connectunlock.connectUnlock(),
		// Calls the deployContract function that deploys the Smart Contract on the Private Geth Network
		connectunlock.deployContract(req.totalSupply, req.tokenName, req.tokenDecimals, req.tokenSymbol);

		//response.writeHead(200, {'Content-Type': 'text/html'});
		//response.render('tokenOperations', {title: 'Token Operations'});

			response.send({'contractAddress' : contractAddress});
			response.end();
});

router.post('/customToken/allowance', function(request, response){
	try {
		var req = request.body ;
		console.log(req);

		var remaining = connectunlock.allowance(req.owner, req.spender);
		response.send(remaining);
	} catch (e) {
		console.log(e);
	}

	//response.end();
});

router.post('/customToken/transfer', function(request, response){
	try {
		var req = request.body ;
		console.log(req);
		connectunlock.transfer(req.to, req.value);
		response.send("Transfer");
	} catch (e) {
console.log(e);
	}

	//response.end();
});

router.post('/customToken/approve', function(request, response){
	try {
		var req = request.body ;
		console.log(req);
		connectunlock.approve(req.spender, req.value);
		response.send("Approved");
	} catch (e) {
console.log(e);
	}

	//response.end();
});

router.post('/customToken/approveAndCall', function(request, response) {
	try {
		var req = request.body ;
		console.log(req);
		connectunlock.approveAndCall(req.spender, req.value, req.message);
		response.send("ApproveAndCall");
	} catch (e) {
console.log(e);
	}

	//response.end();
});

router.post('/customToken/transferFrom', function(request, response){
	try {
		var req = request.body ;
		console.log(req);
		connectunlock.transferFrom(req.from, req.to , req.value);
		response.send("TransferFrom");
	} catch (e) {
console.log(e);
	}

});

router.post('/customToken/balanceOf', function(request, response){
	try {
		var req = request.body ;
		console.log(req);
		var balance = connectunlock.balanceOf(req.accountAddress);
		} catch (e) {
		console.log(e);
	}
response.send(balance);
	//response.end();
});


module.exports = router;
