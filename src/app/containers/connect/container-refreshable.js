/**
 * Created by phucpnt on 6/5/16.
 */

import React, { Component, PropTypes } from 'react';

export default function makeRefreshableComponent(replayMethods = []) {
  return (Com) => {
    class RefreshableComponent extends Component {

      constructor(props) {
        super(props);
        this._lastRunMethod = null;
        this.refresh = this.refresh.bind(this);
      }

      _rememberLastRunMethod(method) {
        return (...args) => {
          this._lastRunMethod = method.bind(null, ...args);
          return method(...args);
        };
      }

      refresh() {
        this._lastRunMethod();
      }

      render() {
        let props = {};
        replayMethods.forEach(propMethod => {
          props[propMethod] = this._rememberLastRunMethod(this.props[propMethod]);
        });
        return (<Com {...this.props} {...props} refresh={this.refresh}/>);
      }

    }

    RefreshableComponent.propTypes = replayMethods.reduce((finalPropTypes, curMethod) => {
      finalPropTypes[curMethod] = PropTypes.func.isRequired;
      return finalPropTypes;
    }, {});

    return RefreshableComponent;
  };
}

