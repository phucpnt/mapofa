/**
 * Created by phucpnt on 5/22/16.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import getRepo from '../../../browser/extension/connect/podio/repo-podio';
import createPushService from '../../../browser/extension/connect/podio/create-push-service';
import { WORKSPACEID } from '../../constants/app';
import * as ActionConnect from './action-connect';

import * as ActionContact from '../contact/action-contact';

function makeContainer(ComConnection) {
  class WrappedComConnection extends Component {
    componentWillMount() {
      this.props.connectPushService();
    }

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
    connectPushService: PropTypes.func,
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
      dispatch(ActionContact.getAll());
      dispatch(ActionContact.getMyAccount());
    },
    connectPushService() {
      getRepo({ workspaceId: WORKSPACEID })
          .then(repo => repo.registerUpdateHandler((message) => {
            console.log('update message >>>>', message);
            ActionConnect.handleReceiveUpdate(message);
          }));
    }
  };
};


export default function (ComConnection) {
  return connect(mapStateToProps, mapDispatchTopProps)(makeContainer(ComConnection));
}


