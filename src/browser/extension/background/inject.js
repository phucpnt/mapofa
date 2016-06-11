// dev only: async fetch bundle

const arrowURLs = ['^https://podio\\.com'];

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status !== 'loading' || !tab.url.match(arrowURLs.join('|'))) return;

  chrome.tabs.executeScript(tabId, {
    code: 'var injected = window.browserReduxInjected; window.browserReduxInjected = true; injected;', // eslint-disable-line max-len
    runAt: 'document_start'
  }, (result) => {
    if (chrome.runtime.lastError || result[0]) return;
    fetch('https://localhost:3000/js/inject.bundle.js').then(response => {
      return response.text();
    }).then(response => {

      chrome.tabs.executeScript(tabId, { // override issue with webpack dev server
        code: 'var _$$script = document.createElement("script"); _$$script.src="error.js"; document.body.appendChild(_$$script); ', // eslint-disable-line max-len
        runAt: 'document_end'
      });
      chrome.tabs.executeScript(tabId, { code: response, runAt: 'document_end' });
    });
  });
});
