/**
 * Created by phucpnt on 5/17/16.
 */

import * as actionTask from '../task/action-task';

export function load({timeFrame}) {
  return (dispatch, getState) => {
    // dispatch(actionProduct.load({timeFrame}));
    // dispatch(actionMilestone.load({timeFrame}));
    dispatch(actionTask.filter({timeFrame}));
    // dispatch(actionTask.load({timeFrame}));
  };
}
