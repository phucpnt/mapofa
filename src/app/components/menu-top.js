/**
 * Created by phucpnt on 5/22/16.
 */

import React, { Component } from 'react';

import ConnStatusPodio from './connection-status-podio';

export default class MenuTop extends Component {

  render() {
    return (
        <div className="top-controls">
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li>
                <a className="top-btn-add" href="#"><i className="fa fa-plus"/></a>
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