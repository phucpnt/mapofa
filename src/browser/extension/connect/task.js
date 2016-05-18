/**
 * Created by phucpnt on 5/18/16.
 */

import * as TF from '../../../app/constants/timeframe';
import moment from 'moment';
import {PHASE_APP as APPID} from './podio-id-list';

function translateTimeFrame(timeFrame){
  switch(timeFrame){
    case TF.WEEK:
      return {
        start: moment().startOf('week'),
        end: moment().endOf('week')
      };
    default:
      throw new Error('Unknown timeframe');
  }
}

export default function taskOps(podio){
  
  const filterList = ({timeFrame}) => {
    podio.request('POST', `/item/app/${APPID}/filter`, {
      
    });
  };

  return {
    filterList
  }
}
