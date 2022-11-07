import './dropdown-date.scss';
// import { Calendar } from '../calendar/calendar';
import { Calendar } from '../calendar/calendar';

const names = {
  element: '.dropdown-date',
  inputsContainer: '.dropdown-date-masked__body',
  inputs: '.js-dropdown-date',
  calendarContainer: '.dropdown-date__calendar',
  calendarDisplay: 'dropdown-date__calendar_visibility',
  calendar: '.js-calendar',
};

class DropdownDate {
  constructor() {
    this.optionsDate = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC',
    };
    this.months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    this.configurationCalendar = {
      prevHtml: '<i class="material-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons">arrow_forward</i>',
      monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      navTitles: {
        days: '<h2>MMMM yyyy</h2>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2',
      },
      buttons: [
        {
          content: 'очистить',
          attrs: { do: 'clear' },
          className: 'clear',
          onClick: () => this.clearHandler(),
        },
        {
          content: 'применить',
          attrs: { do: 'apply' },
          className: 'apply',
          onClick: () => this.applyHandler(),
        }],
      range: true,
      multipleDatesSeparator: ' - ',
      minDate: new Date(),
      disableNavWhenOutOfRange: false,
    };
    this.calendar = '';
  }

  initialization(element) {
    this.element = element;
    this.inputsContainer = this.element.querySelectorAll(names.inputsContainer);
    this.inputs = this.element.querySelectorAll(names.inputs);
    this.calendarContainer = this.element.querySelector(names.calendarContainer);
    this.calendar = new Calendar(this.element.querySelector(names.calendar), this.configurationCalendar).calendar;
    this.parseInputs();
    this.showCalendar();
    this.calendarHandler();
    this.outDropdownDateHandler();
  }

  showCalendar() {
    this.inputs.forEach((item) => {
      item.addEventListener('click', () => {
        this.toggleCalendar();
      });
    });
  }

  toggleCalendar() {
    if (this.calendarContainer.classList.contains(names.calendarDisplay)) {
      this.calendarContainer.classList.remove(names.calendarDisplay);
      this.calendar.destroy();
      this.calendar = new Calendar(this.element.querySelector('.dropdown-date__calendar > .calendar'), this.configurationCalendar).calendar;
      this.parseInputs();
      this.calendar.show();
    } else {
      this.calendarContainer.classList.add(names.calendarDisplay);
    }
  }

  parseInputs() {
    if (this.element.dataset.date === 'double') {
      this.parseInputDouble();
    }

    if (this.element.dataset.date === 'single') {
      this.parseInputSingle();
    }
  }

  parseInputDouble() {
    const dateFrom = new Date(this.dropdownModValue(this.inputs[0].value));
    const dateTo = new Date(this.dropdownModValue(this.inputs[1].value));

    if (this.validationDate(dateFrom)) {
      this.calendar.selectedDates.push(dateFrom);
    } else {
      this.inputs[0].value = '';
    }

    if (this.validationDate(dateTo)) {
      this.calendar.selectedDates.push(dateTo);
    } else {
      this.inputs[1].value = '';
    }

    if (dateFrom > dateTo) {
      this.calendar.selectedDates = [];
      this.inputs[0].value = '';
      this.inputs[1].value = '';
    }

    if (this.calendar.selectedDates.length === 2) {
      this.calendar.rangeDateFrom = dateFrom;
      this.calendar.rangeDateTo = dateTo;
      this.element.dataset.days = ((dateTo.getTime() - dateFrom.getTime()) / 86400000).toString();
    }
  }

  parseInputSingle() {
    const dateFrom = new Date(
      this.dropdownModValue(this.element.dataset.from),
    );
    const dateTo = new Date(this.dropdownModValue(this.element.dataset.to));

    if (this.validationDate(dateFrom)) {
      this.calendar.selectedDates.push(dateFrom);
      this.inputs[0].value = `${dateFrom.getDate()} ${this.months[dateFrom.getMonth()]}`;
    } else {
      this.element.dataset.from = '';
    }

    if (this.validationDate(dateTo)) {
      this.calendar.selectedDates.push(dateTo);
      this.inputs[0].value = `${dateTo.getDate()} ${this.months[dateFrom.getMonth()]}`;
    } else {
      this.element.dataset.to = '';
    }

    if (dateFrom > dateTo) {
      this.calendar.selectedDates = [];
      this.element.dataset.from = '';
      this.element.dataset.to = '';
      this.inputs[0].value = '';
    }

    if (this.calendar.selectedDates.length === 2) {
      this.calendar.rangeDateFrom = dateFrom;
      this.calendar.rangeDateTo = dateTo;
      this.inputs[0].value = `${dateFrom.getDate()} ${this.months[dateFrom.getMonth()]} - ${dateTo.getDate()} ${this.months[dateTo.getMonth()]}`;
    }
  }

  validationDate(date) {
    return date instanceof Date && !Number.isNaN(date.getTime()) && (date.getTime() > new Date() || date.toLocaleString('ru', this.optionsDate) === new Date().toLocaleString('ru', this.optionsDate));
  }

  calendarHandler() {
    this.calendarContainer.addEventListener('click', () => {
      if (this.element.dataset.date === 'double') {
        if (this.calendar.selectedDates.length === 0) {
          this.inputs[0].value = '';
          this.inputs[1].value = '';
        }

        if (this.calendar.selectedDates.length === 1) {
          this.inputs[0].value = this.calendar.selectedDates[0].toLocaleString('ru', this.optionsDate);
          this.inputs[1].value = '';
          this.element.dataset.days = '0';
        }

        if (this.calendar.selectedDates.length === 2) {
          this.inputs[0].value = this.calendar.selectedDates[0].toLocaleString('ru', this.optionsDate);
          this.inputs[1].value = this.calendar.selectedDates[1].toLocaleString('ru', this.optionsDate);
          this.element.dataset.days = ((this.calendar.selectedDates[1].getTime() - this.calendar.selectedDates[0].getTime()) / 86400000).toString();
        }
      }

      if (this.element.dataset.date === 'single') {
        if (this.calendar.selectedDates.length === 0) {
          this.element.dataset.from = '';
          this.element.dataset.to = '';
          this.inputs[0].value = '';
        }

        if (this.calendar.selectedDates.length === 1) {
          this.element.dataset.from = this.calendar.selectedDates[0].toLocaleString('ru', this.optionsDate);
          this.element.dataset.to = '';
          const dateFrom = new Date(this.dropdownModValue(this.element.dataset.from));
          this.inputs[0].value = `${dateFrom.getDate()} ${this.months[dateFrom.getMonth()]}`;
        }

        if (this.calendar.selectedDates.length === 2) {
          this.element.dataset.from = this.calendar.selectedDates[0].toLocaleString('ru', this.optionsDate);
          this.element.dataset.to = this.calendar.selectedDates[1].toLocaleString('ru', this.optionsDate);
          const dateFrom = new Date(this.dropdownModValue(this.element.dataset.from));
          const dateTo = new Date(this.dropdownModValue(this.element.dataset.to));
          this.inputs[0].value = `${dateFrom.getDate()} ${this.months[dateFrom.getMonth()]} - ${dateTo.getDate()} ${this.months[dateTo.getMonth()]}`;
        }
      }

      if (!this.calendar.visible) {
        this.toggleCalendar();
      }
    });
  }

  clearHandler() {
    this.calendar.clear();
    this.inputs.forEach((e) => { e.value = ''; });
    this.element.dataset.days = '0';
  }

  applyHandler() {
    this.calendar.visible = false;
  }

  outDropdownDateHandler() {
    document.addEventListener('click', (e) => {
      const outDropdownDate = e.composedPath().includes(this.element);
      if (!outDropdownDate) {
        this.calendarContainer.classList.add(names.calendarDisplay);
      }
    });
  }

  dropdownModValue(value) {
    const valueParse = value.split('.');
    if (valueParse.length === 3) {
      return [valueParse[1], valueParse[0], valueParse[2]];
    }
    return new Error();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const dropdownDate = document.querySelectorAll(names.element);
    dropdownDate.forEach((dropdown) => {
      const doDropdownDate = new DropdownDate();
      doDropdownDate.initialization(dropdown);
    });
  }());
});
