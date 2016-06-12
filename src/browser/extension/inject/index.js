import React from 'react';
import { render } from 'react-dom';
import Root from 'app/containers/RootPodioInject';
import configureStore from 'app/store/configureStore';

configureStore(store => {

  window.addEventListener('load', () => {
    let injectDiv = document.createElement('div');
    injectDiv.id = 'mapofa-inject'
    injectDiv.className = 'mapofa-inject';

    document.body.appendChild(injectDiv);

    render(
        <Root store={store} />,
        injectDiv
    );
  });

}, false);
