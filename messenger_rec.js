var apiai = require('./apidotai');
var client = 'messenger'
const access = process.env.FB_ACCESS_TOKEN;

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
	 apiai.classifyMessage(messageText, senderID, client);
	  // console.log('got the response')
	  // var intentName = responseData.body.result.metadata.intentName;
	  // console.log('got the intent: ' + intentName);
  
  	  // use intentName to call the right function and pass in data
	  // intents[intentName](data);
	}

}