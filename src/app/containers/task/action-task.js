/**
 * Created by phucpnt on 5/15/16.
 */

import getRepo from '../../../browser/extension/connect/podio/repo-podio';
import { TASK_LIST_REQUEST, TASK_LIST_RECEIVE } from '../../constants/action-type';

export function filterList({ timeFrame }) {

  return (dispatch, getState) => {
    dispatch({ type: TASK_LIST_REQUEST });
    return getRepo({})
        .then(api => {console.log(api); return api;})
        .then(api => api.task.filterList({ timeFrame }))
        .then((data) => {
          return dispatch({ type: TASK_LIST_RECEIVE, payload: {items: data} });
        });
  };

}
