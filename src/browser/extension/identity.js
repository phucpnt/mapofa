/**
 * Created by phucpnt on 5/14/16.
 */

import { api as PodioJs } from 'podio-js';
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

export function doAuth() {
  const podio = new PodioJs({
    authType: 'server',
    clientId: 'mapofa',
    clientSecret: 'pfPUmjzqgKQrfQV9J9jVhksfsY5YKGtD7Ckrxx5ifC7fxQsrF8JTS4VKCqoUYvDY',
  }, { sessionStore });

  podio.isAuthenticated().then(() => {
    // do something
    console.log('hello podio api');
  }).catch((err) => {
    chrome.identity.launchWebAuthFlow({
      url: podio.getAuthorizationURL(chrome.identity.getRedirectURL('podio')),
      interactive: true,
    }, redirectOauthUrl => {
      const uri = new URI(redirectOauthUrl);
      const query = uri.query(true);
      podio.getAccessToken(query.code, chrome.identity.getRedirectURL('podio'), (abc, responseData) => {
        console.log(abc, responseData);
      });
    });
  });
}

