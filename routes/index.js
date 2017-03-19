var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var intents = require('../intents');
var fb = require('../messenger_rec')

const token = process.env.FB_VERIFY_TOKEN;

//point to database
var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Messenger Get and Post clients webhooks

// This get webhook validates our webservice with Facebook
router.get('/messenger', function(req, res, next) {

	if(req.query['hub.verify_token'] === token) {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})
// Webhook for incoming messages from Messenger users
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
          fb.receivedMessage(event);
        } else {
          //NEED TO ERROR HANDLE FOR WHEN WE GET A UNKNOWN EVENT
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // A 200 must be sent within 20 seconds, to let Facebook know
    // we've successfully received the callback. Otherwise, the request
    // will time out and they will keep trying to resend. After 8 hours of
    // failures Facebook will disconnect our app
    res.sendStatus(200);
  }
  else{
    //NEED ERROR HANDLE FOR NON-PAGE SUBSCRIPTIONS
  	console.log('not a page subscription');
  }
});

module.exports = router;
