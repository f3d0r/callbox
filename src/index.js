const VoiceResponse = require('twilio').twiml.VoiceResponse;
const { send } = require('micro')


module.exports = (req, res) => {
  const twiml = new VoiceResponse();
  twiml.say({ voice: 'alice' }, 'hello world!');

  res.setHeader('Content-Type', 'text/xml')
  send(res, 200, twiml.toString());
}