/**
 * Created by phucpnt on 5/20/16.
 */

import { expect } from 'chai';

import connectPodio from '../../helper/connect-podio';
import notifOps, { TYPE_MEMBER_REFERENCE_ADD } from '../../../../src/browser/extension/connect/podio/notification';

// for testing only
const appId = 15852506;
const appField = {
  subject: 122634183,
  status: 122634184,
  startDate: 122634185,
  estHours: 122634186,
  estEndDate: 122634187,
  assignee: 122634188,
  belongsToPhase: 122634189,
  description: 122634190
};

connectPodio((podio) => {
  const api = notifOps(podio, {});

  describe('Podio Notification', () => {
    it('As the Manager, I want to be filter request notification directly to me', (done) => {
      api.getAll().then(items => {
        console.log('alert', items);
        expect(items).to.have.length.above(0); // more specific checking
        expect(items[0]).to.have.deep.property('notifications[0].type', 'alert');
        expect(items[0]).to.have.deep.property('notifications[0].data.text').that.is.a('string');
        expect(items[0]).to.have.deep.property('notifications[0].data.ref.type', 'comment');
        expect(items[0]).to.have.deep.property('notifications[0].data.ref.id').that.is.a('number');
        done();
      }).catch(done);
    });
    it('As the Manager, I want to be filter request comments related to me', (done) => {
      api.getAll('comment').then(items => {
        console.log('comment', items);
        expect(items).to.have.length.above(0); // more specific checking
        done();
      }).catch(done);
    });
    it('As the Manager, I want to be filter items reference to me', (done) => {
      /**
       * Todo making reference item should be scope with specific items type and space.
       */
      api.getAll('member_reference_add').then(items => {
        console.log('notifications', items); // more specific checking
        expect(items).to.have.length.above(0);
        done();
      }).catch(done);
    });

    describe('With notifications directly @me', () => {
      it('allow me to get the full comment', (done) => {
        api.getAll().then(items => {
          console.log('alerts > ', items);
          expect(items).to.be.an('array');
          expect(items[0]).to.be.exist;
          const commentId = items[0].notifications.slice(-1, 1)[0].data.ref.id;
          expect(commentId).to.be.exist;
          console.log('commentId', commentId);
          return commentId;
        })
            .then(api.getComment)
            .then(comment => {
              console.log(comment);
              done();
            })
            .catch(done);
      });

      it.skip('allow me to send a comment to item', (done) => {
        api.sendComment('item', 423017623, api.sample.suggestForInvalidDelegateComment).then(comment => {
          expect(comment.id).to.be.exist;
          done();
        }).catch(done);
      });

      it('it allow me to do the comment with mention to user', (done) => {
        const userId = podio.authObject.ref.id;
        api.sendComment('item', 423017623, `hello @[phucpnt](user:${userId}) how are you?`).then(comment => {
          expect(comment.id).to.be.exist;
          done();
        }).catch(done);
      });

    });

    describe('With notifications reference @me', () => {
      let refItems = [];
      before(done => {
        api.getAll(TYPE_MEMBER_REFERENCE_ADD).then(commentList => {
          refItems = refItems.concat(commentList.map(item => {
            return item.context;
          }));
          console.log('%cREF ITEMS', 'background:red;color:white', refItems);
          done();
        }).catch(done);
      });

      it('Those notifications should be existed', () => {
        expect(refItems).to.have.length.above(0);
      });

      it('it should have user references for first item', (done) => {
        let refItem = refItems[0];
        expect(refItem).to.have.deep.property('ref.id').that.is.a('number');
        expect(refItem).to.have.deep.property('ref.type', 'item');
        console.log(podio);
        let appUser = podio.authObject.ref;
        let itemId = refItem.ref.id;
        podio.request('GET', `/item/${itemId}`).then(item => {
          console.log('response', item);
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
          done();
        }).catch(done);
      });


    });
  });
});
