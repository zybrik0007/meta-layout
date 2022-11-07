import './dropdown.scss';

const names = {
  element: '.dropdown',
  head: '.dropdown__body',
  select: '.dropdown__list',
  minusButtons: '.dropdown__item-button-minus',
  minusButtonsClass: 'dropdown__item-button-minus',
  plusButtons: '.dropdown__item-button-plus',
  plusButtonsClass: 'dropdown__item-button-plus',
  inputs: '.dropdown__item-input',
  input: '.js-dropdown',
  reset: '.js-dropdown__button_reset',
  resetClass: 'js-dropdown__button_reset',
  apply: '.js-dropdown__button_apply',
  applyClass: 'js-dropdown__button_apply',
  show: 'dropdown_show',

};

class Dropdown {
  constructor() {
    this.text = {
      rooms: {
        bedroom: ['спальня', 'спальни', 'спален'],
        bed: ['кровать', 'кровати', 'кроватей'],
        bathroom: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
      },
      guests: {
        guest: ['гость', 'гостя', 'гостей'],
        baby: ['младенец', 'младенца', 'младенцев'],
      },
    };
  }

  initialization(element) {
    this.element = element;
    this.head = this.element.querySelector(names.head);
    this.select = this.element.querySelector(names.select);
    this.minusButtons = this.select.querySelectorAll(names.minusButtons);
    this.plusButtons = this.select.querySelectorAll(names.plusButtons);
    this.inputs = this.select.querySelectorAll(names.inputs);
    this.input = this.element.querySelector(names.input);
    this.reset = this.select.querySelector(names.reset);
    this.showHandler();
    this.bodyHandler();
    this.minusHandler();
    this.plusHandler();
    this.buttonDisabled();
    this.inputText();
    this.outDropdownHandler();
  }

  showHandler() {
    this.head.addEventListener('click', (e) => {
      e.preventDefault();
      if (!this.element.dataset.show !== 'true') {
        if (this.element.classList.contains(names.show)) {
          this.element.classList.remove(names.show);
        } else {
          this.element.classList.add(names.show);
        }
      }
    });
  }

  bodyHandler() {
    this.select.addEventListener('click', (e) => {
      if (e.target.classList.contains(names.minusButtonsClass)) {
        this.minusHandler(e.target.dataset.value);
      }

      if (e.target.classList.contains(names.plusButtonsClass)) {
        this.plusHandler(e.target.dataset.value);
      }

      if (e.target.classList.contains(names.applyClass)) {
        if (this.element.dataset.show !== 'true') {
          this.element.classList.remove(names.show);
        }
      }

      if (e.target.classList.contains(names.resetClass)) {
        this.inputs.forEach((event) => {
          event.value = 0;
        });
        this.input.value = '';
        this.buttonDisabled();

        if (this.element.dataset.show !== 'true') {
          this.element.classList.add(names.show);
        }
      }
    });
  }

  minusHandler(e) {
    for (let i = 0; i < this.inputs.length; i += 1) {
      if (e === this.inputs[i].dataset.value && +this.inputs[i].value > 0) {
        this.inputs[i].value -= 1;
        this.buttonDisabled();
        this.inputText();
      }
    }
  }

  plusHandler(e) {
    for (let i = 0; i < this.inputs.length; i += 1) {
      if (e === this.inputs[i].dataset.value && +this.inputs[i].value < 9) {
        this.inputs[i].value = +this.inputs[i].value + 1;
        this.buttonDisabled();
        this.inputText();
      }
    }
  }

  buttonDisabled() {
    let flag = false;
    this.inputs.forEach((item) => {
      if (+item.value > 0 && +item.value < 9) {
        this.minusButtons.forEach((e) => (e.dataset.value === item.dataset.value ? e.disabled = false : ''));
        this.plusButtons.forEach((e) => (e.dataset.value === item.dataset.value ? e.disabled = false : ''));
        flag = true;
      }

      if (+item.value > 8) {
        this.plusButtons.forEach((e) => (e.dataset.value === item.dataset.value ? e.disabled = true : ''));
        flag = true;
      }

      if (+item.value < 1) {
        this.minusButtons.forEach((e) => (e.dataset.value === item.dataset.value ? e.disabled = true : ''));
        this.plusButtons.forEach((e) => (e.dataset.value === item.dataset.value ? e.disabled = false : ''));
      }
    });

    if (this.reset) {
      this.reset.disabled = !flag;
    }
  }

  inputText() {
    let firstText = '';
    let secondText = '';
    let thirdText = '';

    if (this.select.dataset.value === 'rooms') {
      firstText = this.inputParser(+this.inputs[0].value, this.text[this.select.dataset.value].bedroom);
      secondText = this.inputParser(+this.inputs[1].value, this.text[this.select.dataset.value].bed);
      thirdText = this.inputParser(+this.inputs[2].value, this.text[this.select.dataset.value].bathroom);
    }

    if (this.select.dataset.value === 'guests') {
      firstText = this.inputParser(+this.inputs[0].value + (+this.inputs[1].value), this.text[this.select.dataset.value].guest);
      thirdText = this.inputParser(+this.inputs[2].value, this.text[this.select.dataset.value].baby);
    }

    const arrText = [firstText, secondText, thirdText].filter((item) => item !== '');
    this.input.value = arrText.join(', ');
  }

  inputParser(value, key) {
    switch (true) {
      case value === 0:
        return '';
      case value === 1:
        return `${value} ${key[0]}`;
      case value > 1 && value < 5:
        return `${value} ${key[1]}`;
      case value >= 5:
        return `${value} ${key[2]}`;
      default:
        return '';
    }
  }

  outDropdownHandler() {
    document.addEventListener('click', (e) => {
      const outDropdown = e.composedPath().includes(this.element);
      if (!outDropdown && this.element.dataset.show !== 'true') {
        this.element.classList.remove(names.show);
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const dropdownElems = document.querySelectorAll(names.element);
    dropdownElems.forEach((dropdown) => {
      const doDropdown = new Dropdown();
      doDropdown.initialization(dropdown);
      doDropdown.buttonDisabled();
    });
  }());
});
