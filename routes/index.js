var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var intents = require('../intents');

//point to database
var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Route for grabbing intent and data values from API.ai
router.post('/data', function(req, res, next) {
  // In this function we take JSON from API.ai and pass data 
  // to the intent function

  // obtain data JSON
  var data = req.body;
  // obtain intentName
  var intentName = req.body.result.metadata.intentName;
  
  // use intentName to call the right function and pass in data
  intents[intentName](data);

});

// Messenger Get and Post clients webhooks
var FBtoken ="EAAaruV15FDsBADl9dLiBflf6eZCmretp1a4DBR8P7lkgWiup0ypI11YiM22iDKopMYTrYX2JOzABIATJJrJj4ukIq04PljjTCqLkZA2b5gtKVWOvRkJt1DerjTbv1aysuS7AJ6UbYDrlIBJZAxLEiCoFozSXZCqEKoZADgoMCFgZDZD"

router.get('/messenger', function(req, res, next) {

	if(req.query['hub.verify_token'] === 'solve_financial_intelligence') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

router.post('/messenger', function(req, res, next) {

	console.log('post to messenger')
})



module.exports = router;
