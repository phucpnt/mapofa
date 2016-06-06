/**
 * Created by phucpnt on 5/21/16.
 */

import _ from 'lodash';
import { ContactField } from './helper/podio-id-list';

export function mapToContact(podioContact) {
  return _.mapValues(ContactField, poField => _.get(podioContact, poField));
}

export default function personOps(podio, { workspaceId }) {

  let _myAccount = null;

  const getAll = () => {
    return podio.request('GET', `/space/${workspaceId}/member/v2`)
        .then(items => items.map(item => {
          return _.mapValues(ContactField, poField => _.get(item, poField));
        }))
        ;
  };

  const getMyAccount = () => {
    return new Promise((resolve, reject) => {
      if (_myAccount !== null) {
        resolve(_myAccount);
      } else {
        console.log(podio);
        getAll().then(contactList => resolve(contactList.find(item => item.id === podio.authObject.ref.id)), reject)
            .catch(reject);
      }
    });
  };

  return {
    getAll,
    getMyAccount,
  };
}
