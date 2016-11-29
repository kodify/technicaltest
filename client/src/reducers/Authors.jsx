import Constants from '../constants/BlogConstants';

function authors(state = [], action) {
  switch (action.type) {
    case Constants.AUTHORS_RECEIVED:
      return action.authors;
    case Constants.AUTHOR_SAVED:
      return [...state, action.author];
    default:
      return state;
  }
}

export default authors;
