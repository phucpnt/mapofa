/**
 * Created by phucpnt on 6/12/16.
 */
import {
    ITEM_REF_REQUEST, ITEM_REF_RECEIVE,
    ITEM_REF_TASK_CREATE_RECEIVE, ITEM_REF_TASK_CREATE_REQUEST
} from '../../constants/action-type';
import getRepo from '../../../browser/extension/connect/podio/repo-podio';
import moment from 'moment';

export function resolveByURL(url) {
  return (dispatch, getState) => {
    dispatch({ type: ITEM_REF_REQUEST, payload: { url } });
    return getRepo({})
        .then(api => {
          return api.item.resolveByURL(url)
              .then(data => api.item.getAllRefsToItem({ itemId: data.data.item_id }))
              .then(data => {
                dispatch({ type: ITEM_REF_RECEIVE, payload: { ...data, url } });
              });
        });
  };
}

export function createDevTaskFromItemUrl(url) {
  // fill the task details
  // share with other person involved

  return (dispatch, getState) => {
    dispatch({ type: ITEM_REF_TASK_CREATE_REQUEST });
    return getRepo({})
        .then(api => {
          return api.item.resolveByURL(url).then(itemObj => {
            console.log(itemObj);
            return api.task.create({
              subject: `${itemObj.title} - Request`,
              startDate: moment().format('YYYY-MM-DD HH:mm:ss'),
              category: ['Backlog'],
              status: ['Not Started'],
              description: 'Please check the **related items** for more details',
              relatedTo: [itemObj.data.item_id]
            });
          });
        }).then(response => {
          return { type: ITEM_REF_TASK_CREATE_RECEIVE, payload: response };
        });
  };

}

export function addRefrence(task, item) {

}