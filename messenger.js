var apiai = require('./apidotai');
var client = 'messenger'

module.exports = {
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
	  // NEED TO MAKE CALLS BELOW A PROMISE
	  var responseData = apiai.classifyMessage(messageText, senderID, client);
	  console.log('got the response')
	  var intentName = responseData.body.result.metadata.intentName;
	  console.log('got the intent: ' + intentName);
  
  	  // use intentName to call the right function and pass in data
	  intents[intentName](data);
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

	  callSendAPI(messageData);
	},

	callSendAPI: function(messageData) {
	  request({
	    uri: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: { access_token: PAGE_ACCESS_TOKEN },
	    method: 'POST',
	    json: messageData

	  }, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	      var recipientId = body.recipient_id;
	      var messageId = body.message_id;

	      console.log("Successfully sent generic message with id %s to recipient %s", 
	        messageId, recipientId);
	    } else {
	      console.error("Unable to send message.");
	      console.error(response);
	      console.error(error);
	    }
	  });  
	}


}