/**
 * Created by phucpnt on 5/28/16.
 */
import { expect } from 'chai';
import Q from 'q';

import connectPodio, { getAppTaskDetails } from '../../helper/connect-podio';
import { process1By1 } from '../../../../src/browser/extension/connect/podio/flow/create-backlog-by-reference';
import { WORKSPACE_ID as TEST_WORKSPACE_ID, SNAPP_TASK } from '../../helper/constants';
import notifOps, { TYPE_MEMBER_REFERENCE_ADD } from '../../../../src/browser/extension/connect/podio/notification';
import taskOps from '../../../../src/browser/extension/connect/podio/task';
const workspaceId = 4555999;


connectPodio(podio => {
  describe.only('Process ', () => {
    const api = notifOps(podio);
    let refItems = [];
    let members = [];

    const getNotifListByRef = () => {
      return api.getAll(TYPE_MEMBER_REFERENCE_ADD).then(commentList => {
        const refItems = commentList.map(item => {
          return item.context;
        });
        console.log('%cREF ITEMS', 'background:red;color:white', refItems);
        return refItems;
      });
    };

    before(done => {
      Q.all([
        getNotifListByRef().then(itemList => {
          refItems = itemList;
          console.log('refItems', refItems);
          return refItems;
        }),
        podio.request('GET', `/space/${workspaceId}/member`).then(memberList => {
          members = memberList.map(member => member.user);
          console.log('members', members);
          return members;
        })
      ]).then(() => done()).catch(done);
    });

    it('Those notifications should be existed', () => {
      expect(refItems).to.have.length.above(0);
    });

    it('it should have user references for first item', (done) => {
      let refItem = refItems[0];
      expect(refItem).to.have.deep.property('ref.id').that.is.a('number');
      expect(refItem).to.have.deep.property('ref.type', 'item');
      console.log('refItem', refItem);
      let appUser = podio.authObject.ref;
      let itemId = refItem.ref.id;
      podio.request('GET', `/item/${itemId}`).then(item => {
        console.log('response', item);
        expect(item).to.have.property('item_id').that.is.a('number');
        expect(item).to.have.property('fields').that.have.length.above(0);
        const contactFields = item.fields.filter(field => field.type === 'contact');
        expect(contactFields).to.have.length.above(0);
        const contacts = contactFields.reduce((accum, curField) => {
          accum = accum.concat(curField.values.map(value => value.value));
          return accum;
        }, []);
        expect(contacts).to.have.length.above(0);
        console.log('contacts', contacts);
        expect(contacts.some(contact => contact.user_id === appUser.id)).to.be.true;

        const taskAppDetails = getAppTaskDetails();
        process1By1(podio, {
          appUser, members,
          taskOps: taskOps(podio, {
            appId: taskAppDetails.appId,
            appField: taskAppDetails.appFields,
          })
        }, item).then(() => {
          done();
        });
      }).catch(done);
    });

  });
})
