import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './app/App.jsx';
import 'file-loader?name=[name].[ext]!../www/index.html';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import {loadTopicData} from './app/LoadTopicDataAction';
import {history} from './app/History';

history.onStateChange = (path) => {
  console.log("onstatechanged");
  loadTopicData(path);
};
history.pushState('Start.md');

const renderApp = (App) => {
  render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept('./app/App.jsx', () => {
    const NextApp = require('./app/App.jsx').default;
    renderApp(NextApp);
  });
}

renderApp(App);
