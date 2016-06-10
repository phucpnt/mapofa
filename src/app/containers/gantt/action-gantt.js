/**
 * Created by phucpnt on 5/17/16.
 */

import getRepo from '../../../browser/extension/connect/podio/repo-podio';
import {
    TASK_STATUS_DONE, TASK_STATUS_WIP, TASK_STATUS_HOLD, TASK_STATUS_NOTSTART,
    TASK_TYPE_BUG, TASK_TYPE_FEATURE,
} from '../../constants/app';
import { GANTT_REQUEST, GANTT_RECEIVE } from '../../constants/action-type';

export function load({
    timeFrame,
    status = [TASK_STATUS_DONE, TASK_STATUS_WIP, TASK_STATUS_HOLD, TASK_STATUS_NOTSTART],
    category = [TASK_TYPE_BUG, TASK_TYPE_FEATURE]
}) {
  return (dispatch, getState) => {
    // dispatch(actionProduct.load({timeFrame}));
    // dispatch(actionMilestone.load({timeFrame}));
    // dispatch(actionTask.load({timeFrame}));
    dispatch({ type: GANTT_REQUEST, payload: { timeFrame } });
    return getRepo({})
        .then(api => api.task.filterList({ timeFrame, status, category }))
        .then((data) => {
          return dispatch({ type: GANTT_RECEIVE, payload: { timeFrame, items: data } });
        });
  };
}
