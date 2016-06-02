/**
 * Created by phucpnt on 6/2/16.
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import makeContainerIframeFull from '../containers/iframe-3rd-party/container-iframe-full';

class IframeFull extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: 1 };
  }

  componentDidMount() {
    this.refs.iframe.onload = () => {
      console.log('iframe load done');
      this.setState({ isLoading: 0 });
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.status === 1 && prevProps.url !== this.props.url) {
      this.setState({ isLoading: 1 });
    }
  }

  render() {
    const { url, status, hide } = this.props;
    const className = classnames({
      show: status === 1,
      hide: status !== 1,
    }, 'js-iframe-full iframe-full');

    return (
        <div className={className}>
          <div className="app-panel">
            <div className="text-center closeit" onClick={hide}>
              <i className="fa fa-close"/> Close &amp; Return App&nbsp;
              {
                this.state.isLoading ? (<i className="fa fa-refresh fa-spin" />) : ''
              }
            </div>
          </div>
          <iframe className="iframe-placeholder" ref="iframe" src={url}></iframe>
        </div>
    );
  }
}

IframeFull.propTypes = {
  url: PropTypes.string,
  status: PropTypes.number,
  hide: PropTypes.func,
};

IframeFull.defaultProps = {
  url: 'https://podio.com/sentificom/frontend-ng/apps/devtask/items/new',
  status: 1,
};

export default makeContainerIframeFull(IframeFull);
