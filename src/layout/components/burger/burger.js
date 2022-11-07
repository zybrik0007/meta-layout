import './burger.scss';

const names = {
  element: '.burger',
  input: '.burger__input',
  label: 'burger__label',
  burgerWrapper: '.burger__wrapper',
  show: 'burger__wrapper_show',
  showClass: 'burger__wrapper_show ',
};

class Burger {
  initialization(element) {
    this.element = element;
    this.input = this.element.querySelector(names.input);
    this.wrapper = this.element.querySelector(names.burgerWrapper);

    this.burgerHandler();
    this.burgerShow();
    this.outBurgerHandler();
  }

  burgerHandler() {
    this.element.addEventListener('click', () => {
      this.burgerShow();
    });
  }

  burgerShow() {
    if (this.input.checked) {
      this.wrapper.classList.add(names.show);
    } else {
      this.wrapper.classList.remove(names.show);
    }
  }

  outBurgerHandler() {
    document.addEventListener('click', (e) => {
      const outBurger = e.composedPath().includes(this.element);
      if (!outBurger) {
        this.input.checked = false;
        this.wrapper.classList.remove(names.show);
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const burger = document.querySelector(names.element);
    const doBurger = new Burger();
    doBurger.initialization(burger);
  }());
});
