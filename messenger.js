var request = require('request')
var apiai = require('./apidotai');
var intents = require('./intents');
// You will have to replace this will your own facebook messenger access token
const access = process.env.FB_ACCESS_TOKEN;

/**
 * messenger.js hosts functions for recieving user message event objects from Facebook messages, 
 * upacking them, sending the messages for classification, and returning the appropriate response
 * to the user. 
 */
var messenger = module.exports = {

  /**
   * recievedMessage() takes incoming message events, parses the data, sends the message to api.ai
   * in a Promise for classification. We then take the api.ai response and senderID and send it to 
   * sendTextMessage()
   */
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
      // A great alternative for generating and sending session IDs is the node module UUID
    apiai.classifyMessage(messageText, senderID)
      .then(function(data) {
        console.log('message classified by api.ai');

        /******************************************************************************************* 
         * A function call to intents.<intentName> can be passed here in order to make alterations
         * To the api.ai response. Another good alternative is to forgo the use of storing 
         * responses in api.ai and handling that locally. You can simply receive the intent and 
         * entity names back by using data.result.metadata.intentName and data.result.parameters 
         * respectively. I find that this provided more options for creating dynamic conversation
         * flows
   
         var intentName = data.result.metadata.intentName;
         var entities = data.result.parameters;
         var handledResponse = intents[intentName](intentName, entities);
         *******************************************************************************************/

        var reply = data.result.speech;

        messenger.sendTextMessage(senderID, reply);
      }).catch(function(error) {
        console.log(error)
      });
  },

  /**
   * sendTextMessage() takes the recipientId from the senderID in receivedMessage() and the response
   * from api.ai. It packages this in an object called messageData and sends this object to the 
   * callSendAPI() function.  
   */
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

  // callSendAPI() takes messageData and sends a POST request to Facebook messenger.
  callSendAPI: function(messageData) {
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {
        access_token: access
      },
      method: 'POST',
      json: messageData

    }, function(error, response, body) {
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