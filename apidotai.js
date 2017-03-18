var apiai = require('apiai');

module.exports = {

	classifyMessage: function(message, sessionId) {
		console.log('in classifyMessage')
		var app = apiai("2fe8e7eb2ffc4d428e85f13eb8066e6c");

		var request = app.textRequest(message, {
		    sessionId: sessionId
		});

		request.on('response', function(response) {
		    console.log(response);

		return response
		});

		request.on('error', function(error) {
		    console.log(error);

		return error
		});

		request.end();

	}
}