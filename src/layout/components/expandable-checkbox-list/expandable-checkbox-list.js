import './expandable-checkbox-list.scss';

const names = {
  element: '.expandable-checkbox-list',
  label: '.expandable-checkbox-list__label',
  input: '.expandable-checkbox-list__input',
  select: '.expandable-checkbox-list__list',
  active: 'expandable-checkbox-list__list_visibility',
};

class ExpandableCheckboxList {
  initialization(element) {
    this.element = element;
    this.label = this.element.querySelector(names.label);
    this.input = this.element.querySelector(names.input);
    this.select = this.element.querySelector(names.select);
    this.showCheckboxList();
    this.labelHandler();
  }

  showCheckboxList() {
    if (this.input.checked) {
      this.select.classList.add(names.active);
    } else {
      this.select.classList.remove(names.active);
    }
  }

  labelHandler() {
    this.label.addEventListener('click', () => {
      this.showCheckboxList();
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const array = document.querySelectorAll(names.element);
    array.forEach((item) => {
      const object = new ExpandableCheckboxList();
      object.initialization(item);
    });
  }());
});
