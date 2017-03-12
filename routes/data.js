var express = require('express');
var router = express.Router();
var intents = require('../intents');

/* GET users listing. */
router.post('/', function(req, res, next) {
  // In this function we take JSON from API.ai and pass data 
  // to the intent function
  
  // obtain data JSON
  var data = req.body;
  // obtain intentName
  var intentName = req.body.result.metadata.intentName;
  
  // use intentName to call the right function and pass in data
  intents[intentName](data);

});

module.exports = router;
