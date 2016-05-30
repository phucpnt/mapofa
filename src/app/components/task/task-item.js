/**
 * Created by phucpnt on 5/29/16.
 */

import React, { Component, PropTypes } from 'react';

class TaskItem extends Component {

  render() {
    const { id, subject } = this.props;
    return (
        <div className="js-task-item task-item" taskId={id}>
          <div className="media">
            <div className="media-left">
              <i className="fa fa-square-o"/>
            </div>
            <div className="media-body">
              {subject}
            </div>
          </div>
        </div>
    );
  }

}

TaskItem.propTypes = {
  id: PropTypes.number,
  subject: PropTypes.string,
};

export default TaskItem;
