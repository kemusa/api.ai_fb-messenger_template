var client = 'messenger'
var request = require('request')
const access = process.env.FB_ACCESS_TOKEN;

module.exports = {
	// Package our reply into the right format
	sendTextMessage: function(recipientId, messageText) {
	  var messageData = {
	    recipient: {
	      id: recipientId
	    },
	    message: {
	      text: messageText
	    }
	  };

	  module.exports.callSendAPI(messageData);
	},

	// Send reply
	callSendAPI: function(messageData) {
	  request({
	    uri: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: { access_token: access },
	    method: 'POST',
	    json: messageData

	  }, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	      var recipientId = body.recipient_id;
	      var messageId = body.message_id;

	      console.log("Successfully sent generic message with id %s to recipient %s", 
	        messageId, recipientId);
	    } else {
	    	// NEED PROPER ERROR HANDLE FOR FAILURE
	      console.error("Unable to send message.");
	      console.error(response);
	      console.error(error);
	    }
	  });  
	}
}