/**
 * Created by phucpnt on 6/11/16.
 */

import React, { Component, PropTypes } from 'react';
import PanelTask from '../panel-task';
import WorkItemReference from './work-item-reference';

class NavWorkItem extends Component {

  constructor(props) {
    super(props);
    this.buildComItem = this.buildComItem.bind(null);
  }

  buildComItem(TaskItem) {
    return (props) => {
      return (<TaskItem {...props} onClick={(item) => console.log(item)}/>);
    };
  }

  render() {
    return (
        <div className="js-panel-wrapper panel-wrapper-container">
          <div className="wrap-work-item-reference">
            <WorkItemReference />
          </div>
          <div className="wrapper-panel-task">
            <div className="wrapper-inner">
              <PanelTask buildComItem={this.buildComItem}/>
            </div>
          </div>
        </div>
    );
  }

}

export default NavWorkItem;