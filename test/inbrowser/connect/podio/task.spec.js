/**
 * Created by phucpnt on 5/20/16.
 */

import { expect } from 'chai';
import _ from 'lodash';
import moment from 'moment';
import Q from 'q';

import connectPodio from '../../helper/connect-podio';
import taskOps from '../../../../src/browser/extension/connect/podio/task';
import { WEEK } from '../../../../src/app/constants/timeframe';

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

function getRandomTask(from) {
  return {
    subject: `Test Task ${Math.random()}`,
    startDate: moment(from).format('YYYY-MM-DD HH:MM:SS'),
    estHours: _.random(1, 8) * 60 * 60,
    description: 'test task...'
  };
}

connectPodio((podio) => {

  const task = taskOps(podio, { appId, appField });

  describe('Task on Podio', () => {
    let fakeCreatedTaskList = [];
    const originCreate = task.create;

    /**
     * wrapped task.create
     */
    task.create = (...args) => originCreate(...args).then(item => {
      fakeCreatedTaskList.push(item.id);
      return item;
    });

    it('As team member, I can create task for myself', (done) => {
      task.create(getRandomTask(moment().startOf('week'))).then(newTask => {
        console.info('new task >', newTask);
        expect(newTask).to.be.an('object');
        expect(newTask.id).to.exist;
        done();
      }).catch(err => done(err));
    });

    it('As team member, I can delete a task', (done) => {
      task.create(getRandomTask(moment().startOf('week').add(_.random(1, 5), 'day')))
          .then(nuTask => {
            task.remove(nuTask.id).then(done).catch(done);
          });
    });

    describe('Having amount of tasks', () => {

      before(done => {
        Q.all(
            _.range(_.random(2, 5))
                .map(i => getRandomTask(moment().startOf('week').add(_.random(0, 5), 'day')))
                .map(task.create)
        ).then(response => {
          console.log(response);
          done();
        }, done).catch(done);
      });

      after(done => {
        task.removeList(fakeCreatedTaskList).then(done).catch(done);
      });

      it('As a team member, I can see all the task in week', done => {
        task.filterList({ timeFrame: WEEK }).then(items => {
          console.log(items);
          expect(items).to.be.an('array');
          expect(items).to.have.length.above(1);
          expect(items[0].startDate).to.be.a('date');
          done();
        }).catch(err => done(err));
      });
    });

  });

});
