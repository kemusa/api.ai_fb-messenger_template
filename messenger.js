var apiai = require('apiai');

module.exports = {
	receivedMessage: function(event) {
	  var senderID = event.sender.id;
	  var recipientID = event.recipient.id;
	  var timeOfMessage = event.timestamp;
	  var message = event.message;

	  console.log("Received message for user %d and page %d at %d with message:", 
	    senderID, recipientID, timeOfMessage);
	  console.log(JSON.stringify(message));
	  console.log('no problem 1');
	  var messageId = message.mid;

	  var messageText = message.text;
	  var messageAttachments = message.attachments;

	  apiai.classifyMessage(message, senderID);
	  console.log('no problem 2');
}

};