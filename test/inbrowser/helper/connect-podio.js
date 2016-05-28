/**
 * Created by phucpnt on 5/14/16.
 */

import { doAuth, isConnected } from '../../../src/browser/extension/connect/podio/connect-podio';
import { getAppSetupConfig } from '../../../src/browser/extension/connect/podio/helper/app-task';

import { WORKSPACE_ID, SNAPP_TASK } from './constants';

import _ from 'lodash';


const setup = _.once(() => {
  const div = document.createElement('div');
  div.innerHTML = '<button>Create App Task</button>';
  document.body.insertBefore(div, document.body.firstChild);
  const appSetupConfig = getAppSetupConfig(WORKSPACE_ID, {});

  div.firstChild.addEventListener('click', () => {
    isConnected().then(podio => {
      podio.request('POST', '/app', appSetupConfig)
          .then(response => {
            console.log('app created', response);
            return {
              appFields: response.fields.reduce((accum, field) => {
                accum[_.camelCase(field.external_id)] = field.field_id;
                return accum;
              }, {}),
              appId: response.app_id,
            };
          })
          .then(appTask => window.localStorage.setItem(SNAPP_TASK, JSON.stringify(appTask)));
    });
  });

});

export default function requireConnect(callback) {
  return isConnected().then(callback).then(setup).catch((err) => {
    console.error(err);
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

export function getAppTaskDetails() {
  return JSON.parse(window.localStorage.getItem(SNAPP_TASK));
}

