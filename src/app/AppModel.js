export class AppModel {
  constructor() {
    this.topic = {
      title: 'none',
      content: 'none'
    };
  }

  handleTopicDataLoaded(ev) {
    this.topic = ev.data;
  }

  appendDataTo(viewData) {
    viewData.topic = this.topic;
  }
}

export const appModel = new AppModel();
