import TripInfoComponen from './components/header.js';
import FilterEventsComponent from './components/menu.js';
import {getTripEventsFilterForm} from './components/filter.js';
import {getTripEventsAdd} from './components/trip-add.js';
import TripEditComponent from './components/trip-edit.js';
import TripComponent from './components/trip.js';
import {generateTrips} from './mock/trip.js';
import {RenderPosition, render} from './utils.js';

// const TRIP_COUNT = 3;
const tripInfo = document.querySelector(`.trip-info`);
const tripControlsMenu = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

// const trips = generateTrips(TRIP_COUNT);

// const render = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

// const tripEditComponent = new TripEditComponent(trips[0]);
const tripInfoComponent = new TripInfoComponen();
console.log(tripInfoComponent.getElement());

render(tripInfo, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);

const filterEventsComponent = new FilterEventsComponent();
// render(tripControlsMenu, filterEventsComponent.getElement(), RenderPosition.BEFOREEND);
// render(tripEvents, getTripEventsFilterForm(), RenderPosition.AFTERBEGIN);

// render(tripEvents, getTripEventsAdd(trips[0]), RenderPosition.BEFOREEND);
// render(tripEvents, tripEditComponent.getElement(), RenderPosition.BEFOREEND);
// trips.slice(1, 3).forEach((trip) => { 
//   const tripComponent = new TripComponent(trip);
//   render(tripEvents, tripComponent.getElement(), RenderPosition.BEFOREEND)
// });

// const travelPrices = document.querySelectorAll(`.event__price-value`);
// const travelPrice = document.querySelector(`.event__input--price`);

// const priceInputInt = Number(travelPrice.value);
// let priceTotal = 0;

// travelPrices.forEach((element) => {
//   const priceInt = Number(element.innerHTML);
//   priceTotal += priceInt;
// });

// console.log(priceTotal);

// const priceMarkup = document.querySelector(`.trip-info__cost-value`);

// priceMarkup.innerHTML = priceTotal + priceInputInt;
