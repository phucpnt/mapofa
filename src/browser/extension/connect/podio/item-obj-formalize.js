/**
 * Created by phucpnt on 5/19/16.
 */

import { DevTaskField } from './podio-id-list';

export default function formalize(poItem) {


  const commonFields = {
    app_item_id: 'appItemId',
    title: 'title',
    created_by: 'createdBy',
    file_count: 'fileCount',
    item_id: 'itemId',
    link: 'link',
  };
  let finalObj = {};
  finalObj = Object.keys(commonFields).reduce((accum, key) => {
    if (typeof poItem[key] !== 'undefined') {
      accum[commonFields[key]] = poItem[key];
    }
    return accum;
  }, {});

  Object.assign({}, finalObj, extractItemFields(poItem.fields, DevTaskField));
}

function getFieldValue(poField) {
  return poField.values[0];
}

function extractItemFields(poFields, objFields) {
  return Object.keys(objFields).reduce((accum, key) => {
    const fieldId = objFields[key];
    const foundField = poFields.find(field => field.field_id === fieldId);
    if (foundField) {
      accum[key] = getFieldValue(foundField);
    }
    return accum;
  }, {});

}

