import React from 'react';
import './Topic.css';
import {history} from './History';

export class MdLink extends React.Component {
  constructor(props) {
    super(props);
  }

  _onClick(ev) {
    const {href} = this.props;
    ev.preventDefault();
    ev.stopPropagation();
    history.pushState(href);
  }

  render() {
    const {children} = this.props;
    return <a href="#" onClick={(ev) => this._onClick(ev)}>{children}</a>;
  }
}
