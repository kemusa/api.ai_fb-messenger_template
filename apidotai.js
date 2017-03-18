var apiai = require('apiai');
var fb = require('./messenger_send');

module.exports = {

	classifyMessage: function(message, sessionId, client) {
		console.log('in classifyMessage')
		var app = apiai("2fe8e7eb2ffc4d428e85f13eb8066e6c");

		var request = app.textRequest(message, {
		    sessionId: sessionId
		});

		request.on('response', function(response) {
		    console.log('got response');
		    var reply = response.body.result.fulfillment.speech;

		switch(client) {
    		case 'messenger':
		        fb.sendTextMessage(sessionId, reply);
		        break;
		    case 'whatsapp':
		        console.log('whatsapp')
				        break;
		 
		}

		});

		request.on('error', function(error) {
		    console.log(error);
		});

		request.end();

	}
}