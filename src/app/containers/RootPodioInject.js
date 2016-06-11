import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './WorkItemNavigation';

const Root = ({ store }) => (
    <Provider store={store}>
      <App />
    </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;

