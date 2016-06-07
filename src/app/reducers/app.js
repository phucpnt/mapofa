/**
 * Created by phucpnt on 5/15/16.
 */
import { combineReducers } from 'redux';
import gantt from '../containers/gantt/reducer-gantt';
import task from '../containers/task/reducer-task';
import panelTask from '../containers/task/reducer-panel-task';
import contact from '../containers/contact/reducer-contact';
import myAccount from '../containers/contact/reducer-my-account';
import iframefull from '../containers/iframe-3rd-party/reducer-iframe-full';


export default combineReducers({
  gantt,
  task,
  contact,
  panelTask,
  myAccount,
  iframefull,
});
