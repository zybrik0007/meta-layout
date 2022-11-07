import './cards.scss';
import { Calendar } from '../../components/calendar/calendar';

const names = {
  element: '.cards__calendar',
};

class Cards {
  constructor() {
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
          // onClick: () => this.clearHandler()
        },
        {
          content: 'применить',
          attrs: { do: 'apply' },
          className: 'apply',
          // onClick: () => this.applyHandler()
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
    this.calendar = new Calendar(this.element, this.configurationCalendar).calendar;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const cards = document.querySelector(names.element);
    const doCards = new Cards();
    doCards.initialization(cards);
  }());
});
