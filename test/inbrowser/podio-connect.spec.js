/**
 * Created by phucpnt on 5/14/16.
 */

import { doAuth } from '../../src/browser/extension/identity';


document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById('connect-podio').addEventListener('click', () => {
    doAuth();
  });
});


