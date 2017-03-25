var apiai = require('apiai');
var fb = require('./messenger_send');
var request = require('request');

const access = process.env.APIAI_ACCESS_TOKEN;

module.exports = {
	// Classify messages from users. Take the message string, session id,
	// and the client it came from
	classifyMessage: function(message, session_Id) {
    return new Promise(function(resolve, reject) {
      console.log('in classifyMessage')
      // Generate sessionId here
      var accessor = '2fe8e7eb2ffc4d428e85f13eb8066e6c'


      var query = {
        'query': message,
        'lang': 'en',
        'sessionId': session_Id
      };
  //+ APIAI_ACCESS_TOKEN
      request.post({
        url:'https://api.api.ai/v1/query',
        json: query,
        headers: {
          'Authorization': 'Bearer' + accessor   
        }
      }, function(error, response, body) {
        console.log('getting response...');
        if (error) 
          console.log(error);
        else{
          console.log('api call successful');
          resolve(body);
        }
      });

      // var app = apiai(access);

      // // Send message to API.AI
      // var request = app.textRequest(message, {
      //     sessionId: sessionId
      // });

      // // If we get a response obtain the reply and send back to the 
      // // right user at the right client
      // request.on('response', function(response) {
      //     console.log('got response');
      //     var reply = response.result.fulfillment.speech;
      // // send reply to the client where we got the request from
      // switch(client) {
    //      case 'messenger':
    //        // send back to messenger client
      //         fb.sendTextMessage(sessionId, reply);
      //         break;
      //     case 'whatsapp':
      //         console.log('whatsapp')
      //            break;
       
      // }

      // });
      // // IF WE GET AN ERROR WE NEED TO SEND BACK A MESSAGE TO THE
      // // RIGHT CLIENT SAYING THAT WE HAVE AN ISSUE WITH THE SERVICE
      // request.on('error', function(error) {
      //     console.log(error);
      // });

      // request.end();

    });
	}
}