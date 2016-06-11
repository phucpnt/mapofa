/**
 * Created by phucpnt on 6/11/16.
 */

import React, { Component, PropTypes } from 'react';

class NavWorkItem extends Component {

  render() {
    return (
        <div className="btn-group">
          <button type="button" className="button-new create-item red">+FE</button>
          <button type="button" className="button-new create-item red dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </div>
    );
  }

}

export default NavWorkItem;