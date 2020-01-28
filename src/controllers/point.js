import TripEditComponent from '../components/trip-edit.js';
import TripComponent from '../components/trip.js';
import {render, replace, RenderPosition} from '../utils/render.js';

const Mode = {
    DEFAULT: `default`,
    EDIt: `edit`
}

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;
    this._tripComponent = null;
    this._tripEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(trip) {
    const oldTripComponent = this._taskComponent;
    const oldTripEditComponent = this._tripEditComponent;

    this._tripComponent = new TripComponent(trip);
    this._tripEditComponent = new TripEditComponent(trip);

    this._tripComponent.setEditButtonClickHandler(() => {
        this._replaceTripToEdit();
        document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEditComponent.formSubmitHandler(() => {
        _replaceEditToTrip();
    });

    if (oldTripEditComponent && oldTripComponent) {
        replace(this._tripComponent, oldTripComponent);
        replace(this._tripEditComponent, oldTripEditComponent);  
    } else {
        render(this._container, this._tripComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
        if (this._mode !== Mode.DEFAULT) {
          this._replaceEditToTrip();
        }
  }

  _onEscKeyDown(evt) {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    
        if (isEscKey) {
          this._replaceEditToTrip();
          document.removeEventListener(`keydown`, this._onEscKeyDown);
        }
  }
    
  _replaceEditToTrip() {
    this._tripEditComponent.reset();
    replace(this._tripComponent, this._tripEditComponent);
    this._mode = Mode.DEFAULT;
  }
    
  _replaceTripToEdit() {
    //   this._onViewChange();
    replace(this._tripEditComponent, this._tripComponent);
    this._mode = Mode.EDIT;
  }
}

