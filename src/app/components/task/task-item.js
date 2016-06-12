/**
 * Created by phucpnt on 5/29/16.
 */

import React, { Component, PropTypes } from 'react';
import makeContainerTask from '../../containers/task/container-task';

class TaskItem extends Component {

  _onClick(item) {
    return () => this.props.onClick(item);
  }

  render() {
    const { id, subject, link, assignee } = this.props;
    return (
        <div className="js-task-item task-item" taskId={id} onClick={this._onClick({ link })}>
          <div className="media">
            <div className="media-left">
              <i className="fa fa-square-o"/>
            </div>
            <div className="media-body">
              {subject}
              <div className="assignee">
                {assignee.map(person => {
                  return (<img key={person.id} className="avatar img-circle" 
                               title={person.name}
                               src={person.avatarThumbnail}/>);
                })}
              </div>
            </div>
          </div>
        </div>
    );
  }

}

TaskItem.propTypes = {
  id: PropTypes.number,
  subject: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  assignee: PropTypes.array,
};

export default TaskItem;
