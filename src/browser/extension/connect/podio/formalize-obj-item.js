/**
 * Created by phucpnt on 5/19/16.
 */

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

export default function formalize(poItem, AppField) {
  const commonFields = {
    app_item_id: 'appItemId',
    title: 'title',
    created_by: 'createdBy',
    file_count: 'fileCount',
    item_id: 'id',
    link: 'link'
  };
  let finalObj = {};
  finalObj = Object.keys(commonFields).reduce((accum, key) => {
    if (typeof poItem[key] !== 'undefined') {
      accum[commonFields[key]] = poItem[key];
    }
    return accum;
  }, {});

  return Object.assign({}, finalObj, extractItemFields(poItem.fields, AppField));
}

