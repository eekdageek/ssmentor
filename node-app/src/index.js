var express = require('express');
const Slackbot = require('slackbots');
const fetch = require('node-fetch');

import { createStore } from 'redux';
import stateReducer from './state/reducer';
import * as ActionTypes from './state/actions';
import checkinResponse from './routes/menu_checkin';

// Create Express App
const app = express();
const appState = createStore(stateReducer);

appState.subscribe(() =>
  console.log('** Store Update ** \n', JSON.stringify(appState.getState(), null, '\t'))
);

// Create Slackbot Instance
var bot = new Slackbot({
  token: 'xoxb-404728279508-404788951364-Pp4jxAUwTi3TS5qDhjOuGApp',
  name: "Mentorship Team"
});

// on /respond/:checkin
app.route('/respond').post(
  (req, res) => {
    var actionJSONPayload = JSON.parse(req.body);
    console.log(actionJSONPayload);
    res.send('Thank you! Your response has been recorded.');
  }
);

// on /interaction/:username/:callbackUrl
app.route('/interaction/:userName/:interactionId/:callbackUrl').post(
  (req, res) => {
    const userName = req.params.userName;
    const interactionId = req.params.interactionId;
    appState.dispatch({
      type: ActionTypes.ACTION_INTERACTION_INITIATED,
      payload: {
        userName,
        interactionId,
        callbackUrl: req.params.callbackUrl
      }
    });
    const messageText = "Have you had a chance to meet with your mentor since we last checked in?";
    const att = checkinResponse;
    bot.postMessageToUser(userName, messageText, att).then(function(response) {
      res.send('Thank you for your response!');
    }).catch(function(ex) {
      console.log(ex.message);  
      res.send('Error: ', ex.message);
    });
  }
);

bot.on('message', function(msgObject) {
  switch (msgObject.type) {
    case "message": {
      bot.getUserById(msgObject.user);
      break;
    }
    case "checkin_response":
      console.log(msgObject);
      break;
    break;
    default:
      console.log('Saw unsupported message type ' + msgObject.type);
    break;
  }
});

bot.on('im_open', function(msgObject) {
  console.log("im_open: message \n\n ", msgObject);
});

const port = 8526;
app.listen(port);
