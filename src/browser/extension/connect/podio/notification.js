/**
 * Created by phucpnt on 5/18/16.
 */

import moment from 'moment';
import _ from 'lodash';
import * as TF from '../../../../app/constants/timeframe';
import formalizeItemObj from './helper/formalize-obj-item';


export default function notificationOps(podio, { appId, appField }) {

  const suggestForInvalidDelegateComment = `Thx for copying me. 
  It seems you **not use correct** pattern for FrontEnd request.
  Please use the following pattern: *{request_categories} @phucpnt {@suggested_person_to_handle_request}*.
  By doing that new task for front end would be created and take care of.
  Note:
  *request_categories*: must be "bug" or "feature".
  *@suggested_person_to_handle_request*: could be any person in front end except PhucPNT.
  `;

  console.log(appId, appField);

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
