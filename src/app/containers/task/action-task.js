/**
 * Created by phucpnt on 5/15/16.
 */

import getRepo from '../../../browser/extension/connect/repo-podio';
import {TASK_LIST_REQUEST, TASK_LIST_RECEIVE} from '../../constants/action-type';

export default function load({timeFrame}) {

  return (dispatch, getState) => {
    dispatch({type: TASK_LIST_REQUEST});
    return getRepo()
        .then(api => api.getTask({timeFrame}))
        .then((data) => {
          return dispatch({type: TASK_LIST_RECEIVE, payload: data});
        });
  };

}
