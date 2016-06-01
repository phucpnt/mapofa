/**
 * Created by phucpnt on 5/15/16.
 */
import { combineReducers } from 'redux';
import task from '../containers/task/reducer-task';
import panelTask from '../containers/task/reducer-panel-task';
import contact from '../containers/contact/reducer-contact';
import myAccount from '../containers/contact/reducer-my-account';


export default combineReducers({
  task,
  contact,
  panelTask,
  myAccount,
});
