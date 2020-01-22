import {createElement} from '../utils.js';

const getTripInfo = function () {
  return (
    `<h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>`
  );
};


export default class Header {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getTripInfo();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}