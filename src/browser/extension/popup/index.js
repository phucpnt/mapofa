import React from 'react';
import { render } from 'react-dom';
import * as ActionItem from '../../../app/containers/work-item/action-work-item';
import Root from 'app/containers/RootPodioInject';

chrome.runtime.getBackgroundPage(background => {
  const { store, unsubscribe } = background.getStore();
  chrome.tabs.query({ active: true, currentWindow: true, url: ['https://podio.com/*'] }, tabInfo => {
    console.log('tabINfo >', tabInfo);
    render(
        <Root store={store}/>,
        document.getElementById('root')
    );
    store.dispatch(ActionItem.resolveByURL(tabInfo[0].url));
  });
  addEventListener('unload', unsubscribe, true);
});
