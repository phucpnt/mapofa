/**
 * Created by phucpnt on 5/17/16.
 */

import getRepo from '../../../browser/extension/connect/podio/repo-podio';
import { TASK_STATUS_DONE, TASK_STATUS_WIP, TASK_STATUS_HOLD } from '../../constants/app';
import { GANTT_REQUEST, GANTT_RECEIVE } from '../../constants/action-type';

export function load({ timeFrame }) {
  return (dispatch, getState) => {
    // dispatch(actionProduct.load({timeFrame}));
    // dispatch(actionMilestone.load({timeFrame}));
    // dispatch(actionTask.load({timeFrame}));
    dispatch({ type: GANTT_REQUEST });
    return getRepo({})
        .then(api => api.task.filterList({ timeFrame, status: [TASK_STATUS_DONE, TASK_STATUS_WIP, TASK_STATUS_HOLD] }))
        .then((data) => {
          return dispatch({ type: GANTT_RECEIVE, payload: { items: data } });
        });
  };
}
