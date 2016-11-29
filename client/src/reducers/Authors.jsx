import Constants from '../constants/BlogConstants';

function authors(state = [], action) {
  switch (action.type) {
    case Constants.AUTHORS_RECEIVED:
      return action.authors;
    default:
      return state;
  }
}

export default authors;
