/**
 * Created by phucpnt on 5/22/16.
 */

import React, { Component, PropTypes } from 'react';
import makeGlobFunComponent from '../containers/global-func';
import * as TF from '../constants/timeframe';
import classnames from 'classnames';

import ConnStatusPodio from './connection-status-podio';

class MenuTop extends Component {

  _getGanttTask(timeFrame) {
    return () => this.props.getGanttTask({ timeFrame });
  }

  render() {
    const { onAdd } = this.props;

    // FIXME: duplication below...
    return (
        <div className="top-controls container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
                <ul className="nav navbar-nav">
                  <li className={classnames({ active: this.props.currentTimeFrame === TF.LAST_WEEK })}>
                    <a onClick={this._getGanttTask(TF.LAST_WEEK)} href="#">Prev. week</a>
                  </li>
                  <li className={classnames({ active: this.props.currentTimeFrame === TF.WEEK })}>
                    <a href="#" onClick={this._getGanttTask(TF.WEEK)}>This Week<span
                        className="sr-only">(current)</span></a>
                  </li>
                  <li className={classnames({ active: this.props.currentTimeFrame === TF.NEXT_WEEK })}>
                    <a href="#" onClick={this._getGanttTask(TF.NEXT_WEEK)}>Next week</a>
                  </li>
                  <li className={classnames({ active: this.props.currentTimeFrame === TF.MONTH })}>
                    <a href="#" onClick={this._getGanttTask(TF.MONTH)}>In Month</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                  <li>
                    <a className="top-btn-add" onClick={onAdd} href="#"><i className="fa fa-plus"/> Add</a>
                  </li>
                  <li>
                    <a href="#"><ConnStatusPodio /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

MenuTop.propTypes = {
  onAdd: PropTypes.func,
  currentTimeFrame: PropTypes.oneOf([TF.LAST_WEEK, TF.NEXT_WEEK, TF.WEEK]),
  getGanttTask: PropTypes.func,
};


export default makeGlobFunComponent(MenuTop);
