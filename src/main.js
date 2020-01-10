import {getTripFilterEvents} from './components/menu.js';
import {getTripEventsFilterForm} from './components/filter.js';
import {getTripEventAddContent} from './components/route-info.js';
import {getTripEvents} from './components/card.js';

const tripInfo = document.querySelector(`.trip-info`);
const tripControlsMenu = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

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
render(tripEvents, getTripEventAddContent(), `beforeend`);
render(tripEvents, getTripEvents(), `beforeend`);
