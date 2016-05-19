import { combineReducers } from 'redux';
import app from './app';
import extension from './extension';

export default (
  typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id ?
    combineReducers({ app, extension }) :
    combineReducers({ app })
);
