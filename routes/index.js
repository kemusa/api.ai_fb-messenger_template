var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var intents = require('../intents');
var fb = require('../messenger')
// for testing purposes using test end point
var apiai = require('../apidotai');
const token = process.env.FB_VERIFY_TOKEN;

//REMOVE WHEN ADDING DATABASE 
var url = 'mongodb://localhost:27017/test';

/**
* The index route file manages the incoming data traffic from the client nodes and redirects to the
* appropriate fuctions for data processing and response. Each client node has its own set of
* end points depending on their integration requirements. E.g. Messenger has its own GET endpoint
* for token verification and a POST endpoint for routing user requests to our webservice.
* Any required tokens for verificaiton are stored in environment variables using 
* process.env.<variable>. 
*/ 

// GET home page. The endpoint will be for sending data to our website.  
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// A ROUTE FOR TESTING
router.post('/test', function(req, res, next) {
  var message = req.body.message;
  console.log(message);
  var senderID = '1234';
  var client = 'test';
  var data;
  console.log('about to make this api call');
  apiai.classifyMessage(message, senderID)
    .then((function(result) { 
      var data = result;
      console.log('result is: ' + JSON.stringify(data));


    }));
  res.send(data)  
});

/**
* Messenger Get endpoint to validate the webservice with Facebook Check if our token matches the
* facebook verify token on our Facebook account. If it doesn't, a text error response will be sent
*/
router.get('/messenger', function(req, res, next) {
	if (req.query['hub.verify_token'] === token) {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

/**
* Messenger POST endpoint to recieve incoming messages from users on messenger. First we check that 
* the request is coming from a user subscribed to our Facebook page. We then find the entry object
* which holds the metadata we need. We Iterate over each entry - there may be multiple if batched.
* We then grab the messaging object in entry and iterate over each one. For each messaging event,
* we pass the event to the receivedMessage function in messenger.js. The user's message will be
* classified and a response will be sent. Assuming all went well. A 200 must be sent within 20 
* seconds, to let Facebook know we've successfully received the callback (or promise in this code).
* Otherwise, the request will time out and they will keep trying to resend. After 8 hours of failures
* Facebook will disconnect the app and you must go your developers.facebook.com account to 
* re-verify and connect the application.
*/
router.post('/messenger', function (req, res) {
  var data = req.body;
  // Make sure this is a page subscription
  if (data.object === 'page') {

    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      entry.messaging.forEach(function(event) {
        if (event.message) {
          fb.receivedMessage(event);
        } else {
          //NEED TO ERROR HANDLE FOR WHEN WE GET AN UNKNOWN EVENT
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    res.sendStatus(200);
  }
  else {
    //NEED ERROR HANDLE FOR NON-PAGE SUBSCRIPTIONS
  	console.log('not a page subscription');
  }
});

module.exports = router;
