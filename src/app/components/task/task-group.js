/**
 * Created by phucpnt on 6/6/16.
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TaskItem from './task-item';

class TaskGroup extends Component {
  render(props) {

    const { label, itemList } = this.props;
    const className = classnames('js-task-group task-group-container', this.props.className);

    return (
        <div className={className}>
          <h4 className="task-group-label">{label}</h4>
          <div className="task-item-list">
            {itemList.map(item => <TaskItem key={item.id} {...item} />)}
          </div>
        </div>
    );

  }
}

TaskGroup.propTypes = {
  label: PropTypes.string.isRequired,
  itemList: PropTypes.array,
  className: PropTypes.string,
};

export default TaskGroup;