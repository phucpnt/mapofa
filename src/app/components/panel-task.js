/**
 * Created by phucpnt on 5/29/16.
 */

import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import { PTT_BACKLOG, PTT_MYTASK, PTT_NOTDONE } from '../constants/app';

import TaskGroup from './task/task-group';
import TaskItem from './task/task-item';

import makePanelTask from '../containers/task/container-panel-task';
import makeContainerTask from '../containers/task/container-task';
import classnames from 'classnames';

class PanelTask extends Component {

  static getTabList() {
    return [
      { id: PTT_MYTASK, label: 'My Task' },
      { id: PTT_NOTDONE, label: 'Team WIP' },
      { id: PTT_BACKLOG, label: 'Backlog' },
    ];
  }

  static getTaskGroup() {
    const currentDate = new Date();
    return [
      {
        label: 'Overdue',
        className: 'overdue',
        filter: taskList => taskList.filter(task => moment(task.calEstEndDate).isBefore(currentDate, 'day'))
      },
      {
        label: 'Today',
        className: 'today',
        filter: taskList => taskList.filter(task => moment(task.calEstEndDate).isSame(currentDate, 'day'))
      },
      {
        label: 'Current Week',
        className: 'current-week',
        filter: taskList => taskList.filter(
            task => moment(task.calEstEndDate).isBetween(currentDate, moment().endOf('week'))
        )
      },
      {
        label: 'UpComing',
        className: 'upcoming',
        filter: taskList => taskList.filter(
            task => moment(task.calEstEndDate).isAfter(moment().endOf('week'))
        )
      }
    ];
  }

  constructor(props) {
    super(props);
    this.loadAll = tabView => this.props.loadAll(tabView);
    this.TaskItemCustom = this.props.buildComItem ? this.props.buildComItem(TaskItem) : TaskItem;
  }

  renderTaskGroup(tabId, taskGroup, itemList) {

    const TaskItemCustom = this.TaskItemCustom;

    if (PTT_BACKLOG === tabId) {
      return itemList.map(item => (<TaskItemCustom key={item.id} {...item} />));
    }

    return taskGroup.map(group => {
      const groupItemList = group.filter(itemList);
      if (groupItemList.length) {
        return (
            <TaskGroup key={group.label} label={group.label} className={group.className}
                       buildComItem={this.props.buildComItem}
                       itemList={groupItemList}/>
        );
      }
      return '';
    });
  }

  render() {
    const tabList = PanelTask.getTabList();
    const { tabActive, itemList } = this.props;
    console.log(itemList);
    const loadAll = this.loadAll;
    return (
        <div className="js-task-panel task-panel">
          <div className="control-sidebar-light">
            <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
              {
                tabList.map(({ id, label }) => {
                  const _loadAll = loadAll.bind(null, id);
                  const cssClass = classnames({ active: id === tabActive });
                  return (
                      <li key={id} className={cssClass}>
                        <a onClick={_loadAll} href="#" data-toggle="tab">{label}</a>
                      </li>
                  );
                })
              }
            </ul>
            <div className="task-group">
              { this.renderTaskGroup(tabActive, PanelTask.getTaskGroup(), itemList) }
            </div>
          </div>
        </div>
    );
  }

}

PanelTask.propTypes = {
  tabActive: PropTypes.oneOf([PTT_BACKLOG, PTT_MYTASK, PTT_NOTDONE]),
  itemList: PropTypes.array,
  buildComItem: PropTypes.func,
};

PanelTask.defaultProps = {
  itemList: [],
  buildComItem: makeContainerTask,
};

export default makePanelTask(PanelTask);
