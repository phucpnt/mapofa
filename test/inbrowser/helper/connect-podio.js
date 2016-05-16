/**
 * Created by phucpnt on 5/14/16.
 */

import {doAuth, isConnected} from '../../../src/browser/extension/connect/connect-podio';

export default function requireConnect(callback) {
  return isConnected().then(callback).catch(() => {
    document.addEventListener('DOMContentLoaded', (event) => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = '<h2>For running the test. Click the button to authorize podio.</h2>' +
          '<button id="connect-podio">Connect Podio</button>';

      document.getElementById('connect-podio').addEventListener('click', () => {
        doAuth(() => window.location.reload());
      });
    });
  });
}

