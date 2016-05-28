/**
 * Created by phucpnt on 5/18/16.
 */

import moment from 'moment';
import _ from 'lodash';
import * as TF from '../../../../app/constants/timeframe';
import formalizeItemObj from './helper/formalize-obj-item';

export const TYPE_MEMBER_REFERENCE_ADD = 'member_reference_add';
export const TYPE_ALERT = 'alert'; // directly mention to me
export const TYPE_COMMENT = 'comment';

export default function notificationOps(podio) {

  const suggestForInvalidDelegateComment = `Thx for copying me. 
  For request to frontend use the following pattern: 
  *ferequest {request_categories} @phucpnt {@suggested_person_to_handle_request}*.
  By doing that new task for front end would be created and take care of.
  Note:
  *request_categories*: must be "bug" or "feature".
  *@suggested_person_to_handle_request*: could be any person in front end except PhucPNT.
  `;

  const getAll = (type = 'alert') => {
    return podio.request('GET', '/notification/', { type }).then(items => {
      return items;
    });
  };
  const getComment = (commentId) => {
    return podio.request('GET', `/comment/${commentId}`);
  };

  const sendComment = (type, id, comment) => {
    return podio.request('POST', `/comment/${type}/${id}`, { value: comment });
  };


  return {
    getAll,
    getComment,
    sendComment,
    sample: {
      suggestForInvalidDelegateComment,
    }
  };
}
