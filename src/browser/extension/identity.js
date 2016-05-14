/**
 * Created by phucpnt on 5/14/16.
 */

import {api as PodioJs} from 'podio-js';
import URI from 'urijs';

const sessionStore = {
  get(authType, callback) {
    let podioOAuth = localStorage.getItem('podioOAuth');
    if (podioOAuth) {
      podioOAuth = JSON.parse(podioOAuth);
    }
    callback(podioOAuth || {});
  },
  set(podioOAuth, authType) {
    localStorage.setItem('podioOAuth', JSON.stringify(podioOAuth));
    location.hash = "";
  }
};

let _podioInstance;

function podioInstance() {
  return _podioInstance ? _podioInstance : (_podioInstance = new PodioJs({
    authType: 'server',
    clientId: 'mapofa',
    clientSecret: 'pfPUmjzqgKQrfQV9J9jVhksfsY5YKGtD7Ckrxx5ifC7fxQsrF8JTS4VKCqoUYvDY',
  }, {sessionStore}));
}

export function doAuth(callback) {
  const podio = podionInstance();

  podio.isAuthenticated().then(() => {
    // do something
    callback(podio);
  }).catch((err) => {
    chrome.identity.launchWebAuthFlow({
      url: podio.getAuthorizationURL(chrome.identity.getRedirectURL('podio')),
      interactive: true,
    }, redirectOauthUrl => {
      const uri = new URI(redirectOauthUrl);
      const query = uri.query(true);
      podio.getAccessToken(query.code, chrome.identity.getRedirectURL('podio'), () => {
        callback(podio);
      });
    });
  });
}

export function isConnected() {
  return podioInstance().isAuthenticated().then(() => {
    return podioInstance();
  });
}

