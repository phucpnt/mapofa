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
        <div className="top-controls">
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
    );
  }
}

MenuTop.propTypes = {
  onAdd: PropTypes.func
};


export default makeGlobFunComponent(MenuTop);
