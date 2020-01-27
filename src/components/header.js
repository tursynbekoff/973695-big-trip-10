import AbstractComponent from './abstract-component.js';

const getTripInfo = function () {
  return (
    `<h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>`
  );
};

export default class Header extends AbstractComponent {
  getTemplate() {
    return getTripInfo();
  }
}
