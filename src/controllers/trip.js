import EventsSortFormComponent, {SortType} from '../components/sort.js';
import NoTripMsgComponent from '../components/no-trips.js';
import {render, RenderPosition} from '../utils/render.js';
import PointController from './point.js';

const renderTrips = (tripsListElement, trips, onDataChange, onViewChange) => {
  return trips.map((trip) => {
    const pointController = new PointController(tripsListElement, onDataChange, onViewChange);
    pointController.render(trip);

    return pointController;
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._trips = [];
    this._showedTripControllers = [];
    this._sortComponent = new EventsSortFormComponent();
    this._noTasksComponent = new NoTripMsgComponent();
    this._tripsCount = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(trips) {
    this._trips = trips;
    this._tripsCount = this._trips.length;
    const container = this._container.getElement();
    const isAllTasksArchived = trips.every((trip) => trip.isArchive);
    const containerParent = container.parentElement;

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(containerParent, this._sortComponent, RenderPosition.AFTERBEGIN);

    const tripListElement = document.querySelector(`.trip-days`);
    const newTrips = renderTrips(tripListElement, this._trips.slice(0, this._tripsCount), this._onDataChange, this._onViewChange);
    this._showedTripControllers = this._showedTripControllers.concat(newTrips);

  }

  _onDataChange(tripController, oldData, newData) {
    const index = this._trips.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._trips = [].concat(this._trips.slice(0, index), newData, this._tasks.slice(index + 1));

    tripController.render(this._trips[index]);
  }

  _onViewChange() {
    this._showedTripControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedTrips = [];

    switch (sortType) {
      case SortType.PRICE_DOWN:
        sortedTrips = this._trips.slice().sort((a, b) => a.price - b.price);
        break;
      case SortType.TIME_DURATION:
        sortedTrips = this._trips.slice().sort((a, b) => b.diffTotal - a.diffTotal);
        break;
      case SortType.DEFAULT_EVENT:
        sortedTrips = this._trips.slice(0, this._tripsCount);
        break;
    }

    const tripListElement = document.querySelector(`.trip-days`);
    tripListElement.innerHTML = ``;

    const newTrips = renderTrips(tripListElement, sortedTrips, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = newTrips;
  }
}