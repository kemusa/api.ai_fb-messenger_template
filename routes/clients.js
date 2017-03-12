var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/messenger', function(req, res, next) {

	if(req.query['hub.verify_token'] === 'solve_financial_intelligence') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

module.exports = router;
