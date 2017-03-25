var request = require('request')
var apiai = require('./apidotai');
const access = process.env.FB_ACCESS_TOKEN;

var messenger = module.exports = {
	// take incoming messages, get important values and send to API.AI 
	// for classification
	receivedMessage: function(event) {
	  var senderID = event.sender.id;
	  var recipientID = event.recipient.id;
	  var timeOfMessage = event.timestamp;
	  var message = event.message;

	  console.log("Received message for user %d and page %d at %d with message:", 
	    senderID, recipientID, timeOfMessage);
	  console.log(JSON.stringify(message));
	  var messageId = message.mid;

	  var messageText = message.text;
	  var messageAttachments = message.attachments;
	  console.log('classifying the input')
	 // Send to API.AI for classification
	 // send the message string, the sender id as a session id (optimal?)
	 // and client name to ensure we send the response to the right place
	 // SWITCH TO UUID FOR GENERATING SESSION ID... SEE NOTES
	 apiai.classifyMessage(messageText, senderID)
    .then((function(result) { 
      console.log('result is: ' + JSON.stringify(result)); 
      var data = result;
      // parse data
      var reply = data.result.speech;
      // send message back
      messenger.sendTextMessage(senderID, reply);
    }));
	  
	},

  sendTextMessage: function(recipientId, messageText) {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText
      }
    };

    messenger.callSendAPI(messageData);
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