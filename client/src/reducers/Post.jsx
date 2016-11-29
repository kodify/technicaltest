import Constants from '../constants/BlogConstants';

function post(state = {}, action) {
  switch (action.type) {
    case Constants.POST_RECEIVED:
      return action.post;
    case Constants.POST_SAVED:
      return action.post;
    default:
      return state;
  }
}

export default post;
