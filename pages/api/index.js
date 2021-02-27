const VoiceResponse = require('twilio').twiml.VoiceResponse;
const { send } = require('micro')


module.exports = (req, res) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();

  /** helper function to set up a <Gather> */
  function gather() {
    const gatherNode = twiml.gather({ numDigits: 1 });
    gatherNode.say('For sales, press 1. For support, press 2.');

    // If the user doesn't enter input, loop
    twiml.redirect('/voice');
  }

  // If the user entered digits, process their request
  if (req.body.Digits) {
    switch (req.body.Digits) {
      case '1':
        twiml.say('You selected sales. Good for you!');
        break;
      case '2':
        twiml.say('You need support. We will help!');
        break;
      default:
        twiml.say("Sorry, I don't understand that choice.").pause();
        gather();
        break;
    }
  } else {
    // If no input was sent, use the <Gather> verb to collect user input
    gather();
  }

  // Render the response as XML in reply to the webhook request
  res.setHeader('Content-Type', 'text/xml')
  send(res, 200, response.toString());
}