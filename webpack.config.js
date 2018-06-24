const webpack = require('webpack');
const path = require('path');
const cssnext = require('postcss-cssnext');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({
  versionCommand: 'describe --always --tags --dirty'
});

module.exports = {
  devtool: 'eval-source-map',
  context: path.join(__dirname, 'src'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:9000',
    'webpack/hot/only-dev-server',
    './index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },

  devServer: {
    historyApiFallback: true,
    inline: false,
    port: 9000,
    hot: true,
    proxy: {
      '/api': 'http://localhost:10780'
    }
  },

  module: {
    loaders: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          {loader: 'file-loader', options: {hash: 'sha512', digest: 'hex', name: '[hash].[ext]'}},
          {loader: 'image-webpack-loader'}
        ]
      },
      {
        test: /\.p?css$/,
        use: [{loader: 'style-loader', options: {sourceMap: true}},
          {loader: 'css-loader', options: {sourceMap: true}},
          {loader: 'postcss-loader', options: {plugins: [cssnext], sourceMap: true}}]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          'plugins': ['react-hot-loader/babel']
        },
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEV__': true,
      'VERSION': JSON.stringify(gitRevisionPlugin.version()),
      'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash())
    }),
    new webpack.HotModuleReplacementPlugin(),
    gitRevisionPlugin,
    new CopyWebpackPlugin([
      {
        context: path.join(__dirname, 'src'),
        from: {glob: './assets/**/*', dot: false},
        to: '.'
      }
    ], {debug: false, copyUnmodified: true})
  ]
};

