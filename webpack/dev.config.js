import path from 'path';
import webpack from 'webpack';
import baseConfig from './base.config';

const port = 3000;
const entry = [
  `webpack-dev-server/client?http://localhost:${port}`,
  'webpack/hot/only-dev-server'
];
const srcPath = path.join(__dirname, '../src/browser/');
const testPath = path.join(__dirname, '../test/');

console.log(testPath);

const config = baseConfig({
  input: {
    background: [`${srcPath}extension/background/`, ...entry],
    window: [`${srcPath}window/`, ...entry],
    popup: [`${srcPath}extension/popup/`, ...entry],
    inject: [`${srcPath}extension/inject/`, ...entry],
    app: [path.join(__dirname, '../src/app/'), ...entry],
    test: [path.join(testPath, './inbrowser.js'), ...entry], // unit test in the browser
  },
  output: {
    path: path.join(__dirname, '../dev'),
    publicPath: `http://localhost:${port}/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  loaders: [{
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules/,
    query: {
      presets: ['es2015', 'stage-0', 'react'],
      plugins: [
        'add-module-exports',
        'transform-decorators-legacy',
        [
          'react-transform',
          {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }, {
              transform: 'react-transform-catch-errors',
              imports: ['react', 'redbox-react']
            }]
          }
        ]
      ]
    },
  }, {
    test: /\.json$/,
    loader: 'json',
  },
  ]
});

config.devtool = 'eval';

export default config;
