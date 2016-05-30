/**
 * Created by phucpnt on 5/18/16.
 */

import moment from 'moment';
import _ from 'lodash';
import * as TF from '../../../../app/constants/timeframe';
import formalizeItemObj from './helper/formalize-obj-item';

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

function translateStatus(statusList) {
  return [2];
}

export default function taskOps(podio, { appId, appField }) {

  console.log(appId, appField);

  let appList = [];

  function _getAcceptedAppList() {
    return new Promise((resolve, reject) => {
      if (appList.length > 0) {
        resolve(appList);
      }

      podio.request('GET', `/app/${appId}`).then(app => {
        console.log('TASK APP', app);
        const relatedFieldSetup = app.fields.find(field => field.field_id === appField.relatedTo);
        if (relatedFieldSetup) {
          appList = relatedFieldSetup.config.settings.referenced_apps.map(item => item.app_id);
          resolve(appList);
        } else {
          reject();
        }
      }, reject).catch(reject);

    });
  }

  function _makeFilter({ timeFrame, status }) {
    let filters = {};
    if (timeFrame) {
      filters[appField.startDate] = translateTimeFrame(timeFrame);
    }
    if (status) {
      filters[appField.status] = translateStatus(status);
    }

    return filters;
  }

  const filterList = (filters) => {
    return podio.request('POST', `/item/app/${appId}/filter`, {
      filters: _makeFilter(filters)
    })
        .then(data => data.items.map(item => formalizeItemObj(item, appField)))
        ;
  };

  const create = taskDetails => {
    const itemFields = _.mapKeys(taskDetails, (val, key) => {
      return appField[key];
    });
    return podio.request('POST', `/item/app/${appId}`, { fields: itemFields })
        .then(poItem => formalizeItemObj(poItem, appField))
        ;
  };

  const remove = taskId => {
    return podio.request('DELETE', `/item/${taskId}`);
  };

  const removeList = taskIdList => {
    return podio.request('POST', `/item/app/${appId}/delete`, { item_ids: taskIdList });
  };

  const checkItemHasAcceptedType = item => {
    console.log('will check item', item);
    return new Promise((resolve, reject) => _getAcceptedAppList().then(appIdList => {
      if (appIdList.indexOf(item.app.app_id) > -1) {
        resolve(item);
      } else {
        reject(item);
      }
    }, err => reject(item, err)));
  };

  return {
    create,
    remove,
    removeList,
    filterList,
    checkItemHasAcceptedType,
  };
}
