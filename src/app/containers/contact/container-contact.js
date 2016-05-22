/**
 * Created by phucpnt on 5/22/16.
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

function makeContainer(ComContact) {
  class WrappedComContact extends Component {
    render() {
      const { contactList } = this.props;
      console.log(contactList);
      return (
          <ComContact contactList={contactList}/>
      );
    }
  }

  WrappedComContact.propTypes = {
    contactList: PropTypes.array
  };

  return WrappedComContact;
}

const mapStateToProps = state => {
  return {
    contactList: state.app.contact.items,
  };
};

export default ComContact => connect(mapStateToProps, null)(makeContainer(ComContact));

