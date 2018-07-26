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
    console.log(req);
    res.send('OK!');
  }
);

// on /interaction/:username/:callbackUrl
app.route('/interaction/:userName/:interactionId/:callbackUrl').post(
  (req, res) => {
    console.log("*** Request params \n", req.params);
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
      console.log('Sent message to user!');
      res.send('OK!');
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
console.log('Try: curl -X POST -H "Content-Type: application/x-www-form-urlencoded" http://localhost:8526/');
