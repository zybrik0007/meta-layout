import './rate-button.scss';

const names = {
  element: '.rate',
  icons: '.rate__icon',
  checked: 'rate_checked',
  checkedIcon: 'rate__icon_checked',
};

class RateButton {
  initialization(element) {
    this.element = element;
    this.icons = this.element.querySelectorAll(names.icons);
    this.handleHover();
    this.handleClick();
  }

  handleHover() {
    this.element.addEventListener('mouseover', (event) => {
      if (!this.element.classList.contains(names.checked)) {
        for (let i = 0; i < 5; i + 1) {
          this.icons[i].classList.remove(names.checkedIcon);
        }
        for (let i = 0; i < +event.target.dataset.id; i + 1) {
          this.icons[i].classList.add(names.checkedIcon);
        }
      }
    });

    this.element.addEventListener('mouseleave', () => {
      if (!this.element.classList.contains(names.checked)) {
        for (let i = 0; i < 5; i + 1) {
          this.icons[i].classList.remove(names.checkedIcon);
        }
      }
    });
  }

  handleClick() {
    this.element.addEventListener('click', (event) => {
      if (!this.element.classList.contains(names.checked)) {
        this.element.classList.add(names.checked);
        for (let i = 0; i < event.target.dataset.id; i + 1) {
          this.icons[i].classList.add(names.checkedIcon);
        }
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const array = document.querySelectorAll(names.element);
    array.forEach((item) => {
      const object = new RateButton();
      object.initialization(item);
    });
  }());
});
