import 'ion-rangeslider';
import './range-slider.scss';
import './range-slider-plugin-style.scss';

const names = {
  element: '.range-slider',
  input: '.range-slider__input',
  valueOutput: '.range-slider__status',
};

class RangeSlider {
  constructor() {
    this.rubleIcon = '₽';
    this.data = {
      min: 0,
      max: 15000,
      from: 0,
      to: 15000,
    };
  }

  initialization(element) {
    this.element = element;
    this.validationData(this.element);
    this.slider = $(this.element.querySelector(names.input)).ionRangeSlider({
      type: 'double',
      min: this.data.min,
      max: this.data.max,
      from: this.data.from,
      to: this.data.to,
      drag_interval: false,
      min_interval: null,
      max_interval: null,
      input_values_separator: '-',
      onStart: (data) => {
        this.parseValueOutput(data);
      },
      onChange: (data) => {
        this.parseValueOutput(data);
      },
      onFinish: (data) => {
        this.parseValueOutput(data);
      },
    });
  }

  validationData(element) {
    this.data.min = +element.dataset.min;
    this.data.max = +element.dataset.max;
    this.data.from = +element.dataset.from;
    this.data.to = +element.dataset.to;

    if (!Number.isInteger(this.data.min)) {
      this.data.min = 0;
    }

    if (!Number.isInteger(this.data.max)) {
      this.data.max = 15000;
    }

    if (this.data.min > this.data.max) {
      this.data.min = 0;
      this.data.max = 15000;
    }

    if (!Number.isInteger(+this.data.from) || this.data.from > this.data.max || this.data.from < this.data.min) {
      this.data.from = this.data.min;
    }

    if (!Number.isInteger(this.data.to) || this.data.to > this.data.max || this.data.to < this.data.min || this.data.to < this.data.from) {
      this.data.to = this.data.max;
    }

    this.element.dataset.min = this.data.min;
    this.element.dataset.max = this.data.max;
    this.element.dataset.from = this.data.from;
    this.element.dataset.to = this.data.to;
  }

  parseValueOutput(data) {
    this.element.querySelector(names.valueOutput).innerHTML = `${data.from_pretty + this.rubleIcon} - ${data.to_pretty}${this.rubleIcon}`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const doRangeSlider = document.querySelectorAll(names.element);
    doRangeSlider.forEach((rangeSlider) => {
      const doRangeSliderDo = new RangeSlider();
      doRangeSliderDo.initialization(rangeSlider);
    });
  }());
});
