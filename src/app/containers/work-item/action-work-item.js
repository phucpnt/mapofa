/**
 * Created by phucpnt on 6/12/16.
 */
import { ITEM_REF_REQUEST, ITEM_REF_RECEIVE } from '../../constants/action-type';
import getRepo from '../../../browser/extension/connect/podio/repo-podio';

export function resolveByURL(url) {
  return (dispatch, getState) => {
    dispatch({ type: ITEM_REF_REQUEST, payload: { url } });
    return getRepo({})
        .then(api => api.item.resolveByURL(url))
        .then((data) => {
          dispatch({ type: ITEM_REF_REQUEST, payload: { item: data } });
        });
  };
}

export function createDevTaskFromUrl(url) {

}

export function addRefrence(task, item) {

}