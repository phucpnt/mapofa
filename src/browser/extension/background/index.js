import configureStore from 'app/store/configureStore';
import createMenu from './contextMenus';
import initBadge from './badge';

configureStore(store => {
  window.store = store;
  // Expose the store to extension's windows
  window.getStore = () => {
    let unsubscribeList = [];
    return {
      store: {
        ...store,
        subscribe(...args) {
          const unsubscribe = store.subscribe(...args);
          unsubscribeList.push(unsubscribe);
          return unsubscribe;
        }
      },
      unsubscribe: () => {
        unsubscribeList.forEach(unsubscriber => {
          unsubscriber();
        });
      }
    };
  };

  createMenu();
  // initBadge();

  if (process.env.NODE_ENV !== 'production') {
    require('./inject');
  }
}, true);

/**
 * Allow podio page to be included in to iframe
 */
chrome.webRequest.onHeadersReceived.addListener(
    function (info) {
      const headers = info.responseHeaders;
      for (let i = headers.length - 1; i >= 0; --i) {
        const header = headers[i].name.toLowerCase();
        if (header == 'x-frame-options' || header == 'frame-options') {
          headers.splice(i, 1); // Remove header
        }
      }
      return { responseHeaders: headers };
    }, {
      urls: ['*://podio.com/*'], // Pattern to match all http(s) pages
      types: ['sub_frame']
    }, ['blocking', 'responseHeaders']
);
