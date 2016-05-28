/**
 * Created by phucpnt on 5/24/16.
 */
import notifOps, { TYPE_MEMBER_REFERENCE_ADD } from '../notification';
import moment from 'moment';

export default function createBacklogByReference(podio, { appId, appField, workspaceId }) {
  const appUser = podio.authObject.ref;
  let members = [];

  // retrieve top 100 notifications
  // indentify the reference_member_add
  // process the request reference -> create backlog -> assign suggested person first.
  // add description with links to request referenced item.

  const api = notifOps(podio, { appId, appField });
  api.getAll(TYPE_MEMBER_REFERENCE_ADD)
      .then(notif => notif.context)
      .then(items => items.map(process1By1.bind(null, podio, { appUser, members })))
  ;

}

export function process1By1(podio, { appUser, members, taskOps }, item) {
  return podio.request('GET', `/item/${item.item_id}`).then(itemObj => {
    const contactFields = item.fields.filter(field => field.type === 'contact');
    const contacts = contactFields.reduce((accum, curField) => {
      accum = accum.concat(curField.values.map(value => value.value));
      return accum;
    }, []);

    const memberContacts = contacts.filter(contact => members.some(member => member.user_id === contact.user_id));

    const potentialExecutors = memberContacts.filter(member => member.user_id !== appUser.id);


    return taskOps.create({
      subject: `Test Task: ${itemObj.title}`,
      startDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      category: ['Backlog'],
      assignee: potentialExecutors.map(u => ({ value: { id: u.user_id, type: 'user' } })),
      relatedTo: [item.item_id]
    }).then(response => {
      console.log(response);
      return response;
    });

  });
}

