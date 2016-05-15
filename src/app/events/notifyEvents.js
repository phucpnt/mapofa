import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/action-type';
import { sendNotification } from '../actions/extension';

const events = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id ? [
  {
    catch: [INCREMENT_COUNTER, DECREMENT_COUNTER],
    dispatch: sendNotification
  }
] : [];

export default events;
