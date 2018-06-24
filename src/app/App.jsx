import React from 'react';
import './App.css';
import {Topic} from './Topic';
import {dispatcher} from './Dispatcher';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {topic: {content: ''}};

    this._onModelChangedListener = (ev) => {
      this._onModelChanged(ev);
    };
  }

  _onModelChanged(ev) {
    console.log('%o', ev.data);
    this.setState(ev.data);
  }

  componentWillMount() {
    dispatcher.subscribe(this._onModelChangedListener);
  }

  componentWillUnmount() {
    dispatcher.unsubscribe(this._onModelChangedListener);
  }

  render() {
    const {content} = this.state.topic || {content: '*none*'};

    return (<React.Fragment>
      <div className="App_contentFrame">
        <Topic content={content}/>
      </div>
    </React.Fragment>);
  }
}
