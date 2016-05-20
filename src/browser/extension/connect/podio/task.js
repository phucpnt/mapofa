/**
 * Created by phucpnt on 5/18/16.
 */

import moment from 'moment';
import _ from 'lodash';
import * as TF from '../../../../app/constants/timeframe';
import formalizeItemObj from './formalize-obj-item';

function translateTimeFrame(timeFrame) {
  switch (timeFrame) {
    case TF.WEEK:
      return {
        from: moment().startOf('week'),
        to: moment().endOf('week')
      };
    case TF.NEXT_WEEK:
      return {
        from: moment().startOf('week').add(1, 'week'),
        to: moment().endOf('week').add(1, 'week'),
      };
    default:
      throw new Error('Unknown timeframe');
  }
}

export default function taskOps(podio, { appId, appField }) {

  const filterList = ({ timeFrame }) => {
    return podio.request('POST', `/item/app/${appId}/filter`, {
      filters: {
        [appField.startDate]: translateTimeFrame(timeFrame),
      }
    }).then(data => data.items.map(item => formalizeItemObj(item, appField)));
  };

  const create = taskDetails => {
    const itemFields = _.mapKeys(taskDetails, (val, key) => {
      return appField[key];
    });
    return podio.request('POST', `/item/app/${appId}`, { fields: itemFields })
        .then(poItem => formalizeItemObj(poItem, appField));
  };

  const remove = taskId => {
    return podio.request('DELETE', `/item/${taskId}`);
  };

  const removeList = taskIdList => {
    return podio.request('POST', `/item/app/${appId}/delete`, { item_ids: taskIdList });
  };

  return {
    create,
    remove,
    removeList,
    filterList
  };
}
