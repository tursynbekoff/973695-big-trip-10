import {getTripInfo} from './components/header.js';
import {getTripFilterEvents} from './components/menu.js';
import {getTripEventsFilterForm} from './components/filter.js';
import {getTripEventsAdd} from './components/trip-add.js';
import {getTripEventEdit} from './components/trip-edit.js';
import {getTripEvent} from './components/trip.js';
import {generateTrips} from './mock/trip.js';

const TRIP_COUNT = 3;
const tripInfo = document.querySelector(`.trip-info`);
const tripControlsMenu = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const trips = generateTrips(TRIP_COUNT);

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};


render(tripInfo, getTripInfo(), `afterbegin`);
render(tripControlsMenu, getTripFilterEvents(), `beforeend`);
render(tripEvents, getTripEventsFilterForm(), `afterbegin`);

// trips.slice(1, 2).forEach((trip) => render(tripEvents, getTripEventsAdd(trip), `beforeend`));
render(tripEvents, getTripEventEdit(trips[0]), `beforeend`);
trips.slice(1, 3).forEach((trip) => render(tripEvents, getTripEvent(trip), `beforeend`));

const travelPrices = document.querySelectorAll(`.event__price-value`);
const travelPrice = document.querySelector(`.event__input--price`);

const priceInputInt = Number(travelPrice.value);
let priceTotal = 0;

travelPrices.forEach(element => {
    const priceInt = Number(element.innerHTML);
    priceTotal += priceInt;
});

console.log(priceTotal);

const priceMarkup = document.querySelector(`.trip-info__cost-value`);

priceMarkup.innerHTML = priceTotal + priceInputInt;