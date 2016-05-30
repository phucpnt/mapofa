/**
 * Created by phucpnt on 5/15/16.
 */

import getRepo from '../../../browser/extension/connect/podio/repo-podio';
import {
    TASK_LIST_REQUEST, TASK_LIST_RECEIVE,
    PANEL_TASK_REQUEST, PANEL_TASK_RECEIVE, PANEL_TAB_ACTIVE,
} from '../../constants/action-type';

export function filterList({ timeFrame }) {

  return (dispatch, getState) => {
    dispatch({ type: TASK_LIST_REQUEST });
    return getRepo({})
        .then(api => api.task.filterList({ timeFrame }))
        .then((data) => {
          return dispatch({ type: TASK_LIST_RECEIVE, payload: { items: data } });
        });
  };

}

export function filterPanel({ status, category, assignee }) {
  return (dispatch, getState) => {
    dispatch({ type: PANEL_TASK_REQUEST });
    return getRepo({})
        .then(api => api.task.filterList({ status, assignee, category }))
        .then(data => {
          dispatch({ type: PANEL_TASK_RECEIVE, payload: { items: data } });
        });
  };
}

export function markTabActive(view) {
  return { type: PANEL_TAB_ACTIVE, payload: { tabView: view } };
}