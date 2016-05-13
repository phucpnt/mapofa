const req = require.context('mocha-loader!./inbrowser/', true, /.*\.spec\.js/);

req.keys().forEach((key) => {
  req(key);
});

if (module.hot) {
  module.hot.accept('./inbrowser', () => {
    window.location.reload();
  });
}
