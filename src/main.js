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

const getTripInfo = function () {
    return `
    <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>
    `;
};

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};


render(tripInfo, getTripInfo(), `afterbegin`);
render(tripControlsMenu, getTripFilterEvents(), `beforeend`);
render(tripEvents, getTripEventsFilterForm(), `afterbegin`);

// trips.slice(1, 2).forEach((trip) => render(tripEvents, getTripEventsAdd(trip), `beforeend`));
render(tripEvents, getTripEventEdit(trips[0]), `beforeend`);
trips.slice(1, 2).forEach((trip) => render(tripEvents, getTripEvent(trip), `beforeend`));