import React, { Component, PropTypes } from 'react';
import NavWorkItem from '../components/popup/nav-work-item';
import '../less/inject-podio.less';

class WorkItemNavigation extends Component {

  render() {
    return (<div className="work-item-nav"><NavWorkItem /></div>);
  }

}
export default WorkItemNavigation;

