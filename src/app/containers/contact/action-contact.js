/**
 * Created by phucpnt on 5/22/16.
 */

import { CONTACT_REQUEST, CONTACT_RECEIVE } from '../../constants/action-type';
import getRepo from '../../../browser/extension/connect/podio/repo-podio';

export function getAll() {
  return (dispatch, getState) => {
    dispatch({ type: CONTACT_REQUEST });

    return getRepo({})
        .then(api => api.contact.getAll())
        .then(contacts => dispatch({
          type: CONTACT_RECEIVE,
          payload: { items: contacts }
        }));
  };
}
