/**
 * Created by phucpnt on 5/15/16.
 */

import React, { Component, PropTypes } from 'react';
import makeContainerConnection from '../containers/connection/container-connection';

export default function ConnectionStatusPodio() {
  return (
      <div>Podio Status</div>
  );
}


export default makeContainerConnection(ConnectionStatusPodio);
