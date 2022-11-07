import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './calendar.scss';

export class Calendar {
  constructor(element, configuration) {
    this.calendar = new AirDatepicker(element, configuration);
  }
}
