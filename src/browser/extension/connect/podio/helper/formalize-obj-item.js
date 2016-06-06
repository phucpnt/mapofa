/**
 * Created by phucpnt on 5/19/16.
 */
import moment from 'moment';
import toMarkdown from 'to-markdown';
import { mapToContact } from '../contact';

function getFieldValue(poField) {
  let val = null;
  switch (poField.type) { //
    case 'date':
      val = moment.utc(poField.values[0].start_utc).toDate();
      break;
    case 'text':
      val = toMarkdown(poField.values[0].value);
      break;
    case 'duration':
      val = poField.values[0].value / (60 * 60);
      break;
    case 'contact':
      val = poField.values.map(podioContact => mapToContact({ profile: podioContact.value }));
      break;
    case 'calculation':
      switch (poField.config.settings.return_type) {
        case 'date':
          val = moment.utc(poField.values[0].start_utc).toDate();
          break;
        default:
          val = poField.values[0].value;
      }
      break;
    default:
      val = poField.values[0].value;
  }
  return val;
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

  let finalObj = Object.keys(commonFields).reduce((accum, key) => {
    if (typeof poItem[key] !== 'undefined') {
      accum[commonFields[key]] = poItem[key];
    }
    return accum;
  }, {});

  return Object.assign({}, finalObj, extractItemFields(poItem.fields, AppField));
}


