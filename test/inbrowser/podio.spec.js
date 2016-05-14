/**
 * Created by phucpnt on 5/14/16.
 */

import {expect} from 'chai';
import connectPodio from './helper/connect-podio';
import Q from 'q';


connectPodio((podio) => {
  const workspaceId = 4555999; // front end ng
  const userId = podio.authObject.ref.id; // FIXME: not clean way to get userId

  describe('Podio Repo', () => {
    it('should get current user', (done) => {
      podio.request('GET', '/user').then(data => {
        expect(data.user_id).not.to.be.null;
        expect(data.user_id).to.be.a('number');
        done();
      });
      expect('hello podio').to.equal('hello podio');
    });
    it('should get all my organizations', (done) => {
      podio.request('GET', '/org').then(data => {
        console.log(data);
        expect(data).to.be.an('array');
        done();
      });
    });
  });

  describe('Podio WorkSpace', () => {
    describe('As team member', () => {
      it('I can see list of my teammates', (done) => {
        podio.request('GET', `/space/${workspaceId}/member`, null).then(data => {
          expect(data).to.be.an('array');
          console.info('teammates >', data);
          done();
        });
      });
    });
  });

  describe('Podio Task', () => {
    describe('As team member', () => {
      let demoTask = [];
      after(done => { // clean up tested task
        Q.all(demoTask.map(task => podio.request('DELETE', `/task/${task.task_id}`))).then(done);
      });

      it('I can see all tasks in team', (done) => {
        podio.request('GET', '/task', {space: [workspaceId]}).then(data => {
          console.info('team task > ', data);
          expect(data).to.be.an('array');
          done();
        });
      });

      it('I can see all my tasks', (done) => {
        podio.request('GET', '/task', {space: [workspaceId], responsible: [userId]}).then(data => {
          console.info('my task >', data);
          expect(data).to.be.an('array');
          done();
        });
      });

      it('I can create task for me', (done) => {
        const sampleTask = {
          text: 'Mopofa test task',
          description: 'task for testing',
          ref_type: 'space',
          ref_id: workspaceId,
        };
        podio.request('POST', '/task', sampleTask).then(data => {
          expect(data.task_id).to.be.a('number');
          demoTask.push(data);
          console.info('create task >', data);
          done();
        });
      });

    });
  });
});

