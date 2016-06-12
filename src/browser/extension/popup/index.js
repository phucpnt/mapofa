import React from 'react';
import { render } from 'react-dom';
import Root from 'app/containers/RootPodioInject';

chrome.runtime.getBackgroundPage(background => {
  const { store, unsubscribe } = background.getStore();
  render(
    <Root store={store} />,
    document.getElementById('root')
  );
  addEventListener('unload', unsubscribe, true);
});
