/**
 * Created by phucpnt on 5/18/16.
 */

import * as TF from '../../../../app/constants/timeframe';
import moment from 'moment';
import {DEVTASK_APP as APPID, DevTaskField as PoField} from './podio-id-list';

function translateTimeFrame(timeFrame) {
  switch (timeFrame) {
    case TF.WEEK:
      return {
        from: moment().startOf('week'),
        to: moment().endOf('week')
      };
    default:
      throw new Error('Unknown timeframe');
  }
}

export default function taskOps(podio) {

  const filterList = ({ timeFrame }) => {
    podio.request('POST', `/item/app/${APPID}/filter`, {
      filters: {
        [PoField.startDate]: translateTimeFrame(timeFrame),
      }
    });
  };

  return {
    filterList
  };
}
