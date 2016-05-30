/**
 * Created by phucpnt on 5/21/16.
 */

import t from 'tcomb-form';
import contact from './contact';

const Task = t.struct({
  subject: t.String,
  category: t.enums({
    backlog: 'Backlog',
    bug: 'Bug',
    feature: 'Feature'
  }),
  status: t.enums({
    notStarted: 'Not Started',
    inProgress: 'In Progress',
    done: 'Done',
  }),
  startDate: t.maybe(t.Date),
  estHours: t.maybe(t.Integer),
  actualHours: t.maybe(t.Integer),
  remainHours: t.maybe(t.Integer),
  // estEndDate: 122343564,
  assignee: t.maybe(t.list(contact)),
  belongsToPhase: t.maybe(t.Array),
  description: t.maybe(t.String),
});
export default Task;
