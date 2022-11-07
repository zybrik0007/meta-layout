import './chart.scss';
import Chart from 'chart.js/auto';

window.Chart = Chart;

const names = {
  element: '.chart',
  circle: '.chart__circle-item',
  yellow: '.chart__description-item_yellow',
  green: '.chart__description-item_green ',
  purple: '.chart__description-item_purple',
  black: '.chart__description-item_black',
  value: '.chart__circle-value',
  text: '.chart__circle-text',
};

class Cart {
  constructor() {
    this.voice = {
      one: 'голос',
      two: 'голоса',
      three: 'голосов',
    };
  }

  initialization(element) {
    this.element = element;
    this.circle = this.element.querySelector(names.circle).getContext('2d');
    this.value = this.element.querySelector(names.value);
    this.text = this.element.querySelector(names.text);

    const yellow = this.circle.createLinearGradient(0, 0, 0, 180);
    yellow.addColorStop(0.0, '#FFE39C');
    yellow.addColorStop(1.0, '#FFBA9C');

    const purple = this.circle.createLinearGradient(0, 0, 0, 180);
    purple.addColorStop(0.0, '#BC9CFF');
    purple.addColorStop(1.0, '#8BA4F9');

    const green = this.circle.createLinearGradient(0, 0, 0, 180);
    green.addColorStop(0.0, '#6FCF97');
    green.addColorStop(1.0, '#66D2EA');

    const black = this.circle.createLinearGradient(0, 0, 0, 180);
    black.addColorStop(0.0, '#919191');
    black.addColorStop(1.0, '#3D4975');

    this.yellowVal = this.element.querySelector(names.yellow).dataset.val;
    this.greenVal = this.element.querySelector(names.green).dataset.val;
    this.purpleVal = this.element.querySelector(names.purple).dataset.val;
    this.blackVal = this.element.querySelector(names.black).dataset.val;

    this.sum = +this.yellowVal + (+this.greenVal) + +(this.purpleVal) + (+this.blackVal);

    if (this.sum <= 0) {
      this.sum = 0;
      this.purpleVal = 1;
    }
    this.cart = new Chart(this.circle, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.yellowVal, this.purpleVal, this.greenVal, this.blackVal],

          backgroundColor: [yellow, purple, green, black],
          rotation: 180,
          cutout: 55,
          events: [],

        }],
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
      },
    });

    this.textDisplay();
  }

  textDisplay() {
    this.value.innerHTML = this.sum;

    if (this.sum === 0) {
      this.text.innerHTML = this.voice.three;
    }
    if (this.sum === 1) {
      this.text.innerHTML = this.voice.one;
    }
    if (this.sum > 1 && this.sum < 5) {
      this.text.innerHTML = this.voice.two;
    }
    if (this.sum > 4) {
      this.text.innerHTML = this.voice.three;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const doCart = document.querySelectorAll(names.element);
    doCart.forEach((cart) => {
      const doCartObj = new Cart();
      doCartObj.initialization(cart);
    });
  }());
});
