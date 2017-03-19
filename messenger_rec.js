var apiai = require('./apidotai');
var client = 'messenger'
const access = process.env.FB_ACCESS_TOKEN;

module.exports = {
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
	 apiai.classifyMessage(messageText, senderID, client);
	  
	}

}