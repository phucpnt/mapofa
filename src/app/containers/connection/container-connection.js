/**
 * Created by phucpnt on 5/22/16.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ActionContact from '../contact/action-contact';

function makeContainer(ComConnection) {
  class WrappedComConnection extends Component {

    componentDidMount() {
      this.props.loadMemberList();
    }

    render() {
      return (
          <div className="js-connection-wrapper">
            <ComConnection />
          </div>
      );
    }
  }

  WrappedComConnection.PropTypes = {
    loadMemberList: PropTypes.func,
  };

  return WrappedComConnection;
}

const mapStateToProps = (state) => {
  return {
    members: state.app.contact.items,
  };
};

const mapDispatchTopProps = (dispatch, state, ownProps) => {
  return {
    loadMemberList() {
      return dispatch(ActionContact.getAll());
    }
  };
};


export default function (ComConnection) {
  return connect(mapStateToProps, mapDispatchTopProps)(makeContainer(ComConnection));
}


