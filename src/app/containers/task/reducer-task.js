/**
 * Created by phucpnt on 5/15/16.
 */

import { TASK_LIST_REQUEST, TASK_LIST_RECEIVE } from '../../constants/action-type';

export default function task(state = { isLoading: true, items: [] }, action) {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return state;
    case TASK_LIST_RECEIVE:
  }
  return state;
}
