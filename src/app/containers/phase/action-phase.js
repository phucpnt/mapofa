/**
 * Created by phucpnt on 5/17/16.
 */

import getRepo from '../../../browser/extension/connect/podio/repo-podio';
import {PHASE_LIST_REQUEST, PHASE_LIST_RECEIVE} from '../../constants/action-type';

export default function load({timeFrame}) {

  return (dispatch, getState) => {
    dispatch({type: PHASE_LIST_REQUEST});
    return getRepo()
        .then(api => api.getPhase({timeFrame}))
        .then((data) => {
          return dispatch({type: PHASE_LIST_RECEIVE, payload: data});
        });
  };

}
