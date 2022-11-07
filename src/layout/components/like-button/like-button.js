import './like-button.scss';

const names = {
  element: '.like-button',
  input: '.like-button__input',
  value: '.like-button__value',
};

class LikeButton {
  initialization(element) {
    this.element = element;
    this.input = this.element.querySelector(names.input);
    this.value = this.element.querySelector(names.value);
    this.validationValue();
    this.elementHandler();
  }

  elementHandler() {
    this.element.addEventListener('change', () => {
      if (this.input.checked) {
        this.value.innerHTML = +this.value.innerHTML + 1;
      }
      if (!this.input.checked) {
        this.value.innerHTML -= 1;
        this.validationValue();
      }
    });
  }

  validationValue() {
    if (!Number.isInteger(+this.value.innerHTML) || +this.value.innerHTML < 0) {
      this.value.innerHTML = 0;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const array = document.querySelectorAll(names.element);
    array.forEach((item) => {
      const object = new LikeButton();
      object.initialization(item);
    });
  }());
});
