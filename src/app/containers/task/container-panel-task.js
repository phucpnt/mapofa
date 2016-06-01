/**
 * Created by phucpnt on 5/29/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterPanel, markTabActive } from './action-task';
import {
    PTT_BACKLOG, PTT_MYTASK, PTT_NOTDONE,
    TASK_STATUS_DONE, TASK_STATUS_HOLD, TASK_STATUS_NOTSTART, TASK_STATUS_WIP,
    TASK_TYPE_BACKLOG, TASK_TYPE_BUG, TASK_TYPE_FEATURE, TASK_TYPE_NOTSET
} from '../../constants/app';

function makeContainerPanelTask(ComPanel) {

  class WrappedPanelTask extends Component {
    componentDidMount() {
      console.log(this.props);
      this.props.loadAll(this.props.tabActive);
    }

    render() {
      const { tabActive, itemList, isLoading, loadAll } = this.props;
      return (<ComPanel tabActive={tabActive} itemList={itemList} isLoading={isLoading} loadAll={loadAll}/>);
    }
  }

  WrappedPanelTask.propTypes = {
    tabActive: PropTypes.oneOf([PTT_BACKLOG, PTT_MYTASK, PTT_NOTDONE]),
    itemList: PropTypes.array,
    isLoading: PropTypes.oneOf([0, 1]),
    loadAll: PropTypes.func,
  };

  return WrappedPanelTask;
}

const connectStateToProps = state => {
  const focusState = state.app.panelTask || {};
  return {
    tabActive: focusState.tabView,
    itemList: focusState.items,
    isLoading: focusState.isLoading,
  };
};

const connectDispatchToProps = (dispatch, ownProps) => {
  return {
    loadAll(view) {
      dispatch(markTabActive(view));
      switch (view) {
        case PTT_MYTASK:
          dispatch(filterPanel({ status: [TASK_STATUS_WIP], assignee: ['me'] }));
          break;
        case PTT_NOTDONE:
          dispatch(filterPanel({ status: [TASK_STATUS_WIP] }));
          break;
        case PTT_BACKLOG:
          dispatch(filterPanel({ category: [TASK_TYPE_BACKLOG] }));
          break;
      }
    }
  };
};

export default ComPanel => connect(connectStateToProps, connectDispatchToProps)(makeContainerPanelTask(ComPanel));
