var apiai = require('apiai');
var fb = require('./messenger_send');

const access = process.env.APIAI_ACCESS_TOKEN;

module.exports = {
	// Classify messages from users. Take the message string, session id,
	// and the client it came from
	classifyMessage: function(message, sessionId, client) {
		console.log('in classifyMessage')
		var app = apiai(access);

		// Send message to API.AI
		var request = app.textRequest(message, {
		    sessionId: sessionId
		});

		// If we get a response obtain the reply and send back to the 
		// right user at the right client
		request.on('response', function(response) {
		    console.log('got response');
		    var reply = response.result.fulfillment.speech;
		// send reply to the client where we got the request from
		switch(client) {
    		case 'messenger':
    			// send back to messenger client
		        fb.sendTextMessage(sessionId, reply);
		        break;
		    case 'whatsapp':
		        console.log('whatsapp')
				        break;
		 
		}

		});
		// IF WE GET AN ERROR WE NEED TO SEND BACK A MESSAGE TO THE
		// RIGHT CLIENT SAYING THAT WE HAVE AN ISSUE WITH THE SERVICE
		request.on('error', function(error) {
		    console.log(error);
		});

		request.end();

	}
}