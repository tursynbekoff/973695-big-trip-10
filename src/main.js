import TripInfoComponen from './components/header.js';
import FilterEventsComponent from './components/menu.js';
import EventsFilterFormComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import TripAddComponent from './components/trip-add.js';
import TripEditComponent from './components/trip-edit.js';
import TripComponent from './components/trip.js';
import NoTripMsgComponent from './components/no-trips.js';
import {generateTrips} from './mock/trip.js';
import {RenderPosition, render} from './utils/render.js';

const TRIP_COUNT = 5;
const tripInfo = document.querySelector(`.trip-info`);
const tripControlsMenu = document.querySelector(`.trip-controls`);
const filter = document.querySelector(`.trip-events`);

// const tripInfoComponent = new TripInfoComponen();
// render(tripInfo, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);

// const filterEventsComponent = new FilterEventsComponent();
// render(tripControlsMenu, filterEventsComponent.getElement(), RenderPosition.AFTERBEGIN);

// render(filter, new EventsFilterFormComponent().getElement(), RenderPosition.AFTERBEGIN);

// const renderTrip = (tripListElement, trip) => {
//   const onEscKeyDown = (evt) => {
//     const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

//     if (isEscKey) {
//       replaceEditToTrip();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

//   const replaceEditToTrip = () => {
//     tripListElement.replaceChild(tripComponent.getElement(), tripEditComponent.getElement());
//   };

//   const replaceTripToEdit = () => {
//     tripListElement.replaceChild(tripEditComponent.getElement(), tripComponent.getElement());
//   };

//   const tripComponent = new TripComponent(trip);
//   const editButton = tripComponent.getElement().querySelector(`.event__rollup-btn`);

//   editButton.addEventListener(`click`, () => {
//     replaceTripToEdit();
//     document.addEventListener(`keydown`, onEscKeyDown);
//   });


//   const tripEditComponent = new TripEditComponent(trip);
//   const editForm = tripEditComponent.getElement().querySelector(`form`);

//   editForm.addEventListener(`submit`, () => {
//     replaceEditToTrip();
//   });

//   const editFormClose = tripEditComponent.getElement().querySelector(`.event__rollup-btn`);
//   editFormClose.addEventListener(`click`, () => {
//     replaceEditToTrip();
//   });

//   render(tripListElement, tripComponent.getElement(), RenderPosition.BEFOREEND);
// };

const boardComponent = new BoardComponent();
render(filter, boardComponent, RenderPosition.BEFOREEND);

const boardLocation = document.querySelector(`.trip-days`);

const trips = generateTrips(TRIP_COUNT);

const boardController = new BoardController(boardComponent);

boardController.render(trips);