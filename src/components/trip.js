import AbstractComponent from './abstract-component.js';
import {MONTH_NAMES} from '../const.js';

const getOffersMarkup = (offers) => {
  return offers
        .map((offer) => {
          return (
            `<li class="event__offer">
                    <span class="event__offer-title">${offer.name}</span>
                    +
                    €&nbsp;<span class="event__offer-price">${offer.cost}</span>
                </li>`
          );
        })
        .join(`\n`);
};

const getTripEvent = (trip) => {
  const {city, preposition, activity, options, startDay, startMonth, startYear, startHour, startMinute, finallDay, finallMonth, finallYear, finallHour, finallMinute, price, diffDay, diffHour, diffMinute} = trip;
  const activityCapitalized = activity.charAt(0).toUpperCase() + activity.slice(1);
  const additionalOffers = getOffersMarkup(Array.from(options));
  const monthName = MONTH_NAMES[startMonth];

  return (
    `<li class="trip-days__item  day">
            <div class="day__info">
                <span class="day__counter"></span>
                <time class="day__date" datetime="${startYear}-${startMonth}-${startDay}">${monthName} ${startDay}</time>
            </div>

            <ul class="trip-events__list">
                <li class="trip-events__item">
                    <div class="event">
                        <div class="event__type">
                            <img class="event__type-icon" width="42" height="42" src="img/icons/${activity}.png"
                                alt="Event type icon">
                        </div>
                        <h3 class="event__title">${activityCapitalized} ${preposition} ${city}</h3>

                        <div class="event__schedule">
                            <p class="event__time">
                                <time class="event__start-time" datetime="${startYear}-${startMonth}-${startDay}T${startHour}:${startMinute}">${startHour}:${startMinute}</time>
                                —
                                <time class="event__end-time" datetime="${finallYear}-${finallMonth}-${finallDay}T${finallHour}:${finallMinute}">${finallHour}:${finallMinute}</time>
                            </p>
                            <p class="event__duration">${diffDay}D ${diffHour}H ${diffMinute}M</p>
                        </div>

                        <p class="event__price">
                            €&nbsp;<span class="event__price-value">${price}</span>
                        </p>

                        <ul class="event__selected-offers">
                            ${additionalOffers}
                        </ul>

                        <button class="event__rollup-btn" type="button">
                            <span class="visually-hidden">Open event</span>
                        </button>
                    </div>
                </li>
            </ul>
        </li>`
  );
};

export default class Trip extends AbstractComponent {
  constructor(trip) {
    super();

    this._trip = trip;
  }

  getTemplate() {
    return getTripEvent(this._trip);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
