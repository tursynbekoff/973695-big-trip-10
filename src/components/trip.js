import { MonthNames } from '../const.js';
const getOffersMarkup = (offers) => {
    return offers
        .map((offer) => {
            return (
                `<div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                    <label class="event__offer-label" for="event-offer-train-1">
                    <span class="event__offer-title">${offer.name}</span>
                    &plus;
                    &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
                    </label>
                 </div>`
            );
        })
        .join(`\n`);
}

const getPicturesMarkup = (pictureSrc) => {
    return pictureSrc
        .map((src) => {
            return (
                `<img class="event__photo" src="${src}" alt="Event photo">`
            );
        })
        .join(`\n`);
};

export const getTripEvent = (trip) => {
    const { city, preposition, activity, options, description, pictureSrc, startDay, startMonth, startYear, startHour, startMinute, finallDay, finallMonth, finallYear, finallHour, finallMinute, price } = trip;
    const activityCapitalized = activity.charAt(0).toUpperCase() + activity.slice(1)
    const additionalOffers = getOffersMarkup(Array.from(options));
    const pictures = getPicturesMarkup(Array.from(pictureSrc));
    const monthName = MonthNames[startMonth];
    const startYearShort = startYear - 2000;
    return `
        <li class="trip-days__item  day">
            <div class="day__info">
                <span class="day__counter">2</span>
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
                            <p class="event__duration">1H</p>
                        </div>

                        <p class="event__price">
                            €&nbsp;<span class="event__price-value">${price}</span>
                        </p>

                        <button class="event__rollup-btn" type="button">
                            <span class="visually-hidden">Open event</span>
                        </button>
                    </div>
                </li>

                
            </ul>
        </li>
    `;
};
