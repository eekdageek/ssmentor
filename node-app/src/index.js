const express = require('express');
const Slackbot = require('slackbots');
const fetch = require('node-fetch');
const util = require('util');
const bodyParser = require('body-parser');

import { createStore } from 'redux';
import stateReducer from './state/reducer';
import * as ActionTypes from './state/actions';
import checkinResponse from './routes/menu_checkin';

// Create Express App
const app = express();
const appState = createStore(stateReducer);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

appState.subscribe(() =>
  console.log('** Store Update ** \n', JSON.stringify(appState.getState(), null, '\t'))
);

// Create Slackbot Instance
var bot = new Slackbot({
  token: 'xoxb-404728279508-404788951364-Pp4jxAUwTi3TS5qDhjOuGApp',
  name: "Mentorship Team"
});

// on /respond
app.post('/respond', urlencodedParser, 
  (req, res) => {
    const actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
    console.log(util.inspect(actionJSONPayload));
    appState.dispatch({
      type: ActionTypes.INTERACTION_RESPONDED,
      payload: {
        userName: actionJSONPayload.user.name,
        callbackUrl: actionJSONPayload.callback_id,
        slackResponse: actionJSONPayload.actions[0]
      }
    });
    const message = {
        "text": "Your response has been recorded",
        "replace_original": false
    }
    bot.postMessageToUser(actionJSONPayload.user.name, message.text).then(function(response) {
      res.status(200).end();
    })
  }
);

// on /interaction/:username/:callbackUrl
app.route('/interaction/:userName/:callbackUrl').post(
  (req, res) => {
    const userName = req.params.userName;
    const messageText = "Have you had a chance to meet with your mentor since we last checked in?";
    const att = checkinResponse;
    att.callback_id = callbackUrl;
    bot.postMessageToUser(userName, messageText, att).then(function(response) {
      console.log(util.inspect(response));
      appState.dispatch({
        type: ActionTypes.ACTION_INTERACTION_INITIATED,
        payload: {
          userName,
          callbackUrl: req.params.callbackUrl
        }
      });
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
