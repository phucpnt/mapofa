/**
 * Created by phucpnt on 5/20/16.
 */

import { expect } from 'chai';
import _ from 'lodash';
import moment from 'moment';
import Q from 'q';

import connectPodio from '../../helper/connect-podio';
import notifOps from '../../../../src/browser/extension/connect/podio/notification';

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
  });
});
