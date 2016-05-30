/**
 * Created by phucpnt on 5/29/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterPanel } from './action-task';
import { PTT_BACKLOG, PTT_MYTASK, PTT_NOTDONE } from '../../constants/app';

function makeContainerPanelTask(ComPanel) {

  class WrappedPanelTask extends Component {
    componentDidMount() {
      console.log(this.props);
      this.props.loadAll(this.props.tabActive);
    }

    render() {
      const { tabActive, itemList, isLoading } = this.props;
      return (<ComPanel tabActive={tabActive} itemList={itemList} isLoading={isLoading} />);
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
      switch (view) {
        case PTT_MYTASK:
          break;
        case PTT_NOTDONE:
          dispatch(filterPanel({ status: ['WIP'] }));
          break;
        case PTT_BACKLOG:
          break;
      }
    }
  };
};

export default ComPanel => connect(connectStateToProps, connectDispatchToProps)(makeContainerPanelTask(ComPanel));
