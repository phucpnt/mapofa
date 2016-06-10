/**
 * Created by phucpnt on 5/22/16.
 */

import React, { Component, PropTypes } from 'react';
import * as ActionForm from './form/action-form';
import * as ActionIframe from '../containers/iframe-3rd-party/action-iframe-full';
import * as ActionGantt from '../containers/gantt/action-gantt';
import * as TF from '../constants/timeframe';
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
      const { onAdd, getGanttTask, currentTimeFrame } = this.props;
      return (
          <Com onAdd={onAdd} currentTimeFrame={currentTimeFrame} getGanttTask={getGanttTask}/>
      );
    }
  }

  WrappedGlobalFunCom.propTypes = {
    onAdd: PropTypes.func,
    getGanttTask: PropTypes.func,
    currentTimeFrame: PropTypes.oneOf([TF.LAST_WEEK, TF.NEXT_WEEK, TF.WEEK]),
  };

  return WrappedGlobalFunCom;
}

const podioAddNewTaskUrl = 'https://podio.com/sentificom/frontend-ng/apps/devtask/items/new';

const mapStateToProps = state => ({
  currentTimeFrame: state.app.gantt.timeFrame,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd() {
      dispatch(ActionIframe.show(podioAddNewTaskUrl));
    },
    getGanttTask({ timeFrame }) {
      dispatch(ActionGantt.load({ timeFrame }));
    },
  };
};


export default Com => connect(mapStateToProps, mapDispatchToProps)(makeWrapCom(Com));
