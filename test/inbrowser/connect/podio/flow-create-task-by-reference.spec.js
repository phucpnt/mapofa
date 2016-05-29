/**
 * Created by phucpnt on 5/28/16.
 */
import { expect } from 'chai';
import Q from 'q';

import connectPodio, { getAppTaskDetails } from '../../helper/connect-podio';
import createBacklogByRef, { process1By1 } from '../../../../src/browser/extension/connect/podio/flow/create-backlog-by-reference';
import { WORKSPACE_ID as TEST_WORKSPACE_ID, SNAPP_TASK } from '../../helper/constants';
import notifOps, { TYPE_MEMBER_REFERENCE_ADD } from '../../../../src/browser/extension/connect/podio/notification';
import taskOps from '../../../../src/browser/extension/connect/podio/task';
import contactOps from '../../../../src/browser/extension/connect/podio/contact';
const workspaceId = 4555999;


connectPodio(podio => {
  describe.only('Process ', () => {
    const api = notifOps(podio);
    const apiContact = contactOps(podio, { workspaceId });
    let refItems = [];
    let members = [];

    const getNotifListByRef = () => {
      return api.getAll(TYPE_MEMBER_REFERENCE_ADD).then(commentList => {
        const itemList = commentList.map(item => {
          return item.context;
        });
        console.log('%cREF ITEMS', 'background:red;color:white', itemList);
        return itemList;
      });
    };

    before(done => {
      Q.all([
        getNotifListByRef().then(itemList => {
          refItems = itemList;
          console.log('refItems', refItems);
          return refItems;
        }),
        apiContact.getAll().then(itemList => {
          members = itemList;
        }),
      ]).then(() => done()).catch(done);
    });

    it('Those notifications should be existed', () => {
      expect(refItems).to.have.length.above(0);
    });

    it('it should create task for 1 reference item', (done) => {
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
          apiTask: taskOps(podio, {
            appId: taskAppDetails.appId,
            appField: taskAppDetails.appFields,
          })
        }, item).then(() => {
          done();
        });
      }).catch(done);
    });
    it('it should run the flow correctly', done => {
      const taskAppDetails = getAppTaskDetails();
      createBacklogByRef(podio, { appId: taskAppDetails.appId, appField: taskAppDetails.appFields, workspaceId })
          .then(items => Q.all).then(() => done()).catch(done);
    });
  });
});
