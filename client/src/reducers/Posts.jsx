import Constants from '../constants/BlogConstants';

function posts(state = [], action) {
  switch (action.type) {
    case Constants.POSTS_RECEIVED:
      return action.posts;
    default:
      return state;
  }
}

export default posts;
