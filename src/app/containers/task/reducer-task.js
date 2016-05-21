/**
 * Created by phucpnt on 5/15/16.
 */

import { TASK_LIST_REQUEST, TASK_LIST_RECEIVE } from '../../constants/action-type';
import update from 'react-addons-update';

export default function task(state = { isLoading: 1, items: [] }, action) {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return state;
    case TASK_LIST_RECEIVE:
      return update(state, {
        items: { $set: action.payload.items },
        isLoading: { $set: 0 },
      });
  }
  return state;
}
