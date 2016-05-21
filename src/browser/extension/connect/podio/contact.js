/**
 * Created by phucpnt on 5/21/16.
 */

export default function personOps(podio, { appId, appField }) {

  console.log(appId, appField);

  const filterList = ({ timeFrame }) => {
    return podio.request('POST', `/item/app/${appId}/filter`, {
      filters: {
        [appField.startDate]: translateTimeFrame(timeFrame),
      }
    })
        .then(data => data.items.map(item => formalizeItemObj(item, appField)));
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
