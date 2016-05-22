/**
 * Created by phucpnt on 5/21/16.
 */

import _ from 'lodash';
import { ContactField } from './helper/podio-id-list';

export default function personOps(podio, { workspaceId }) {

  const getAll = () => {
    return podio.request('GET', `/space/${workspaceId}/member/v2`)
        .then(items => items.map(item => {
          return _.mapValues(ContactField, poField => _.get(item, poField));
        }))
        ;
  };

  return {
    getAll,
  };
}
