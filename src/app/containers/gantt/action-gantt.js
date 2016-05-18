/**
 * Created by phucpnt on 5/17/16.
 */

import * as actionPhase from '../phase/action-phase';

export function load({timeFrame}) {
  return (dispatch, getState) => {
    // dispatch(actionProduct.load({timeFrame}));
    // dispatch(actionMilestone.load({timeFrame}));
    dispatch(actionPhase.load({timeFrame}));
    // dispatch(actionTask.load({timeFrame}));
  };
}
