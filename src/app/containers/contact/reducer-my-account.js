/**
 * Created by phucpnt on 5/22/16.
 */

import update from 'react-addons-update';
import {
    CONTACT_MYACCOUNT_REQUEST,
    CONTACT_MYACCOUNT_RECEIVE,
} from '../../constants/action-type';

export default function (state = { isLoading: 1, data: null }, action) {
  switch (action.type) {
    case CONTACT_MYACCOUNT_REQUEST:
      return update(state, { isLoading: { $set: 1 } });
    case CONTACT_MYACCOUNT_RECEIVE:
      return update(state, { isLoading: { $set: 0 }, data: { $set: action.payload.account } });
    default:
      return state;
  }
}
