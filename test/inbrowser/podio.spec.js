/**
 * Created by phucpnt on 5/14/16.
 */

import {expect} from 'chai';
import connectPodio from './helper/connect-podio';
import Q from 'q';


connectPodio((podio) => {
  const workspaceId = 4555999; // front end ng
  const phaseAppId = 15760239;
  const userId = podio.authObject.ref.id; // FIXME: not clean way to get userId

  describe('Podio', () => {
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

    describe('WorkSpace', () => {
      describe('As team member', () => {
        it('I can see list of my teammates', (done) => {
          podio.request('GET', `/space/${workspaceId}/member`, null).then(data => {
            expect(data).to.be.an('array');
            console.info('teammates >', data);
            done();
          });
        });
        it('I can access all apps', (done) => {
          podio.request('GET', `/app/space/${workspaceId}`).then(data => {
            expect(data).to.be.an('array');
            console.info('apps in space >', data);
            done();
          });
        });
      });
    });


    describe('Podio Task', () => {
      describe('As team member', () => {
        let demoTask = [];
        after(done => { // clean up tested task
          console.info('demo task > ', demoTask);
          const promises = demoTask.map(task => podio.request('DELETE', `/task/${task.task_id}`));
          console.log(promises);
          Q.any(promises).then(done, err => {
            console.log(err);
            done();
          }).catch(err => {
            console.log(err);
            done();
          });
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

    describe('Phase', () => {
      describe('As team member', () => {
        it('I can see all the active phases', (done) => {
          podio.request('POST', `/item/app/${phaseAppId}/filter`, {space_id: workspaceId}).then(data => {
            console.log('phases items > ', data);
            expect(data).to.be.an('array');
            done();
          });
        });
        it('I can create new phase for 1 product');
        it('I can create task inside one phase');
      });
    });

  });
});

