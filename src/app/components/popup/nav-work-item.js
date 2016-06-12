/**
 * Created by phucpnt on 6/11/16.
 */

import React, { Component, PropTypes } from 'react';
import PanelTask from '../panel-task';

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
    console.log(this.buildComItem);
    return (
        <div className="js-panel-wrapper">
          <PanelTask buildComItem={this.buildComItem}/>
        </div>
    );
  }

}

export default NavWorkItem;