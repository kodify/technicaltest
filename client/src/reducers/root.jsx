import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import config from './Config';
import posts from './Posts';
import post from './Post';
import authors from './Authors';

const rootReducer = combineReducers({ config, posts, post, authors, routing: routerReducer });

export default rootReducer;
