/**
 * Created by phucpnt on 6/5/16.
 */

import React, { Component, PropTypes } from 'react';
import { registerUpdateListener } from './action-connect';

export default ComUI => {

  class ComponentRefreshOnUpdate extends Component {
    componentDidMount() {
      registerUpdateListener(() => this.refs.refreshableComponent.props.refresh());
    }

    render() {
      return (<ComUI {...this.props} ref="refreshableComponent"/>);
    }
  }

  return ComponentRefreshOnUpdate;
};
