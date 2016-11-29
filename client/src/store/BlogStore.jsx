import { compose, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/root';

export default function configureStore(props, browserHistory) {
  const { baseUrl, location, posts, post, authors } = props;

  const initialState = {
    config: {
      baseUrl,
      location,
    },
    posts,
    post,
    authors,
  };

  const reduxRouterMiddelware = routerMiddleware(browserHistory);

  const enhancers = compose(
    applyMiddleware(reduxRouterMiddelware, thunkMiddleware),
    typeof (window) !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f,
  );

  return createStore(rootReducer, initialState, enhancers);
}

