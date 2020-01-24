import AbstractComponent from './abstract-component.js';

const getBoardContainer = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class Board extends AbstractComponent {
  getTemplate() {
    return getBoardContainer();
  }
}
