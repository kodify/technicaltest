import { push } from 'react-router-redux';
import 'isomorphic-fetch';
import Constants from '../constants/BlogConstants';

const Actions = {
  fetchPosts: () => (
    (dispatch) => {
      dispatch({ type: Constants.POSTS_FETCHING });

      return fetch('/api/posts')
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then((posts) => {
          dispatch({ type: Constants.POSTS_RECEIVED, posts });
        });
    }
  ),
  fetchPost: id => (
    (dispatch) => {
      dispatch({ type: Constants.POST_FETCHING });

      return fetch(`/api/post/${id}`)
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then((post) => {
          dispatch({ type: Constants.POST_RECEIVED, post });
        });
    }
  ),
  fetchAuthors: () => (
    (dispatch) => {
      dispatch({ type: Constants.AUTHORS_FETCHING });

      return fetch('/api/authors')
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }
          return response.json();
        })
        .then((authors) => {
          dispatch({ type: Constants.AUTHORS_RECEIVED, authors });
        });
    }
  ),
  createAuthor: authorName => (
    (dispatch) => {
      dispatch({ type: Constants.AUTHOR_SAVING });

      return fetch('/api/author/new', {
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
        .then((author) => {
          dispatch({ type: Constants.AUTHOR_SAVED, author });
        });
    }
  ),
  createPost: data => (
    (dispatch) => {
      dispatch({ type: Constants.POST_SAVING });

      return fetch('/api/post/new', {
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
    }
  ),
};

export default Actions;
