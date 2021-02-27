const VoiceResponse = require('twilio').twiml.VoiceResponse;
const { send } = require('micro')


module.exports = (req, res) => {
  const response = new VoiceResponse();

  const gather = response.gather({ finishOnKey: '#' });
  response.say('You entered ' + gather.toString());
  
  // If the user doesn't enter input, loop
  
  response.redirect('/voice');
  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(response.toString());

  res.setHeader('Content-Type', 'text/xml')
  send(res, 200, response.toString());
}