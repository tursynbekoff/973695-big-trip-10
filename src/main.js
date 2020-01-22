import TripInfoComponen from './components/header.js';
import FilterEventsComponent from './components/menu.js';
import EventsFilterFormComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import TripAddComponent from './components/trip-add.js';
import TripEditComponent from './components/trip-edit.js';
import TripComponent from './components/trip.js';
import {generateTrips} from './mock/trip.js';
import {RenderPosition, render} from './utils.js';

const TRIP_COUNT = 3;
const tripInfo = document.querySelector(`.trip-info`);
const tripControlsMenu = document.querySelector(`.trip-controls`);
const filter = document.querySelector(`.trip-events`);

const tripInfoComponent = new TripInfoComponen();
render(tripInfo, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);

const filterEventsComponent = new FilterEventsComponent();
render(tripControlsMenu, filterEventsComponent.getElement(), RenderPosition.AFTERBEGIN);

render(filter, new EventsFilterFormComponent().getElement(), RenderPosition.AFTERBEGIN);

const renderTrip = (trip) => {
  const tripListElement = document.querySelector(`.trip-days`);
  const tripComponent = new TripComponent(trip);
  const tripEditComponent = new TripEditComponent(trip);

  const editButton = tripComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    tripListElement.replaceChild(tripEditComponent.getElement(), tripComponent.getElement());
  });

  const editForm = tripEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    tripListElement.replaceChild(tripComponent.getElement(), tripEditComponent.getElement());
  });

  const editFormClose = tripEditComponent.getElement().querySelector(`.event__rollup-btn`);
  editFormClose.addEventListener(`click`, () => {
    tripListElement.replaceChild(tripComponent.getElement(), tripEditComponent.getElement());
  });

  render(tripListElement, tripComponent.getElement(), RenderPosition.BEFOREEND);
};

const boardComponent = new BoardComponent();
render(filter, boardComponent.getElement(), RenderPosition.BEFOREEND);

const boradGeneration = boardComponent.getElement();

const trips = generateTrips(TRIP_COUNT);

trips.slice(0, 3).forEach((trip) => {
  renderTrip(trip);
});

