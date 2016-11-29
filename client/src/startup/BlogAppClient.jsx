import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';
import configureRoutes from '../routes/Index';
import configureStore from '../store/BlogStore';

const mainNode = (props) => {
  const store = configureStore(props, browserHistory);

  const history = syncHistoryWithStore(browserHistory, store)

  const reactComponent = (
    <Provider store={store}>
      <Router history={history}>
        {configureRoutes(store)}
      </Router>
    </Provider>
  );
  return reactComponent;
};

export default mainNode;
