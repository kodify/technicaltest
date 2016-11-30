import { Route } from 'react-router';
import React from 'react';
import Home from '../containers/Home';
import Post from '../containers/Post';
import NewAuthor from '../containers/NewAuthor';
import NewPost from '../containers/NewPost';

export default function configureRoutes(store) {
  const { baseUrl } = store.getState().config;
  return (
    <div>
      <Route path={baseUrl} component={Home} />
      <Route path={`${baseUrl}posts/create`} component={NewPost} />
      <Route path={`${baseUrl}posts/:id`} component={Post} />
      <Route path={`${baseUrl}author/new`} component={NewAuthor} />
    </div>);
}
