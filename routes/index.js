var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var intents = require('../intents');

const token = process.env.FB_VERIFY_TOKEN;
const access = process.env.FB_ACCESS_TOKEN;

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

router.get('/messenger', function(req, res, next) {

	if(req.query['hub.verify_token'] === token) {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

router.post('/messenger', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

function receivedMessage(event) {
  // Putting a stub for now, we'll expand it in the following steps
  console.log("Message data: ", event.message);
}

module.exports = router;
