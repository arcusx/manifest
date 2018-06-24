import {dispatcher, Dispatcher} from './Dispatcher';

export function loadTopicData(path) {
  fetch('/data/' + path).then((response) => {
    return response.text();
  }).then((content) => {
    dispatcher.dispatch({type: 'topicDataLoaded', data: {content: content}});
  });
}
