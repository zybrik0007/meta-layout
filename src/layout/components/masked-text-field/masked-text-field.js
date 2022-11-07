import './masked-text-field.scss';
import IMask from 'imask';

const names = {
  element: '.masked-text-field',
  input: '.js-masked-text-field',
};

class MaskedTextField {
  constructor() {
    this.configurationMasked = {
      mask: Date,
      min: new Date(1990, 0, 1),
      max: new Date(2020, 0, 1),
      lazy: true,
    };
  }

  initialization(element) {
    this.element = element;
    this.input = this.element.querySelector(names.input);
    this.mask = new IMask(this.input, this.configurationMasked);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const maskedTextField = document.querySelectorAll(names.element);
    maskedTextField.forEach((masked) => {
      const doMaskedTextField = new MaskedTextField();
      doMaskedTextField.initialization(masked);
    });
  }());
});
