/**
 * Created by phucpnt on 6/6/16.
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TaskItem from './task-item';

class TaskGroup extends Component {
  constructor(props) {
    super(props);
    this.TaskItemCustom = props.buildComItem ? props.buildComItem(TaskItem) : TaskItem;
  }

  render(props) {

    const { label, itemList, buildComItem } = this.props;

    const className = classnames('js-task-group task-group-container', this.props.className);
    const TaskItemCustom = this.TaskItemCustom;

    return (
        <div className={className}>
          <h4 className="task-group-label">{label}</h4>
          <div className="task-item-list">
            {itemList.map(item => <TaskItemCustom key={item.id} {...item} />)}
          </div>
        </div>
    );

  }
}

TaskGroup.propTypes = {
  label: PropTypes.string.isRequired,
  itemList: PropTypes.array,
  className: PropTypes.string,
  buildComItem: PropTypes.func,
};

export default TaskGroup;