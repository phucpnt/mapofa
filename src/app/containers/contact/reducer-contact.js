/**
 * Created by phucpnt on 5/22/16.
 */

import update from 'react-addons-update';
import {
    CONTACT_REQUEST,
    CONTACT_RECEIVE,
} from '../../constants/action-type';

export default function (state = { items: [], isLoading: 1, myAccount: null }, action) {
  switch (action.type) {
    case CONTACT_REQUEST:
      return update(state, { isLoading: { $set: 1 } });
    case CONTACT_RECEIVE:
      return update(state, { isLoading: { $set: 0 }, items: { $set: action.payload.items } });
    default:
      return state;
  }
}
