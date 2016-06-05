/**
 * Created by phucpnt on 5/22/16.
 */

import React, { Component, PropTypes } from 'react';
import * as ActionForm from './form/action-form';
import * as ActionIframe from '../containers/iframe-3rd-party/action-iframe-full';
import { connect } from 'react-redux';


function makeWrapCom(Com) {

  class WrappedGlobalFunCom extends Component {

    constructor(props) {
      super(props);
      this.onPopupIframe = this.onPopupIframe.bind(this);
    }

    onPopupIframe(url) {
      const iframe = document.getElementById('full-iframe');
      iframe.src = url;
    }

    render() {
      const { onAdd } = this.props;
      return (
          <Com onAdd={onAdd}/>
      );
    }
  }

  WrappedGlobalFunCom.propTypes = {
    onAdd: PropTypes.func,
  };

  return WrappedGlobalFunCom;
}

const podioAddNewTaskUrl = 'https://podio.com/sentificom/frontend-ng/apps/devtask/items/new';

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd() {
      dispatch(ActionIframe.show(podioAddNewTaskUrl));
    },
  };
};


export default Com => connect(null, mapDispatchToProps)(makeWrapCom(Com));
