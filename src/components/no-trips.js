import AbstractComponent from './abstract-component.js';

const getNoTripMessage = function () {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class Message extends AbstractComponent {
  getTemplate() {
    return getNoTripMessage();
  }
}
