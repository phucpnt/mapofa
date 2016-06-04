/**
 * Created by phucpnt on 6/4/16.
 */

import { expect } from 'chai';
import { spy } from 'sinon';
import moment from 'moment';

import createPushService from '../../../../src/browser/extension/connect/podio/create-push-service';
import taskOps from '../../../../src/browser/extension/connect/podio/task';
import connectPodio, { getAppTaskDetails } from '../../helper/connect-podio';

const TEST_WORKSPACE_ID = 4572579;

connectPodio(podio => {
  const testTaskApp = getAppTaskDetails();
  const apiTask = taskOps(podio, { appId: testTaskApp.appId, appField: testTaskApp.appFields });
  describe.only('Podio Push Service', () => {

    const fakeHandle = spy();
    before(done => {
      createPushService(podio, {
        workspaceId: TEST_WORKSPACE_ID,
        messageHandle: (...args) => {
          console.log(args);
          fakeHandle(...args);
        },
      }).then(() => done());
    });

    it('it should receive message when new task is created', (done) => {
      apiTask.create({ subject: 'Test App', startDate: moment().format('YYYY-MM-DD HH:mm:ss') }).then(task => {
        console.log(task);
        setTimeout(() => {
          expect(fakeHandle.called).to.be.true;
          const pushedData = fakeHandle.getCall(0).args[0];
          expect(pushedData).to.have.deep.property('data.data.context_ref');
          expect(pushedData).to.have.deep.property('data.data.data_ref');
          expect(pushedData.data.data.context_ref.id).to.equal(task.id);
          done();
        }, 1000);
      });
    });
  });

});
