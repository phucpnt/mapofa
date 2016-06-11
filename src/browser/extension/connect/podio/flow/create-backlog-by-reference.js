/**
 * Created by phucpnt on 5/24/16.
 */
import notifOps, { TYPE_MEMBER_REFERENCE_ADD } from '../notification';
import taskOps from '../task';
import contactOps from '../contact';
import moment from 'moment';
import Q from 'q';
import _ from 'lodash';


function FlowViolation(message) {
  this.name = 'FlowViolation';
  this.message = message;
  this.stack = (new Error()).stack;
}
FlowViolation.prototype = new Error();

function pickSuggestedImplementers(members, appUser, item) {
  const contactFields = item.fields.filter(field => field.type === 'contact');
  const contacts = contactFields.reduce((accum, curField) => {
    accum = accum.concat(curField.values.map(value => value.value));
    return accum;
  }, []);

  console.log('contacts', contacts);
  console.log(members, appUser);

  return contacts.filter(contact => members.some(member => member.id === contact.user_id))
      .filter(member => member.id !== appUser.id);
}

function expectNumberOfImplementer(limit) {
  return items => {
    console.log('contacts', items);
    if (items.length < limit) {
      throw new FlowViolation(`Expect Number Of Implementers at least ${limit}`);
    }
    return items;
  };
}

export function process1By1(podio, { appUser, members, apiTask }, item) {

  console.log('members', members);
  const chooseImplementers = _.flowRight(
      expectNumberOfImplementer(1),
      pickSuggestedImplementers.bind(null, members, appUser)
  );

  console.log('process1by1', item);

  return podio.request('GET', `/item/${item.item_id}`)
      .then(apiTask.checkItemHasAcceptedType)
      .then(itemObj => {
        const implementers = chooseImplementers(itemObj);
        return apiTask.create({
          subject: `${itemObj.title} - Request`,
          startDate: moment().format('YYYY-MM-DD HH:mm:ss'),
          category: ['Backlog'],
          status: ['Not Started'],
          assignee: implementers.map(u => ({ value: { id: u.user_id, type: 'user' } })),
          relatedTo: [itemObj.item_id]
        }).then(response => {
          console.log(response);
          return response;
        });
      });
}

export default function createBacklogByReference(podio, { appId, appField, workspaceId }) {
  const appUser = podio.authObject.ref;
  const apiTask = taskOps(podio, { appId, appField });

  // retrieve top notifications
  // identify the reference_member_add
  // process the request reference -> create backlog -> assign suggested person first.
  // add description with links to request referenced item.
  // TODO mark processed notification as READ

  const api = notifOps(podio, { appId, appField });
  const apiContact = contactOps(podio, { workspaceId });
  let members = [];

  return apiContact.getAll()
      .then(items => {
        console.log('members', items);
        members = items;
      }).then(() => api.getAll(TYPE_MEMBER_REFERENCE_ADD))
      .then(notifList => {
        return notifList.map(item => ({ item_id: item.context.ref.id, type: item.context.ref.type }));
      })
      .then(items => Q.allSettled(items.map(
          process1By1.bind(null, podio, { appUser, members, apiTask })
      )))
      .then(responseList => console.info('responseList', responseList), errorList => console.error(errorList));

}


