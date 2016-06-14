/**
 * Created by phucpnt on 6/12/16.
 */
import React, { Component, PropTypes } from 'react';
import makeContainerWorkItemRef from '../../containers/work-item/container-work-item-refrence';

class WorkItemReference extends Component {

  render() {
    console.log(this.props.createTaskByRefItem);
    const _onClick = () => {
      this.props.createTaskByRefItem(this.props.url);
    };

    return (
        <div className="js-work-item-controls">
          <button onClick={_onClick} className="btn btn-block bg-maroon btn-flat">
            Add FE Backlog
          </button>
        </div>
    );
  }

}

WorkItemReference.propTypes = {
  isExistInFe: PropTypes.oneOf([0, 1]),
  isLoading: PropTypes.oneOf([0, 1]),
  createTaskByRefItem: PropTypes.func,
  addRefItemToTask: PropTypes.func,
  url: PropTypes.string,
};

export default makeContainerWorkItemRef(WorkItemReference);
