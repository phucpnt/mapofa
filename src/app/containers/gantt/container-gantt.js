/**
 * Created by phucpnt on 5/17/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionGantt from './action-gantt';

function containerGantt(ComGantt) {

  class WrappedGantt extends Component {

    render() {
      const { productList, phaseList, msList, taskList, timeFrame } = this.props;
      const { load } = this.props;
      return (
          <ComGantt
              timeFrame={timeFrame}
              productList={productList}
              phaseList={phaseList}
              msList={msList}
              taskList={taskList}
              load={load}
          />
      );
    }
  }

  WrappedGantt.propTypes = {
    timeFrame: PropTypes.oneOf([
      'week', 'next-week', 'last-week', 'next-2-week', 'month', // short-term
      '3month', '6month', // mid-term
      'q1', 'q2', 'q3', 'q4', 'year', 'next-year' // long-term
    ]),
    taskList: PropTypes.array,
  };

  WrappedGantt.defaultProps = {
    timeFrame: 'week',
  };

  return WrappedGantt;

}

const mapStateToProps = (state, ownProps) => {
  return {
    taskList: state.app.task.items
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  load({ timeFrame }) {
    dispatch(actionGantt.load({ timeFrame: timeFrame || ownProps.timeFrame }));
  }
});


export default function makeGantt(ComGantt) {
  return connect(mapStateToProps, mapDispatchToProps)(containerGantt(ComGantt));
}

