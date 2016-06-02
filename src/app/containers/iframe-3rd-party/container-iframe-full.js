/**
 * Created by phucpnt on 6/3/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hide as hideIframe } from './action-iframe-full';

const mapStateToScope = state => ({
  url: state.app.iframefull ? state.app.iframefull.url : null,
  status: state.app.iframefull ? state.app.iframefull.status : null,
});

const mapDispatchToScope = dispatch => ({
  hide() {
    dispatch(hideIframe());
  }
});

export default componentUI => connect(mapStateToScope, mapDispatchToScope)(componentUI);
