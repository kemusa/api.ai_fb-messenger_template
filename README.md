# api.ai_fb-messenger_template
A VERY basic template for api.ai and Facebook messenger integration. This is different from the standard api.ai approach. 

Instead of using the webhook function on api.ai's site or using their SDK, you can easily make calls to their service in your webapp.
I find this a bit cleaner and it also allows you to have more control over how you handle conversation flows, while still leveraging the
power of their service. 

The key benefit is that user input from the UI (in this case FB Messenger) is directed to your web app, which means you can protect 
sensitive user data, create more dynamic response handling, and so on and so forth.
