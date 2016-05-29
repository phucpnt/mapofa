/**
 * Created by phucpnt on 5/29/16.
 */

import React, { Component, PropTypes } from 'react';

class PanelTask extends Component {

  render() {
    return (
        <div className="js-task-panel task-panel">
          <div className="control-sidebar-light">
            <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
              <li className="active"><a href="#" data-toggle="tab">My Tasks</a></li>
              <li>
                <a href="#" data-toggle="tab" data-tooltip="My team">
                  <span>Not-Done</span> <span className="label label-danger">9</span>
                </a>
              </li>
              <li><a href="#" data-toggle="tab">Backlog</a></li>
            </ul>
            <div>
            </div>
          </div>
        </div>
    );
  }

}

export default PanelTask;
