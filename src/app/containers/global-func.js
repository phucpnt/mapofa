/**
 * Created by phucpnt on 5/22/16.
 */

import React, { Component, PropTypes } from 'react';
import * as ActionForm from './form/action-form';
import { connect } from 'react-redux';


function makeWrapCom(Com) {

  class WrappedGlobalFunCom extends Component {

    constructor(props){
      super(props);
      this.onPopupIframe = this.onPopupIframe.bind(this);
    }
    onPopupIframe(url){
      const iframe = document.getElementById('full-iframe');
      iframe.src = url;
    }
    render() {
      const { onAdd } = this.props.onAdd;
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd() {
      return dispatch(ActionForm.showAddForm());
    },
  };
};


export default Com => connect(null, mapDispatchToProps)(makeWrapCom(Com));
