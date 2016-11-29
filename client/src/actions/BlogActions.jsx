import { push } from 'react-router-redux';
import 'isomorphic-fetch';
import Constants from '../constants/BlogConstants';

const Actions = {
  fetchPosts: () => {
    return (dispatch) => {
      dispatch({ type: Constants.POSTS_FETCHING });

      fetch('/api/posts')
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then((posts) => {
          dispatch({ type: Constants.POSTS_RECEIVED, posts});
        });
    };
  },
  fetchPost: (id) => {
    return (dispatch) => {
      dispatch({ type: Constants.POST_FETCHING });

      fetch(`/api/post/${id}` )
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then((post) => {
          dispatch({ type: Constants.POST_RECEIVED, post});
        });
    };
  },
  fetchAuthors: () => {
    return (dispatch) => {
      dispatch({ type: Constants.AUTHORS_FETCHING });

      fetch('/api/authors')
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then((authors) => {
          dispatch({ type: Constants.AUTHORS_RECEIVED, authors});
        });
    };
  },
  createAuthor: (authorName) => {
    return (dispatch) => {
      dispatch({ type: Constants.AUTHOR_SAVING });

      fetch('/api/author/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authorName }),
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then((authors) => {
          dispatch({ type: Constants.AUTHOR_SAVED, authors});
        });
    };
  },
  createPost: (data) => {
    return (dispatch) => {
      dispatch({ type: Constants.POST_SAVING });

      fetch('/app_dev.php/api/post/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then((post) => {
          dispatch({ type: Constants.POST_SAVED, post });
          dispatch(push(`/posts/${post.id}`));
        });
    };
  },
};

export default Actions;
