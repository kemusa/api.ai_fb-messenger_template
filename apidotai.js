var app = apiai("2fe8e7eb2ffc4d428e85f13eb8066e6c");

function classifyMessage(message, sessionId) {

	var request = app.textRequest(message, {
	    sessionId: sessionId
	});

	request.on('response', function(response) {
	    console.log(response);
	});

	request.on('error', function(error) {
	    console.log(error);
	});

	request.end();
}