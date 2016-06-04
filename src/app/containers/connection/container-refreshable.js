/**
 * Created by phucpnt on 6/5/16.
 */

import React, { Component, PropTypes } from 'react';

export default function makeRefreshableComponent(replayMethods = []) {
  return (Com) => {
    class RefreshableComponent extends Component {

      constructor(props) {
        super(props);
        this.props = Object.assign({}, props,
            replayMethods.reduce((propsMethod, curMethod) => {
              propsMethod[curMethod] = this._rememberLastRunMethod(props[curMethod]);
              return propsMethod;
            }, {})
        );
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
        return (<Com {...this.props} refresh={this.refresh}/>);
      }

    }

    RefreshableComponent.propTypes = replayMethods.reduce((finalPropTypes, curMethod) => {
      finalPropTypes[curMethod] = PropTypes.func;
      return finalPropTypes;
    }, {});

    return RefreshableComponent;
  };
}
