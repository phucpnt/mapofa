/**
 * Created by phucpnt on 6/8/16.
 */

import update from 'react-addons-update';
import { GANTT_REQUEST, GANTT_RECEIVE } from '../../constants/action-type';
import * as TF from '../../constants/timeframe';

export default function (state = { items: [], isLoading: 1, timeFrame: TF.WEEK }, action) {
  switch (action.type) {
    case GANTT_REQUEST:
      return update(state, { isLoading: { $set: 1 }, timeFrame: { $set: action.payload.timeFrame } });
    case GANTT_RECEIVE:
      return update(state, {
        isLoading: { $set: 0 },
        items: { $set: action.payload.items },
        timeFrame: { $set: action.payload.timeFrame }
      });
    default:
      return state;
  }
}
