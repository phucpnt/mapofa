/**
 * Created by phucpnt on 5/29/16.
 */

import React, { Component, PropTypes } from 'react';
import { PTT_BACKLOG, PTT_MYTASK, PTT_NOTDONE } from '../constants/app';
import TaskItem from './task/task-item';
import makePanelTask from '../containers/task/container-panel-task';
import classnames from 'classnames';

class PanelTask extends Component {

  static getTabList() {
    return [
      { id: PTT_MYTASK, label: 'My Task' },
      { id: PTT_NOTDONE, label: 'Team WIP' },
      { id: PTT_BACKLOG, label: 'Backlog' },
    ];
  }

  constructor(props) {
    super(props);
    this.loadAll = tabView => this.props.loadAll(tabView);
  }

  render() {
    const tabList = PanelTask.getTabList();
    const { tabActive, itemList } = this.props;
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
            <div className="task-item-list">
              {itemList.map(item => <TaskItem key={item.id} {...item} />)}
            </div>
          </div>
        </div>
    );
  }

}

PanelTask.propTypes = {
  tabActive: PropTypes.oneOf([PTT_BACKLOG, PTT_MYTASK, PTT_NOTDONE]),
  itemList: PropTypes.array,
};

PanelTask.defaultProps = {
  itemList: []
};

export default makePanelTask(PanelTask);
