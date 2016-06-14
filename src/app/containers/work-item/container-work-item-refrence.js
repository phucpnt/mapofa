/**
 * Created by phucpnt on 6/12/16.
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createDevTaskFromItemUrl } from './action-work-item';

function makeContainerWorkItemReference(Com) {

  class WrapWorkItemReference extends Component {

    constructor(props) {
      super(props);
      this.createTaskByRefItem = url => this.props.createTaskByRefItem(url);
      this.addRefItemToTask = url => this.props.addRefItemToTask(url);
    }

    render() {
      return (
          <Com {...this.props}
              createTaskByRefItem={this.createTaskByRefItem}
              addRefItemToTask={this.addRefItemToTask}
          />
      );
    }
  }

  WrapWorkItemReference.propTypes = {
    isExistInFe: PropTypes.oneOf([0, 1]),
    isLoading: PropTypes.oneOf([0, 1]),
    createTaskByRefItem: PropTypes.func,
    addRefItemToTask: PropTypes.func,
    url: PropTypes.string,
  };

  return WrapWorkItemReference;
}

const mapStateToProps = state => ({
  isExistInFe: state.popup.curRefItem.isExistInFe,
  isLoading: state.popup.curRefItem.isLoading,
  url: state.popup.focusItem.url,
});

const mapDispatchToProp = (dispatch, ownProps) => {
  return {
    createTaskByRefItem(url) {
      dispatch(createDevTaskFromItemUrl(url));
    },
    addRefToTask(itemId, taskItemId){

    },
  };
};

export default Com => compose(
    connect(mapStateToProps, mapDispatchToProp),
    makeContainerWorkItemReference,
)(Com);
