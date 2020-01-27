import TripInfoComponen from './components/header.js';
import MenuEventsComponent from './components/menu.js';
import FilterEventsComponent from './components/filter.js';

import TripsComponent from './components/trips.js';
import TripController from './controllers/trip.js';

import {generateTrips} from './mock/trip.js';
import {RenderPosition, render} from './utils/render.js';

const TRIP_COUNT = 5;
const tripInfo = document.querySelector(`.trip-info`);
const tripControlsMenu = document.querySelector(`.trip-controls`);
const filter = document.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfoComponen();
render(tripInfo, tripInfoComponent, RenderPosition.AFTERBEGIN);

const menuEventsComponent = new MenuEventsComponent();
render(tripControlsMenu, menuEventsComponent, RenderPosition.AFTERBEGIN);

const filterEventsComponent = new FilterEventsComponent();
render(tripControlsMenu, filterEventsComponent, RenderPosition.BEFOREEND);

const tripsComponent = new TripsComponent();
render(filter, tripsComponent, RenderPosition.BEFOREEND);

const trips = generateTrips(TRIP_COUNT);

const tripController = new TripController(tripsComponent);
tripController.render(trips);