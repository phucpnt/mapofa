/**
 * Created by phucpnt on 5/15/16.
 */

import { PANEL_TASK_REQUEST, PANEL_TASK_RECEIVE } from '../../constants/action-type';
import update from 'react-addons-update';

export default function task(state = { isLoading: 0, items: [], tabView: 'not-done' }, action) {
  switch (action.type) {
    case PANEL_TASK_REQUEST:
      return state;
    case PANEL_TASK_RECEIVE:
      return update(state, {
        items: { $set: action.payload.items },
        isLoading: { $set: 0 },
      });
  }
  return state;
}
