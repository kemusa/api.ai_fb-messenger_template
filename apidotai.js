var apiai = require('apiai');
var request = require('request');
// You will have to replace this will your own api.ai access token
const access = process.env.APIAI_ACCESS_TOKEN;

// apidotai.js is the script that manages integration with the NLP service api.ai. 
module.exports = {

  /** 
  * classifyMessage() executes the integration with api.ai. It accepts the message string and
  * session ID. All required JSON data is packaged into a query object. When api.ai returns a
  * response, we resolve the promise.
  */
	classifyMessage: function(message, session_Id) {
    return new Promise(function(resolve, reject) {
      console.log('in classifyMessage')
      
      var query = {
        'query': message,
        'lang': 'en',
        'sessionId': session_Id
      };

      request.post({
        url:'https://api.api.ai/v1/query',
        json: query,
        headers: {
          'Authorization': 'Bearer' + access   
        }
      }, function(error, response, body) {
        console.log('getting response...');
        if (error) 
          console.log(error);
        else {
          console.log('api call successful');
          resolve(body);
        }
      });

    });
	}
}