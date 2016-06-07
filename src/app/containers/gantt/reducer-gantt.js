/**
 * Created by phucpnt on 6/8/16.
 */

import update from 'react-addons-update';
import { GANTT_REQUEST, GANTT_RECEIVE } from '../../constants/action-type';

export default function (state = { items: [], isLoading: 1 }, action) {
  switch (action.type) {
    case GANTT_REQUEST:
      return update(state, { isLoading: { $set: 1 } });
    case GANTT_RECEIVE:
      return update(state, { isLoading: { $set: 0 }, items: { $set: action.payload.items } });
    default:
      return state;
  }
}
