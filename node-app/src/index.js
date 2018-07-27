const express = require('express');
const Slackbot = require('slackbots');
const slack = require('express-slack');
const util = require('util');
const bodyParser = require('body-parser');
const request = require("request");
const { WebClient } = require('@slack/client');
const urljoin = require('url-join');

import { createStore } from 'redux';
import stateReducer from './state/reducer';
import * as ActionTypes from './state/actions';
import checkinResponse from './routes/menu_checkin';
import surveyResponse from './routes/menu_survey';
import dialogResponse from './routes/menu_dialog';

// Create Express App
const app = express();
const appState = createStore(stateReducer);
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const slackApi = new WebClient(process.env.API_TOKEN);

appState.subscribe(() =>
  console.log('** Store Update ** \n', JSON.stringify(appState.getState(), null, '\t'))
);

// Create Slackbot Instance
var bot = new Slackbot({
  token: 'xoxb-404728279508-404788951364-uR4BVvgD4xuyumJWuK0yQ1EP',
  name: "Mentorship Team"
});

// on /respond
app.post('/respond', urlencodedParser, 
  (req, res) => {
    const actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
    console.log(util.inspect(actionJSONPayload));
    // notify rails app
    const field = actionJSONPayload.actions[0].name;
    const body = JSON.stringify({
      [field] : actionJSONPayload.actions[0].value
    })

    const pathCallback = urljoin("http://localhost:3000", actionJSONPayload.callback_id);
    console.log('Hitting rails app at : ', pathCallback);
    request({
      uri: pathCallback,
      method: "PUT",
      timeout: 10000,
      form: body
    }, function(error, response, body) {
      console.log(body);
    });
    // Respond to the client
    const message = {
        "text": "Thanks for letting us know! If you have any questions/concerns, give us a shout in this channel!",
        "replace_original": true
    }
    res.json(message);
  }
);

// https://mentor.netlagoon.com/debug
//app.post('/debug', urlencodedParser, (req, res) => {
slack.on('/debug', (payload, bot) =>{
  const user = req.body.user_id;
  //console.log('req: ', req);
  bot.send('dialog.open', {token: 'xoxb-404728279508-404788951364-uR4BVvgD4xuyumJWuK0yQ1EP', dialog: dialogResponse, trigger_id: '13345224609.738474920.8088930838d88f008e0'}).then(data =>{
 	console.log("data: ", data);
 	console.log("dialog.open");
 
  });
  // survey goes here
  appState.dispatch({
    type: ActionTypes.ACTION_INTERACTION_INITIATED,
    payload: {
      user,
      callbackUrl: dialogResponse.attachments.callback_id
    }
  });
  res.json(dialogResponse);
})

// on /interaction/:slackId
app.post('/interaction/:slackId', urlencodedParser, 
  (req, res) => {
    const user = req.params.slackId;
    const callbackUrl = req.body.callback_url;
    let messageText;
    let options;
    if (callbackUrl.indexOf('survey') >= 0) {
       options = surveyResponse;
       messageText = surveyResponse.text;
    } else {
       messageText = "Checkin time: have you had a chance to meet with your mentor since we last checked in?";
        options = checkinResponse;
    }
    
    let i;
    for (i in options.attachments) {
      options.attachments[i].callback_id = callbackUrl;  
    }
    
    let userInfo;
    slackApi.users.info({ user: user })
    .then(resp => {
      userInfo = resp.user.name;
      if (resp.user) {
        bot.postMessageToUser(userInfo, messageText, options).then(function(response) {
          appState.dispatch({
            type: ActionTypes.ACTION_INTERACTION_INITIATED,
            payload: {
              user,
              callbackUrl
            }
          });
          res.status(200).end();
        }).catch(function(ex) {
          res.send('Error: ', ex.message);
        });
      } else {
        console.log('No matches found');
      }
    }).catch(console.error);
  }
);

bot.on('message', function(msgObject) {
  switch (msgObject.type) {
    case "message": {
      console.log('Message received: \n\n', msgObject);
      if (msgObject.message && msgObject.message.bot_id){
        return;
      }
      // https://hooks.slack.com/services/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
      const webhook = "https://hooks.slack.com/services/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";
      var payload=JSON.stringify({"text":"Recieved message from "+msgObject.user+':\n'+msgObject.text});
      var headers = {"Content-type": "application/json"};      
      request.post({url: webhook, form: payload, headers: headers}, function(err, res){
          if(err){console.log(err)}
          if(res){console.log(res.body)}
      });
      
      break;
    }
    default:
      console.log('Saw unsupported message type ' + msgObject.type);
    break;
  }
});

const port = 8526;
app.listen(port);
