import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import React from 'react';
import configureRoutes from '../routes/Index';
import configureStore from '../store/BlogStore';


const mainNode = (props) => {
  const store = configureStore(props);

  const routes = configureRoutes(store);
  const { location } = store.getState().config;

  let error;
  let redirectLocation;
  let routeProps;

  match({ routes, location }, (_error, _redirectLocation, _routeProps) => {
    error = _error;
    redirectLocation = _redirectLocation;
    routeProps = _routeProps;
  });
  if (error || redirectLocation) {
    return { error, redirectLocation };
  }

  const reactComponent = (
    <Provider store={store}>
      <RouterContext {...routeProps} />
    </Provider>
  );
  return reactComponent;
};

export default mainNode;
