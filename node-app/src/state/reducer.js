import * as ActionTypes from './actions';

function reducer(state = {}, action) {
  var user, interactionId;
  if (action && action.payload) {
    user = action.payload.user;
    interactionId = action.payload.callbackUrl;
  }
  switch (action.type) {
    case ActionTypes.ACTION_INTERACTION_INITIATED:
      // initialize state info if none exists
      if (!state[user]) {
        state[user] = {
          interactions: {}
        }
      };
      // fold in new information with existing state info if it exists (survey + checkin for example)
      state[user] = {
        ...state[user],
        interactions: {
          ...state[user].interactions,
          [interactionId]: {
            status: ActionTypes.STATUS_NO_VIEW,
            body: {}
          }
        }
      }
      return state;
    case ActionTypes.INTERACTION_RESPONDED:
      // cant respond to an interaction unless it exists already
      if (!state[user].interactions[interactionId]) {
        console.warn(">> Trying to complete unknow interaction " + interactionId + " for user " + user);
        return state;
      }

      // fold in new information with existing state info if it exists (survey + checkin for example)
      state[user] = {
        ...state[user],
        interactions: {
          ...state[user].interactions,
          [interactionId]: {
            status: ActionTypes.STATUS_PARTIAL_RESPONSE,
            body: {
              ...action.payload.slackResponse
            }
          }
        }
      }
      return state;
    case ActionTypes.INTERACTION_COMPLETE:
      // cant complete an interaction unless it exists already
      if (!state[user].interactions[interactionId]) {
        console.warn(">> Trying to complete unknow interaction " + interactionId + " for user " + userName);
        return state;
      }
      // fold in new information with existing state info if it exists (survey + checkin for example)
      state[userName] = {
        ...state[user],
        interactions: {
          ...state[user].interactions,
          [interactionId]: {
            status: ActionTypes.STATUS_COMPLETE
          }
        }
      }
      return state;
    default:
      return state;
  }
};

export default reducer;