import './card-room.scss';

const names = {
  element: '.card-room',
  date: '.dropdown-date',
  price: '.card-room__price-day-value',
  priceCalc: '.card-room__price-info',
  sumCalc: '.card-room__price-sum',
  priceService: '.card-room__service > span',
  priceSupService: '.card-room__sup-service > span',
  totalPrice: '.card-room__total-price',

};

class CardRoom {
  initialization(element) {
    this.element = element;
    this.date = this.element.querySelector(names.date);
    this.price = this.element.querySelector(names.price);
    this.priceCalc = this.element.querySelector(names.priceCalc);
    this.sumCalc = this.element.querySelector(names.sumCalc);
    this.priceService = this.element.querySelector(names.priceService);
    this.priceSupService = this.element.querySelector(names.priceSupService);
    this.totalPrice = this.element.querySelector(names.totalPrice);
    this.priceNumber();
    this.priceCalculate();
    this.priceServiceCalculate();
    this.priceSupServiceCalculate();
    this.totalPriceCalculate();
    this.cardHandler();
  }

  cardHandler() {
    this.element.addEventListener('click', () => {
      this.priceCalculate();
      this.totalPriceCalculate();
    });
  }

  priceCalculate() {
    let days = +this.date.dataset.days;
    let price = +this.price.dataset.price;
    let day = ' суток';

    if (typeof +days !== 'number' || Number.isNaN(+days) || +days < 0) {
      days = 0;
    }

    if (typeof +price !== 'number' || Number.isNaN(+price) || +price < 0) {
      price = 0;
      this.price.dataset.price = '0';
    }

    if (days === 1) {
      day = ' сутки';
    }

    this.priceCalc.innerHTML = `${new Intl.NumberFormat('ru-RU').format(price)}₽ x ${days}${day}`;
    this.sumCalc.innerHTML = `${new Intl.NumberFormat('ru-RU').format(days * price)}₽`;
  }

  priceNumber() {
    let price = +this.price.dataset.price;

    if (typeof +price !== 'number' || Number.isNaN(+price) || +price < 0) {
      price = 0;
    }

    this.price.innerHTML = `${new Intl.NumberFormat('ru-RU').format(price)}₽`;
  }

  priceServiceCalculate() {
    let price = this.priceService.dataset.service;

    if (typeof +price !== 'number' || Number.isNaN(+price) || +price < 0) {
      price = 0;
      this.priceService.dataset.service = '0';
    }

    this.priceService.innerHTML = `${new Intl.NumberFormat('ru-RU').format(+price)}₽`;
  }

  priceSupServiceCalculate() {
    let price = this.priceSupService.dataset.sup;

    if (typeof +price !== 'number' || Number.isNaN(+price) || +price < 0) {
      price = 0;
      this.priceSupService.dataset.sup = '0';
    }

    this.priceSupService.innerHTML = `${new Intl.NumberFormat('ru-RU').format(+price)}₽`;
  }

  totalPriceCalculate() {
    let calculate = +this.price.dataset.price
        * this.date.dataset.days
        + (+this.priceService.dataset.service)
        + (+this.priceSupService.dataset.sup);

    if (+this.price.dataset.price * this.date.dataset.days === 0) {
      calculate = 0;
    }

    this.totalPrice.innerHTML = `${new Intl.NumberFormat('ru-RU').format(calculate)}₽`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const cardRoom = document.querySelectorAll(names.element);
    cardRoom.forEach((dropdown) => {
      const doCardRoom = new CardRoom();
      doCardRoom.initialization(dropdown);
    });
  }());
});
