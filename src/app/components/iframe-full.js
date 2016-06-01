/**
 * Created by phucpnt on 6/2/16.
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class IframeFull extends Component {

  render() {
    const { url, status } = this.props;
    const className = classnames({
      show: status === 1,
    }, 'js-iframe-full iframe-full');

    return (
        <div className={className}>
          <div className="app-panel">
            <div className="text-center closeit">Close</div>
          </div>
          <iframe src={url}></iframe>
        </div>
    );
  }
}

IframeFull.propTypes = {
  url: PropTypes.string,
  status: PropTypes.number,
};

IframeFull.defaultProps = {
  url: 'https://podio.com/sentificom/frontend-ng/apps/devtask/items/new',
  status: 1,
};


export default IframeFull;
