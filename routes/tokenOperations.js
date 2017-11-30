var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
		res.render('tokenOperations', { title: 'Token Operations'});
		});
module.exports = router;
