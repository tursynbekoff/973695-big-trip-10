import EventsSortFormComponent, {SortType} from '../components/sort.js';
import TripEditComponent from '../components/trip-edit.js';
import TripComponent from '../components/trip.js';
import NoTripMsgComponent from '../components/no-trips.js';
import {render, replace, RenderPosition} from '../utils/render.js';

const renderTrip = (tripListElement, trip) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTrip();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTrip = () => {
    replace(tripComponent, tripEditComponent);
  };

  const replaceTripToEdit = () => {
    replace(tripEditComponent, tripComponent);
  };

  const tripComponent = new TripComponent(trip);

  tripComponent.setEditButtonClickHandler(() => {
    replaceTripToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const tripEditComponent = new TripEditComponent(trip);

  replaceEditToTrip();

  tripEditComponent.setCloseButtonClickHandler(() => {
    replaceEditToTrip();
  });

  tripEditComponent.formSubmit(() => {
    replaceEditToTrip();
  });

  render(tripListElement, tripComponent, RenderPosition.BEFOREEND);
};

const renderTrips = (tripsListElement, trips) => {
  trips.forEach((trip) => {
    renderTrip(tripsListElement, trip);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new EventsSortFormComponent();

    this._noTasksComponent = new NoTripMsgComponent();

  }

  render(trips) {
    const TRIPS_COUNT = trips.length;
    const container = this._container.getElement();
    const isAllTasksArchived = trips.every((trip) => trip.isArchive);
    const containerParent = container.parentElement;

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(containerParent, this._sortComponent, RenderPosition.AFTERBEGIN);

    const tripListElement = document.querySelector(`.trip-days`);


    renderTrips(tripListElement, trips.slice(0, TRIPS_COUNT));

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedTrips = [];

      switch (sortType) {
        case SortType.PRICE_DOWN:
          sortedTrips = trips.slice().sort((a, b) => a.price - b.price);
          break;
        case SortType.TIME_DURATION:
          sortedTrips = trips.slice().sort((a, b) => b.diffTotal - a.diffTotal);
          break;
        case SortType.DEFAULT_EVENT:
          sortedTrips = trips.slice(0, TRIPS_COUNT);
          break;
      }

      tripListElement.innerHTML = ``;

      renderTrips(tripListElement, sortedTrips);
    });
  }
}
