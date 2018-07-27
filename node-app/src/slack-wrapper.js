const { WebClient } = require('@slack/client');

const clientOauthKey = 'xoxp-404728279508-404415694609-404302276672-ee23ab10ffac31286f4e562b7f87afb6';
const web = new WebClient(clientOauthKey);

export default web;