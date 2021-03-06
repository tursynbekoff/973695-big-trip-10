import flatpickr from 'flatpickr';
import AbstractComponent from './abstract-smart-component.js';
import {MONTH_NAMES, TRIP_TYPE} from '../const.js';
import {formatTime, formatDate} from '../utils/common.js';

const getOffersMarkup = (offers) => {
  return offers
        .map((offer) => {
          const str = offer.name.replace(/\s+/g, ``);
          return (
            `<div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${str}" type="checkbox" name="event-offer-train">
                    <label class="event__offer-label" for="event-offer-${str}">
                    <span class="event__offer-title">${offer.name}</span>
                    &plus;
                    &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
                    </label>
                 </div>`
          );
        })
        .join(`\n`);
};

const getPicturesMarkup = (pictureSrc) => {
  return pictureSrc
        .map((src) => {
          return (
            `<img class="event__photo" src="${src}" alt="Event photo">`
          );
        })
        .join(`\n`);
};

const getTripEventEdit = (trip, edits = {}) => {
  const {city, preposition, activity, options, description, pictureSrc, startDate, startDay, startMonth, startYear, startHour, startMinute, finallDate, finallDay, finallMonth, finallYear, finallHour, finallMinute, price} = trip;
  const {isArrivalDateShowing, isDepartureDateShowing} = edits;
  console.log(edits);
  const startingDate = (isArrivalDateShowing && startDate) ? formatDate(startDate) : ``;
  const startingTime = (isArrivalDateShowing && startDate) ? formatTime(startDate) : ``;

  const endingDate = (isDepartureDateShowing && finallDate) ? formatDate(startDate) : ``;
  const endingTime = (isDepartureDateShowing && finallDate) ? formatTime(startDate) : ``;

  console.log(isArrivalDateShowing);
  
  const activityCapitalized = activity.charAt(0).toUpperCase() + activity.slice(1);
  const additionalOffers = getOffersMarkup(Array.from(options));
  const pictures = getPicturesMarkup(Array.from(pictureSrc));
  const monthName = MONTH_NAMES[startMonth];

  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
        <span class="day__counter"></span>
        <time class="day__date" datetime="${startYear}-${startMonth}-${startDay}">${monthName} ${startDay}</time>
        </div>

        <ul class="trip-events__list">
            <li class="trip-events__item">
                <form class="event  event--edit" action="#" method="post">
                    <header class="event__header">
                    <div class="event__type-wrapper">
                        <label class="event__type  event__type-btn" for="event-type-toggle-1">
                        <span class="visually-hidden">Choose event type</span>
                        <img class="event__type-icon" width="17" height="17" src="img/icons/${activity}.png" alt="Event type icon">
                        </label>
                        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                        <div class="event__type-list">
                        <fieldset class="event__type-group">
                            <legend class="visually-hidden">Transfer</legend>

                            <div class="event__type-item">
                            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                            </div>

                            <div class="event__type-item">
                            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                            </div>

                            <div class="event__type-item">
                            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                            </div>

                            <div class="event__type-item">
                            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                            </div>

                            <div class="event__type-item">
                            <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                            <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                            </div>

                            <div class="event__type-item">
                            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                            </div>

                            <div class="event__type-item">
                            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                            </div>
                        </fieldset>

                        <fieldset class="event__type-group">
                            <legend class="visually-hidden">Activity</legend>

                            <div class="event__type-item">
                            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                            </div>

                            <div class="event__type-item">
                            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                            </div>

                            <div class="event__type-item">
                            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                            </div>
                        </fieldset>
                        </div>
                    </div>

                    <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                        ${activityCapitalized} ${preposition}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
                        <datalist id="destination-list-1">
                        <option value="Amsterdam"></option>
                        <option value="Geneva"></option>
                        <option value="Chamonix"></option>
                        </datalist>
                    </div>

                    <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">
                        From
                        </label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startingDate} ${startingTime}">
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">
                        To
                        </label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endingDate} ${endingTime}">
                    </div>

                    <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                        <span class="visually-hidden">Price</span>
                        &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                    </div>

                    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                    <button class="event__reset-btn" type="reset">Delete</button>

                    <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
                    <label class="event__favorite-btn" for="event-favorite-1">
                        <span class="visually-hidden">Add to favorite</span>
                        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                        </svg>
                    </label>

                    <button class="event__rollup-btn" type="button">
                        <span class="visually-hidden">Open event</span>
                    </button>
                    </header>

                    <section class="event__details">

                    <section class="event__section  event__section--offers">
                        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                        <div class="event__available-offers">
                        ${additionalOffers}
                        </div>
                    </section>

                    <section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">${description}</p>

                        <div class="event__photos-container">
                        <div class="event__photos-tape">
                        ${pictures}
                        </div>
                        </div>
                    </section>
                    </section>
                </form>
            </li>
        </ul>
    </li>`
  );
};

export default class TripEdit extends AbstractComponent {
  constructor(trip) {
    super();

    this._trip = trip;
    this._favoriteTrip = Object.assign({}, trip.favorite);
    this._flatpickr = null;
  
    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return getTripEventEdit(this._trip, );
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const trip = this._trip;

    this.rerender();
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  formSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      // При своем создании `flatpickr` дополнительно создает вспомогательные DOM-элементы.
      // Что бы их удалять, нужно вызывать метод `destroy` у созданного инстанса `flatpickr`.
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowing) {
      const dateElement = this.getElement().querySelector(`.event__input--time`);
      this._flatpickr = flatpickr(dateElement, {
        altInput: true,
        allowInput: true,
        defaultDate: this._trip.start,
      });
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`#event-start-time-1`)
      .addEventListener(`click`, () => {
        this._isDateShowing = !this._isDateShowing;

        this.rerender();
      });

    element.querySelector(`#event-end-time-1`)
      .addEventListener(`click`, () => {
        this._isDateShowing = !this._isDateShowing;

        this.rerender();
      });

  }

}
