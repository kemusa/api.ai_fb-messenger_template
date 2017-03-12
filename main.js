var apiai = require('apiai');

var app = apiai("2fe8e7eb2ffc4d428e85f13eb8066e6c");

var request = app.textRequest('<Your text query>', {
    sessionId: '<unique session id>'
});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();