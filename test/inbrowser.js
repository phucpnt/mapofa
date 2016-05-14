mocha.setup({ui: 'bdd', timeout: 10 * 1000});
mocha.allowUncaught();

const req = require.context('./inbrowser/', true, /.*\.spec\.js/);

req.keys().forEach((key) => {
  req(key);
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    window.location.reload();
  });
}

window.setTimeout(() => {
  mocha.run();
});
