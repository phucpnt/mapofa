import { combineReducers } from 'redux';
import app from './app';
import popup from './popup';
import extension from './extension';

export default (
  typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id ?
    combineReducers({ app, extension, popup }) :
    combineReducers({ app })
);
