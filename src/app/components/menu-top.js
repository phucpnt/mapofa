/**
 * Created by phucpnt on 5/22/16.
 */

import React, { Component, PropTypes } from 'react';
import makeGlobFunComponent from '../containers/global-func';

import ConnStatusPodio from './connection-status-podio';

class MenuTop extends Component {

  render() {
    const { onAdd } = this.props;
    return (
        <div className="top-controls container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
                <ul className="nav navbar-nav">
                  <li><a href="#">Prev. week</a></li>
                  <li className="active"><a href="#">This week<span className="sr-only">(current)</span></a></li>
                  <li><a href="#">Next week</a></li>
                  <li><a href="#">In Month</a></li>
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
  onAdd: PropTypes.func
};


export default makeGlobFunComponent(MenuTop);
