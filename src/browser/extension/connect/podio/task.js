/**
 * Created by phucpnt on 5/18/16.
 */

import moment from 'moment';
import _ from 'lodash';
import * as TF from '../../../../app/constants/timeframe';
import formalizeItemObj from './helper/formalize-obj-item';
import {
    TASK_TYPE_BACKLOG, TASK_TYPE_BUG, TASK_TYPE_FEATURE, TASK_TYPE_NOTSET,
    TASK_STATUS_DONE, TASK_STATUS_HOLD, TASK_STATUS_NOTSTART, TASK_STATUS_WIP
} from '../../../../app/constants/app';

function translateTimeFrame(timeFrame) {
  switch (timeFrame) {
    case TF.WEEK:
      return {
        startDate: {
          from: null,
          to: moment().endOf('week').format('YYYY-MM-DD')
        },
        calEstEndDate: {
          from: moment().startOf('week').format('YYYY-MM-DD'),
          to: null
        },
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

function translateStatus(statusList, podioStatusOptions = {
  [TASK_STATUS_HOLD]: 4,
  [TASK_STATUS_NOTSTART]: 1,
  [TASK_STATUS_WIP]: 2,
  [TASK_STATUS_DONE]: 3,
}) {
  return statusList.map(item => podioStatusOptions[item]);
}

function translateCategory(catList, podioCatList = {
  [TASK_TYPE_NOTSET]: null,
  [TASK_TYPE_BACKLOG]: 1,
  [TASK_TYPE_FEATURE]: 2,
  [TASK_TYPE_BUG]: 3
}) {
  return catList.map(item => podioCatList[item]);
}

export default function taskOps(podio, { appId, appField }) {

  console.log(appId, appField);
  const _appId = appId;
  const _appField = appField;
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

  function _makeFilter({ timeFrame, status, category, assignee }) {
    let filters = {};
    if (timeFrame) {
      filters = Object.assign({}, filters, _.mapKeys(translateTimeFrame(timeFrame), (val, key) => appField[key]));
    }
    if (status) {
      filters[appField.status] = translateStatus(status);
    }
    if (category) {
      filters[appField.category] = translateCategory(category);
    }
    if (assignee) {
      filters[appField.assignee] = assignee;
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

  const getAppSetup = () => {
    return podio.request('GET', `/app/${_appId}`);
  };

  return {
    create,
    remove,
    removeList,
    filterList,
    getAppSetup,
    checkItemHasAcceptedType,
  };
}
