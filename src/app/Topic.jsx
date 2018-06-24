import React from 'react';
import './Topic.css';
import Markdown from 'react-markdown';
import {MdLink} from './MdLink';

export class Topic extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {content} = this.props;

    return (<div className="Topic">
      <Markdown source={content} renderers={{'link': MdLink}}/>
    </div>);
  }
}
